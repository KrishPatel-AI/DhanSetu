"use client";

import * as React from "react";

import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { data } from "@/components/MainSidebar";

function findTitle(url: string, navMain: typeof data.navMain): string | null {
  for (const item of navMain) {
    if (item.url === url) {
      return item.title;
    }

    if (item.items) {
      const subItem = item.items.find((sub) => sub.url === url);

      if (subItem) {
        return subItem.title;
      }
    }
  }

  return null;
}

function generateBreadcrumbs(
  pathname: string,

  navMain: typeof data.navMain
): { href: string; label: string }[] {
  const segments = pathname.split("/").filter((segment) => segment);

  const breadcrumbData: { href: string; label: string }[] = [];

  let currentPath = "";

  segments.forEach((segment) => {
    currentPath += `/${segment}`;

    const title = findTitle(currentPath, navMain);

    breadcrumbData.push({
      href: currentPath,

      label: title
        ? title
        : segment.charAt(0).toUpperCase() + segment.slice(1).replace(/_/g, " "),
    });
  });

  return breadcrumbData;
}

export default function DashboardBreadcrumb() {
  const pathname = usePathname();

  const breadcrumbs = generateBreadcrumbs(pathname, data.navMain);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {index < breadcrumbs.length - 1 ? (
                <BreadcrumbLink href={breadcrumb.href}>
                  {breadcrumb.label}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>

            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
