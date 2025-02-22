"use client"

import { ChevronRight, type LucideIcon } from "lucide-react";

import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { useState } from "react";

export function SidebarUpperContent({
  items,
}: {
  items: {
    title: string;

    url: string;

    icon?: LucideIcon;

    items?: {
      title: string;

      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup className="my-2">
      <SidebarMenu>
        {items.map((item) => {
          const isActive = pathname.startsWith(item.url);

          const [isOpen, setIsOpen] = useState(isActive);

          return (
            <Collapsible
              key={item.title}
              open={isOpen}
              onOpenChange={setIsOpen}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={`flex items-center px-4 py-2 rounded-md transition-colors ${isActive
                        ? "bg-primary text-white"
                        : "hover:bg-secondary hover:text-primary"
                      }`}
                  >
                    {item.icon && <item.icon />}

                    <span className="ml-2">{item.title}</span>

                    <ChevronRight
                      className={`ml-auto transition-transform duration-200 ${isOpen ? "rotate-90" : ""
                        }`}
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                {item.items && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => {
                        const isSubActive = pathname === subItem.url;

                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <a
                                href={subItem.url}
                                className={`block px-4 py-2 rounded-md transition-colors ${isSubActive
                                    ? "bg-primary-light text-primary"
                                    : "hover:bg-secondary-light hover:text-primary-dark"
                                  }`}
                              >
                                {subItem.title}
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
