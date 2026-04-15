import React, { useState } from 'react';

const FilterBar = ({ onSync, onFilterByTime, onReset, loading }) => {
    const [minMagnitude, setMinMagnitude] = useState(2.0);
    const [minTime, setMinTime] = useState('');

    const handleSync = () => onSync(minMagnitude, minTime);

    const handleReset = () => {
        setMinMagnitude(2.0);
        setMinTime('');
        onReset?.();
    };

    return (
        <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-3">
                <div className="row g-3 align-items-end">

                    {/* Magnitude Input */}
                    <div className="col-12 col-md-auto">
                        <label htmlFor="magInput" className="form-label small fw-bold text-muted mb-1">
                            Min Magnitude
                        </label>
                        <div className="input-group input-group-sm">
                            <span className="input-group-text bg-white">📉</span>
                            <input
                                id="magInput"
                                type="number"
                                step="0.1"
                                min="0"
                                max="10"
                                className="form-control"
                                style={{ width: '80px' }}
                                value={minMagnitude}
                                onChange={(e) => setMinMagnitude(parseFloat(e.target.value) || 0)}
                                disabled={loading}
                            />
                        </div>
                    </div>

                    {/* Date Input */}
                    <div className="col-12 col-md-auto">
                        <label htmlFor="dateInput" className="form-label small fw-bold text-muted mb-1">
                            Since Date
                        </label>
                        <div className="input-group input-group-sm">
                            <span className="input-group-text bg-white">📅</span>
                            <input
                                id="dateInput"
                                type="date"
                                className="form-control"
                                value={minTime}
                                onChange={(e) => setMinTime(e.target.value)}
                                disabled={loading}
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="col-12 col-md-auto ms-md-auto">
                        <div className="d-flex gap-2">
                            <button
                                className="btn btn-sm btn-outline-secondary px-3"
                                onClick={handleReset}
                                disabled={loading}
                                title="Reset filters and refresh all data"
                            >
                                🧹 Reset
                            </button>

                            <button
                                className="btn btn-sm btn-outline-primary px-3"
                                onClick={() => onFilterByTime(minTime)}
                                disabled={loading || !minTime}
                            >
                                🔍 Filter
                            </button>

                            <button
                                className="btn btn-sm btn-primary px-3 d-flex align-items-center gap-2"
                                onClick={handleSync}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm" />
                                        <span>Syncing...</span>
                                    </>
                                ) : (
                                    <><span>🔄</span> Sync Data</>
                                )}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FilterBar;