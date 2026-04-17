package com.codeit.earthquake;

import com.codeit.earthquake.dto.UsgsResponse;
import com.codeit.earthquake.model.Earthquake;
import com.codeit.earthquake.repository.EarthquakeRepository;
import com.codeit.earthquake.service.EarthquakeService;
import com.codeit.earthquake.service.UsgsApiClient;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import java.time.Instant;
import java.util.List;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.mockito.Mockito.when;

@SpringBootTest
class EarthquakeServiceIntegrationTest {

    @Autowired
    private EarthquakeService earthquakeService;

    @Autowired
    private EarthquakeRepository repository;

    @MockitoBean
    private UsgsApiClient usgsApiClient;

    @BeforeEach
    void setUp() {
        repository.deleteAll();
    }

    // 1. SYNC (most important test)
    @Test
    void syncEarthquakes_shouldFetchFilterAndSaveData() {
        UsgsResponse mockResponse = createMockUsgsResponse();
        when(usgsApiClient.fetchEarthquakes()).thenReturn(mockResponse);

        List<Earthquake> result = earthquakeService.syncEarthquakes(5.0,
                Instant.parse("2023-01-01T00:00:00Z"));

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getExternalId()).isEqualTo("heavy_quake");
        assertThat(repository.count()).isEqualTo(1);
    }

    // 2. GET ALL
    @Test
    void getAll_shouldReturnAllSavedEarthquakes() {
        repository.saveAll(List.of(
                createEarthquake("e1", 4.5),
                createEarthquake("e2", 5.5)
        ));

        List<Earthquake> result = earthquakeService.getAll();

        assertThat(result).hasSize(2);
    }

    // 3. FILTER (magnitude OR time - only one)
    @Test
    void getByMagnitude_shouldReturnFilteredEarthquakes() {
        repository.saveAll(List.of(
                createEarthquake("e1", 4.5),
                createEarthquake("e2", 5.5)
        ));

        List<Earthquake> result = earthquakeService.getByMagnitude(5.0);

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getExternalId()).isEqualTo("e2");
    }

    // 4. DELETE
    @Test
    void deleteById_shouldRemoveEarthquake() {
        Earthquake saved = repository.save(createEarthquake("e1", 4.5));

        boolean deleted = earthquakeService.deleteById(saved.getId());

        assertThat(deleted).isTrue();
        assertThat(repository.existsById(saved.getId())).isFalse();
    }

    // ---------------- HELPERS ----------------

    private Earthquake createEarthquake(String id, double mag) {
        return Earthquake.builder()
                .externalId(id)
                .place("Test Place")
                .magnitude(mag)
                .time(Instant.now())
                .build();
    }

    private UsgsResponse createMockUsgsResponse() {
        UsgsResponse response = new UsgsResponse();

        UsgsResponse.Feature f1 = new UsgsResponse.Feature();
        f1.setId("light_quake");
        UsgsResponse.Properties p1 = new UsgsResponse.Properties();
        p1.setMag(4.0);
        p1.setPlace("Small Place");
        p1.setTime(Instant.parse("2023-01-01T12:00:00Z").toEpochMilli());
        f1.setProperties(p1);

        UsgsResponse.Feature f2 = new UsgsResponse.Feature();
        f2.setId("heavy_quake");
        UsgsResponse.Properties p2 = new UsgsResponse.Properties();
        p2.setMag(6.0);
        p2.setPlace("Big Place");
        p2.setTime(Instant.parse("2023-01-02T12:00:00Z").toEpochMilli());
        f2.setProperties(p2);

        response.setFeatures(List.of(f1, f2));
        return response;
    }
}
