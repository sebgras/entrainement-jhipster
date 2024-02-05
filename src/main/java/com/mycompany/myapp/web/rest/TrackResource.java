package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Track;
import com.mycompany.myapp.repository.TrackRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Track}.
 */
@RestController
@RequestMapping("/api/tracks")
@Transactional
public class TrackResource {

    private final Logger log = LoggerFactory.getLogger(TrackResource.class);

    private static final String ENTITY_NAME = "track";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TrackRepository trackRepository;

    public TrackResource(TrackRepository trackRepository) {
        this.trackRepository = trackRepository;
    }

    /**
     * {@code POST  /tracks} : Create a new track.
     *
     * @param track the track to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new track, or with status {@code 400 (Bad Request)} if the track has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Track> createTrack(@Valid @RequestBody Track track) throws URISyntaxException {
        log.debug("REST request to save Track : {}", track);
        if (track.getId() != null) {
            throw new BadRequestAlertException("A new track cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Track result = trackRepository.save(track);
        return ResponseEntity
            .created(new URI("/api/tracks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tracks/:id} : Updates an existing track.
     *
     * @param id the id of the track to save.
     * @param track the track to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated track,
     * or with status {@code 400 (Bad Request)} if the track is not valid,
     * or with status {@code 500 (Internal Server Error)} if the track couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Track> updateTrack(@PathVariable(value = "id", required = false) final Long id, @Valid @RequestBody Track track)
        throws URISyntaxException {
        log.debug("REST request to update Track : {}, {}", id, track);
        if (track.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, track.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!trackRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Track result = trackRepository.save(track);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, track.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /tracks/:id} : Partial updates given fields of an existing track, field will ignore if it is null
     *
     * @param id the id of the track to save.
     * @param track the track to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated track,
     * or with status {@code 400 (Bad Request)} if the track is not valid,
     * or with status {@code 404 (Not Found)} if the track is not found,
     * or with status {@code 500 (Internal Server Error)} if the track couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Track> partialUpdateTrack(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Track track
    ) throws URISyntaxException {
        log.debug("REST request to partial update Track partially : {}, {}", id, track);
        if (track.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, track.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!trackRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Track> result = trackRepository
            .findById(track.getId())
            .map(existingTrack -> {
                if (track.getName() != null) {
                    existingTrack.setName(track.getName());
                }

                return existingTrack;
            })
            .map(trackRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, track.getId().toString())
        );
    }

    /**
     * {@code GET  /tracks} : get all the tracks.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tracks in body.
     */
    @GetMapping("")
    public ResponseEntity<List<Track>> getAllTracks(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        log.debug("REST request to get a page of Tracks");
        Page<Track> page;
        if (eagerload) {
            page = trackRepository.findAllWithEagerRelationships(pageable);
        } else {
            page = trackRepository.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /tracks/:id} : get the "id" track.
     *
     * @param id the id of the track to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the track, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Track> getTrack(@PathVariable("id") Long id) {
        log.debug("REST request to get Track : {}", id);
        Optional<Track> track = trackRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(track);
    }

    /**
     * {@code DELETE  /tracks/:id} : delete the "id" track.
     *
     * @param id the id of the track to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrack(@PathVariable("id") Long id) {
        log.debug("REST request to delete Track : {}", id);
        trackRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
