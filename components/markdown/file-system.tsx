"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { FolderIcon, FileIcon } from "lucide-react";

type FileSystemProps = {
  children: React.ReactNode;
  className?: string;
};

export function FileSystem({ children, className }: FileSystemProps) {
  return (
    <div className={cn("my-4 rounded-md border p-4", className)}>
      <div className="font-mono text-sm">{children}</div>
    </div>
  );
}

type FileSystemItemProps = {
  name: string;
  type: "file" | "directory";
  level?: number;
  isLast?: boolean;
  className?: string;
};

export function FileSystemItem({
  name,
  type,
  level = 0,
  isLast = false,
  className,
}: FileSystemItemProps) {
  const indent = level * 20;
  
  return (
    <div
      className={cn("flex items-center py-0.5", className)}
      style={{ paddingLeft: `${indent}px` }}
    >
      <span className="mr-1">
        {isLast ? "└── " : "├── "}
      </span>
      {type === "directory" ? (
        <FolderIcon className="mr-1 h-4 w-4 text-primary" />
      ) : (
        <FileIcon className="mr-1 h-4 w-4 text-muted-foreground" />
      )}
      <span className={cn(type === "directory" ? "font-semibold" : "")}>
        {name}
      </span>
    </div>
  );
}

export function FileSystemRoot({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center py-0.5 font-semibold", className)}>
      <FolderIcon className="mr-1 h-4 w-4 text-primary" />
      <span>{name}</span>
    </div>
  );
}
