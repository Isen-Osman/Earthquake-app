package com.codeit.earthquake.service;

import com.codeit.earthquake.dto.UsgsResponse;
import com.codeit.earthquake.exception.ApiException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.Duration;

@Service
@Slf4j
@RequiredArgsConstructor
public class UsgsApiClient {

    private final WebClient webClient;

    @Value("${usgs.api.url}")
    private String usgsApiUrl;

    @Value("${usgs.api.timeout:30s}")
    private Duration apiTimeout;

    public UsgsResponse fetchEarthquakes() {
        try {
            log.debug("Fetching USGS data from: {}", usgsApiUrl);

            UsgsResponse response = webClient
                    .get()
                    .uri(usgsApiUrl)
                    .retrieve()
                    .bodyToMono(UsgsResponse.class)
                    .timeout(apiTimeout)
                    .block();

            if (response == null || response.getFeatures() == null) {
                throw new ApiException("Empty response from USGS API");
            }

            return response;

        } catch (ApiException e) {
            throw e;
        } catch (Exception e) {
            log.error("Error while fetching USGS data: {}", e.getMessage(), e);
            throw new ApiException("Failed to fetch earthquake data from USGS", e);
        }
    }
}