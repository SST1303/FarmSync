package com.farmsync.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.farmsync.entity.Expense;
import com.farmsync.repository.ExpenseRepository;

@Service
public class ExpenseServiceImpl implements ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseServiceImpl(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    @Override
    public Expense saveExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    @Override
    public Expense getExpenseByIdAndUserId(
            Long expenseId,
            Long userId) {

        return expenseRepository
                .findByIdAndCropUserId(expenseId, userId)
                .orElse(null);
    }

    @Override
    public List<Expense> getExpensesByUserId(Long userId) {

        return expenseRepository.findByCropUserId(userId);
    }

    @Override
    public Expense updateExpense(
            Long expenseId,
            Expense expense,
            Long userId) {

        Expense existingExpense = expenseRepository
                .findByIdAndCropUserId(expenseId, userId)
                .orElse(null);

        if (existingExpense == null) {
            return null;
        }

        existingExpense.setExpenseType(
                expense.getExpenseType()
        );

        existingExpense.setAmount(
                expense.getAmount()
        );

        existingExpense.setExpenseDate(
                expense.getExpenseDate()
        );

        existingExpense.setDescription(
                expense.getDescription()
        );

        existingExpense.setCrop(
                expense.getCrop()
        );

        return expenseRepository.save(existingExpense);
    }

    @Override
    public void deleteExpense(
            Long expenseId,
            Long userId) {

        Expense existingExpense = expenseRepository
                .findByIdAndCropUserId(expenseId, userId)
                .orElse(null);

        if (existingExpense != null) {
            expenseRepository.delete(existingExpense);
        }
    }
}