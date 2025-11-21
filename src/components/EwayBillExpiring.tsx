import React, { useState } from 'react';
import { AlertTriangle, Clock, Search, Download, RefreshCw, Phone, Mail, CheckCircle2, XCircle, Bell, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Separator } from './ui/separator';

interface EwayBill {
  id: string;
  lrNumber: string;
  ewayBillNumber: string;
  vehicleNumber: string;
  consignor: string;
  consignee: string;
  origin: string;
  destination: string;
  distance: number;
  generatedDate: string;
  expiryDate: string;
  validityHours: number;
  status: 'active' | 'expiring-soon' | 'expired';
  driverName: string;
  driverPhone: string;
  currentLocation?: string;
  estimatedDelivery: string;
}

const mockEwayBills: EwayBill[] = [
  {
    id: '1',
    lrNumber: 'LR-2025-001',
    ewayBillNumber: '381234567890',
    vehicleNumber: 'MH12AB1234',
    consignor: 'ABC Industries',
    consignee: 'XYZ Corp',
    origin: 'Mumbai',
    destination: 'Delhi',
    distance: 1450,
    generatedDate: '2025-11-16T08:00:00',
    expiryDate: '2025-11-19T08:00:00',
    validityHours: 72,
    status: 'expiring-soon',
    driverName: 'Ramesh Kumar',
    driverPhone: '9876543210',
    currentLocation: 'Ahmedabad',
    estimatedDelivery: '2025-11-18T20:00:00'
  },
  {
    id: '2',
    lrNumber: 'LR-2025-002',
    ewayBillNumber: '381234567891',
    vehicleNumber: 'MH12CD5678',
    consignor: 'DEF Traders',
    consignee: 'GHI Logistics',
    origin: 'Bangalore',
    destination: 'Chennai',
    distance: 350,
    generatedDate: '2025-11-17T10:00:00',
    expiryDate: '2025-11-18T10:00:00',
    validityHours: 24,
    status: 'expired',
    driverName: 'Suresh Patil',
    driverPhone: '9876543211',
    currentLocation: 'Bangalore Outskirts',
    estimatedDelivery: '2025-11-18T18:00:00'
  },
  {
    id: '3',
    lrNumber: 'LR-2025-003',
    ewayBillNumber: '381234567892',
    vehicleNumber: 'DL13EF9012',
    consignor: 'JKL Enterprises',
    consignee: 'MNO Industries',
    origin: 'Mumbai',
    destination: 'Pune',
    distance: 150,
    generatedDate: '2025-11-17T14:00:00',
    expiryDate: '2025-11-18T14:00:00',
    validityHours: 24,
    status: 'expiring-soon',
    driverName: 'Vijay Singh',
    driverPhone: '9876543212',
    currentLocation: 'Lonavala',
    estimatedDelivery: '2025-11-18T16:00:00'
  },
  {
    id: '4',
    lrNumber: 'LR-2025-004',
    ewayBillNumber: '381234567893',
    vehicleNumber: 'GJ01GH3456',
    consignor: 'PQR Corp',
    consignee: 'STU Traders',
    origin: 'Ahmedabad',
    destination: 'Surat',
    distance: 280,
    generatedDate: '2025-11-16T06:00:00',
    expiryDate: '2025-11-19T06:00:00',
    validityHours: 72,
    status: 'expiring-soon',
    driverName: 'Rajesh Sharma',
    driverPhone: '9876543213',
    currentLocation: 'Bharuch',
    estimatedDelivery: '2025-11-18T12:00:00'
  },
  {
    id: '5',
    lrNumber: 'LR-2025-005',
    ewayBillNumber: '381234567894',
    vehicleNumber: 'KA03IJ7890',
    consignor: 'VWX Industries',
    consignee: 'YZA Logistics',
    origin: 'Bangalore',
    destination: 'Hyderabad',
    distance: 570,
    generatedDate: '2025-11-15T12:00:00',
    expiryDate: '2025-11-17T12:00:00',
    validityHours: 48,
    status: 'expired',
    driverName: 'Anil Reddy',
    driverPhone: '9876543214',
    currentLocation: 'Kurnool',
    estimatedDelivery: '2025-11-18T14:00:00'
  }
];

const EwayBillExpiring: React.FC = () => {
  const [bills, setBills] = useState<EwayBill[]>(mockEwayBills);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBill, setSelectedBill] = useState<EwayBill | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const getHoursRemaining = (expiryDate: string) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diff = expiry.getTime() - now.getTime();
    return Math.floor(diff / (1000 * 60 * 60));
  };

  const getStatusBadge = (bill: EwayBill) => {
    const hoursRemaining = getHoursRemaining(bill.expiryDate);
    
    if (hoursRemaining < 0) {
      return <Badge className="bg-red-100 text-red-800 border-red-300">Expired</Badge>;
    } else if (hoursRemaining <= 12) {
      return <Badge className="bg-red-100 text-red-800 border-red-300">Critical ({hoursRemaining}h left)</Badge>;
    } else if (hoursRemaining <= 24) {
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Warning ({hoursRemaining}h left)</Badge>;
    } else {
      return <Badge className="bg-blue-100 text-blue-800 border-blue-300">{hoursRemaining}h left</Badge>;
    }
  };

  const filteredBills = bills.filter(bill => {
    const matchesSearch = bill.lrNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bill.ewayBillNumber.includes(searchQuery) ||
                         bill.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bill.consignor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bill.consignee.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'expired' && getHoursRemaining(bill.expiryDate) < 0) ||
                         (statusFilter === 'critical' && getHoursRemaining(bill.expiryDate) >= 0 && getHoursRemaining(bill.expiryDate) <= 8) ||
                         (statusFilter === 'warning' && getHoursRemaining(bill.expiryDate) > 8 && getHoursRemaining(bill.expiryDate) <=12);
    
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (bill: EwayBill) => {
    setSelectedBill(bill);
    setIsDetailDialogOpen(true);
  };

  const handleExtendValidity = (billId: string) => {
    alert(`Extending validity for E-way Bill. This would integrate with GST portal API.`);
  };

  const handleContactDriver = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleSendAlert = (billId: string) => {
    alert('Alert sent to driver via SMS and WhatsApp');
  };

  const expiredCount = bills.filter(b => getHoursRemaining(b.expiryDate) < 0).length;
  const criticalCount = bills.filter(b => {
    const hrs = getHoursRemaining(b.expiryDate);
    return hrs >= 0 && hrs <= 12;
  }).length;
  const warningCount = bills.filter(b => {
    const hrs = getHoursRemaining(b.expiryDate);
    return hrs > 12 && hrs <= 24;
  }).length;

  return (
    <div className="min-h-screen bg-[#F3F4F6] pb-24">
      {/* Header */}
      <div className="bg-[#0F172A] text-white p-4">
        <div className="flex items-center justify-between">
          <div className="w-8"></div>
          <h1 className="text-lg font-semibold">E-way Bills Expiring</h1>
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 cursor-pointer" />
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Expired</p>
              <p className="text-3xl font-bold text-red-700">{expiredCount}</p>
            </div>
            <XCircle className="w-12 h-12 text-red-600" />
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Critical (&lt;8h)</p>
              <p className="text-3xl font-bold text-orange-700">{criticalCount}</p>
            </div>
            <AlertTriangle className="w-12 h-12 text-orange-600" />
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Warning (&lt;12h)</p>
              <p className="text-3xl font-bold text-yellow-700">{warningCount}</p>
            </div>
            <Clock className="w-12 h-12 text-yellow-600" />
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Monitored</p>
              <p className="text-3xl font-bold text-blue-700">{bills.length}</p>
            </div>
            <CheckCircle2 className="w-12 h-12 text-blue-600" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search by LR, E-way Bill, Vehicle, Consignor, Consignee..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          <div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="critical">Critical (&lt;12h)</SelectItem>
                <SelectItem value="warning">Warning (&lt;24h)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Bills Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>LR Number</TableHead>
              <TableHead>E-way Bill</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Current Location</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBills.map((bill) => {
              const hoursRemaining = getHoursRemaining(bill.expiryDate);
              const isExpired = hoursRemaining < 0;
              const isCritical = hoursRemaining >= 0 && hoursRemaining <= 12;
              
              return (
                <TableRow 
                  key={bill.id} 
                  className={`hover:bg-gray-50 ${isExpired ? 'bg-red-50' : isCritical ? 'bg-orange-50' : ''}`}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {(isExpired || isCritical) && (
                        <AlertTriangle className={`w-4 h-4 ${isExpired ? 'text-red-600' : 'text-orange-600'}`} />
                      )}
                      {bill.lrNumber}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{bill.ewayBillNumber}</TableCell>
                  <TableCell>{bill.vehicleNumber}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{bill.origin}</div>
                      <div className="text-gray-500">→ {bill.destination}</div>
                      <div className="text-xs text-gray-400">{bill.distance} km</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{bill.currentLocation}</div>
                      <div className="text-xs text-gray-500">
                        ETA: {new Date(bill.estimatedDelivery).toLocaleString('en-IN', { 
                          day: '2-digit', 
                          month: 'short', 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">
                        {new Date(bill.expiryDate).toLocaleString('en-IN', { 
                          day: '2-digit', 
                          month: 'short', 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                      <div className="text-xs text-gray-500">
                        Generated: {new Date(bill.generatedDate).toLocaleDateString('en-IN')}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(bill)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewDetails(bill)}
                        title="View Details"
                      >
                        View
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleContactDriver(bill.driverPhone)}
                        title="Call Driver"
                      >
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleSendAlert(bill.id)}
                        title="Send Alert"
                      >
                        <Mail className="w-4 h-4" />
                      </Button>
                      {!isExpired && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleExtendValidity(bill.id)}
                          className="text-blue-600 hover:text-blue-700"
                          title="Extend Validity"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>E-way Bill Details</DialogTitle>
          </DialogHeader>
          
          {selectedBill && (
            <div className="space-y-6 py-4">
              {/* Status Alert */}
              {getHoursRemaining(selectedBill.expiryDate) < 0 ? (
                <Card className="p-4 bg-red-50 border-red-200">
                  <div className="flex items-center gap-3">
                    <XCircle className="w-8 h-8 text-red-600" />
                    <div>
                      <p className="font-semibold text-red-900">E-way Bill Expired</p>
                      <p className="text-sm text-red-700">
                        Expired {Math.abs(getHoursRemaining(selectedBill.expiryDate))} hours ago. 
                        Immediate action required.
                      </p>
                    </div>
                  </div>
                </Card>
              ) : getHoursRemaining(selectedBill.expiryDate) <= 12 ? (
                <Card className="p-4 bg-orange-50 border-orange-200">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-8 h-8 text-orange-600" />
                    <div>
                      <p className="font-semibold text-orange-900">Critical - Expiring Soon</p>
                      <p className="text-sm text-orange-700">
                        Only {getHoursRemaining(selectedBill.expiryDate)} hours remaining. 
                        Take action immediately.
                      </p>
                    </div>
                  </div>
                </Card>
              ) : null}

              {/* LR & E-way Details */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Document Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-600">LR Number</Label>
                    <p className="font-medium">{selectedBill.lrNumber}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">E-way Bill Number</Label>
                    <p className="font-medium font-mono">{selectedBill.ewayBillNumber}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Generated Date</Label>
                    <p className="font-medium">
                      {new Date(selectedBill.generatedDate).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Expiry Date</Label>
                    <p className="font-medium">
                      {new Date(selectedBill.expiryDate).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Validity Period</Label>
                    <p className="font-medium">{selectedBill.validityHours} hours</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Time Remaining</Label>
                    <p className="font-medium">
                      {getHoursRemaining(selectedBill.expiryDate) < 0 
                        ? `Expired (${Math.abs(getHoursRemaining(selectedBill.expiryDate))}h ago)` 
                        : `${getHoursRemaining(selectedBill.expiryDate)} hours`}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Route Details */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Route Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-600">Origin</Label>
                    <p className="font-medium">{selectedBill.origin}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Destination</Label>
                    <p className="font-medium">{selectedBill.destination}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Distance</Label>
                    <p className="font-medium">{selectedBill.distance} km</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Current Location</Label>
                    <p className="font-medium">{selectedBill.currentLocation}</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-gray-600">Estimated Delivery</Label>
                    <p className="font-medium">
                      {new Date(selectedBill.estimatedDelivery).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Party Details */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Party Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-600">Consignor</Label>
                    <p className="font-medium">{selectedBill.consignor}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Consignee</Label>
                    <p className="font-medium">{selectedBill.consignee}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Vehicle & Driver */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Vehicle & Driver</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-600">Vehicle Number</Label>
                    <p className="font-medium">{selectedBill.vehicleNumber}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Driver Name</Label>
                    <p className="font-medium">{selectedBill.driverName}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Driver Phone</Label>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{selectedBill.driverPhone}</p>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleContactDriver(selectedBill.driverPhone)}
                      >
                        <Phone className="w-3 h-3 mr-1" />
                        Call
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button 
                  className="flex-1 bg-[#1E88E5]"
                  onClick={() => handleExtendValidity(selectedBill.id)}
                  disabled={getHoursRemaining(selectedBill.expiryDate) < 0}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Extend Validity
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleSendAlert(selectedBill.id)}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Alert to Driver
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setIsDetailDialogOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      </div>
    </div>
  );
};

export default EwayBillExpiring;
