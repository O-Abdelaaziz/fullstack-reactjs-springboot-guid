package com.usermanagementsystem.server.payloads.responses;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
public class JwtResponse {
    private String token;
//    private String type = "Bearer";
    private String uid;
    private String username;
    private String email;
    private Boolean isEnabled;
    private Boolean isNotLocked;
    private List<String> roles;
}
