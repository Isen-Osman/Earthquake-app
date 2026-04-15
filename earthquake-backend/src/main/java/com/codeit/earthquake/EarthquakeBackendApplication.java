package com.codeit.earthquake;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.client.WebClient;

@SpringBootApplication
public class EarthquakeBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(EarthquakeBackendApplication.class, args);
    }

}
