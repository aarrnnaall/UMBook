package umbook.com.ar.repository;

import umbook.com.ar.domain.Friends;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Friends entity.
 */
@Repository
public interface FriendsRepository extends JpaRepository<Friends, Long> {

    @Query(value = "select distinct friends from Friends friends left join fetch friends.friends",
        countQuery = "select count(distinct friends) from Friends friends")
    Page<Friends> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct friends from Friends friends left join fetch friends.friends")
    List<Friends> findAllWithEagerRelationships();

    @Query("select friends from Friends friends left join fetch friends.friends where friends.id =:id")
    Optional<Friends> findOneWithEagerRelationships(@Param("id") Long id);
}
