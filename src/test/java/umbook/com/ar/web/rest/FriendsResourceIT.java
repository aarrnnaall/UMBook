package umbook.com.ar.web.rest;

import umbook.com.ar.UmBookApp;
import umbook.com.ar.domain.Friends;
import umbook.com.ar.repository.FriendsRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link FriendsResource} REST controller.
 */
@SpringBootTest(classes = UmBookApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class FriendsResourceIT {

    @Autowired
    private FriendsRepository friendsRepository;

    @Mock
    private FriendsRepository friendsRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFriendsMockMvc;

    private Friends friends;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Friends createEntity(EntityManager em) {
        Friends friends = new Friends();
        return friends;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Friends createUpdatedEntity(EntityManager em) {
        Friends friends = new Friends();
        return friends;
    }

    @BeforeEach
    public void initTest() {
        friends = createEntity(em);
    }

    @Test
    @Transactional
    public void createFriends() throws Exception {
        int databaseSizeBeforeCreate = friendsRepository.findAll().size();
        // Create the Friends
        restFriendsMockMvc.perform(post("/api/friends")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(friends)))
            .andExpect(status().isCreated());

        // Validate the Friends in the database
        List<Friends> friendsList = friendsRepository.findAll();
        assertThat(friendsList).hasSize(databaseSizeBeforeCreate + 1);
        Friends testFriends = friendsList.get(friendsList.size() - 1);
    }

    @Test
    @Transactional
    public void createFriendsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = friendsRepository.findAll().size();

        // Create the Friends with an existing ID
        friends.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFriendsMockMvc.perform(post("/api/friends")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(friends)))
            .andExpect(status().isBadRequest());

        // Validate the Friends in the database
        List<Friends> friendsList = friendsRepository.findAll();
        assertThat(friendsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFriends() throws Exception {
        // Initialize the database
        friendsRepository.saveAndFlush(friends);

        // Get all the friendsList
        restFriendsMockMvc.perform(get("/api/friends?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(friends.getId().intValue())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllFriendsWithEagerRelationshipsIsEnabled() throws Exception {
        when(friendsRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restFriendsMockMvc.perform(get("/api/friends?eagerload=true"))
            .andExpect(status().isOk());

        verify(friendsRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllFriendsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(friendsRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restFriendsMockMvc.perform(get("/api/friends?eagerload=true"))
            .andExpect(status().isOk());

        verify(friendsRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getFriends() throws Exception {
        // Initialize the database
        friendsRepository.saveAndFlush(friends);

        // Get the friends
        restFriendsMockMvc.perform(get("/api/friends/{id}", friends.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(friends.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingFriends() throws Exception {
        // Get the friends
        restFriendsMockMvc.perform(get("/api/friends/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFriends() throws Exception {
        // Initialize the database
        friendsRepository.saveAndFlush(friends);

        int databaseSizeBeforeUpdate = friendsRepository.findAll().size();

        // Update the friends
        Friends updatedFriends = friendsRepository.findById(friends.getId()).get();
        // Disconnect from session so that the updates on updatedFriends are not directly saved in db
        em.detach(updatedFriends);

        restFriendsMockMvc.perform(put("/api/friends")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedFriends)))
            .andExpect(status().isOk());

        // Validate the Friends in the database
        List<Friends> friendsList = friendsRepository.findAll();
        assertThat(friendsList).hasSize(databaseSizeBeforeUpdate);
        Friends testFriends = friendsList.get(friendsList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingFriends() throws Exception {
        int databaseSizeBeforeUpdate = friendsRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFriendsMockMvc.perform(put("/api/friends")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(friends)))
            .andExpect(status().isBadRequest());

        // Validate the Friends in the database
        List<Friends> friendsList = friendsRepository.findAll();
        assertThat(friendsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFriends() throws Exception {
        // Initialize the database
        friendsRepository.saveAndFlush(friends);

        int databaseSizeBeforeDelete = friendsRepository.findAll().size();

        // Delete the friends
        restFriendsMockMvc.perform(delete("/api/friends/{id}", friends.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Friends> friendsList = friendsRepository.findAll();
        assertThat(friendsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
