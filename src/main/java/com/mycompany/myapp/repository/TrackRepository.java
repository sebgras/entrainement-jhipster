package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Track;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Track entity.
 */
@Repository
public interface TrackRepository extends JpaRepository<Track, Long> {
    default Optional<Track> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Track> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Track> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(value = "select track from Track track left join fetch track.album", countQuery = "select count(track) from Track track")
    Page<Track> findAllWithToOneRelationships(Pageable pageable);

    @Query("select track from Track track left join fetch track.album")
    List<Track> findAllWithToOneRelationships();

    @Query("select track from Track track left join fetch track.album where track.id =:id")
    Optional<Track> findOneWithToOneRelationships(@Param("id") Long id);
}
