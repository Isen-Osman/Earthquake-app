import React, { useMemo, memo } from "react";
import { format } from "date-fns";

// 1. Помошни функции надвор од компонентата (за помалку "heavy" код)
const getBadgeConfig = (mag) => {
    if (mag >= 5) return { color: "danger", label: "Strong" };
    if (mag >= 3) return { color: "warning", label: "Moderate" };
    return { color: "success", label: "Light" };
};

const formatTimestamp = (timestamp) =>
    timestamp ? format(new Date(timestamp), "dd MMM yyyy, HH:mm") : "N/A";

// 2. Мала компонента за поединечна редица
const EarthquakeRow = memo(({ eq, index, onDelete }) => {
    const badge = getBadgeConfig(eq.magnitude);

    return (
        <tr>
            <td className="text-muted fw-bold">{index + 1}</td>
            <td>
                <div className="d-flex flex-column">
                    <span className={`badge bg-${badge.color} mb-1`}>
                        {eq.magnitude?.toFixed(1)} mag
                    </span>
                    <small className="text-muted" style={{ fontSize: '0.7rem' }}>
                        {badge.label}
                    </small>
                </div>
            </td>
            <td><span className="badge border text-dark fw-normal">{eq.magType}</span></td>
            <td className="fw-medium">{eq.place}</td>
            <td>
                <div className="text-nowrap small">{formatTimestamp(eq.time)}</div>
            </td>
            <td>
                <div className="small">
                    <code>{eq.latitude?.toFixed(2)}, {eq.longitude?.toFixed(2)}</code>
                    {eq.depth && (
                        <div className="text-muted mt-1 small italic">
                            Depth: {eq.depth}km
                        </div>
                    )}
                </div>
            </td>
            <td>
                <div className="btn-group shadow-sm">
                    {eq.url && (
                        <a href={eq.url} target="_blank" rel="noreferrer"
                           className="btn btn-sm btn-light border" title="Details">
                            🌐
                        </a>
                    )}
                    <button className="btn btn-sm btn-outline-danger"
                            onClick={() => onDelete?.(eq.id)} title="Delete">
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    );
});

// 3. Главна компонента
const EarthquakeTable = ({ earthquakes = [], onDelete }) => {

    const tableBody = useMemo(() => {
        return earthquakes.map((eq, index) => (
            <EarthquakeRow
                key={eq.id}
                eq={eq}
                index={index}
                onDelete={onDelete}
            />
        ));
    }, [earthquakes, onDelete]);

    if (!earthquakes.length) {
        return (
            <div className="card border-0 shadow-sm p-5 text-center">
                <div className="text-muted">
                    <h5 className="mt-2">No data available</h5>
                    <p className="small">Try adjusting your filters or refresh the data.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="card shadow-sm border-0">
            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                    <thead className="bg-light">
                    <tr>
                        <th className="border-0 px-3 py-3">#</th>
                        <th className="border-0 py-3">Magnitude</th>
                        <th className="border-0 py-3">Type</th>
                        <th className="border-0 py-3">Location</th>
                        <th className="border-0 py-3">Date & Time</th>
                        <th className="border-0 py-3">Coordinates</th>
                        <th className="border-0 py-3">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="border-top-0">
                    {tableBody}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EarthquakeTable;