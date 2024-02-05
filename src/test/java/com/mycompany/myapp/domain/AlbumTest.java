package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.AlbumTestSamples.*;
import static com.mycompany.myapp.domain.ArtistTestSamples.*;
import static com.mycompany.myapp.domain.GenreTestSamples.*;
import static com.mycompany.myapp.domain.TrackTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class AlbumTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Album.class);
        Album album1 = getAlbumSample1();
        Album album2 = new Album();
        assertThat(album1).isNotEqualTo(album2);

        album2.setId(album1.getId());
        assertThat(album1).isEqualTo(album2);

        album2 = getAlbumSample2();
        assertThat(album1).isNotEqualTo(album2);
    }

    @Test
    void artistTest() throws Exception {
        Album album = getAlbumRandomSampleGenerator();
        Artist artistBack = getArtistRandomSampleGenerator();

        album.setArtist(artistBack);
        assertThat(album.getArtist()).isEqualTo(artistBack);

        album.artist(null);
        assertThat(album.getArtist()).isNull();
    }

    @Test
    void genreTest() throws Exception {
        Album album = getAlbumRandomSampleGenerator();
        Genre genreBack = getGenreRandomSampleGenerator();

        album.setGenre(genreBack);
        assertThat(album.getGenre()).isEqualTo(genreBack);

        album.genre(null);
        assertThat(album.getGenre()).isNull();
    }

    @Test
    void trackTest() throws Exception {
        Album album = getAlbumRandomSampleGenerator();
        Track trackBack = getTrackRandomSampleGenerator();

        album.addTrack(trackBack);
        assertThat(album.getTracks()).containsOnly(trackBack);
        assertThat(trackBack.getAlbum()).isEqualTo(album);

        album.removeTrack(trackBack);
        assertThat(album.getTracks()).doesNotContain(trackBack);
        assertThat(trackBack.getAlbum()).isNull();

        album.tracks(new HashSet<>(Set.of(trackBack)));
        assertThat(album.getTracks()).containsOnly(trackBack);
        assertThat(trackBack.getAlbum()).isEqualTo(album);

        album.setTracks(new HashSet<>());
        assertThat(album.getTracks()).doesNotContain(trackBack);
        assertThat(trackBack.getAlbum()).isNull();
    }
}
