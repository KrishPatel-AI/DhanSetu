"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const spendingData = [
  { id: 1, title: "Groceries", amount: 4500, category: "Food", date: "2025-02-15" },
  { id: 2, title: "Uber Rides", amount: 1200, category: "Transport", date: "2025-02-18" },
  { id: 3, title: "Netflix Subscription", amount: 500, category: "Entertainment", date: "2025-02-10" },
  { id: 4, title: "Shopping", amount: 3200, category: "Retail", date: "2025-02-05" },
  { id: 5, title: "Electricity Bill", amount: 2800, category: "Utilities", date: "2025-01-25" },
];

const categoryData = [
  { category: "Food", amount: 4500 },
  { category: "Transport", amount: 1200 },
  { category: "Entertainment", amount: 500 },
  { category: "Retail", amount: 3200 },
  { category: "Utilities", amount: 2800 },
];

export default function SpendingTrends() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Last Month");
  const [sortOrder, setSortOrder] = useState("Descending");
  const { resolvedTheme } = useTheme();

  const filteredData = spendingData
    .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (sortOrder === "Descending" ? b.amount - a.amount : a.amount - b.amount));

  const totalSpending = spendingData.reduce((acc, item) => acc + item.amount, 0);

  // Set chart colors dynamically based on system theme
  const chartColor = resolvedTheme === "dark" ? "hsl(var(--primary))" : "hsl(var(--primary))";

  return (
    <div style={{ display: "grid", gap: "16px", padding: "16px" }}>
      <Card>
        <CardHeader>
          <CardTitle>Spending Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "16px" }}>
            <Card style={{ flex: 1, textAlign: "center" }}>
              <CardHeader>
                <CardTitle>Total Spending</CardTitle>
              </CardHeader>
              <CardContent>₹{totalSpending}</CardContent>
            </Card>
            <Card style={{ flex: 1, textAlign: "center" }}>
              <CardHeader>
                <CardTitle>Highest Category</CardTitle>
              </CardHeader>
              <CardContent>Food - ₹4500</CardContent>
            </Card>
            <Card style={{ flex: 1, textAlign: "center" }}>
              <CardHeader>
                <CardTitle>Lowest Category</CardTitle>
              </CardHeader>
              <CardContent>Entertainment - ₹500</CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Spending Trends</CardTitle>
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
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "8px", marginBottom: "16px" }}>
            <Input placeholder="Search transactions..." value={search} onChange={(e) => setSearch(e.target.value)} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{filter}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilter("Last Week")}>Last Week</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("Last Month")}>Last Month</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("Last Year")}>Last Year</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{sortOrder}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSortOrder("Descending")}>High to Low</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder("Ascending")}>Low to High</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell>{item.date}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} style={{ textAlign: "center", color: "gray" }}>
                    No transactions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
