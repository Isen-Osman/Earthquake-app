package com.codeit.earthquake.service;


import com.codeit.earthquake.model.Earthquake;

import java.time.Instant;
import java.util.List;

public interface EarthquakeService {

     List<Earthquake> syncEarthquakes(Double minMagnitude, Instant minTime);

     List<Earthquake> getAll();

     List<Earthquake> getByMagnitude(Double minMag);

     List<Earthquake> getByTime(Instant minTime);

     boolean deleteById(Long id);

     void deleteAll();
}