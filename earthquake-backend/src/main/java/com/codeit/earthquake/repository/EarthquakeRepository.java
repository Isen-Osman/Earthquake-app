package com.codeit.earthquake.repository;

import com.codeit.earthquake.model.Earthquake;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.Instant;
import java.util.Date;
import java.util.List;

public interface EarthquakeRepository extends JpaRepository<Earthquake, Long> {

    List<Earthquake> findByMagnitudeGreaterThan(Double magnitude);

    @Query("SELECT e FROM Earthquake e WHERE e.magnitude >= :minMag AND e.time >= :minTime")
    List<Earthquake> findByMagnitudeAndTime(Double minMag, Instant minTime);

    List<Earthquake> findByTimeAfter(Instant minTime);

    void deleteAll();
}
