"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignupErrorScenario } from "@/components/signup-error-scenario";
import { PaymentErrorScenario } from "@/components/payment-error-scenario";
import { NetworkErrorScenario } from "@/components/network-error-scenario";
import { NotFoundErrorScenario } from "@/components/not-found-error-scenario";
import { ServerErrorScenario } from "@/components/server-error-scenario";
import {
  BadSignupErrorDesign,
  BadPaymentErrorDesign,
  BadNetworkErrorDesign,
  BadNotFoundErrorDesign,
  BadServerErrorDesign,
} from "@/components/bad-design-examples";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const [activeTab, setActiveTab] = useState("signup");

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Error Message Design</h1>
          <p className="text-muted-foreground">
            Five different approaches to error messages in common user scenarios
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="signup">Sign-up</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
            <TabsTrigger value="notfound">404</TabsTrigger>
            <TabsTrigger value="server">500</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="signup" className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">
                  Sign-up Form Validation
                </h2>
                <p className="text-muted-foreground mb-6">
                  Inline field-level validation with contextual error messages
                </p>
                <SignupErrorScenario />
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center">
                    <div className="bg-gray-50 dark:bg-gray-900 px-4 text-muted-foreground text-sm">
                      VS Bad Design Example
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">
                    Sign-up Form Validation
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Unhelpful error messages with poor formatting and no
                    guidance
                  </p>
                  <BadSignupErrorDesign />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="payment" className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">
                  Payment Processing
                </h2>
                <p className="text-muted-foreground mb-6">
                  Modal error message for critical payment failures
                </p>
                <PaymentErrorScenario />
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center">
                    <div className="bg-gray-50 dark:bg-gray-900 px-4 text-muted-foreground text-sm">
                      VS Bad Design Example
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Payment Error</h2>
                  <p className="text-muted-foreground mb-6">
                    Technical error codes with no clear explanation or recovery
                    path
                  </p>
                  <BadPaymentErrorDesign />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="network" className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">
                  Network Connectivity
                </h2>
                <p className="text-muted-foreground mb-6">
                  Status-based error with automatic recovery
                </p>
                <NetworkErrorScenario />
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center">
                    <div className="bg-gray-50 dark:bg-gray-900 px-4 text-muted-foreground text-sm">
                      VS Bad Design Example
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Network Error</h2>
                  <p className="text-muted-foreground mb-6">
                    Alarming presentation with technical details and no helpful
                    context
                  </p>
                  <BadNetworkErrorDesign />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notfound" className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">404 Not Found</h2>
                <p className="text-muted-foreground mb-6">
                  User-friendly page not found error with navigation options
                </p>
                <NotFoundErrorScenario />
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center">
                    <div className="bg-gray-50 dark:bg-gray-900 px-4 text-muted-foreground text-sm">
                      VS Bad Design Example
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Bad 404 Error</h2>
                  <p className="text-muted-foreground mb-6">
                    Minimal information with no helpful suggestions or search
                    options
                  </p>
                  <BadNotFoundErrorDesign />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="server" className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">
                  500 Internal Server Error
                </h2>
                <p className="text-muted-foreground mb-6">
                  Detailed server error with user and developer views
                </p>
                <ServerErrorScenario />
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center">
                    <div className="bg-gray-50 dark:bg-gray-900 px-4 text-muted-foreground text-sm">
                      VS Bad Design Example
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Server Error</h2>
                  <p className="text-muted-foreground mb-6">
                    Raw stack trace exposed to users with no explanation or
                    context
                  </p>
                  <BadServerErrorDesign />
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </main>
  );
}
