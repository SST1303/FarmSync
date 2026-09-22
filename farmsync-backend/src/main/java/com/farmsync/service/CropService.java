package com.farmsync.service;

import java.util.List;

import com.farmsync.entity.Crop;

public interface CropService {

    Crop saveCrop(Crop crop);

    Crop getCropByIdAndUserId(Long cropId, Long userId);

    Crop updateCrop(Long cropId, Crop crop, Long userId);

    void deleteCrop(Long cropId, Long userId);

    List<Crop> getCropsByUserId(Long userId);
}