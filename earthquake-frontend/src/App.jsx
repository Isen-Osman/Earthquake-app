import React from 'react';
import useEarthquakes from './hooks/useEarthquakes.js';
import FilterBar from './ui/FilterBar.jsx';

import EarthquakeTable from "./ui/EarthquakeTable.jsx";
import LoadingSpinner from "./ui/LoadingSpinner.jsx";
import ErrorMessage from "./ui/ErrorMessage.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
    const {
        earthquakes,
        loading,
        error,
        onSync,
        onDelete,
        onFilterByTime,
        refetch,
    } = useEarthquakes();

    return (
        <div className="min-vh-100 bg-light py-5">
            <div className="container">

                {/* 1. Header Section */}
                <AppHeader count={earthquakes.length} />

                {/* 2. Error Handling */}
                {error && (
                    <div className="mb-4">
                        <ErrorMessage message={error} onRetry={refetch} />
                    </div>
                )}

                {/* 3. Controls Section */}
                <FilterBar
                    onSync={onSync}
                    onFilterByTime={onFilterByTime}
                    loading={loading}
                />

                {/* 4. Main Content Area */}
                <main className="mt-4">
                    {loading ? (
                        <div className="text-center py-5">
                            <LoadingSpinner />
                            <p className="text-muted mt-2">Fetching seismic data...</p>
                        </div>
                    ) : earthquakes.length > 0 ? (
                        <EarthquakeTable
                            earthquakes={earthquakes}
                            onDelete={onDelete}
                        />
                    ) : (
                        <div className="card border-0 shadow-sm p-5 text-center">
                            <div className="display-1 text-muted mb-3">📍</div>
                            <h4 className="text-secondary">No Data Found</h4>
                            <p className="text-muted">Adjust your filters or sync with the USGS database.</p>
                            <button className="btn btn-primary btn-sm mx-auto" onClick={refetch}>
                                Try Refreshing
                            </button>
                        </div>
                    )}
                </main>

                <AppFooter />
            </div>
        </div>
    );
};

const AppHeader = ({ count }) => (
    <header className="row align-items-center mb-5">
        <div className="col-md-6 text-center text-md-start">
            <h1 className="fw-bold mb-0">
                <span className="text-danger"></span> Earthquake Monitor
            </h1>
            <p className="text-muted mb-0 small">Real-time USGS Seismic Activity</p>
        </div>
        <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
            <div className="badge bg-white text-dark border shadow-sm p-2 px-3">
                <span className="text-primary fw-bold">{count}</span> Earthquakes Listed
            </div>
        </div>
    </header>
);

const AppFooter = () => (
    <footer className="text-center mt-5 py-4 border-top">
        <p className="text-muted small mb-0">
            &copy; {new Date().getFullYear()} • Data provided by
            <a href="https://earthquake.usgs.gov/" className="ms-1 text-decoration-none" target="_blank" rel="noreferrer">
                USGS Hazards Program
            </a>
        </p>
    </footer>
);

export default App;