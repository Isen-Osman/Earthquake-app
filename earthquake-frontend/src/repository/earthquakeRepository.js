import axiosInstance from "../axios/axios.js";

const earthquakeRepository = {
    findAll: async () => {
        return await axiosInstance.get('/earthquakes')
    },
    sync: async (minMagnitude = 2.0, minTime = null) => {
        const params = { minMagnitude }
        if (minTime) params.minTime = minTime
        return await axiosInstance.post('/earthquakes/sync', null, { params })
    },
    findByMagnitude: async (minMagnitude) => {
        return await axiosInstance.get('/earthquakes/filter/magnitude', {
            params: { minMagnitude }
        })
    },
    findByTime: async (minTime) => {
        return await axiosInstance.get('/earthquakes/filter/time', {
            params: { minTime }
        })
    },
    delete: async (id) => {
        return await axiosInstance.delete(`/earthquakes/${id}`)
    },
};

export default earthquakeRepository;