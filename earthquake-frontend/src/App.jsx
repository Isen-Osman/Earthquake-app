import React from "react";
import UseEarthquakes from "./hooks/UseEarthquakes.js";
import FilterBar from "./ui/FilterBar.jsx";
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
    } = UseEarthquakes();

    const renderContent = () => {
        if (loading) return <LoadingSpinner />;

        if (earthquakes.length === 0) {
            return (
                <div className="alert alert-info text-center">
                    No earthquake data available. Click "Sync Data" to fetch.
                </div>
            );
        }

        return (
            <EarthquakeTable
                earthquakes={earthquakes}
                onDelete={onDelete}
            />
        );
    };

    return (
        <div className="container-fluid py-4">
            <AppHeader />

            {error && (
                <ErrorMessage message={error} onRetry={refetch} />
            )}

            <FilterBar
                onSync={onSync}
                onFilterByTime={onFilterByTime}
                loading={loading}
            />

            {renderContent()}

            <AppFooter />
        </div>
    );
};

const AppHeader = () => (
    <header className="text-center mb-4">
        <h1>Earthquake Monitor</h1>
        <p className="text-muted">
            USGS Data • Magnitude ≥ 2.0
        </p>
    </header>
);

const AppFooter = () => (
    <footer className="text-center mt-4 text-muted small">
        Data source: USGS Earthquake Hazards Program
    </footer>
);

export default App;