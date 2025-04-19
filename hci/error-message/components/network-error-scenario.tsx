"use client";

import { useState, useEffect } from "react";
import {
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type ConnectionStatus = "connected" | "disconnected" | "reconnecting";

export function NetworkErrorScenario() {
  const [status, setStatus] = useState<ConnectionStatus>("connected");
  const [reconnectProgress, setReconnectProgress] = useState(0);
  const [reconnectAttempt, setReconnectAttempt] = useState(0);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus("disconnected");
      setShowContent(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (status !== "reconnecting") return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setReconnectProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);

        if (reconnectAttempt % 2 === 0) {
          setStatus("disconnected");
          setReconnectProgress(0);
          setReconnectAttempt((prev) => prev + 1);
        } else {
          setStatus("connected");
          setShowContent(true);
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, [status, reconnectAttempt]);

  const handleReconnect = () => {
    setStatus("reconnecting");
    setReconnectProgress(0);
  };

  return (
    <div className="space-y-6">
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          status === "disconnected"
            ? "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800"
            : status === "reconnecting"
            ? "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800"
            : "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800",
          "rounded-lg border p-4"
        )}
      >
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "rounded-full p-2",
              status === "disconnected"
                ? "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400"
                : status === "reconnecting"
                ? "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400"
                : "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400"
            )}
          >
            {status === "disconnected" && <WifiOff className="h-5 w-5" />}
            {status === "reconnecting" && (
              <RefreshCw className="h-5 w-5 animate-spin" />
            )}
            {status === "connected" && <Wifi className="h-5 w-5" />}
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3
                className={cn(
                  "font-medium",
                  status === "disconnected"
                    ? "text-red-800 dark:text-red-300"
                    : status === "reconnecting"
                    ? "text-yellow-800 dark:text-yellow-300"
                    : "text-green-800 dark:text-green-300"
                )}
              >
                {status === "disconnected" && "Connection Lost"}
                {status === "reconnecting" && "Reconnecting..."}
                {status === "connected" && "Connected"}
              </h3>

              {status === "disconnected" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReconnect}
                  className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/50"
                >
                  <RefreshCw className="h-3.5 w-3.5 mr-1" />
                  Reconnect
                </Button>
              )}
            </div>

            <p
              className={cn(
                "text-sm mt-1",
                status === "disconnected"
                  ? "text-red-700 dark:text-red-400"
                  : status === "reconnecting"
                  ? "text-yellow-700 dark:text-yellow-400"
                  : "text-green-700 dark:text-green-400"
              )}
            >
              {status === "disconnected" &&
                "Your internet connection appears to be offline."}
              {status === "reconnecting" &&
                "Attempting to restore your connection..."}
              {status === "connected" && "Your internet connection is stable."}
            </p>

            {status === "reconnecting" && (
              <div className="mt-3">
                <Progress value={reconnectProgress} className="h-1.5" />
              </div>
            )}

            {status === "disconnected" && reconnectAttempt > 0 && (
              <div className="mt-2 flex items-start gap-1.5">
                <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                <p className="text-xs text-red-700 dark:text-red-400">
                  Reconnection attempt failed. Please check your network
                  settings or try again.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 className="font-medium">Dashboard Content</h3>
          {status === "connected" && (
            <div className="flex items-center text-xs text-green-600 dark:text-green-400">
              <CheckCircle className="h-3.5 w-3.5 mr-1" />
              Live
            </div>
          )}
        </div>

        <div className="p-4 min-h-[200px] flex items-center justify-center">
          {showContent ? (
            <div className="grid grid-cols-3 gap-4 w-full">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-24 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center"
                >
                  <span className="text-muted-foreground">Data {i}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-6">
              <WifiOff className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <h3 className="font-medium text-gray-700 dark:text-gray-300">
                Content Unavailable
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Please reconnect to view your dashboard
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
