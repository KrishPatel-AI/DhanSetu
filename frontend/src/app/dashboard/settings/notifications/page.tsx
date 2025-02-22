"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { CalendarDays, Filter, Search } from "lucide-react";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Payment Received",
      message: "You have received ₹5,000 from Rajesh Patel.",
      date: "2025-02-01",
    },
    {
      id: 2,
      title: "Budget Goal Updated",
      message: "Your monthly savings goal has been increased to ₹10,000.",
      date: "2025-02-12",
    },
    {
      id: 3,
      title: "Financial Tip",
      message: "Tip of the day: Reduce unnecessary subscriptions to save more.",
      date: "2025-02-14",
    },
    {
      id: 4,
      title: "Expense Report Available",
      message: "Your January expense report is now available for review.",
      date: "2025-02-20",
    },
    {
      id: 5,
      title: "Loan EMI Reminder",
      message: "Your home loan EMI of ₹15,000 is due on March 5th.",
      date: "2025-02-22",
    },
    {
      id: 6,
      title: "Investment Alert",
      message: "Your stock in TCS has increased by 8% today.",
      date: "2025-02-25",
    },
    {
      id: 7,
      title: "New Cashback Offer",
      message: "Get 10% cashback on transactions above ₹2,000 this week.",
      date: "2025-02-26",
    },
    {
      id: 8,
      title: "Banking Alert",
      message: "A login attempt was detected from a new device.",
      date: "2025-02-27",
    },
    {
      id: 9,
      title: "New Feature Added",
      message: "Introducing AI-powered budget insights in your dashboard!",
      date: "2025-02-28",
    },
    {
      id: 10,
      title: "Tax Filing Reminder",
      message: "Don't forget to file your taxes before March 31st.",
      date: "2025-03-01",
    },
    {
      id: 11,
      title: "Credit Card Bill Due",
      message: "Your credit card bill of ₹8,500 is due on March 10th.",
      date: "2025-03-02",
    },
    {
      id: 12,
      title: "Stock Market Update",
      message: "Nifty 50 has surged by 2% today.",
      date: "2025-03-03",
    },
    {
      id: 13,
      title: "Salary Credited",
      message: "Your salary for the month has been credited to your account.",
      date: "2025-03-04",
    },
    {
      id: 14,
      title: "Mobile Recharge Offer",
      message: "Get 5% cashback on mobile recharges this week.",
      date: "2025-03-05",
    },
    {
      id: 15,
      title: "Bill Payment Reminder",
      message: "Electricity bill of ₹2,000 is due tomorrow.",
      date: "2025-03-06",
    },
    {
      id: 16,
      title: "Insurance Policy Renewal",
      message: "Your health insurance policy is due for renewal on March 20th.",
      date: "2025-03-07",
    },
    {
      id: 17,
      title: "Mutual Fund Investment",
      message: "Your SIP of ₹5,000 has been successfully invested.",
      date: "2025-03-08",
    },
    {
      id: 18,
      title: "Loan Prepayment Alert",
      message: "You can prepay your loan without penalty this month.",
      date: "2025-03-09",
    },
    {
      id: 19,
      title: "Cashback Earned",
      message: "You have earned ₹500 cashback from your last shopping.",
      date: "2025-03-10",
    },
    {
      id: 20,
      title: "Subscription Expiry",
      message: "Your Netflix subscription expires in 3 days.",
      date: "2025-03-11",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("Latest");

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSortChange = (option) => {
    setSortOption(option);
    let sorted = [...notifications];
    if (option === "Latest") {
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (option === "Oldest") {
      sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    setNotifications(sorted);
  };

  return (
    <div className="flex flex-col h-screen w-full p-6 space-y-4">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Notifications</h1>
        </div>
        <div className="relative w-full">
          <Search className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search notifications..."
            className="pl-8"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" /> {sortOption}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {["Latest", "Oldest"].map((option) => (
              <DropdownMenuItem
                key={option}
                onClick={() => handleSortChange(option)}
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex-1 overflow-auto border rounded-md p-4">
        <Accordion type="multiple" className="space-y-3">
          {notifications.map((notification) => (
            <AccordionItem
              key={notification.id}
              value={notification.id.toString()}
            >
              <AccordionTrigger className="no-underline">
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium no-underline">
                    {notification.title}
                  </span>
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <CalendarDays className="h-4 w-4" />
                    {new Date(notification.date).toLocaleDateString()}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600 no-underline">
                  {notification.message}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default NotificationPage;
