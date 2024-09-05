"use client";

import React from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbLink,
  BreadcrumbPage,
} from "../ui/breadcrumb";
import { useBreadCrumbsStore } from "@/app/providers";
import { usePathname } from "next/navigation";

const BreadCrumbs = () => {
  const breadCrumbs = useBreadCrumbsStore((store) => store.breadCrumbs);
  const pathname = usePathname();

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {breadCrumbs.map((breadCrumb, i) => (
          <>
            <BreadcrumbItem key={breadCrumb}>
              {pathname === `${breadCrumb.toLowerCase()}` && (
                <BreadcrumbPage>{breadCrumb}</BreadcrumbPage>
              )}
              {pathname !== `${breadCrumb.toLowerCase()}` && (
                <BreadcrumbLink asChild>
                  <Link href={`/${breadCrumb.toLowerCase()}`}>
                    {breadCrumb}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {breadCrumb !== breadCrumbs[i - 1] && (
              <BreadcrumbSeparator key={breadCrumb} />
            )}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbs;
