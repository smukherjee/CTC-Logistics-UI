import React, { useState } from 'react';
import { Check, Download, Send, FileText, Plus, X, Calculator, Bell, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import ctcLogo from '../assets/ctc-logo.gif';

interface LRRecord {
  id: string;
  lrNo: string;
  consignor: string;
  consignee: string;
  from: string;
  to: string;
  weight: number;
  freight: number;
  selected: boolean;
}

const mockLRData: LRRecord[] = [
  {
    id: '1',
    lrNo: 'LR001',
    consignor: 'ABC Industries',
    consignee: 'XYZ Retail Ltd',
    from: 'Mumbai',
    to: 'Pune',
    weight: 5000,
    freight: 15000,
    selected: false
  },
  {
    id: '2',
    lrNo: 'LR002',
    consignor: 'ABC Industries',
    consignee: 'XYZ Retail Ltd',
    from: 'Mumbai',
    to: 'Pune',
    weight: 3500,
    freight: 12000,
    selected: false
  },
  {
    id: '3',
    lrNo: 'LR003',
    consignor: 'ABC Industries',
    consignee: 'PQR Distributors',
    from: 'Mumbai',
    to: 'Nashik',
    weight: 4200,
    freight: 18000,
    selected: false
  },
  {
    id: '4',
    lrNo: 'LR004',
    consignor: 'DEF Exports',
    consignee: 'LMN Imports',
    from: 'Bangalore',
    to: 'Chennai',
    weight: 6000,
    freight: 22000,
    selected: false
  },
  {
    id: '5',
    lrNo: 'LR005',
    consignor: 'DEF Exports',
    consignee: 'LMN Imports',
    from: 'Bangalore',
    to: 'Chennai',
    weight: 2800,
    freight: 9500,
    selected: false
  }
];

const InvoiceBuilder: React.FC = () => {
  const [lrRecords, setLrRecords] = useState<LRRecord[]>(mockLRData);
  const [customerName, setCustomerName] = useState('ABC Industries');
  const [customerAddress, setCustomerAddress] = useState('123, Industrial Area, Mumbai - 400001');
  const [customerGST, setCustomerGST] = useState('27AABCU9603R1ZM');
  const [invoiceNo, setInvoiceNo] = useState('INV-2025-046');
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [unloadingCharges, setUnloadingCharges] = useState(5000);
  const [detentionCharges, setDetentionCharges] = useState(2000);
  const [hsnCode, setHsnCode] = useState('996791');

  const toggleLRSelection = (id: string) => {
    setLrRecords(prev =>
      prev.map(lr => (lr.id === id ? { ...lr, selected: !lr.selected } : lr))
    );
  };

  const selectedLRs = lrRecords.filter(lr => lr.selected);
  const totalFreight = selectedLRs.reduce((sum, lr) => sum + lr.freight, 0);
  const totalCharges = totalFreight + unloadingCharges + detentionCharges;
  const cgst = totalCharges * 0.025; // 2.5%
  const sgst = totalCharges * 0.025; // 2.5%
  const igst = totalCharges * 0.05; // 5% (use this for inter-state)
  const totalAmount = totalCharges + cgst + sgst;

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* Header */}
      <div className="bg-[#0F172A] text-white p-4">
        <div className="flex items-center justify-between">
          <div className="w-8"></div>
          <h1 className="text-lg font-semibold">Invoice Builder</h1>
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 cursor-pointer" />
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-120px)] bg-gray-50">
      {/* Left Panel - LR Selection */}
      <div className="w-[380px] bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Select LRs</h2>
          <p className="text-sm text-gray-600 mt-1">
            {selectedLRs.length} selected
          </p>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-2">
            {lrRecords.map((lr) => (
              <Card
                key={lr.id}
                className={`p-3 cursor-pointer transition-all ${
                  lr.selected
                    ? 'border-blue-500 bg-blue-50 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => toggleLRSelection(lr.id)}
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={lr.selected}
                    onCheckedChange={() => toggleLRSelection(lr.id)}
                    className="mt-1"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-gray-900">{lr.lrNo}</span>
                      <Badge variant="outline" className="text-xs">
                        {lr.weight}kg
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-0.5">
                      <p className="truncate">
                        <span className="font-medium">From:</span> {lr.consignor}
                      </p>
                      <p className="truncate">
                        <span className="font-medium">To:</span> {lr.consignee}
                      </p>
                      <p>
                        <span className="font-medium">Route:</span> {lr.from} → {lr.to}
                      </p>
                      <p className="font-semibold text-gray-900 mt-1">
                        ₹{lr.freight.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Total Freight</span>
            <span className="text-lg font-bold text-gray-900">
              ₹{totalFreight.toLocaleString('en-IN')}
            </span>
          </div>
          <Button
            className="w-full"
            disabled={selectedLRs.length === 0}
            onClick={() => {
              // Generate invoice logic
            }}
          >
            <Check className="w-4 h-4 mr-2" />
            Add to Invoice
          </Button>
        </div>
      </div>

      {/* Center Panel - Invoice Preview */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 bg-white border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Invoice Preview</h2>
        </div>
        <ScrollArea className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {selectedLRs.length === 0 ? (
              <Card className="p-12 text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Select LRs to generate invoice</p>
              </Card>
            ) : (
              <Card className="p-8 bg-white shadow-lg">
                {/* Invoice Header */}
                <div className="border-b-2 border-gray-900 pb-4 mb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <img src={ctcLogo} alt="CTC Logistics" className="h-12 w-auto" />
                        <h1 className="text-2xl font-bold text-[#1E88E5]">CTC LOGISTICS</h1>
                      </div>
                      <p className="text-sm text-gray-600">Flat No.31, BBC Villa Complex,</p>
                      <p className="text-sm text-gray-600">65, Broadway, Chennai - 600 108</p>
                      <p className="text-sm text-gray-600">Tamilnadu, India</p>
                      <p className="text-sm font-semibold text-gray-900 mt-2">GST: 08AAEFC3940P1Z4</p>
                    </div>
                    <div className="text-right">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">TAX INVOICE</h2>
                      <p className="text-sm text-gray-600">Invoice No.</p>
                      <p className="text-xl font-bold text-gray-900">{invoiceNo}</p>
                      <p className="text-sm text-gray-600 mt-2">Date</p>
                      <p className="font-medium text-gray-900">
                        {new Date(invoiceDate).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Customer Details */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Bill To:</h3>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="font-semibold text-gray-900">{customerName}</p>
                    <p className="text-sm text-gray-600">{customerAddress}</p>
                    <p className="text-sm text-gray-600 mt-1">GSTIN: {customerGST}</p>
                  </div>
                </div>

                {/* Invoice Items Table */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Invoice Details</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">#</TableHead>
                        <TableHead>LR No</TableHead>
                        <TableHead>Consignor</TableHead>
                        <TableHead>Consignee</TableHead>
                        <TableHead>Route</TableHead>
                        <TableHead className="text-right">Weight (kg)</TableHead>
                        <TableHead className="text-right">Amount (₹)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedLRs.map((lr, index) => (
                        <TableRow key={lr.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell className="font-medium">{lr.lrNo}</TableCell>
                          <TableCell>{lr.consignor}</TableCell>
                          <TableCell>{lr.consignee}</TableCell>
                          <TableCell>{lr.from} → {lr.to}</TableCell>
                          <TableCell className="text-right">{lr.weight}</TableCell>
                          <TableCell className="text-right font-medium">
                            {lr.freight.toLocaleString('en-IN')}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Charges Breakdown */}
                <div className="mb-6">
                  <div className="bg-gray-50 p-4 rounded space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Sub Total (Freight)</span>
                      <span className="font-medium text-gray-900">
                        ₹{totalFreight.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Unloading Charges</span>
                      <span className="font-medium text-gray-900">
                        ₹{unloadingCharges.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Detention Charges</span>
                      <span className="font-medium text-gray-900">
                        ₹{detentionCharges.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Taxable Value</span>
                      <span className="font-semibold text-gray-900">
                        ₹{totalCharges.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">CGST @ 2.5%</span>
                      <span className="font-medium text-gray-900">
                        ₹{cgst.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">SGST @ 2.5%</span>
                      <span className="font-medium text-gray-900">
                        ₹{sgst.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between text-base">
                      <span className="font-bold text-gray-900">Total Amount</span>
                      <span className="font-bold text-gray-900 text-xl">
                        ₹{totalAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* HSN Code */}
                <div className="mb-6">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">HSN Code:</span> {hsnCode} (Transport Services)
                  </p>
                </div>

                {/* Annexure Preview */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Annexure</h3>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>This invoice is for transportation services as per the LRs listed above.</p>
                    <p>Payment Terms: 30 Days from Invoice Date</p>
                    <p className="font-medium mt-3">Bank Details:</p>
                    <p>Bank: HDFC Bank</p>
                    <p>Account No: 50200012345678</p>
                    <p>IFSC: HDFC0001234</p>
                  </div>
                </div>

                {/* Signature */}
                <div className="mt-8 text-right">
                  <div className="inline-block">
                    <p className="text-sm font-medium text-gray-900">For CTC Logistics Pvt. Ltd.</p>
                    <div className="h-16 mt-2"></div>
                    <p className="text-sm text-gray-600 border-t pt-2">Authorized Signatory</p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Right Panel - Actions */}
      <div className="w-[320px] bg-white border-l border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Invoice Actions</h2>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            {/* Invoice Details Form */}
            <Card className="p-4 space-y-3">
              <h3 className="font-semibold text-gray-900 text-sm">Invoice Details</h3>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">
                  Invoice No
                </label>
                <Input
                  value={invoiceNo}
                  onChange={(e) => setInvoiceNo(e.target.value)}
                  className="text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">
                  Invoice Date
                </label>
                <Input
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className="text-sm"
                />
              </div>
            </Card>

            {/* Customer Details */}
            <Card className="p-4 space-y-3">
              <h3 className="font-semibold text-gray-900 text-sm">Customer Details</h3>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">
                  Customer Name
                </label>
                <Input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">
                  Address
                </label>
                <Input
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">
                  GST Number
                </label>
                <Input
                  value={customerGST}
                  onChange={(e) => setCustomerGST(e.target.value)}
                  className="text-sm"
                />
              </div>
            </Card>

            {/* Additional Charges */}
            <Card className="p-4 space-y-3">
              <h3 className="font-semibold text-gray-900 text-sm">Additional Charges</h3>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">
                  Unloading Charges
                </label>
                <Input
                  type="number"
                  value={unloadingCharges}
                  onChange={(e) => setUnloadingCharges(Number(e.target.value))}
                  className="text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">
                  Detention Charges
                </label>
                <Input
                  type="number"
                  value={detentionCharges}
                  onChange={(e) => setDetentionCharges(Number(e.target.value))}
                  className="text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">
                  HSN Code
                </label>
                <Input
                  value={hsnCode}
                  onChange={(e) => setHsnCode(e.target.value)}
                  className="text-sm"
                />
              </div>
            </Card>

            {/* Summary */}
            <Card className="p-4 bg-blue-50 border-blue-200">
              <h3 className="font-semibold text-gray-900 text-sm mb-3">Invoice Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">LRs Selected</span>
                  <span className="font-medium">{selectedLRs.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Freight</span>
                  <span className="font-medium">₹{totalFreight.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Charges</span>
                  <span className="font-medium">₹{totalCharges.toLocaleString('en-IN')}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-base">
                  <span className="font-bold text-gray-900">Invoice Total</span>
                  <span className="font-bold text-gray-900">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </ScrollArea>

        {/* Action Buttons */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={selectedLRs.length === 0}
          >
            <Calculator className="w-4 h-4 mr-2" />
            Generate Invoice
          </Button>
          <Button
            variant="outline"
            className="w-full"
            disabled={selectedLRs.length === 0}
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
          <Button
            variant="outline"
            className="w-full"
            disabled={selectedLRs.length === 0}
          >
            <Send className="w-4 h-4 mr-2" />
            Send to Customer
          </Button>
          <Button
            variant="outline"
            className="w-full border-green-300 text-green-700 hover:bg-green-50"
            disabled={selectedLRs.length === 0}
          >
            <Check className="w-4 h-4 mr-2" />
            Mark as Billed
          </Button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default InvoiceBuilder;