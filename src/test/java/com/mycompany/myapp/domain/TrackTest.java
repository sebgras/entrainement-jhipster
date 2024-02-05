package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.AlbumTestSamples.*;
import static com.mycompany.myapp.domain.TrackTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TrackTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Track.class);
        Track track1 = getTrackSample1();
        Track track2 = new Track();
        assertThat(track1).isNotEqualTo(track2);

        track2.setId(track1.getId());
        assertThat(track1).isEqualTo(track2);

        track2 = getTrackSample2();
        assertThat(track1).isNotEqualTo(track2);
    }

    @Test
    void albumTest() throws Exception {
        Track track = getTrackRandomSampleGenerator();
        Album albumBack = getAlbumRandomSampleGenerator();

        track.setAlbum(albumBack);
        assertThat(track.getAlbum()).isEqualTo(albumBack);

        track.album(null);
        assertThat(track.getAlbum()).isNull();
    }
}
