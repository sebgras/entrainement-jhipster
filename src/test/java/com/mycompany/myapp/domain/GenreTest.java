package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.AlbumTestSamples.*;
import static com.mycompany.myapp.domain.GenreTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class GenreTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Genre.class);
        Genre genre1 = getGenreSample1();
        Genre genre2 = new Genre();
        assertThat(genre1).isNotEqualTo(genre2);

        genre2.setId(genre1.getId());
        assertThat(genre1).isEqualTo(genre2);

        genre2 = getGenreSample2();
        assertThat(genre1).isNotEqualTo(genre2);
    }

    @Test
    void albumTest() throws Exception {
        Genre genre = getGenreRandomSampleGenerator();
        Album albumBack = getAlbumRandomSampleGenerator();

        genre.setAlbum(albumBack);
        assertThat(genre.getAlbum()).isEqualTo(albumBack);
        assertThat(albumBack.getGenre()).isEqualTo(genre);

        genre.album(null);
        assertThat(genre.getAlbum()).isNull();
        assertThat(albumBack.getGenre()).isNull();
    }
}
