"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Search, ArrowLeft, Home, RefreshCw, FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NotFoundErrorScenario() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-full max-w-md mx-auto">
        <div className="relative pb-8">
          <div className="relative">
            <div className="text-[120px] font-bold text-gray-100 dark:text-gray-800 leading-none select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FileQuestion className="h-20 w-20 text-gray-400 dark:text-gray-600" />
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-4 mb-2">Page Not Found</h2>
          <p className="text-muted-foreground mb-6">
            We couldn't find the page you're looking for. It might have been
            moved, deleted, or never existed.
          </p>

          <form onSubmit={handleSearch} className="relative mb-6">
            <Input
              type="text"
              placeholder="Search for content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              className="absolute right-0 top-0 h-full px-3"
              disabled={isSearching}
            >
              {isSearching ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              <span className="sr-only">Search</span>
            </Button>
          </form>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Go Back</span>
            </Button>
            <Button className="gap-2">
              <Home className="h-4 w-4" />
              <span>Return Home</span>
            </Button>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-6 mt-6">
          <h3 className="text-sm font-medium mb-3">
            You might be looking for:
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="#"
                className="text-primary hover:underline flex items-center justify-center gap-1.5"
              >
                <span>Documentation</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-primary hover:underline flex items-center justify-center gap-1.5"
              >
                <span>API Reference</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-primary hover:underline flex items-center justify-center gap-1.5"
              >
                <span>Contact Support</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
