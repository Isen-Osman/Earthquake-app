import { useCallback, useEffect, useState } from "react";
import earthquakeRepository from "../repository/earthquakeRepository.js";

const initialState = {
    earthquakes: [],
    loading: true,
    error: null,
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
            });
        } catch (error) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: error.response?.data?.message || error.message,
            }));
        }
    }, []);

    const fetchEarthquakes = useCallback(() => {
        return request(() => earthquakeRepository.findAll());
    }, [request]);

    const onFilterByTime = useCallback((minTime) => {
        if (!minTime) return;

        const formatted = minTime.includes("T")
            ? minTime
            : `${minTime}T00:00:00Z`;

        return request(() => earthquakeRepository.findByTime(formatted));
    }, [request]);

    const onSync = useCallback((minMagnitude = 2.0, minTime = null) => {
        const formattedTime =
            minTime && !minTime.includes("T")
                ? `${minTime}T00:00:00Z`
                : minTime;

        return request(() =>
            earthquakeRepository.sync(minMagnitude, formattedTime)
        ).then(() => fetchEarthquakes());
    }, [request, fetchEarthquakes]);

    const onDelete = useCallback((id) => {
        return request(() =>
            earthquakeRepository.delete(id)
        ).then(() => fetchEarthquakes());
    }, [request, fetchEarthquakes]);

    useEffect(() => {
        fetchEarthquakes();
    }, [fetchEarthquakes]);

    return {
        ...state,
        fetchEarthquakes,
        onFilterByTime,
        onSync,
        onDelete,
    };
};

export default useEarthquakes;