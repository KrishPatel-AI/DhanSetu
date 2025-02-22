"use client";

import * as React from "react";
import {
  BarChart2,
  DollarSign,
  HelpCircle,
  PieChart,
  Settings,
  Languages,
  Bell,
  User,
  Bot,
  BookOpen,
  Wallet,
} from "lucide-react";

import { SidebarUpperContent } from "@/components/SidebarUpperContent";
import { SidebarLowerContent } from "@/components/SidebarLowerContent";
import { SidebarUser } from "@/components/SidebarUser";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

export const data = {
  user: {
    name: "Wealth Radar User",
    email: "user@wealthradar.in",
    avatar: "/avatars/user.jpg",
  },

  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: BarChart2,
      isActive: true,
      items: [
        { title: "Overview", url: "/dashboard/overview" },
        { title: "Budget Planner", url: "/dashboard/budget" },
      ],
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: PieChart,
      items: [
        { title: "Spending Trends", url: "/dashboard/analytics/spending_trends" },
        { title: "Income Patterns", url: "/dashboard/analytics/income_patterns" },
        { title: "Auto Classification", url: "/dashboard/analytics/auto_classification" },
      ],
    },
    {
      title: "Payments",
      url: "/payments",
      icon: Wallet,
      items: [
        { title: "UPI", url: "/dashboard/payments/upi" },
        { title: "Banks", url: "/dashboard/payments/banks" },
      ],
    },
    {
      title: "AI & Learning",
      url: "/ai_learning",
      icon: Bot,
      items: [
        { title: "AI Chatbot", url: "/ai_chatbot" },
        { title: "Learning", url: "/learning", icon: BookOpen },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      items: [
        { title: "Profile", url: "/dashboard/profile", icon: User },
        { title: "Notifications", url: "/dashboard/settings/notifications", icon: Bell },
        { title: "Languages", url: "/dashboard/settings/languages", icon: Languages },
      ],
    },
    {
      title: "Support",
      url: "/support",
      icon: HelpCircle,
      items: [
        { title: "Help & Support", url: "/help_support" },
      ],
    },
  ],
};

export function MainSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader />
      <SidebarContent>
        <SidebarUpperContent items={data.navMain} />
        <SidebarLowerContent projects={[]} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
