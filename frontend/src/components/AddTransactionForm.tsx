"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { nanoid } from "nanoid";

interface AddTransactionFormProps {
  onAddTransaction: (transaction: any) => void;
  onClose: () => void;
}

const AddTransactionForm: React.FC<AddTransactionFormProps> = ({
  onAddTransaction,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    type: "Expense" as "Income" | "Expense",
    moneyType: "Cash" as "Cash" | "Digital",
    method: "" as
      | "UPI"
      | "Net Banking"
      | "Bank Transfer"
      | "Credit Card"
      | "Debit Card"
      | "Gift Card"
      | "E-Rupee"
      | "",
    category: "Other",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    status: "Pending" as "Pending" | "Failed" | "Completed",
    from: "",
    to: "",
    description: "",
  });

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTransaction = { id: nanoid(), ...formData };
    onAddTransaction(newTransaction);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Type */}
        <div>
          <Label>Type</Label>
          <Select
            onValueChange={(value) => handleChange("type", value)}
            defaultValue={formData.type}
          >
            <SelectTrigger>{formData.type}</SelectTrigger>
            <SelectContent>
              <SelectItem value="Income">Income</SelectItem>
              <SelectItem value="Expense">Expense</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date */}
        <div>
          <Label>Date</Label>
          <Input
            type="date"
            name="date"
            value={formData.date}
            onChange={(e) => handleChange("date", e.target.value)}
            required
          />
        </div>

        {/* Money Type */}
        <div>
          <Label>Money Type</Label>
          <Select
            onValueChange={(value) => handleChange("moneyType", value)}
            defaultValue={formData.moneyType}
          >
            <SelectTrigger>{formData.moneyType}</SelectTrigger>
            <SelectContent>
              <SelectItem value="Cash">Cash</SelectItem>
              <SelectItem value="Digital">Digital</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Payment Method (conditional) */}
        <div>
          <Label>Payment Method</Label>
          <Select
            onValueChange={(value) => handleChange("method", value)}
            defaultValue={formData.method}
            disabled={formData.moneyType === "Cash"}
          >
            <SelectTrigger>{formData.method || "Select Method"}</SelectTrigger>
            <SelectContent>
              <SelectItem value="UPI">UPI</SelectItem>
              <SelectItem value="Net Banking">Net Banking</SelectItem>
              <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
              <SelectItem value="Credit Card">Credit Card</SelectItem>
              <SelectItem value="Debit Card">Debit Card</SelectItem>
              <SelectItem value="Gift Card">Gift Card</SelectItem>
              <SelectItem value="E-Rupee">E-Rupee</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category */}
        <div>
          <Label>Category</Label>
          <Select
            onValueChange={(value) => handleChange("category", value)}
            defaultValue={formData.category}
          >
            <SelectTrigger>{formData.category}</SelectTrigger>
            <SelectContent>
              <SelectItem value="Food">Food</SelectItem>
              <SelectItem value="Fuel">Fuel</SelectItem>
              <SelectItem value="Salon">Salon</SelectItem>
              <SelectItem value="Education">Education</SelectItem>
              <SelectItem value="Lifestyle">Lifestyle</SelectItem>
              <SelectItem value="Relationship">Relationship</SelectItem>
              <SelectItem value="Personal Care">Personal Care</SelectItem>
              <SelectItem value="Waste">Waste</SelectItem>
              <SelectItem value="Cloth">Cloth</SelectItem>
              <SelectItem value="Travel">Travel</SelectItem>
              <SelectItem value="Shopping">Shopping</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
              <SelectItem value="Custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Amount */}
        <div>
          <Label>Amount</Label>
          <Input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={(e) => handleChange("amount", e.target.value)}
            required
          />
        </div>

        {/* From */}
        <div>
          <Label>From</Label>
          <Input
            type="text"
            name="from"
            value={formData.from}
            onChange={(e) => handleChange("from", e.target.value)}
            required
          />
        </div>

        {/* To */}
        <div>
          <Label>To</Label>
          <Input
            type="text"
            name="to"
            value={formData.to}
            onChange={(e) => handleChange("to", e.target.value)}
            required
          />
        </div>
        {/* Status */}
        <div>
          <Label>Status</Label>
          <Select
            onValueChange={(value) => handleChange("status", value)}
            defaultValue={formData.status}
          >
            <SelectTrigger>{formData.status}</SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Failed">Failed</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Description */}
        <div>
          <Label>Description</Label>
          <Input
            type="text"
            name="description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Add Transaction
      </Button>
    </form>
  );
};

export default AddTransactionForm;
