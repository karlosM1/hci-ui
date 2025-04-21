"use client";

import { useState } from "react";
import {
  AlertTriangle,
  RefreshCw,
  Copy,
  CheckCircle,
  Terminal,
  Bug,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ServerErrorScenario() {
  const [isRetrying, setIsRetrying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("user");

  const errorDetails = {
    errorId: "err_8f7d6e5c4b3a2",
    timestamp: new Date().toISOString(),
    path: "/api/data/process",
    statusCode: 500,
    message: "Internal Server Error",
    details: "Unexpected error occurred while processing the request",
    stack: `Error: Unexpected error occurred while processing the request
    at processData (/app/api/data/process.ts:42:11)
    at handler (/app/api/data/route.ts:15:23)
    at runMicroTasks (<anonymous>)
    at processTicksAndRejections (node:internal/process/task_queues:96:5)`,
  };

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setIsRetrying(false);
    }, 2000);
  };

  const copyErrorDetails = () => {
    const errorText = `Error ID: ${errorDetails.errorId}
Timestamp: ${errorDetails.timestamp}
Path: ${errorDetails.path}
Status: ${errorDetails.statusCode}
Message: ${errorDetails.message}
Details: ${errorDetails.details}`;

    navigator.clipboard.writeText(errorText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-full">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-lg font-medium text-red-800 dark:text-red-300">
              500 - Internal Server Error
            </h3>
            <div className="mt-2 text-sm text-red-700 dark:text-red-400">
              <p>
                We're sorry, but something went wrong on our server. Our team
                has been notified and is working to fix the issue.
              </p>
            </div>
            <div className="mt-4">
              <Button
                onClick={handleRetry}
                disabled={isRetrying}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {isRetrying ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Retrying...
                  </>
                ) : (
                  "Try Again"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="user">For Users</TabsTrigger>
          <TabsTrigger value="developer">For Developers</TabsTrigger>
        </TabsList>
        <TabsContent value="user" className="pt-4">
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="flex items-center text-sm font-medium mb-2">
                <Wrench className="h-4 w-4 mr-2" />
                What you can do
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Refresh the page and try again</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Check your internet connection</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Try again in a few minutes</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Contact support if the problem persists</span>
                </li>
              </ul>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="text-muted-foreground">
                Error ID: {errorDetails.errorId}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1"
                onClick={copyErrorDetails}
              >
                {copied ? (
                  <>
                    <CheckCircle className="h-3.5 w-3.5" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Error Details</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="developer" className="pt-4">
          <div className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="error-details">
                <AccordionTrigger className="text-sm">
                  <div className="flex items-center">
                    <Bug className="h-4 w-4 mr-2" />
                    Error Details
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-3 gap-1">
                      <div className="text-muted-foreground">Error ID:</div>
                      <div className="col-span-2 font-mono">
                        {errorDetails.errorId}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <div className="text-muted-foreground">Timestamp:</div>
                      <div className="col-span-2 font-mono">
                        {errorDetails.timestamp}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <div className="text-muted-foreground">Path:</div>
                      <div className="col-span-2 font-mono">
                        {errorDetails.path}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <div className="text-muted-foreground">Status Code:</div>
                      <div className="col-span-2 font-mono">
                        {errorDetails.statusCode}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <div className="text-muted-foreground">Message:</div>
                      <div className="col-span-2 font-mono">
                        {errorDetails.message}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <div className="text-muted-foreground">Details:</div>
                      <div className="col-span-2 font-mono">
                        {errorDetails.details}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="stack-trace">
                <AccordionTrigger className="text-sm">
                  <div className="flex items-center">
                    <Terminal className="h-4 w-4 mr-2" />
                    Stack Trace
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="bg-black text-green-400 p-3 rounded font-mono text-xs overflow-x-auto">
                    <pre>{errorDetails.stack}</pre>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="bg-muted p-4 rounded-lg">
              <h3 className="flex items-center text-sm font-medium mb-2">
                <Wrench className="h-4 w-4 mr-2" />
                Troubleshooting Steps
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <span className="mr-2">1.</span>
                  <span>
                    Check server logs for more detailed error information
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">2.</span>
                  <span>Verify API endpoint parameters and request format</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">3.</span>
                  <span>Check database connection and query execution</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">4.</span>
                  <span>
                    Review recent code changes that might have affected this
                    endpoint
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
