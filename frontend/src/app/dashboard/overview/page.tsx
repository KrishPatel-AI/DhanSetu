"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, IndianRupee } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { demoData } from "@/data/financialData";
const budgetData = [
  { category: "Food", budget: 5000, used: 3000 },
  { category: "Rent", budget: 15000, used: 15000 },
  { category: "Entertainment", budget: 2000, used: 1200 },
  { category: "Transport", budget: 3000, used: 1800 },
];

const transactions = {
  income: [
    { id: 1, name: "Freelance Payment", amount: 5000, date: "Feb 20" },
    { id: 2, name: "Stock Dividend", amount: 1200, date: "Feb 18" },
  ],
  expense: [
    { id: 1, name: "Groceries", amount: -1200, date: "Feb 21" },
    { id: 2, name: "Electricity Bill", amount: -2500, date: "Feb 19" },
  ],
};
const OverviewPage = () => {
  const [timeFrame, setTimeFrame] = useState("month");

  const data = demoData[timeFrame];
  const pieData = [
    { name: "Income", value: data.income },
    { name: "Expense", value: data.expense },
  ];
  const barData = [
    { name: "Income", amount: data.income },
    { name: "Expense", amount: data.expense },
  ];
  const lineData = data.history.map((value, index) => ({
    name: `Q${index + 1}`,
    value,
  }));
  const COLORS = ["#1FAA5C", "#ef4444"];

  return (
    <div className="p-4 space-y-4 min-h-screen">
      <Tabs value={timeFrame} onValueChange={setTimeFrame} className="flex ">
        <TabsList className="">
          <TabsTrigger value="day">Day</TabsTrigger>
          <TabsTrigger value="week">Week</TabsTrigger>
          <TabsTrigger value="month">Month</TabsTrigger>
          <TabsTrigger value="year">Year</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 p-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-700">Income</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2 text-green-600 text-xl font-semibold">
            <IndianRupee size={20} /> {data.income}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-700">Expense</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2 text-red-600 text-xl font-semibold">
            <TrendingDown size={20} /> {data.expense}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-700">Wealth</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2 text-blue-600 text-xl font-semibold">
            <TrendingUp size={20} /> {data.wealth}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        {/* Budget Summary Card */}
        <Card>
          <CardHeader>
            <CardTitle>Budget Overview</CardTitle>
            <CardDescription>
              Track your spending against your budgeted categories.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {budgetData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>{item.category}</span>
                  <span>
                    ₹{item.used} / ₹{item.budget}
                  </span>
                </div>
                <Progress value={(item.used / item.budget) * 100} />
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline">View Detailed Report</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              View your latest income and expenses.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="income">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="income">Income</TabsTrigger>
                <TabsTrigger value="expense">Expense</TabsTrigger>
              </TabsList>
              <TabsContent value="income">
                <ScrollArea className="h-40 space-y-2">
                  {transactions.income.map((tx) => (
                    <div key={tx.id} className="flex justify-between py-2">
                      <span>{tx.name}</span>
                      <Badge variant="outline">+₹{tx.amount}</Badge>
                    </div>
                  ))}
                </ScrollArea>
              </TabsContent>
              <TabsContent value="expense">
                <ScrollArea className="h-40 space-y-2">
                  {transactions.expense.map((tx) => (
                    <div key={tx.id} className="flex justify-between py-2">
                      <span>{tx.name}</span>
                      <Badge variant="destructive">₹{tx.amount}</Badge>
                    </div>
                  ))}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button variant="outline">View All Transactions</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Income vs Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData} barSize={50}>
                <XAxis dataKey="name" tick={{ fontSize: 14 }} />
                <YAxis tick={{ fontSize: 14 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#1FAA5C" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Spending Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} dataKey="value" outerRadius={100} label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Financial Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <XAxis dataKey="name" tick={{ fontSize: 14 }} />
                <YAxis tick={{ fontSize: 14 }} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#10b981"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewPage;
