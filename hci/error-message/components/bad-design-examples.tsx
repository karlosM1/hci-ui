"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function BadSignupErrorDesign() {
  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded p-4 max-w-md mx-auto">
      <h3 className="text-red-500 font-bold text-center mb-4">
        INVALID FORM SUBMISSION
      </h3>

      <div className="space-y-4">
        <div>
          <Label htmlFor="bad-email">Email:</Label>
          <Input
            id="bad-email"
            className="border-red-500"
            defaultValue="test"
          />
          <p className="text-red-500 text-xs mt-1">ERROR: INVALID</p>
        </div>

        <div>
          <Label htmlFor="bad-password">Password:</Label>
          <Input
            id="bad-password"
            type="password"
            className="border-red-500"
            defaultValue="123"
          />
          <p className="text-red-500 text-xs mt-1">
            ERROR: INVALID PASSWORD FORMAT
          </p>
        </div>

        <div>
          <Label htmlFor="bad-confirm">Confirm Password:</Label>
          <Input
            id="bad-confirm"
            type="password"
            className="border-red-500"
            defaultValue="1234"
          />
          <p className="text-red-500 text-xs mt-1">ERROR: MISMATCH</p>
        </div>

        <div className="bg-red-100 dark:bg-red-900/30 p-2 text-xs">
          <p className="text-red-800 dark:text-red-300">
            Multiple validation errors detected. Please fix all errors before
            proceeding.
          </p>
        </div>

        <Button className="w-full">SUBMIT</Button>
      </div>
    </div>
  );
}

export function BadPaymentErrorDesign() {
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-red-100 dark:bg-red-900/30 border border-red-500 p-3 text-center">
        <p className="text-red-800 dark:text-red-300 font-bold">
          ERROR CODE: 0x80070057
        </p>
        <p className="text-red-700 dark:text-red-400 text-sm">
          Payment processing failed due to an exception in the transaction
          handler.
        </p>
        <p className="text-red-700 dark:text-red-400 text-xs mt-2">
          Please contact system administrator or try again later.
        </p>
      </div>

      <div className="mt-4 space-y-2">
        <div>
          <Label htmlFor="bad-card">Card Number:</Label>
          <Input id="bad-card" defaultValue="4111 1111 1111 1111" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="bad-expiry">Expiry:</Label>
            <Input id="bad-expiry" defaultValue="12/25" />
          </div>
          <div>
            <Label htmlFor="bad-cvv">CVV:</Label>
            <Input id="bad-cvv" defaultValue="123" />
          </div>
        </div>

        <Button className="w-full mt-2">RETRY PAYMENT</Button>
      </div>
    </div>
  );
}

export function BadNetworkErrorDesign() {
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-red-100 dark:bg-red-900/30 border-2 border-dashed border-red-500 p-4 text-center">
        <h3 className="text-red-800 dark:text-red-300 font-bold text-lg uppercase blink">
          CONNECTION ERROR
        </h3>
        <p className="text-red-700 dark:text-red-400">
          Your connection to the server has been lost.
        </p>
        <p className="text-red-700 dark:text-red-400 text-xs mt-2">
          Error: ECONNREFUSED - Connection refused by server
        </p>

        <div className="mt-4 flex justify-center">
          <Button className="bg-red-500 hover:bg-red-600 text-white">
            RECONNECT
          </Button>
        </div>
      </div>

      <style jsx>{`
        .blink {
          animation: blink-animation 1s steps(5, start) infinite;
        }
        @keyframes blink-animation {
          to {
            visibility: hidden;
          }
        }
      `}</style>
    </div>
  );
}

export function BadNotFoundErrorDesign() {
  return (
    <div className="max-w-md mx-auto text-center">
      <div className="border border-gray-300 dark:border-gray-700 p-4">
        <h3 className="text-xl font-bold">404 ERROR</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          The requested URL was not found on this server.
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          That's all we know.
        </p>

        <div className="mt-4">
          <Button variant="outline" size="sm">
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}

export function BadServerErrorDesign() {
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-mono">500 Internal Server Error</h3>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-4 font-mono text-xs overflow-x-auto">
          <pre className="bg-black text-white p-2">
            {`Exception in thread "main" java.lang.NullPointerException
    at com.example.myproject.Book.getTitle(Book.java:16)
    at com.example.myproject.Author.getBookTitles(Author.java:25)
    at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
    
Request failed with status code 500`}
          </pre>
        </div>

        <div className="mt-4 text-center">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            Reload Page
          </Button>
        </div>
      </div>
    </div>
  );
}
