package umbook.com.ar.web.rest;

import umbook.com.ar.domain.Friends;
import umbook.com.ar.repository.FriendsRepository;
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
 * REST controller for managing {@link umbook.com.ar.domain.Friends}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FriendsResource {

    private final Logger log = LoggerFactory.getLogger(FriendsResource.class);

    private static final String ENTITY_NAME = "friends";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FriendsRepository friendsRepository;

    public FriendsResource(FriendsRepository friendsRepository) {
        this.friendsRepository = friendsRepository;
    }

    /**
     * {@code POST  /friends} : Create a new friends.
     *
     * @param friends the friends to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new friends, or with status {@code 400 (Bad Request)} if the friends has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/friends")
    public ResponseEntity<Friends> createFriends(@RequestBody Friends friends) throws URISyntaxException {
        log.debug("REST request to save Friends : {}", friends);
        if (friends.getId() != null) {
            throw new BadRequestAlertException("A new friends cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Friends result = friendsRepository.save(friends);
        return ResponseEntity.created(new URI("/api/friends/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /friends} : Updates an existing friends.
     *
     * @param friends the friends to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated friends,
     * or with status {@code 400 (Bad Request)} if the friends is not valid,
     * or with status {@code 500 (Internal Server Error)} if the friends couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/friends")
    public ResponseEntity<Friends> updateFriends(@RequestBody Friends friends) throws URISyntaxException {
        log.debug("REST request to update Friends : {}", friends);
        if (friends.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Friends result = friendsRepository.save(friends);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, friends.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /friends} : get all the friends.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of friends in body.
     */
    @GetMapping("/friends")
    public List<Friends> getAllFriends() {
        log.debug("REST request to get all Friends");
        return friendsRepository.findAll();
    }

    /**
     * {@code GET  /friends/:id} : get the "id" friends.
     *
     * @param id the id of the friends to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the friends, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/friends/{id}")
    public ResponseEntity<Friends> getFriends(@PathVariable Long id) {
        log.debug("REST request to get Friends : {}", id);
        Optional<Friends> friends = friendsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(friends);
    }

    /**
     * {@code DELETE  /friends/:id} : delete the "id" friends.
     *
     * @param id the id of the friends to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/friends/{id}")
    public ResponseEntity<Void> deleteFriends(@PathVariable Long id) {
        log.debug("REST request to delete Friends : {}", id);

        friendsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
