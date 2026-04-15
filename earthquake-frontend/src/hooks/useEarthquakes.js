import { useCallback, useEffect, useState } from "react";
import earthquakeRepository from "../repository/earthquakeRepository.js";

const initialState = {
    earthquakes: [],
    loading: true,
    error: null,
    lastUpdated: null,
};

const useEarthquakes = () => {
    const [state, setState] = useState(initialState);

    const request = useCallback(async (apiCall) => {
        setState(prev => ({ ...prev, loading: true, error: null }));

        try {
            const response = await apiCall();
            setState({
                earthquakes: response.data,
                loading: false,
                error: null,
                lastUpdated: new Date().toISOString(),
            });
            return response.data;
        } catch (error) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: error.response?.data?.message || error.message,
                lastUpdated: prev.lastUpdated,
            }));
            throw error;
        }
    }, []);

    const fetchEarthquakes = useCallback(() => {
        return request(() => earthquakeRepository.findAll());
    }, [request]);

    const onFilterByTime = useCallback((minTime) => {
        if (!minTime) return fetchEarthquakes();

        const formatted = minTime.includes("T")
            ? minTime
            : `${minTime}T00:00:00Z`;

        return request(() => earthquakeRepository.findByTime(formatted));
    }, [request, fetchEarthquakes]);

    const onSync = useCallback(async (minMagnitude = 2.0, minTime = null) => {
        const formattedTime =
            minTime && !minTime.includes("T")
                ? `${minTime}T00:00:00Z`
                : minTime;

        await request(() => earthquakeRepository.sync(minMagnitude, formattedTime));
    }, [request]);

    const onDelete = useCallback(async (id) => {
        await request(() => earthquakeRepository.delete(id));
        await fetchEarthquakes();
    }, [request, fetchEarthquakes]);

    useEffect(() => {
        fetchEarthquakes();
    }, [fetchEarthquakes]);

    const onReset = useCallback(() => {
        fetchEarthquakes();
    }, [fetchEarthquakes]);

    return {
        ...state,
        fetchEarthquakes,
        onFilterByTime,
        onSync,
        onDelete,
        onReset,
    };
};

export default useEarthquakes;