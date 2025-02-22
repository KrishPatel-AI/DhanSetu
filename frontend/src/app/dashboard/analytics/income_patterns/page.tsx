"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog";

const initialIncomeData = [
  { id: 1, title: "Freelancing", amount: 12000, category: "Work", date: "2025-02-15" },
  { id: 2, title: "Investments", amount: 8000, category: "Passive", date: "2025-02-18" },
  { id: 3, title: "Dividends", amount: 4500, category: "Stock Market", date: "2025-02-10" },
  { id: 4, title: "Rental Income", amount: 15000, category: "Real Estate", date: "2025-02-05" },
  { id: 5, title: "Salary", amount: 50000, category: "Job", date: "2025-01-25" },
];

export default function IncomeTrends() {
  const [incomeData, setIncomeData] = useState(initialIncomeData);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Last Month");
  const [sortOrder, setSortOrder] = useState("Descending");
  const { resolvedTheme } = useTheme();
  const [newIncome, setNewIncome] = useState({ title: "", amount: "", category: "", date: "" });
  const [open, setOpen] = useState(false);

  const filteredData = incomeData
    .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (sortOrder === "Descending" ? b.amount - a.amount : a.amount - b.amount));

  const totalIncome = incomeData.reduce((acc, item) => acc + item.amount, 0);
  const highestCategory = incomeData.reduce((prev, current) => (prev.amount > current.amount ? prev : current), incomeData[0]);
  const lowestCategory = incomeData.reduce((prev, current) => (prev.amount < current.amount ? prev : current), incomeData[0]);

  const categoryData = Object.values(
    incomeData.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = { category: item.category, amount: 0 };
      acc[item.category].amount += item.amount;
      return acc;
    }, {})
  );

  const chartColor = resolvedTheme === "dark" ? "hsl(var(--primary))" : "hsl(var(--primary))";
  const handleAddIncome = () => {
    setIncomeData([...incomeData, { ...newIncome, id: incomeData.length + 1, amount: Number(newIncome.amount) }]);
    setNewIncome({ title: "", amount: "", category: "", date: "" });
    setOpen(false);
  };

  return (
    <div style={{ display: "grid", gap: "16px", padding: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "16px" }}>
        <Card style={{ flex: 1, textAlign: "center" }}>
          <CardHeader>
            <CardTitle>Total Income</CardTitle>
          </CardHeader>
          <CardContent>₹{totalIncome}</CardContent>
        </Card>
        <Card style={{ flex: 1, textAlign: "center" }}>
          <CardHeader>
            <CardTitle>Highest Category</CardTitle>
          </CardHeader>
          <CardContent>{highestCategory.category} - ₹{highestCategory.amount}</CardContent>
        </Card>
        <Card style={{ flex: 1, textAlign: "center" }}>
          <CardHeader>
            <CardTitle>Lowest Category</CardTitle>
          </CardHeader>
          <CardContent>{lowestCategory.category} - ₹{lowestCategory.amount}</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Income Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill={chartColor} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Income Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "8px", marginBottom: "16px" }}>
            <Input placeholder="Search transactions..." value={search} onChange={(e) => setSearch(e.target.value)} />
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">Add Income</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Income</DialogTitle>
                </DialogHeader>
                <Input placeholder="Title" value={newIncome.title} onChange={(e) => setNewIncome({ ...newIncome, title: e.target.value })} />
                <Input placeholder="Amount" type="number" value={newIncome.amount} onChange={(e) => setNewIncome({ ...newIncome, amount: e.target.value })} />
                <Input placeholder="Category" value={newIncome.category} onChange={(e) => setNewIncome({ ...newIncome, category: e.target.value })} />
                <Input placeholder="Date" type="date" value={newIncome.date} onChange={(e) => setNewIncome({ ...newIncome, date: e.target.value })} />
                <DialogFooter>
                  <Button onClick={handleAddIncome}>Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount (₹)</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>{item.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
