import React, { useMemo } from "react";
import { format } from "date-fns";

const EarthquakeTable = ({ earthquakes = [], onDelete }) => {
    const getBadgeColor = (mag) => {
        if (mag >= 5) return "danger";
        if (mag >= 3) return "warning";
        return "success";
    };

    const formatTime = (timestamp) => {
        if (!timestamp) return "N/A";
        return format(new Date(timestamp), "yyyy-MM-dd HH:mm:ss");
    };

    const rows = useMemo(() => {
        return earthquakes.map((eq, index) => (
            <tr key={eq.id}>
                <td>{index + 1}</td>

                <td>
                    <span className={`badge bg-${getBadgeColor(eq.magnitude)}`}>
                        {eq.magnitude?.toFixed(1)}
                    </span>
                </td>

                <td>{eq.magType || "N/A"}</td>
                <td>{eq.place}</td>
                <td>{formatTime(eq.time)}</td>

                <td>
                    {eq.latitude?.toFixed(2)}, {eq.longitude?.toFixed(2)}
                    {eq.depth != null && (
                        <small className="text-muted">
                            {" "}
                            ({eq.depth}km)
                        </small>
                    )}
                </td>

                <td>
                    <div className="d-flex gap-1">
                        {eq.url && (
                            <a
                                href={eq.url}
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-sm btn-outline-info"
                                title="View details"
                            >
                                🔗
                            </a>
                        )}

                        <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => onDelete?.(eq.id)}
                            title="Delete earthquake"
                        >
                            🗑
                        </button>
                    </div>
                </td>
            </tr>
        ));
    }, [earthquakes, onDelete]);

    if (!earthquakes.length) {
        return (
            <div className="alert alert-info text-center">
                No earthquake data available.
            </div>
        );
    }

    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
                <thead className="table-dark">
                <tr>
                    <th>#</th>
                    <th>Magnitude</th>
                    <th>Type</th>
                    <th>Place</th>
                    <th>Time (UTC)</th>
                    <th>Coordinates</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </div>
    );
};

export default EarthquakeTable;