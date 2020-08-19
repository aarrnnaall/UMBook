package umbook.com.ar.web.rest;

import umbook.com.ar.domain.Friend;
import umbook.com.ar.repository.FriendRepository;
import umbook.com.ar.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link umbook.com.ar.domain.Friend}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FriendResource {

    private final Logger log = LoggerFactory.getLogger(FriendResource.class);

    private static final String ENTITY_NAME = "friend";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FriendRepository friendRepository;

    public FriendResource(FriendRepository friendRepository) {
        this.friendRepository = friendRepository;
    }

    /**
     * {@code POST  /friends} : Create a new friend.
     *
     * @param friend the friend to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new friend, or with status {@code 400 (Bad Request)} if the friend has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/friends")
    public ResponseEntity<Friend> createFriend(@RequestBody Friend friend) throws URISyntaxException {
        log.debug("REST request to save Friend : {}", friend);
        if (friend.getId() != null) {
            throw new BadRequestAlertException("A new friend cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Friend result = friendRepository.save(friend);
        return ResponseEntity.created(new URI("/api/friends/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /friends} : Updates an existing friend.
     *
     * @param friend the friend to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated friend,
     * or with status {@code 400 (Bad Request)} if the friend is not valid,
     * or with status {@code 500 (Internal Server Error)} if the friend couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/friends")
    public ResponseEntity<Friend> updateFriend(@RequestBody Friend friend) throws URISyntaxException {
        log.debug("REST request to update Friend : {}", friend);
        if (friend.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Friend result = friendRepository.save(friend);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, friend.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /friends} : get all the friends.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of friends in body.
     */
    @GetMapping("/friends")
    public List<Friend> getAllFriends(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Friends");
        return friendRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /friends/:id} : get the "id" friend.
     *
     * @param id the id of the friend to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the friend, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/friends/{id}")
    public ResponseEntity<Friend> getFriend(@PathVariable Long id) {
        log.debug("REST request to get Friend : {}", id);
        Optional<Friend> friend = friendRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(friend);
    }

    /**
     * {@code DELETE  /friends/:id} : delete the "id" friend.
     *
     * @param id the id of the friend to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/friends/{id}")
    public ResponseEntity<Void> deleteFriend(@PathVariable Long id) {
        log.debug("REST request to delete Friend : {}", id);

        friendRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
