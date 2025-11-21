import React, { useState } from 'react';
import { Plus, Edit, Trash2, Phone, FileText, TrendingUp, Calendar, Upload, X, Check, AlertCircle, User, Bell } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

interface Driver {
  id: string;
  name: string;
  phone: string;
  licenseNo: string;
  licenseExpiry: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  emergencyContact: string;
  emergencyName: string;
  bloodGroup: string;
  joiningDate: string;
  status: 'active' | 'inactive';
  aadharNo: string;
  panNo: string;
  totalTrips: number;
  rating: number;
}

const mockDrivers: Driver[] = [
  {
    id: '1',
    name: 'Ramesh Kumar',
    phone: '+91 98765 43210',
    licenseNo: 'MH1234567890',
    licenseExpiry: '2026-12-31',
    address: '123, Shivaji Nagar',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    emergencyContact: '+91 98765 43299',
    emergencyName: 'Sunita Kumar',
    bloodGroup: 'O+',
    joiningDate: '2022-01-15',
    status: 'active',
    aadharNo: '1234 5678 9012',
    panNo: 'ABCDE1234F',
    totalTrips: 145,
    rating: 4.5
  },
  {
    id: '2',
    name: 'Suresh Patil',
    phone: '+91 98765 43211',
    licenseNo: 'MH2345678901',
    licenseExpiry: '2025-06-30',
    address: '456, Patel Road',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411001',
    emergencyContact: '+91 98765 43298',
    emergencyName: 'Kavita Patil',
    bloodGroup: 'A+',
    joiningDate: '2021-06-20',
    status: 'active',
    aadharNo: '2345 6789 0123',
    panNo: 'BCDEF2345G',
    totalTrips: 198,
    rating: 4.8
  },
  {
    id: '3',
    name: 'Vijay Singh',
    phone: '+91 98765 43212',
    licenseNo: 'DL3456789012',
    licenseExpiry: '2024-12-15',
    address: '789, Nehru Place',
    city: 'Delhi',
    state: 'Delhi',
    pincode: '110019',
    emergencyContact: '+91 98765 43297',
    emergencyName: 'Priya Singh',
    bloodGroup: 'B+',
    joiningDate: '2023-03-10',
    status: 'active',
    aadharNo: '3456 7890 1234',
    panNo: 'CDEFG3456H',
    totalTrips: 87,
    rating: 4.2
  }
];

const mockTripHistory = [
  { id: '1', lrNo: 'LR001', route: 'Mumbai - Pune', date: '2025-11-10', status: 'Completed' },
  { id: '2', lrNo: 'LR002', route: 'Mumbai - Nashik', date: '2025-11-08', status: 'Completed' },
  { id: '3', lrNo: 'LR003', route: 'Thane - Pune', date: '2025-11-05', status: 'Completed' }
];

const DriverManagement: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>(mockDrivers);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [formData, setFormData] = useState<Partial<Driver>>({});
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         driver.phone.includes(searchQuery) ||
                         driver.licenseNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || driver.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddNew = () => {
    setFormData({
      status: 'active',
      joiningDate: new Date().toISOString().split('T')[0],
      totalTrips: 0,
      rating: 0
    });
    setSelectedDriver(null);
    setIsAddEditDialogOpen(true);
    setErrors({});
  };

  const handleEdit = (driver: Driver) => {
    setFormData(driver);
    setSelectedDriver(driver);
    setIsAddEditDialogOpen(true);
    setErrors({});
  };

  const handleView = (driver: Driver) => {
    setSelectedDriver(driver);
    setIsViewDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this driver?')) {
      setDrivers(drivers.filter(d => d.id !== id));
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: false });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, boolean> = {};
    const required = ['name', 'phone', 'licenseNo', 'licenseExpiry', 'address', 'city', 'state', 'pincode', 'bloodGroup'];
    required.forEach(field => {
      if (!formData[field as keyof Driver]) {
        newErrors[field] = true;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      if (selectedDriver) {
        // Edit existing driver
        setDrivers(drivers.map(d => d.id === selectedDriver.id ? { ...d, ...formData } as Driver : d));
      } else {
        // Add new driver
        const newDriver: Driver = {
          ...formData as Driver,
          id: `${Date.now()}`,
        };
        setDrivers([...drivers, newDriver]);
      }
      setIsAddEditDialogOpen(false);
      setFormData({});
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800 border-green-300' : 'bg-gray-100 text-gray-800 border-gray-300';
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] pb-24">
      {/* Header */}
      <div className="bg-[#0F172A] text-white p-4">
        <div className="flex items-center justify-between">
          <div className="w-8"></div>
          <h1 className="text-lg font-semibold">Driver Management</h1>
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
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Drivers</p>
              <p className="text-2xl font-bold text-gray-900">{drivers.length}</p>
            </div>
            <User className="w-10 h-10 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {drivers.filter(d => d.status === 'active').length}
              </p>
            </div>
            <Check className="w-10 h-10 text-green-600" />
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">License Expiring</p>
              <p className="text-2xl font-bold text-gray-900">
                {drivers.filter(d => {
                  const expiry = new Date(d.licenseExpiry);
                  const now = new Date();
                  const diff = expiry.getTime() - now.getTime();
                  return diff < 90 * 24 * 60 * 60 * 1000 && diff > 0;
                }).length}
              </p>
            </div>
            <AlertCircle className="w-10 h-10 text-yellow-600" />
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Trips</p>
              <p className="text-2xl font-bold text-gray-900">
                {drivers.reduce((sum, d) => sum + d.totalTrips, 0)}
              </p>
            </div>
            <TrendingUp className="w-10 h-10 text-purple-600" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Input
              placeholder="Search by name, phone, or license number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Drivers Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>License No</TableHead>
              <TableHead>License Expiry</TableHead>
              <TableHead>Total Trips</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDrivers.map((driver) => {
              const daysToExpiry = Math.floor((new Date(driver.licenseExpiry).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
              const isExpiringSoon = daysToExpiry < 90 && daysToExpiry > 0;
              
              return (
                <TableRow key={driver.id} className="cursor-pointer hover:bg-gray-50" onClick={() => handleView(driver)}>
                  <TableCell className="font-medium">{driver.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {driver.phone}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{driver.licenseNo}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{new Date(driver.licenseExpiry).toLocaleDateString('en-IN')}</span>
                      {isExpiringSoon && (
                        <Badge className="mt-1 bg-yellow-100 text-yellow-800 border-yellow-300 text-xs w-fit">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {daysToExpiry} days left
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{driver.totalTrips}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{driver.rating.toFixed(1)}</span>
                      <span className="text-yellow-500">★</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(driver.status)}>
                      {driver.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(driver)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(driver.id)} className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isAddEditDialogOpen} onOpenChange={setIsAddEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedDriver ? 'Edit Driver' : 'Add New Driver'}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Personal Details */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Personal Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name <span className="text-red-500">*</span></Label>
                  <Input 
                    value={formData.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={errors.name ? 'border-red-500' : ''}
                    placeholder="Enter full name"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Required
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Phone Number <span className="text-red-500">*</span></Label>
                  <Input 
                    value={formData.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={errors.phone ? 'border-red-500' : ''}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Blood Group <span className="text-red-500">*</span></Label>
                  <Select value={formData.bloodGroup || ''} onValueChange={(v: string) => handleInputChange('bloodGroup', v)}>
                    <SelectTrigger className={errors.bloodGroup ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Joining Date</Label>
                  <Input 
                    type="date"
                    value={formData.joiningDate || ''}
                    onChange={(e) => handleInputChange('joiningDate', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* License Details */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">License Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>License Number <span className="text-red-500">*</span></Label>
                  <Input 
                    value={formData.licenseNo || ''}
                    onChange={(e) => handleInputChange('licenseNo', e.target.value)}
                    className={errors.licenseNo ? 'border-red-500' : ''}
                    placeholder="Enter license number"
                  />
                </div>
                <div className="space-y-2">
                  <Label>License Expiry <span className="text-red-500">*</span></Label>
                  <Input 
                    type="date"
                    value={formData.licenseExpiry || ''}
                    onChange={(e) => handleInputChange('licenseExpiry', e.target.value)}
                    className={errors.licenseExpiry ? 'border-red-500' : ''}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Address Details */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Address Details</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Address <span className="text-red-500">*</span></Label>
                  <Input 
                    value={formData.address || ''}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className={errors.address ? 'border-red-500' : ''}
                    placeholder="Street address"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>City <span className="text-red-500">*</span></Label>
                    <Input 
                      value={formData.city || ''}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className={errors.city ? 'border-red-500' : ''}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>State <span className="text-red-500">*</span></Label>
                    <Input 
                      value={formData.state || ''}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className={errors.state ? 'border-red-500' : ''}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Pincode <span className="text-red-500">*</span></Label>
                    <Input 
                      value={formData.pincode || ''}
                      onChange={(e) => handleInputChange('pincode', e.target.value)}
                      className={errors.pincode ? 'border-red-500' : ''}
                      maxLength={6}
                    />
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Emergency Contact */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Emergency Contact</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Contact Name</Label>
                  <Input 
                    value={formData.emergencyName || ''}
                    onChange={(e) => handleInputChange('emergencyName', e.target.value)}
                    placeholder="Emergency contact name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Contact Phone</Label>
                  <Input 
                    value={formData.emergencyContact || ''}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Documents */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Document Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Aadhar Number</Label>
                  <Input 
                    value={formData.aadharNo || ''}
                    onChange={(e) => handleInputChange('aadharNo', e.target.value)}
                    placeholder="XXXX XXXX XXXX"
                    maxLength={14}
                  />
                </div>
                <div className="space-y-2">
                  <Label>PAN Number</Label>
                  <Input 
                    value={formData.panNo || ''}
                    onChange={(e) => handleInputChange('panNo', e.target.value)}
                    placeholder="ABCDE1234F"
                    maxLength={10}
                    className="uppercase"
                  />
                </div>
              </div>

              <div className="mt-4 p-4 border-2 border-dashed rounded-lg bg-gray-50">
                <div className="flex flex-col items-center justify-center gap-2">
                  <Upload className="w-8 h-8 text-gray-400" />
                  <p className="text-sm text-gray-600">Upload Documents</p>
                  <p className="text-xs text-gray-500">License, Aadhar, PAN copies</p>
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Files
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            {/* Status */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Status</h3>
              <Select value={formData.status || 'active'} onValueChange={(v: string) => handleInputChange('status', v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsAddEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-[#16A34A]">
              <Check className="w-4 h-4 mr-2" />
              Save Driver
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Driver Details</DialogTitle>
          </DialogHeader>

          {selectedDriver && (
            <Tabs defaultValue="details" className="mt-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="trips">Trip History</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{selectedDriver.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{selectedDriver.phone}</p>
                        </div>
                        <Badge className={getStatusColor(selectedDriver.status)}>
                          {selectedDriver.status.toUpperCase()}
                        </Badge>
                      </div>
                    </Card>

                    <div className="grid grid-cols-3 gap-4">
                      <Card className="p-4 text-center">
                        <p className="text-sm text-gray-600">Total Trips</p>
                        <p className="text-2xl font-bold text-gray-900">{selectedDriver.totalTrips}</p>
                      </Card>
                      <Card className="p-4 text-center">
                        <p className="text-sm text-gray-600">Rating</p>
                        <p className="text-2xl font-bold text-gray-900">{selectedDriver.rating.toFixed(1)} ★</p>
                      </Card>
                      <Card className="p-4 text-center">
                        <p className="text-sm text-gray-600">Experience</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {Math.floor((new Date().getTime() - new Date(selectedDriver.joiningDate).getTime()) / (1000 * 60 * 60 * 24 * 365))} yrs
                        </p>
                      </Card>
                    </div>

                    <Card className="p-4">
                      <h4 className="font-semibold mb-3">License Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">License Number:</span>
                          <span className="font-medium font-mono">{selectedDriver.licenseNo}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Expiry Date:</span>
                          <span className="font-medium">{new Date(selectedDriver.licenseExpiry).toLocaleDateString('en-IN')}</span>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4">
                      <h4 className="font-semibold mb-3">Contact Information</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-600">Address:</span>
                          <p className="font-medium">{selectedDriver.address}</p>
                          <p className="font-medium">{selectedDriver.city}, {selectedDriver.state} - {selectedDriver.pincode}</p>
                        </div>
                        <Separator />
                        <div>
                          <span className="text-gray-600">Emergency Contact:</span>
                          <p className="font-medium">{selectedDriver.emergencyName}</p>
                          <p className="font-medium">{selectedDriver.emergencyContact}</p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4">
                      <h4 className="font-semibold mb-3">Additional Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Blood Group:</span>
                          <Badge variant="outline">{selectedDriver.bloodGroup}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Aadhar:</span>
                          <span className="font-medium font-mono">{selectedDriver.aadharNo}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">PAN:</span>
                          <span className="font-medium font-mono">{selectedDriver.panNo}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Joining Date:</span>
                          <span className="font-medium">{new Date(selectedDriver.joiningDate).toLocaleDateString('en-IN')}</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="documents">
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    <Card className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Driving License</h4>
                        <FileText className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="bg-gray-100 h-32 rounded flex items-center justify-center">
                        <p className="text-gray-500">License Copy</p>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-2">
                        View Document
                      </Button>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Aadhar Card</h4>
                        <FileText className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="bg-gray-100 h-32 rounded flex items-center justify-center">
                        <p className="text-gray-500">Aadhar Copy</p>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-2">
                        View Document
                      </Button>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">PAN Card</h4>
                        <FileText className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="bg-gray-100 h-32 rounded flex items-center justify-center">
                        <p className="text-gray-500">PAN Copy</p>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-2">
                        View Document
                      </Button>
                    </Card>
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="trips">
                <ScrollArea className="h-[400px]">
                  <div className="space-y-3">
                    {mockTripHistory.map(trip => (
                      <Card key={trip.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{trip.lrNo}</p>
                            <p className="text-sm text-gray-600">{trip.route}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              <Calendar className="w-3 h-3 inline mr-1" />
                              {trip.date}
                            </p>
                          </div>
                          <Badge className="bg-green-100 text-green-800 border-green-300">
                            {trip.status}
                          </Badge>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
      </div>
    </div>
  );
};

export default DriverManagement;
