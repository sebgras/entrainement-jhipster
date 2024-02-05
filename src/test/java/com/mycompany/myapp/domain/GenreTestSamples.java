package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class GenreTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Genre getGenreSample1() {
        return new Genre().id(1L).name("name1");
    }

    public static Genre getGenreSample2() {
        return new Genre().id(2L).name("name2");
    }

    public static Genre getGenreRandomSampleGenerator() {
        return new Genre().id(longCount.incrementAndGet()).name(UUID.randomUUID().toString());
    }
}
