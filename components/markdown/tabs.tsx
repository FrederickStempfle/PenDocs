"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

export function Tabs({
  children,
  defaultValue,
  className,
}: {
  children: React.ReactNode;
  defaultValue?: string;
  className?: string;
}) {
  return (
    <TabsPrimitive.Root defaultValue={defaultValue} className={cn(className)}>
      {children}
    </TabsPrimitive.Root>
  );
}

export function TabsList({ children }: { children: React.ReactNode }) {
  return (
    <TabsPrimitive.List className="flex h-10 items-center rounded-md bg-muted p-1 text-muted-foreground">
      {children}
    </TabsPrimitive.List>
  );
}

export function TabsTrigger({
  children,
  value,
}: {
  children: React.ReactNode;
  value: string;
}) {
  return (
    <TabsPrimitive.Trigger
      value={value}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
      )}
    >
      {children}
    </TabsPrimitive.Trigger>
  );
}

export function TabsContent({
  children,
  value,
}: {
  children: React.ReactNode;
  value: string;
}) {
  return (
    <TabsPrimitive.Content
      value={value}
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      )}
    >
      {children}
    </TabsPrimitive.Content>
  );
}
