package com.farmsync.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.farmsync.entity.Crop;
import com.farmsync.repository.CropRepository;

@Service
public class CropServiceImpl implements CropService {

    private final CropRepository cropRepository;

    public CropServiceImpl(CropRepository cropRepository) {
        this.cropRepository = cropRepository;
    }

    @Override
    public Crop saveCrop(Crop crop) {
        return cropRepository.save(crop);
    }

    @Override
    public Crop getCropByIdAndUserId(Long cropId, Long userId) {

        return cropRepository
                .findByIdAndUserId(cropId, userId)
                .orElse(null);
    }

    @Override
    public Crop updateCrop(
            Long cropId,
            Crop crop,
            Long userId) {

        Crop existingCrop = cropRepository
                .findByIdAndUserId(cropId, userId)
                .orElse(null);

        if (existingCrop == null) {
            return null;
        }

        existingCrop.setCropName(crop.getCropName());
        existingCrop.setArea(crop.getArea());
        existingCrop.setStartDate(crop.getStartDate());
        existingCrop.setExpectedHarvestDate(
                crop.getExpectedHarvestDate()
        );
        existingCrop.setStatus(crop.getStatus());

        return cropRepository.save(existingCrop);
    }

    @Override
    public void deleteCrop(Long cropId, Long userId) {

        Crop existingCrop = cropRepository
                .findByIdAndUserId(cropId, userId)
                .orElse(null);

        if (existingCrop != null) {
            cropRepository.delete(existingCrop);
        }
    }

    @Override
    public List<Crop> getCropsByUserId(Long userId) {
        return cropRepository.findByUserId(userId);
    }
}