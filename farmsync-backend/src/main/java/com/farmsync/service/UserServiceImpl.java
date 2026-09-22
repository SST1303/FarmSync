package com.farmsync.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.farmsync.entity.User;
import com.farmsync.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User registerUser(User user) {

        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        user.setRole("USER");

        return userRepository.save(user);
    }

    @Override
    public User getUserByEmail(String email) {

        return userRepository.findByEmail(email)
                .orElse(null);
    }
    
  
    
  
}