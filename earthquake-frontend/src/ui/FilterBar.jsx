import React, {useState} from 'react';

const FilterBar = ({ onSync, onFilterByTime, loading }) => {
    const [minMagnitude, setMinMagnitude] = useState(2.0);
    const [minTime, setMinTime] = useState('');

    const handleSync = () => {
        onSync(minMagnitude, minTime);
    };

    const handleFilterByTime = () => {
        onFilterByTime(minTime);
    };

    return (
        <div className="d-flex gap-3 align-items-center flex-wrap mb-3 p-3 bg-light rounded">
            <div className="d-flex align-items-center gap-2">
                <label className="form-label mb-0">Min Magnitude:</label>
                <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    className="form-control"
                    style={{ width: '100px' }}
                    value={minMagnitude}
                    onChange={(e) => setMinMagnitude(parseFloat(e.target.value) || 0)}
                    disabled={loading}
                />
            </div>

            <div className="d-flex align-items-center gap-2">
                <label className="form-label mb-0">Min Time:</label>
                <input
                    type="date"
                    className="form-control"
                    style={{ width: '150px' }}
                    value={minTime}
                    onChange={(e) => setMinTime(e.target.value)}
                    disabled={loading}
                />
            </div>

            <div className="d-flex gap-2">
                <button className="btn btn-primary"
                        onClick={handleSync}
                        disabled={loading}>
                    {loading ? (
                        <span className="spinner-border spinner-border-sm" role="status" />
                    ) : 'Sync Data'}
                </button>
                <button className="btn btn-outline-secondary"
                        onClick={handleFilterByTime}
                        disabled={loading || !minTime}>
                    Filter by Time
                </button>
            </div>
        </div>
    );
};

export default FilterBar;