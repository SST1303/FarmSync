package com.farmsync.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.farmsync.dto.LoginRequest;
import com.farmsync.dto.LoginResponse;
import com.farmsync.entity.User;
import com.farmsync.security.JwtUtil;
import com.farmsync.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(
            UserService userService,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil) {

        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {

        User existingUser =
                userService.getUserByEmail(user.getEmail());

        if (existingUser != null) {
            return ResponseEntity
                    .badRequest()
                    .body("Email already registered");
        }

        User savedUser = userService.registerUser(user);

        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(
            @RequestBody LoginRequest loginRequest) {

        User user = userService.getUserByEmail(
                loginRequest.getEmail()
        );

        if (user == null) {
            return ResponseEntity
                    .status(401)
                    .body("Invalid email or password");
        }

        boolean passwordMatches = passwordEncoder.matches(
                loginRequest.getPassword(),
                user.getPassword()
        );

        if (!passwordMatches) {
            return ResponseEntity
                    .status(401)
                    .body("Invalid email or password");
        }

        // Generate JWT token
        String token = jwtUtil.generateToken(user.getEmail());

        LoginResponse response = new LoginResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                token
        );

        return ResponseEntity.ok(response);
    }
}