import React, { useState } from 'react';
import { Plus, Edit, Trash2, Check, X, AlertCircle, TrendingUp, DollarSign, Truck, Bell, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';

interface WeightSlab {
  id: number;
  minWeight: number;
  maxWeight: number;
  rate: number;
}

interface Rate {
  id: string;
  origin: string;
  destination: string;
  vehicleType: string;
  baseRate: number;
  ratePerKm: number;
  ratePerTon: number;
  weightSlabs: WeightSlab[];
  customerSpecific: boolean;
  customerName?: string;
  effectiveFrom: string;
  effectiveTo: string;
  isActive: boolean;
  createdDate: string;
}

const mockRates: Rate[] = [
  {
    id: '1',
    origin: 'Mumbai',
    destination: 'Pune',
    vehicleType: '10-Ton Truck',
    baseRate: 5000,
    ratePerKm: 25,
    ratePerTon: 500,
    weightSlabs: [
      { id: 1, minWeight: 0, maxWeight: 5, rate: 500 },
      { id: 2, minWeight: 5, maxWeight: 10, rate: 450 },
      { id: 3, minWeight: 10, maxWeight: 20, rate: 400 }
    ],
    customerSpecific: false,
    effectiveFrom: '2025-01-01',
    effectiveTo: '2025-12-31',
    isActive: true,
    createdDate: '2025-01-01'
  },
  {
    id: '2',
    origin: 'Mumbai',
    destination: 'Delhi',
    vehicleType: '20-Ton Truck',
    baseRate: 25000,
    ratePerKm: 35,
    ratePerTon: 800,
    weightSlabs: [
      { id: 1, minWeight: 0, maxWeight: 10, rate: 800 },
      { id: 2, minWeight: 10, maxWeight: 20, rate: 750 }
    ],
    customerSpecific: true,
    customerName: 'ABC Industries',
    effectiveFrom: '2025-01-01',
    effectiveTo: '2025-12-31',
    isActive: true,
    createdDate: '2025-01-01'
  },
  {
    id: '3',
    origin: 'Bangalore',
    destination: 'Chennai',
    vehicleType: '15-Ton Truck',
    baseRate: 8000,
    ratePerKm: 28,
    ratePerTon: 600,
    weightSlabs: [
      { id: 1, minWeight: 0, maxWeight: 15, rate: 600 }
    ],
    customerSpecific: false,
    effectiveFrom: '2025-01-01',
    effectiveTo: '2025-12-31',
    isActive: true,
    createdDate: '2025-01-01'
  }
];

const RateMaster: React.FC = () => {
  const [rates, setRates] = useState<Rate[]>(mockRates);
  const [selectedRate, setSelectedRate] = useState<Rate | null>(null);
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState('all');
  const [formData, setFormData] = useState<Partial<Rate>>({});
  const [weightSlabs, setWeightSlabs] = useState<WeightSlab[]>([
    { id: 1, minWeight: 0, maxWeight: 0, rate: 0 }
  ]);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Ahmedabad', 'Chennai', 'Kolkata', 'Hyderabad', 'Surat', 'Jaipur'];
  const vehicleTypes = ['10-Ton Truck', '15-Ton Truck', '20-Ton Truck', '25-Ton Truck', '32-Ton Truck', 'Container'];
  const customers = ['ABC Industries', 'XYZ Corp', 'DEF Traders', 'GHI Logistics', 'JKL Enterprises'];

  const filteredRates = rates.filter(rate => {
    const matchesSearch = rate.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         rate.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         rate.customerName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVehicle = vehicleTypeFilter === 'all' || rate.vehicleType === vehicleTypeFilter;
    return matchesSearch && matchesVehicle;
  });

  const handleAddNew = () => {
    setFormData({
      isActive: true,
      effectiveFrom: new Date().toISOString().split('T')[0],
      effectiveTo: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      customerSpecific: false,
      baseRate: 0,
      ratePerKm: 0,
      ratePerTon: 0
    });
    setWeightSlabs([{ id: 1, minWeight: 0, maxWeight: 0, rate: 0 }]);
    setSelectedRate(null);
    setIsAddEditDialogOpen(true);
    setErrors({});
  };

  const handleEdit = (rate: Rate) => {
    setFormData(rate);
    setWeightSlabs(rate.weightSlabs || [{ id: 1, minWeight: 0, maxWeight: 0, rate: 0 }]);
    setSelectedRate(rate);
    setIsAddEditDialogOpen(true);
    setErrors({});
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this rate?')) {
      setRates(rates.filter(r => r.id !== id));
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: false });
    }
  };

  const addWeightSlab = () => {
    setWeightSlabs([...weightSlabs, { 
      id: weightSlabs.length + 1, 
      minWeight: 0, 
      maxWeight: 0, 
      rate: 0 
    }]);
  };

  const removeWeightSlab = (id: number) => {
    if (weightSlabs.length > 1) {
      setWeightSlabs(weightSlabs.filter(s => s.id !== id));
    }
  };

  const updateWeightSlab = (id: number, field: keyof WeightSlab, value: number) => {
    setWeightSlabs(weightSlabs.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const validateForm = () => {
    const newErrors: Record<string, boolean> = {};
    const required = ['origin', 'destination', 'vehicleType', 'baseRate', 'effectiveFrom', 'effectiveTo'];
    required.forEach(field => {
      if (!formData[field as keyof Rate]) {
        newErrors[field] = true;
      }
    });
    if (formData.customerSpecific && !formData.customerName) {
      newErrors.customerName = true;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      const rateData = {
        ...formData,
        weightSlabs,
        createdDate: formData.createdDate || new Date().toISOString().split('T')[0]
      };

      if (selectedRate) {
        setRates(rates.map(r => r.id === selectedRate.id ? { ...r, ...rateData } as Rate : r));
      } else {
        const newRate: Rate = {
          ...rateData as Rate,
          id: `${Date.now()}`,
        };
        setRates([...rates, newRate]);
      }
      setIsAddEditDialogOpen(false);
      setFormData({});
      setWeightSlabs([{ id: 1, minWeight: 0, maxWeight: 0, rate: 0 }]);
    }
  };

  const toggleRateStatus = (id: string) => {
    setRates(rates.map(r => r.id === id ? { ...r, isActive: !r.isActive } : r));
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] pb-24">
      {/* Header */}
      <div className="bg-[#0F172A] text-white p-4">
        <div className="flex items-center justify-between">
          <div className="w-8"></div>
          <h1 className="text-lg font-semibold">Rate Master</h1>
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
              <p className="text-sm text-gray-600">Total Rates</p>
              <p className="text-2xl font-bold text-gray-900">{rates.length}</p>
            </div>
            <DollarSign className="w-10 h-10 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Rates</p>
              <p className="text-2xl font-bold text-gray-900">
                {rates.filter(r => r.isActive).length}
              </p>
            </div>
            <Check className="w-10 h-10 text-green-600" />
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Customer Specific</p>
              <p className="text-2xl font-bold text-gray-900">
                {rates.filter(r => r.customerSpecific).length}
              </p>
            </div>
            <TrendingUp className="w-10 h-10 text-purple-600" />
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Base Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                ₹{Math.round(rates.reduce((sum, r) => sum + r.baseRate, 0) / rates.length).toLocaleString('en-IN')}
              </p>
            </div>
            <Truck className="w-10 h-10 text-yellow-600" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Input
              placeholder="Search by origin, destination, or customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <Select value={vehicleTypeFilter} onValueChange={setVehicleTypeFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Vehicle Types</SelectItem>
                {vehicleTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Rates Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Route</TableHead>
              <TableHead>Vehicle Type</TableHead>
              <TableHead>Base Rate</TableHead>
              <TableHead>Rate/Km</TableHead>
              <TableHead>Rate/Ton</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Valid Period</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRates.map((rate) => (
              <TableRow key={rate.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <span>{rate.origin}</span>
                    <span className="text-gray-400">→</span>
                    <span>{rate.destination}</span>
                  </div>
                </TableCell>
                <TableCell>{rate.vehicleType}</TableCell>
                <TableCell className="font-medium">₹{rate.baseRate.toLocaleString('en-IN')}</TableCell>
                <TableCell>₹{rate.ratePerKm}</TableCell>
                <TableCell>₹{rate.ratePerTon}</TableCell>
                <TableCell>
                  {rate.customerSpecific ? (
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-300">
                      {rate.customerName}
                    </Badge>
                  ) : (
                    <span className="text-gray-500 text-sm">General</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{new Date(rate.effectiveFrom).toLocaleDateString('en-IN')}</div>
                    <div className="text-gray-500">to {new Date(rate.effectiveTo).toLocaleDateString('en-IN')}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={rate.isActive}
                      onCheckedChange={() => toggleRateStatus(rate.id)}
                    />
                    <Badge className={rate.isActive ? 'bg-green-100 text-green-800 border-green-300' : 'bg-gray-100 text-gray-800 border-gray-300'}>
                      {rate.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(rate)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(rate.id)} className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isAddEditDialogOpen} onOpenChange={setIsAddEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedRate ? 'Edit Rate' : 'Add New Rate'}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Route Details */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Route Details</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Origin <span className="text-red-500">*</span></Label>
                  <Select value={formData.origin || ''} onValueChange={(v: string) => handleInputChange('origin', v)}>
                    <SelectTrigger className={errors.origin ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select origin" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map(city => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.origin && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Required
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Destination <span className="text-red-500">*</span></Label>
                  <Select value={formData.destination || ''} onValueChange={(v: string) => handleInputChange('destination', v)}>
                    <SelectTrigger className={errors.destination ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map(city => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Vehicle Type <span className="text-red-500">*</span></Label>
                  <Select value={formData.vehicleType || ''} onValueChange={(v: string) => handleInputChange('vehicleType', v)}>
                    <SelectTrigger className={errors.vehicleType ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicleTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Base Rates */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Base Rates</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Base Rate (₹) <span className="text-red-500">*</span></Label>
                  <Input 
                    type="number"
                    value={formData.baseRate || ''}
                    onChange={(e) => handleInputChange('baseRate', parseFloat(e.target.value))}
                    className={errors.baseRate ? 'border-red-500' : ''}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Rate per Km (₹)</Label>
                  <Input 
                    type="number"
                    value={formData.ratePerKm || ''}
                    onChange={(e) => handleInputChange('ratePerKm', parseFloat(e.target.value))}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Rate per Ton (₹)</Label>
                  <Input 
                    type="number"
                    value={formData.ratePerTon || ''}
                    onChange={(e) => handleInputChange('ratePerTon', parseFloat(e.target.value))}
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Weight Slabs */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Weight Slab Pricing</h3>
                <Button size="sm" onClick={addWeightSlab} variant="outline">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Slab
                </Button>
              </div>
              <div className="space-y-3">
                {weightSlabs.map((slab, index) => (
                  <Card key={slab.id} className="p-4 bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="flex-1 grid grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs">Min Weight (Tons)</Label>
                          <Input 
                            type="number"
                            value={slab.minWeight}
                            onChange={(e) => updateWeightSlab(slab.id, 'minWeight', parseFloat(e.target.value) || 0)}
                            placeholder="0"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Max Weight (Tons)</Label>
                          <Input 
                            type="number"
                            value={slab.maxWeight}
                            onChange={(e) => updateWeightSlab(slab.id, 'maxWeight', parseFloat(e.target.value) || 0)}
                            placeholder="0"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Rate (₹/Ton)</Label>
                          <Input 
                            type="number"
                            value={slab.rate}
                            onChange={(e) => updateWeightSlab(slab.id, 'rate', parseFloat(e.target.value) || 0)}
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                      {weightSlabs.length > 1 && (
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => removeWeightSlab(slab.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <Separator />

            {/* Customer Specific */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Customer Specific Rate</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.customerSpecific || false}
                    onCheckedChange={(checked: boolean) => handleInputChange('customerSpecific', checked)}
                  />
                  <Label>This is a customer-specific rate</Label>
                </div>
                
                {formData.customerSpecific && (
                  <div className="space-y-2">
                    <Label>Customer Name <span className="text-red-500">*</span></Label>
                    <Select value={formData.customerName || ''} onValueChange={(v: string) => handleInputChange('customerName', v)}>
                      <SelectTrigger className={errors.customerName ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>
                      <SelectContent>
                        {customers.map(customer => (
                          <SelectItem key={customer} value={customer}>{customer}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.customerName && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Required for customer-specific rates
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Validity Period */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Validity Period</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Effective From <span className="text-red-500">*</span></Label>
                  <Input 
                    type="date"
                    value={formData.effectiveFrom || ''}
                    onChange={(e) => handleInputChange('effectiveFrom', e.target.value)}
                    className={errors.effectiveFrom ? 'border-red-500' : ''}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Effective To <span className="text-red-500">*</span></Label>
                  <Input 
                    type="date"
                    value={formData.effectiveTo || ''}
                    onChange={(e) => handleInputChange('effectiveTo', e.target.value)}
                    className={errors.effectiveTo ? 'border-red-500' : ''}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Status */}
            <div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.isActive !== false}
                  onCheckedChange={(checked: boolean) => handleInputChange('isActive', checked)}
                />
                <Label>Active</Label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsAddEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-[#16A34A]">
              <Check className="w-4 h-4 mr-2" />
              Save Rate
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      </div>
    </div>
  );
};

export default RateMaster;
