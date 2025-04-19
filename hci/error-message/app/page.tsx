"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignupErrorScenario } from "@/components/signup-error-scenario";
import { PaymentErrorScenario } from "@/components/payment-error-scenario";
import { NetworkErrorScenario } from "@/components/network-error-scenario";

export default function Home() {
  const [activeTab, setActiveTab] = useState("signup");

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Error Message Design</h1>
          <p className="text-muted-foreground">
            Three different approaches to error messages in common user
            scenarios
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="signup">Sign-up Errors</TabsTrigger>
            <TabsTrigger value="payment">Payment Errors</TabsTrigger>
            <TabsTrigger value="network">Network Errors</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="signup" className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">
                  Sign-up Form Validation
                </h2>
                <p className="text-muted-foreground mb-6">
                  Inline field-level validation with contextual error messages
                </p>
                <SignupErrorScenario />
              </div>
            </TabsContent>

            <TabsContent value="payment" className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">
                  Payment Processing
                </h2>
                <p className="text-muted-foreground mb-6">
                  Modal error message for critical payment failures
                </p>
                <PaymentErrorScenario />
              </div>
            </TabsContent>

            <TabsContent value="network" className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">
                  Network Connectivity
                </h2>
                <p className="text-muted-foreground mb-6">
                  Status-based error with automatic recovery
                </p>
                <NetworkErrorScenario />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </main>
  );
}
