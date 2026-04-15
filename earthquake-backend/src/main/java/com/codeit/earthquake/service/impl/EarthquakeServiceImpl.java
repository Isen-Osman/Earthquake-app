package com.codeit.earthquake.service.impl;

import com.codeit.earthquake.dto.UsgsResponse;
import com.codeit.earthquake.model.Earthquake;
import com.codeit.earthquake.repository.EarthquakeRepository;
import com.codeit.earthquake.service.EarthquakeService;
import com.codeit.earthquake.service.UsgsApiClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class EarthquakeServiceImpl implements EarthquakeService {

    private final UsgsApiClient usgsApiClient;
    private final EarthquakeRepository repository;

    @Override
    public List<Earthquake> syncEarthquakes(Double minMagnitude, Instant minTime) {

        UsgsResponse response = usgsApiClient.fetchEarthquakes();

        if (response == null || response.getFeatures() == null) {
            return List.of();
        }

        repository.deleteAll();

        List<Earthquake> earthquakes = response.getFeatures().stream()
                .map(this::toEntity)
                .filter(e -> isValid(e, minMagnitude, minTime))
                .toList();

        return repository.saveAll(earthquakes);
    }

    @Override
    public List<Earthquake> getAll() {
        return repository.findAll();
    }

    @Override
    public List<Earthquake> getByMagnitude(Double minMag) {
        return repository.findByMagnitudeGreaterThan(minMag);
    }

    @Override
    public List<Earthquake> getByTime(Instant minTime) {
        return repository.findByTimeAfter(minTime);
    }

    @Override
    public boolean deleteById(Long id) {
        if (!repository.existsById(id)) return false;
        repository.deleteById(id);
        return true;
    }

    // ---------------- SIMPLE HELPERS ----------------

    private boolean isValid(Earthquake e, Double minMag, Instant minTime) {
        boolean magOk = minMag == null || e.getMagnitude() >= minMag;
        boolean timeOk = minTime == null || e.getTime().isAfter(minTime);
        return magOk && timeOk;
    }

    private Earthquake toEntity(UsgsResponse.Feature f) {
        var p = f.getProperties();
        var c = f.getGeometry().getCoordinates();

        return Earthquake.builder()
                .externalId(f.getId())
                .title(p.getTitle())
                .place(p.getPlace())
                .magnitude(p.getMag())
                .magType(p.getMagType())
                .time(Instant.ofEpochMilli(p.getTime()))
                .longitude(c.get(0))
                .latitude(c.get(1))
                .depth(c.get(2))
                .build();
    }
}