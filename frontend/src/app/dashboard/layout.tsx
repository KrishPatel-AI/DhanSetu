"use client";

import { MainSidebar } from "@/components/MainSidebar";

import { Separator } from "@/components/ui/separator";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import DashboardBreadcrumb from "@/components/DashboardBreadcrumb";

export default function Page({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <MainSidebar />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />

            <Separator orientation="vertical" className="mr-2 h-4" />

            <DashboardBreadcrumb />
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-6 p-2">
          <SidebarInset>{children}</SidebarInset>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
