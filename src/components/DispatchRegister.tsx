import React, { useState } from 'react';
import { Calendar, Filter, Search, Phone, MapPin, FileText, Image, Clock, CheckCircle2, AlertCircle, ArrowLeft, ChevronRight, Bell, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';

interface DispatchRecord {
  id: string;
  drNo: string;
  date: string;
  vehicleNo: string;
  consignor: string;
  consignee: string;
  from: string;
  to: string;
  lrs: string[];
  broker: string;
  advancePaid: number;
  billNo: string;
  status: 'pending' | 'in-transit' | 'delivered' | 'billed';
}

interface Event {
  id: string;
  type: 'loading-in' | 'loading-out' | 'vehicle-start' | 'arrival' | 'delivery';
  timestamp: string;
  location: string;
  coordinates: string;
  photos: string[];
  description: string;
}

const mockDispatchData: DispatchRecord[] = [
  {
    id: '1',
    drNo: 'DR-2025-001',
    date: '2025-11-15',
    vehicleNo: 'MH12AB1234',
    consignor: 'ABC Industries',
    consignee: 'XYZ Retail Ltd',
    from: 'Mumbai',
    to: 'Pune',
    lrs: ['LR001', 'LR002', 'LR003'],
    broker: 'Kumar Transport',
    advancePaid: 15000,
    billNo: 'INV-2025-045',
    status: 'in-transit'
  },
  {
    id: '2',
    drNo: 'DR-2025-002',
    date: '2025-11-14',
    vehicleNo: 'GJ01CD5678',
    consignor: 'PQR Manufacturing',
    consignee: 'LMN Distributors',
    from: 'Ahmedabad',
    to: 'Surat',
    lrs: ['LR004', 'LR005'],
    broker: 'Sharma Logistics',
    advancePaid: 12000,
    billNo: 'INV-2025-044',
    status: 'delivered'
  },
  {
    id: '3',
    drNo: 'DR-2025-003',
    date: '2025-11-16',
    vehicleNo: 'KA03EF9012',
    consignor: 'DEF Exports',
    consignee: 'GHI Imports',
    from: 'Bangalore',
    to: 'Chennai',
    lrs: ['LR006'],
    broker: 'Reddy Transport',
    advancePaid: 18000,
    billNo: '',
    status: 'pending'
  }
];

const mockEvents: Event[] = [
  {
    id: '1',
    type: 'loading-in',
    timestamp: '2025-11-15 08:30 AM',
    location: 'ABC Industries Warehouse, Mumbai',
    coordinates: '19.0760° N, 72.8777° E',
    photos: [],
    description: 'Loading started at consignor warehouse'
  },
  {
    id: '2',
    type: 'loading-out',
    timestamp: '2025-11-15 11:45 AM',
    location: 'ABC Industries Warehouse, Mumbai',
    coordinates: '19.0760° N, 72.8777° E',
    photos: [],
    description: 'Loading completed, vehicle departed'
  },
  {
    id: '3',
    type: 'vehicle-start',
    timestamp: '2025-11-15 12:00 PM',
    location: 'Mumbai-Pune Expressway Toll Plaza',
    coordinates: '19.0330° N, 73.0297° E',
    photos: [],
    description: 'Vehicle entered expressway'
  },
  {
    id: '4',
    type: 'arrival',
    timestamp: '2025-11-15 03:30 PM',
    location: 'XYZ Retail Warehouse, Pune',
    coordinates: '18.5204° N, 73.8567° E',
    photos: [],
    description: 'Arrived at destination'
  }
];

const DispatchRegister: React.FC = () => {
  const [selectedRecord, setSelectedRecord] = useState<DispatchRecord | null>(null);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [vehicleFilter, setVehicleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'in-transit':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'billed':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'loading-in':
        return <FileText className="w-4 h-4" />;
      case 'loading-out':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'vehicle-start':
        return <MapPin className="w-4 h-4" />;
      case 'arrival':
        return <MapPin className="w-4 h-4" />;
      case 'delivery':
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] pb-24">
      {/* Header */}
      <div className="bg-[#0F172A] text-white p-4">
        <div className="flex items-center justify-between">
          <div className="w-8"></div>
          <h1 className="text-lg font-semibold">Dispatch Register</h1>
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 cursor-pointer" />
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="md:col-span-1">
            <label className="text-sm font-medium text-gray-700 mb-1 block">From Date</label>
            <Input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="md:col-span-1">
            <label className="text-sm font-medium text-gray-700 mb-1 block">To Date</label>
            <Input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="md:col-span-1">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Vehicle</label>
            <Input
              placeholder="Vehicle No"
              value={vehicleFilter}
              onChange={(e) => setVehicleFilter(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="md:col-span-1">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Consignor</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Consignors</SelectItem>
                <SelectItem value="abc">ABC Industries</SelectItem>
                <SelectItem value="pqr">PQR Manufacturing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-1">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Consignee</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Consignees</SelectItem>
                <SelectItem value="xyz">XYZ Retail Ltd</SelectItem>
                <SelectItem value="lmn">LMN Distributors</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-1">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Status</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-transit">In Transit</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="billed">Billed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>DR No</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Vehicle No</TableHead>
              <TableHead>Consignor</TableHead>
              <TableHead>Consignee</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>LRs</TableHead>
              <TableHead>Broker</TableHead>
              <TableHead>Advance Paid</TableHead>
              <TableHead>Bill No</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockDispatchData.map((record) => (
              <TableRow
                key={record.id}
                className={`cursor-pointer transition-colors ${
                  hoveredRow === record.id ? 'bg-blue-50' : ''
                }`}
                onMouseEnter={() => setHoveredRow(record.id)}
                onMouseLeave={() => setHoveredRow(null)}
                onClick={() => setSelectedRecord(record)}
              >
                <TableCell className="font-medium">{record.drNo}</TableCell>
                <TableCell>{new Date(record.date).toLocaleDateString('en-IN')}</TableCell>
                <TableCell className="font-mono">{record.vehicleNo}</TableCell>
                <TableCell>{record.consignor}</TableCell>
                <TableCell>{record.consignee}</TableCell>
                <TableCell>{record.from}</TableCell>
                <TableCell>{record.to}</TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {record.lrs.map((lr) => (
                      <Badge key={lr} variant="outline" className="text-xs">
                        {lr}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{record.broker}</TableCell>
                <TableCell className="font-medium">₹{record.advancePaid.toLocaleString('en-IN')}</TableCell>
                <TableCell>{record.billNo || '-'}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(record.status)}>
                    {record.status.replace('-', ' ').toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Slide-out Detail Panel */}
      <Sheet open={!!selectedRecord} onOpenChange={() => setSelectedRecord(null)}>
        <SheetContent className="w-full sm:max-w-[480px]">
          <SheetHeader>
            <SheetTitle className="text-xl font-semibold">
              {selectedRecord?.drNo}
            </SheetTitle>
          </SheetHeader>

          <Tabs defaultValue="summary" className="mt-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="documents">Docs</TabsTrigger>
              <TabsTrigger value="payments">Pay</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="recon">Recon</TabsTrigger>
            </TabsList>

            {/* Summary Tab */}
            <TabsContent value="summary" className="space-y-4">
              <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="space-y-4 pr-4">
                  {/* Vehicle Card */}
                  <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Vehicle Number</p>
                        <p className="text-2xl font-bold text-gray-900 font-mono">
                          {selectedRecord?.vehicleNo}
                        </p>
                      </div>
                      <Badge className={getStatusColor(selectedRecord?.status || '')}>
                        {selectedRecord?.status.toUpperCase()}
                      </Badge>
                    </div>
                  </Card>

                  {/* Consignor/Consignee */}
                  <Card className="p-4 space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Consignor</p>
                      <p className="text-base font-medium text-gray-900">{selectedRecord?.consignor}</p>
                      <p className="text-sm text-gray-500">{selectedRecord?.from}</p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Consignee</p>
                      <p className="text-base font-medium text-gray-900">{selectedRecord?.consignee}</p>
                      <p className="text-sm text-gray-500">{selectedRecord?.to}</p>
                    </div>
                  </Card>

                  {/* LR List */}
                  <Card className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">LR Details</h3>
                    <div className="space-y-2">
                      {selectedRecord?.lrs.map((lr) => (
                        <div key={lr} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="font-medium">{lr}</span>
                          <Button variant="ghost" size="sm">Expand</Button>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Route Map Snippet */}
                  <Card className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Route</h3>
                    <div className="bg-gray-100 h-32 rounded flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-gray-400" />
                      <span className="ml-2 text-gray-500">Map View</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className="text-gray-600">{selectedRecord?.from}</span>
                      <span className="text-gray-400">→</span>
                      <span className="text-gray-600">{selectedRecord?.to}</span>
                    </div>
                  </Card>

                  {/* Driver Info */}
                  <Card className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Driver Information</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Ramesh Kumar</p>
                        <p className="text-sm text-gray-600">+91 98765 43210</p>
                      </div>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                    </div>
                  </Card>

                  {/* E-Way Bill */}
                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">E-Way Bill</p>
                        <p className="font-medium text-gray-900">EWB123456789</p>
                      </div>
                      <Badge className="bg-orange-100 text-orange-800 border-orange-300">
                        <Clock className="w-3 h-3 mr-1" />
                        Expires in 2d 5h
                      </Badge>
                    </div>
                  </Card>
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="space-y-4">
              <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="space-y-4 pr-4">
                  <Card className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">LR Scan</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="aspect-square bg-gray-100 rounded flex items-center justify-center">
                        <Image className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="aspect-square bg-gray-100 rounded flex items-center justify-center">
                        <Image className="w-8 h-8 text-gray-400" />
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      <FileText className="w-4 h-4 mr-2" />
                      OCR Extract
                    </Button>
                  </Card>

                  <Card className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Hire Memo</h3>
                    <div className="bg-gray-100 rounded p-3 flex items-center justify-between">
                      <span className="text-sm">hire_memo_001.pdf</span>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">POD Photos</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="aspect-square bg-gray-100 rounded flex items-center justify-center">
                          <Image className="w-6 h-6 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">WhatsApp Receipts</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2].map((i) => (
                        <div key={i} className="aspect-square bg-green-50 rounded flex items-center justify-center border border-green-200">
                          <Image className="w-6 h-6 text-green-600" />
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Payments Tab */}
            <TabsContent value="payments" className="space-y-4">
              <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="space-y-4 pr-4">
                  <Card className="p-4 border-green-200 bg-green-50">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">Verified Receipts</h3>
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-white rounded">
                        <div>
                          <p className="font-medium">Advance Payment</p>
                          <p className="text-sm text-gray-600">Nov 15, 2025</p>
                        </div>
                        <p className="font-bold text-green-600">₹15,000</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 border-yellow-200 bg-yellow-50">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">Pending Matches</h3>
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-white rounded">
                        <div>
                          <p className="font-medium">WhatsApp Receipt</p>
                          <p className="text-sm text-gray-600">Nov 16, 2025</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">₹5,000</p>
                          <Button variant="ghost" size="sm" className="h-6 text-xs">Match</Button>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Amount Comparison</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Freight</span>
                        <span className="font-medium">₹45,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Advance Paid</span>
                        <span className="font-medium text-green-600">₹15,000</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-900">Balance Due</span>
                        <span className="font-bold text-red-600">₹30,000</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events">
              <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="space-y-4 pr-4">
                  <div className="relative">
                    {mockEvents.map((event, index) => (
                      <div key={event.id} className="relative pl-8 pb-6">
                        {index !== mockEvents.length - 1 && (
                          <div className="absolute left-[11px] top-6 w-0.5 h-full bg-gray-200" />
                        )}
                        <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-blue-100 border-2 border-blue-500 flex items-center justify-center text-blue-600">
                          {getEventIcon(event.type)}
                        </div>
                        <Card className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-gray-900 capitalize">
                              {event.type.replace('-', ' ')}
                            </h4>
                            <span className="text-sm text-gray-500">{event.timestamp}</span>
                          </div>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-start gap-2">
                              <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                              <div>
                                <p className="text-gray-900">{event.location}</p>
                                <p className="text-gray-500 text-xs">{event.coordinates}</p>
                              </div>
                            </div>
                            <p className="text-gray-600 mt-2">{event.description}</p>
                            {event.photos.length > 0 && (
                              <div className="flex gap-2 mt-2">
                                {event.photos.map((photo, i) => (
                                  <div key={i} className="w-16 h-16 bg-gray-100 rounded" />
                                ))}
                              </div>
                            )}
                          </div>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Reconciliation Tab */}
            <TabsContent value="recon">
              <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="space-y-4 pr-4">
                  <Card className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Trip Reconciliation</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Freight</span>
                        <span className="font-medium">₹45,000</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Advance to Driver</span>
                        <span className="font-medium">₹15,000</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Diesel Cost</span>
                        <span className="font-medium">₹8,500</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Toll Charges</span>
                        <span className="font-medium">₹1,200</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-900">Net Amount</span>
                        <span className="font-bold text-green-600">₹20,300</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Expense Receipts</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">Diesel - 150L</span>
                        <span className="font-medium">₹8,500</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">Toll Receipt</span>
                        <span className="font-medium">₹1,200</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>
      </div>
    </div>
  );
};

export default DispatchRegister;