package us.com.rclabs.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import us.com.rclabs.app.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
