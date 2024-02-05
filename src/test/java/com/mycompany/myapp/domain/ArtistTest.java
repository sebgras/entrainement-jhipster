package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.AlbumTestSamples.*;
import static com.mycompany.myapp.domain.ArtistTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ArtistTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Artist.class);
        Artist artist1 = getArtistSample1();
        Artist artist2 = new Artist();
        assertThat(artist1).isNotEqualTo(artist2);

        artist2.setId(artist1.getId());
        assertThat(artist1).isEqualTo(artist2);

        artist2 = getArtistSample2();
        assertThat(artist1).isNotEqualTo(artist2);
    }

    @Test
    void albumTest() throws Exception {
        Artist artist = getArtistRandomSampleGenerator();
        Album albumBack = getAlbumRandomSampleGenerator();

        artist.setAlbum(albumBack);
        assertThat(artist.getAlbum()).isEqualTo(albumBack);
        assertThat(albumBack.getArtist()).isEqualTo(artist);

        artist.album(null);
        assertThat(artist.getAlbum()).isNull();
        assertThat(albumBack.getArtist()).isNull();
    }
}
