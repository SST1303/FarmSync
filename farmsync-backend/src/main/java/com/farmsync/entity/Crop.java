package com.farmsync.entity;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;


//No-argument constructor required by JPA/Hibernate

@Entity
public class Crop {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String cropName;
	
	private Double area;
	
	private LocalDate startDate;
	
	private LocalDate expectedHarvestDate;
	
	private String status;
	
	
	//no-argument constructor-its important when create entity object for JPA/Hibernate
	public Crop() {
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCropName() {
		return cropName;
	}

	public void setCropName(String cropName) {
		this.cropName = cropName;
	}

	public Double getArea() {
		return area;
	}

	public void setArea(Double area) {
		this.area = area;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getExpectedHarvestDate() {
		return expectedHarvestDate;
	}

	public void setExpectedHarvestDate(LocalDate expectedHarvestDate) {
		this.expectedHarvestDate = expectedHarvestDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	@JsonIgnore
	public User getUser() {
	    return user;
	}

	public void setUser(User user) {
	    this.user = user;
	}
	
}
