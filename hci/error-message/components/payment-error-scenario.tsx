"use client";

import type React from "react";

import { useState } from "react";
import { AlertTriangle, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function PaymentErrorScenario() {
  const [showError, setShowError] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      setShowError(true);
    }, 1500);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");

    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }

    return v;
  };

  return (
    <>
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            <span>Payment Details</span>
          </CardTitle>
          <CardDescription>
            Enter your card information to complete your purchase
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) =>
                  setCardNumber(formatCardNumber(e.target.value))
                }
                maxLength={19}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) =>
                    setExpiryDate(formatExpiryDate(e.target.value))
                  }
                  maxLength={5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) =>
                    setCvv(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  maxLength={3}
                />
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" className="w-full" disabled={processing}>
                {processing ? "Processing..." : "Pay ₱1,499.99"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          Your payment information is encrypted and secure
        </CardFooter>
      </Card>

      <Dialog open={showError} onOpenChange={setShowError}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <DialogTitle className="text-center pt-4">
              Payment Failed
            </DialogTitle>
            <DialogDescription className="text-center">
              We were unable to process your payment
            </DialogDescription>
          </DialogHeader>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-md p-4 my-2">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle
                  className="h-5 w-5 text-red-500"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-300">
                  Card declined (Error code: INSUFFICIENT_FUNDS)
                </h3>
                <div className="mt-2 text-sm text-red-700 dark:text-red-400">
                  <p>
                    Your card was declined due to insufficient funds. Please try
                    another payment method or contact your bank.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
            <Button
              variant="outline"
              className="sm:w-auto w-full"
              onClick={() => setShowError(false)}
            >
              Try Again
            </Button>
            <Button className="sm:w-auto w-full">
              Use Different Payment Method
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
