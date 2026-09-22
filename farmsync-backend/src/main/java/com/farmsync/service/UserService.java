package com.farmsync.service;

import com.farmsync.entity.User;

public interface UserService {

    User registerUser(User user);

    User getUserByEmail(String email);
    
 
}