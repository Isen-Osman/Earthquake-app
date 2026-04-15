import { createContext } from 'react';

export const EarthquakeContext = createContext({
    earthquakes: [],
    loading: false,
    error: null,
    filters: { minMagnitude: 2.0, minTime: null },
    syncEarthquakes: async () => {},
    deleteEarthquake: async () => {},
    setFilters: () => {},
});