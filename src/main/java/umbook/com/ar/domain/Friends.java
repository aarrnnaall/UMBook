package umbook.com.ar.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Friends.
 */
@Entity
@Table(name = "friends")
public class Friends implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @ManyToMany(cascade=CascadeType.ALL)
    @JoinTable(name = "friends_friends",
               joinColumns = @JoinColumn(name = "friends_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "friends_id", referencedColumnName = "id"))
    private Set<User> friends = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public Friends user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<User> getFriends() {
        return friends;
    }

    public Friends friends(Set<User> users) {
        this.friends = users;
        return this;
    }

    public Friends addFriends(User user) {
        this.friends.add(user);
        return this;
    }

    public Friends removeFriends(User user) {
        this.friends.remove(user);
        return this;
    }

    public void setFriends(Set<User> users) {
        this.friends = users;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Friends)) {
            return false;
        }
        return id != null && id.equals(((Friends) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Friends{" +
            "id=" + getId() +
            "}";
    }
}
