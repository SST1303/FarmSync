package com.farmsync.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.farmsync.entity.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByCropUserId(Long userId);

    Optional<Expense> findByIdAndCropUserId(Long expenseId, Long userId);
}