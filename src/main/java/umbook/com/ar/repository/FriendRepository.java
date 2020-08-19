package umbook.com.ar.repository;

import umbook.com.ar.domain.Friend;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Friend entity.
 */
@Repository
public interface FriendRepository extends JpaRepository<Friend, Long> {

    @Query(value = "select distinct friend from Friend friend left join fetch friend.friends",
        countQuery = "select count(distinct friend) from Friend friend")
    Page<Friend> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct friend from Friend friend left join fetch friend.friends")
    List<Friend> findAllWithEagerRelationships();

    @Query("select friend from Friend friend left join fetch friend.friends where friend.id =:id")
    Optional<Friend> findOneWithEagerRelationships(@Param("id") Long id);
}
