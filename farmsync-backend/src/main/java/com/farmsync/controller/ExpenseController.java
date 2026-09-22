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

import com.farmsync.entity.Expense;
import com.farmsync.entity.Crop;
import com.farmsync.entity.User;
import com.farmsync.service.CropService;
import com.farmsync.service.ExpenseService;
import com.farmsync.service.UserService;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;
    private final CropService cropService;
    private final UserService userService;

    public ExpenseController(
            ExpenseService expenseService,
            CropService cropService,
            UserService userService) {

        this.expenseService = expenseService;
        this.cropService = cropService;
        this.userService = userService;
    }

    // CREATE
    @PostMapping
    public Expense saveExpense(
            @RequestBody Expense expense,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userService.getUserByEmail(email);

        Crop crop = cropService.getCropByIdAndUserId(
                expense.getCrop().getId(),
                user.getId()
        );

        if (crop == null) {
            return null;
        }

        expense.setCrop(crop);

        return expenseService.saveExpense(expense);
    }

    // READ ALL
    @GetMapping
    public List<Expense> getAllExpenses(
            Authentication authentication) {

        String email = authentication.getName();

        User user = userService.getUserByEmail(email);

        return expenseService.getExpensesByUserId(
                user.getId()
        );
    }

    // READ BY ID
    @GetMapping("/{id}")
    public Expense getExpenseById(
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userService.getUserByEmail(email);

        return expenseService.getExpenseByIdAndUserId(
                id,
                user.getId()
        );
    }

    // UPDATE
    @PutMapping("/{id}")
    public Expense updateExpense(
            @PathVariable Long id,
            @RequestBody Expense expense,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userService.getUserByEmail(email);

        Crop crop = cropService.getCropByIdAndUserId(
                expense.getCrop().getId(),
                user.getId()
        );

        if (crop == null) {
            return null;
        }

        expense.setCrop(crop);

        return expenseService.updateExpense(
                id,
                expense,
                user.getId()
        );
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteExpense(
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userService.getUserByEmail(email);

        expenseService.deleteExpense(
                id,
                user.getId()
        );
    }
}