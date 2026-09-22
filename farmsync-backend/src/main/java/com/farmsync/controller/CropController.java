package com.farmsync.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.farmsync.entity.Crop;
import com.farmsync.entity.User;
import com.farmsync.service.CropService;
import com.farmsync.service.UserService;

@RestController
@RequestMapping("/api/crops")
public class CropController {

    private final CropService cropService;
    private final UserService userService;

    public CropController(
            CropService cropService,
            UserService userService) {

        this.cropService = cropService;
        this.userService = userService;
    }

    // CREATE
    @PostMapping
    public Crop saveCrop(
            @RequestBody Crop crop,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userService.getUserByEmail(email);

        crop.setUser(user);

        return cropService.saveCrop(crop);
    }

    // READ ALL
    @GetMapping
    public List<Crop> getAllCrops(
            Authentication authentication) {

        String email = authentication.getName();

        User user = userService.getUserByEmail(email);

        return cropService.getCropsByUserId(user.getId());
    }

    // READ BY ID
    @GetMapping("/{id}")
    public Crop getCropById(
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userService.getUserByEmail(email);

        return cropService.getCropByIdAndUserId(
                id,
                user.getId()
        );
    }

    // UPDATE
    @PutMapping("/{id}")
    public Crop updateCrop(
            @PathVariable Long id,
            @RequestBody Crop crop,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userService.getUserByEmail(email);

        return cropService.updateCrop(
                id,
                crop,
                user.getId()
        );
    }
    
    // DELETE
    @DeleteMapping("/{id}")
    public String deleteCrop(
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userService.getUserByEmail(email);

        cropService.deleteCrop(
                id,
                user.getId()
        );

        return "Crop deleted successfully";
    }
    
}