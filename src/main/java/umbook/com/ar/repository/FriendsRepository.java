package umbook.com.ar.repository;

import umbook.com.ar.domain.Friends;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Friends entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FriendsRepository extends JpaRepository<Friends, Long> {

    @Query("select friends from Friends friends where friends.friends.login = ?#{principal.username}")
    List<Friends> findByFriendsIsCurrentUser();
}
