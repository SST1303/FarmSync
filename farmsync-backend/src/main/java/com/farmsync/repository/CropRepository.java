package com.farmsync.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.farmsync.entity.Crop;

public interface CropRepository extends JpaRepository<Crop, Long>{

	List<Crop> findByUserId(Long userId);
	
	Optional<Crop> findByIdAndUserId(Long id, Long userId);
}
