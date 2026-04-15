package com.codeit.earthquake.web;

import com.codeit.earthquake.model.Earthquake;
import com.codeit.earthquake.service.EarthquakeService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/v1/earthquakes")
@RequiredArgsConstructor
public class EarthquakeController {

    private final EarthquakeService service;

    @PostMapping("/sync")
    public ResponseEntity<List<Earthquake>> sync(
            @RequestParam(required = false, defaultValue = "2.0") Double minMagnitude,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant minTime) {
        return ResponseEntity.ok(service.syncEarthquakes(minMagnitude, minTime));
    }

    @GetMapping
    public ResponseEntity<List<Earthquake>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/filter/magnitude")
    public ResponseEntity<List<Earthquake>> filterByMag(@RequestParam Double minMagnitude) {
        return ResponseEntity.ok(service.getByMagnitude(minMagnitude));
    }

    @GetMapping("/filter/time")
    public ResponseEntity<List<Earthquake>> filterByTime(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant minTime) {
        return ResponseEntity.ok(service.getByTime(minTime));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return service.deleteById(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/all")
    public ResponseEntity<Void> deleteAll() {
        service.deleteAll();
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Earthquake API is running");
    }
}
