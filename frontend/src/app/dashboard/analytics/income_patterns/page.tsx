"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const API_BASE = "http://localhost:5000/api";

export default function IncomeTrends() {
  const [incomeData, setIncomeData] = useState([]);
  const [search, setSearch] = useState("");
  const [newIncome, setNewIncome] = useState({ title: "", amount: "", category: "", date: "" });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token"); // Get the logged-in user's token

  useEffect(() => {
    const fetchIncome = async () => {
      const token = localStorage.getItem("token"); // Get token from localStorage
  
      if (!token) {
        console.error("No token found. User must be logged in.");
        setIncomeData([]); // Clear data when no user is logged in
        return;
      }
  
      try {
        const response = await fetch(`${API_BASE}/income`, {
          headers: { Authorization: token }, // Send token in request
        });
  
        if (response.ok) {
          const data = await response.json();
          setIncomeData(data); // ✅ Set only logged-in user's data
        } else {
          console.error("Failed to fetch income data.");
          setIncomeData([]); // Clear data if request fails
        }
      } catch (error) {
        console.error("Error fetching income:", error);
      }
    };
  
    fetchIncome();
  }, []); // ✅ Runs once when the component mounts

  const handleAddIncome = async () => {
    if (!newIncome.title || !newIncome.amount || !newIncome.category || !newIncome.date) {
      alert("Please fill all fields!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/income`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token, // ✅ Ensure request is made with the correct user token
        },
        body: JSON.stringify(newIncome),
      });

      if (response.ok) {
        const newEntry = await response.json();
        setIncomeData((prevData) => [...prevData, newEntry]);
        setNewIncome({ title: "", amount: "", category: "", date: "" });
        setOpen(false);
      } else {
        console.error("Failed to add income.");
      }
    } catch (error) {
      console.error("Error adding income:", error);
    }

    setLoading(false);
  };

  const filteredData = incomeData.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Income Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={incomeData}>
              <XAxis dataKey="category" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Bar dataKey="amount" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Income Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between gap-2 mb-4">
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
                  <Button onClick={handleAddIncome} disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                  </Button>
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
                <TableRow key={item._id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell> {/* ✅ Convert date to readable format */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
