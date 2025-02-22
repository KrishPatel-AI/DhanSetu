"use client"
import React, { useState } from 'react';
import { Plus, ChevronDown, ChevronUp, Trash, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

const BudgetItem = ({ budget, onAddExpense, onDeleteExpense, onEditExpense }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState('');
  const [editingExpense, setEditingExpense] = useState(null);
  const progressValue = (budget.spent / budget.amount) * 100;

  const validateExpenseDate = (date) => {
    const expenseDate = new Date(date);
    const startDate = new Date(budget.startDate);
    const endDate = new Date(budget.endDate);
    return expenseDate >= startDate && expenseDate <= endDate;
  };

  const handleAddExpense = () => {
    if (!expenseAmount || !expenseDate) return;
    if (!validateExpenseDate(expenseDate)) {
      alert('Expense date must be within budget date range');
      return;
    }
    onAddExpense(budget.id, parseFloat(expenseAmount), expenseDate);
    setExpenseAmount('');
    setExpenseDate('');
    setEditingExpense(null);
  };

  const handleEdit = (expense, index) => {
    setExpenseAmount(expense.amount.toString());
    setExpenseDate(expense.date);
    setEditingExpense(index);
  };

  const handleUpdate = () => {
    if (!expenseAmount || !expenseDate) return;
    if (!validateExpenseDate(expenseDate)) {
      alert('Expense date must be within budget date range');
      return;
    }
    onEditExpense(budget.id, editingExpense, parseFloat(expenseAmount), expenseDate);
    setExpenseAmount('');
    setExpenseDate('');
    setEditingExpense(null);
  };

  const getNotification = () => {
    const percentage = (budget.spent / budget.amount) * 100;
    if (percentage >= 100) return `Warning: Budget exceeded by ${(percentage - 100).toFixed(1)}%`;
    if (percentage >= 75) return 'Warning: Budget at 75% or more';
    if (percentage >= 50) return 'Notice: Budget at 50% or more';
    return null;
  };

  return (
    <div className="border rounded-lg p-4 mb-4">
      <button 
        className="w-full text-left" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{budget.category}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(budget.startDate).toLocaleDateString()} - 
                  {new Date(budget.endDate).toLocaleDateString()}
                </p>
              </div>
              <p className="font-medium">₹{budget.spent} / ₹{budget.amount}</p>
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
            <Progress value={progressValue} className="mt-2" />
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4">
          {getNotification() && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{getNotification()}</AlertDescription>
            </Alert>
          )}

          <Card className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Amount</Label>
                <Input
                  type="number"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <Label>Date</Label>
                <Input
                  type="date"
                  value={expenseDate}
                  onChange={(e) => setExpenseDate(e.target.value)}
                  min={budget.startDate}
                  max={budget.endDate}
                />
              </div>
            </div>
            <Button 
              onClick={editingExpense !== null ? handleUpdate : handleAddExpense} 
              className="mt-4"
            >
              {editingExpense !== null ? 'Update Expense' : 'Add Expense'}
            </Button>
          </Card>

          {budget.expenses.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                {budget.expenses.map((expense, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                    <div>
                      <span>{new Date(expense.date).toLocaleDateString()}</span>
                      <span className="ml-4">₹{expense.amount}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(expense, index)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDeleteExpense(budget.id, index)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

const BudgetPlanner = () => {
  const [budgets, setBudgets] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dateError, setDateError] = useState('');

  const categories = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills'];

  const validateDates = (start, end) => {
    if (!start || !end) return true;
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (endDate < startDate) {
      setDateError('End date cannot be before start date');
      return false;
    }
    setDateError('');
    return true;
  };

  const addBudget = () => {
    if (!category || !amount || !startDate || !endDate) return;
    if (!validateDates(startDate, endDate)) return;
    
    const budget = {
      id: Date.now(),
      category,
      amount: parseFloat(amount),
      startDate,
      endDate,
      spent: 0,
      expenses: []
    };

    setBudgets([...budgets, budget]);
    setShowDialog(false);
    setCategory('');
    setAmount('');
    setStartDate('');
    setEndDate('');
    setDateError('');
  };

  const addExpense = (budgetId, amount, date) => {
    setBudgets(budgets.map(budget => {
      if (budget.id === budgetId) {
        const newExpenses = [...budget.expenses, { amount, date }]
          .sort((a, b) => new Date(a.date) - new Date(b.date));
        return {
          ...budget,
          spent: budget.expenses.reduce((sum, exp) => sum + exp.amount, 0) + amount,
          expenses: newExpenses
        };
      }
      return budget;
    }));
  };

  const deleteExpense = (budgetId, expenseIndex) => {
    setBudgets(budgets.map(budget => {
      if (budget.id === budgetId) {
        const newExpenses = budget.expenses.filter((_, index) => index !== expenseIndex);
        return {
          ...budget,
          spent: newExpenses.reduce((sum, exp) => sum + exp.amount, 0),
          expenses: newExpenses
        };
      }
      return budget;
    }));
  };

  const editExpense = (budgetId, expenseIndex, newAmount, newDate) => {
    setBudgets(budgets.map(budget => {
      if (budget.id === budgetId) {
        const newExpenses = [...budget.expenses];
        newExpenses[expenseIndex] = { amount: newAmount, date: newDate };
        const sortedExpenses = newExpenses.sort((a, b) => new Date(a.date) - new Date(b.date));
        return {
          ...budget,
          spent: sortedExpenses.reduce((sum, exp) => sum + exp.amount, 0),
          expenses: sortedExpenses
        };
      }
      return budget;
    }));
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Budget Planner
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Budget
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Budget</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Category</Label>
                    <Select onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Amount</Label>
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount"
                    />
                  </div>
                  <div>
                    <Label>Start Date</Label>
                    <Input
                      type="date"
                      value={startDate}
                      onChange={(e) => {
                        setStartDate(e.target.value);
                        validateDates(e.target.value, endDate);
                      }}
                    />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input
                      type="date"
                      value={endDate}
                      onChange={(e) => {
                        setEndDate(e.target.value);
                        validateDates(startDate, e.target.value);
                      }}
                    />
                  </div>
                  {dateError && (
                    <Alert>
                      <AlertDescription>{dateError}</AlertDescription>
                    </Alert>
                  )}
                  <Button onClick={addBudget} className="w-full" disabled={!!dateError}>
                    Add Budget
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {budgets.map(budget => (
            <BudgetItem
              key={budget.id}
              budget={budget}
              onAddExpense={addExpense}
              onDeleteExpense={deleteExpense}
              onEditExpense={editExpense}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetPlanner;