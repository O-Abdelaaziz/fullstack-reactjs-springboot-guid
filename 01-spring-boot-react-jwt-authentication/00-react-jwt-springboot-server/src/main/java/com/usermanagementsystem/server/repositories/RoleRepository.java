package com.usermanagementsystem.server.repositories;

import com.usermanagementsystem.server.enums.UserRoleEnum;
import com.usermanagementsystem.server.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(UserRoleEnum name);
}
