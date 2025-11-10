"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function Breadcrumbs() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  // Format segment names for better display
  const formatSegment = (segment: string) => {
    return segment
      .split("-")
      .map((word) => capitalize(word))
      .join(" ");
  };

  return (
    <div className="flex items-center gap-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard" className="flex items-center gap-1">
                Dashboard
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {pathSegments.length > 1 && (
            <>
              <BreadcrumbSeparator />
              {pathSegments.slice(1).map((segment, index) => {
                const href = `/${pathSegments.slice(0, index + 2).join("/")}`;
                const isLast = index === pathSegments.slice(1).length - 1;
                const displayName = formatSegment(decodeURIComponent(segment));

                return (
                  <Fragment key={href}>
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage>{displayName}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link href={href}>{displayName}</Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!isLast && <BreadcrumbSeparator />}
                  </Fragment>
                );
              })}
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
