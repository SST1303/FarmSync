package com.farmsync.service;

import java.util.List;

import com.farmsync.entity.Expense;

public interface ExpenseService {

    Expense saveExpense(Expense expense);

    Expense getExpenseByIdAndUserId(Long expenseId, Long userId);

    Expense updateExpense(
            Long expenseId,
            Expense expense,
            Long userId
    );

    void deleteExpense(Long expenseId, Long userId);

    List<Expense> getExpensesByUserId(Long userId);
}