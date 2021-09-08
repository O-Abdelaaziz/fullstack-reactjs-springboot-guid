package com.usermanagementsystem.server.models;

import com.usermanagementsystem.server.enums.UserRoleEnum;
import com.usermanagementsystem.server.models.common.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "roles")
public class Role extends BaseEntity {

    @Enumerated(EnumType.STRING)
    @Column(name = "name",length = 20)
    private UserRoleEnum name;

    @Column(name="description")
    private String description;
}
