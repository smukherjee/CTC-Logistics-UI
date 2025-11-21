import { useState } from "react";
import { Camera, Save, IndianRupee, Bell, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card } from "./ui/card";

export function PaymentCapture() {
  const [paymentMode, setPaymentMode] = useState("CASH");
  const [receiptCaptured, setReceiptCaptured] = useState(false);

  const paymentModes = ["CASH", "UPI", "BANK", "CHEQUE"];

  return (
    <div className="min-h-screen bg-[#F3F4F6] pb-24">
      {/* Header */}
      <div className="bg-[#0F172A] text-white p-4">
        <div className="flex items-center justify-between">
          <div className="w-8"></div>
          <h1 className="text-lg font-semibold">Payment Capture</h1>
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 cursor-pointer" />
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <Card className="p-4 space-y-4">
          {/* Amount */}
          <div className="space-y-2">
            <Label>Amount</Label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="number"
                placeholder="0.00"
                className="pl-10"
              />
            </div>
          </div>

          {/* Payment Mode - Segmented Control */}
          <div className="space-y-2">
            <Label>Payment Mode</Label>
            <div className="grid grid-cols-4 gap-2 p-1 bg-[#F3F4F6] rounded-lg">
              {paymentModes.map((mode) => (
                <button
                  key={mode}
                  onClick={() => setPaymentMode(mode)}
                  className={`py-2 px-3 rounded transition-all ${
                    paymentMode === mode
                      ? 'bg-white shadow-sm text-[#1E88E5]'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Conditional fields based on payment mode */}
          {paymentMode === "UPI" && (
            <div className="space-y-2">
              <Label>UPI ID</Label>
              <Input placeholder="example@upi" />
            </div>
          )}

          {paymentMode === "BANK" && (
            <div className="space-y-2">
              <Label>Transaction Reference</Label>
              <Input placeholder="Enter reference number" />
            </div>
          )}

          {paymentMode === "CHEQUE" && (
            <div className="space-y-2">
              <Label>Cheque Number</Label>
              <Input placeholder="Enter cheque number" />
            </div>
          )}

          {/* Party Selection */}
          <div className="space-y-2">
            <Label>Party</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select party" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="abc">ABC Industries</SelectItem>
                <SelectItem value="xyz">XYZ Corp</SelectItem>
                <SelectItem value="def">DEF Traders</SelectItem>
                <SelectItem value="ghi">GHI Logistics</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Receipt Photo */}
          <div className="space-y-2">
            <Label>Receipt Photo</Label>
            <Card className="relative h-[200px] bg-gray-50 border-2 border-dashed flex items-center justify-center overflow-hidden">
              {!receiptCaptured ? (
                <div className="text-center">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <Button
                    variant="outline"
                    onClick={() => setReceiptCaptured(true)}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Capture Receipt
                  </Button>
                </div>
              ) : (
                <div className="relative w-full h-full bg-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-gray-500 mb-2">Receipt Captured</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setReceiptCaptured(false)}
                    >
                      Retake
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Save Button */}
          <Button className="w-full bg-[#16A34A] hover:bg-[#16A34A]/90">
            <Save className="w-4 h-4 mr-2" />
            Save Payment
          </Button>
        </Card>

        {/* Recent Payments */}
        <div className="space-y-2">
          <h2 className="text-[#0F172A]">Recent Payments</h2>
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3 pb-3 border-b">
              <div>
                <p className="text-[#0F172A]">ABC Industries</p>
                <p className="text-sm text-gray-600">Nov 16, 2025 • CASH</p>
              </div>
              <p className="text-[#16A34A]">₹25,000</p>
            </div>
            <div className="flex items-center justify-between mb-3 pb-3 border-b">
              <div>
                <p className="text-[#0F172A]">XYZ Corp</p>
                <p className="text-sm text-gray-600">Nov 15, 2025 • UPI</p>
              </div>
              <p className="text-[#16A34A]">₹18,500</p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#0F172A]">DEF Traders</p>
                <p className="text-sm text-gray-600">Nov 15, 2025 • BANK</p>
              </div>
              <p className="text-[#16A34A]">₹32,000</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
