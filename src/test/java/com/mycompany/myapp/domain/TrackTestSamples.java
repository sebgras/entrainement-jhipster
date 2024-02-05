package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class TrackTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Track getTrackSample1() {
        return new Track().id(1L).name("name1");
    }

    public static Track getTrackSample2() {
        return new Track().id(2L).name("name2");
    }

    public static Track getTrackRandomSampleGenerator() {
        return new Track().id(longCount.incrementAndGet()).name(UUID.randomUUID().toString());
    }
}
