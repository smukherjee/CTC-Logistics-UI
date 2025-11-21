import { useState } from "react";
import { Camera, Plus, Trash2, AlertCircle, QrCode, ArrowLeft, ChevronRight, Bell, User, Save, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

interface Article {
  id: number;
  description: string;
  quantity: number;
  weight: number;
  weightUnit: string;
}

const mockParties = [
  { id: '1', name: 'ABC Industries', gst: '27AABCU9603R1ZM', address: 'Mumbai, Maharashtra' },
  { id: '2', name: 'XYZ Corp', gst: '29AADCB2230M1ZT', address: 'Bangalore, Karnataka' },
  { id: '3', name: 'DEF Traders', gst: '24AACCD5890L1Z1', address: 'Ahmedabad, Gujarat' },
  { id: '4', name: 'GHI Logistics', gst: '09AAECP8923Q1Z5', address: 'Delhi, NCR' },
  { id: '5', name: 'JKL Enterprises', gst: '33AAFCJ8239F1ZB', address: 'Chennai, Tamil Nadu' }
];

const mockDrivers = [
  { id: '1', name: 'Ramesh Kumar', phone: '9876543210', license: 'MH12-20180012345' },
  { id: '2', name: 'Suresh Patil', phone: '9876543211', license: 'MH12-20190023456' },
  { id: '3', name: 'Vijay Singh', phone: '9876543212', license: 'DL13-20170034567' }
];

export function CaptureLR() {
  const [showCamera, setShowCamera] = useState(false);
  const [lrNumber] = useState(`LR-${Date.now()}`);
  const [consignorId, setConsignorId] = useState('');
  const [consigneeId, setConsigneeId] = useState('');
  const [articles, setArticles] = useState<Article[]>([
    { id: 1, description: '', quantity: 0, weight: 0, weightUnit: 'kg' }
  ]);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const [formData, setFormData] = useState({
    bookingDate: new Date().toISOString().split('T')[0],
    consignor: '',
    consignorGST: '',
    consignorAddress: '',
    consignee: '',
    consigneeGST: '',
    consigneeAddress: '',
    origin: '',
    destination: '',
    distance: '',
    vehicleNumber: '',
    vehicleType: '',
    driverName: '',
    driverPhone: '',
    driverLicense: '',
    materialDescription: '',
    packingType: '',
    freightTerms: '',
    invoiceNumber: '',
    invoiceDate: '',
    invoiceValue: '',
    ewayBillNumber: '',
    ewayBillDate: '',
    ewayBillExpiry: '',
    insuranceCompany: '',
    insurancePolicyNumber: '',
    insuranceAmount: '',
    baseFreight: '',
    loadingCharges: '',
    unloadingCharges: '',
    doorDeliveryCharges: '',
    otherCharges: '',
    gstRate: '18',
    remarks: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: false });
    }
  };

  const handleConsignorChange = (id: string) => {
    setConsignorId(id);
    const party = mockParties.find(p => p.id === id);
    if (party) {
      setFormData({
        ...formData,
        consignor: party.name,
        consignorGST: party.gst,
        consignorAddress: party.address
      });
    }
  };

  const handleConsigneeChange = (id: string) => {
    setConsigneeId(id);
    const party = mockParties.find(p => p.id === id);
    if (party) {
      setFormData({
        ...formData,
        consignee: party.name,
        consigneeGST: party.gst,
        consigneeAddress: party.address
      });
    }
  };

  const handleDriverChange = (id: string) => {
    const driver = mockDrivers.find(d => d.id === id);
    if (driver) {
      setFormData({
        ...formData,
        driverName: driver.name,
        driverPhone: driver.phone,
        driverLicense: driver.license
      });
    }
  };

  const addArticle = () => {
    setArticles([...articles, {
      id: articles.length + 1,
      description: '',
      quantity: 0,
      weight: 0,
      weightUnit: 'kg'
    }]);
  };

  const removeArticle = (id: number) => {
    if (articles.length > 1) {
      setArticles(articles.filter(a => a.id !== id));
    }
  };

  const updateArticle = (id: number, field: keyof Article, value: string | number) => {
    setArticles(articles.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const calculateTotals = () => {
    const base = parseFloat(formData.baseFreight) || 0;
    const loading = parseFloat(formData.loadingCharges) || 0;
    const unloading = parseFloat(formData.unloadingCharges) || 0;
    const doorDelivery = parseFloat(formData.doorDeliveryCharges) || 0;
    const other = parseFloat(formData.otherCharges) || 0;
    const subtotal = base + loading + unloading + doorDelivery + other;
    const gstAmount = (subtotal * parseFloat(formData.gstRate)) / 100;
    const total = subtotal + gstAmount;
    return { subtotal, gstAmount, total };
  };

  const validateForm = () => {
    const newErrors: Record<string, boolean> = {};
    const required = ['bookingDate', 'consignor', 'consignee', 'origin', 'destination', 'vehicleNumber', 'materialDescription'];
    required.forEach(field => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = true;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      alert('LR saved successfully!');
    }
  };

  const totals = calculateTotals();

  return (
    <div className="h-full relative flex flex-col bg-[#F3F4F6]">
      {/* Header */}
      <div className="bg-[#0F172A] text-white p-4">
        <div className="flex items-center justify-between">
          <div className="w-8"></div>
          <h1 className="text-lg font-semibold">Capture LR</h1>
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 cursor-pointer" />
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-3 space-y-3 pb-20">
        <Card className="p-3 bg-white shadow-lg">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <Badge className="bg-blue-600 text-white text-sm px-3 py-1">
              {lrNumber}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCamera(!showCamera)}
              className="text-xs"
            >
              <Camera className="w-3 h-3 mr-1" />
              {showCamera ? "Hide Camera" : "Scan"}
            </Button>
          </div>

          {showCamera && (
            <div className="mt-2 bg-gray-900 rounded-lg p-4 text-center">
              <Camera className="w-12 h-12 mx-auto text-white mb-2" />
              <p className="text-white text-xs">Camera interface would appear here</p>
            </div>
          )}
        </Card>

        {/* LR Details */}
        <Card className="p-3 bg-white shadow-lg">
          <h2 className="text-base font-semibold mb-2 text-gray-900">LR Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label className="text-xs">Booking Date <span className="text-red-500">*</span></Label>
              <Input
                type="date"
                value={formData.bookingDate}
                onChange={(e) => handleInputChange('bookingDate', e.target.value)}
                className={`text-sm h-8 ${errors.bookingDate ? 'border-red-500' : ''}`}
              />
              {errors.bookingDate && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Required
                </p>
              )}
            </div>
          </div>
        </Card>

        {/* Party Details */}
        <Card className="p-3 bg-white shadow-lg">
          <h2 className="text-base font-semibold mb-2 text-gray-900">Party Details</h2>
          <div className="space-y-3">
            {/* Consignor */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label className="text-xs">Consignor <span className="text-red-500">*</span></Label>
                <Select value={consignorId} onValueChange={handleConsignorChange}>
                  <SelectTrigger className={`h-8 text-sm ${errors.consignor ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Select consignor" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockParties.map(party => (
                      <SelectItem key={party.id} value={party.id}>
                        {party.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">GST Number</Label>
                <Input className="h-8 text-sm bg-gray-50" value={formData.consignorGST} readOnly  />
              </div>
              <div className="col-span-2 space-y-1">
                <Label className="text-xs">Address</Label>
                <Input className="h-8 text-sm bg-gray-50" value={formData.consignorAddress} readOnly  />
              </div>
            </div>

            <Separator />

            {/* Consignee */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label className="text-xs">Consignee <span className="text-red-500">*</span></Label>
                <Select value={consigneeId} onValueChange={handleConsigneeChange}>
                  <SelectTrigger className={`h-8 text-sm ${errors.consignee ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Select consignee" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockParties.map(party => (
                      <SelectItem key={party.id} value={party.id}>
                        {party.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">GST Number</Label>
                <Input className="h-8 text-sm bg-gray-50" value={formData.consigneeGST} readOnly  />
              </div>
              <div className="col-span-2 space-y-1">
                <Label className="text-xs">Address</Label>
                <Input className="h-8 text-sm bg-gray-50" value={formData.consigneeAddress} readOnly  />
              </div>
            </div>
          </div>
        </Card>

        {/* Route Details */}
        <Card className="p-3 bg-white shadow-lg">
          <h2 className="text-base font-semibold mb-2 text-gray-900">Route Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="space-y-1">
              <Label className="text-xs">Origin <span className="text-red-500">*</span></Label>
              <Input
                value={formData.origin}
                onChange={(e) => handleInputChange('origin', e.target.value)}
                className={`h-8 text-sm ${errors.origin ? 'border-red-500' : ''}`}
                placeholder="Origin city"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Destination <span className="text-red-500">*</span></Label>
                <Input
                  value={formData.destination}
                  onChange={(e) => handleInputChange('destination', e.target.value)}
                  className={`h-8 text-sm ${errors.destination ? 'border-red-500' : ''}`}
                  placeholder="Destination city"
                />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Distance (km)</Label>
              <Input 
                type="number"
                value={formData.distance}
                onChange={(e) => handleInputChange('distance', e.target.value)}
                placeholder="0"
              />
            </div>
          </div>
        </Card>

        {/* Vehicle & Driver */}
        <Card className="p-3 bg-white shadow-lg">
          <h2 className="text-base font-semibold mb-2 text-gray-900">Vehicle & Driver</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label className="text-xs">Vehicle Number <span className="text-red-500">*</span></Label>
                <Input
                  value={formData.vehicleNumber}
                  onChange={(e) => handleInputChange('vehicleNumber', e.target.value.toUpperCase())}
                  className={`h-8 text-sm ${errors.vehicleNumber ? 'border-red-500' : ''}`}
                  placeholder="MH12AB1234"
                />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Vehicle Type</Label>
              <Select value={formData.vehicleType} onValueChange={(v: string) => handleInputChange('vehicleType', v)}>
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10-ton">10-Ton Truck</SelectItem>
                  <SelectItem value="15-ton">15-Ton Truck</SelectItem>
                  <SelectItem value="20-ton">20-Ton Truck</SelectItem>
                  <SelectItem value="container">Container</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Driver</Label>
              <Select onValueChange={handleDriverChange}>
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder="Select driver" />
                </SelectTrigger>
                <SelectContent>
                  {mockDrivers.map(driver => (
                    <SelectItem key={driver.id} value={driver.id}>
                      {driver.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Phone</Label>
              <Input className="h-8 text-sm bg-gray-50" />
            </div>
            <div className="col-span-2 space-y-1">
              <Label className="text-xs">License Number</Label>
              <Input className="h-8 text-sm bg-gray-50" value={formData.driverLicense} readOnly  />
            </div>
          </div>
        </Card>

        {/* Material Details */}
        <Card className="p-3 bg-white shadow-lg">
          <h2 className="text-base font-semibold mb-2 text-gray-900">Material Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            <div className="space-y-1">
              <Label className="text-xs">Material Description <span className="text-red-500">*</span></Label>
                <Input
                  value={formData.materialDescription}
                  onChange={(e) => handleInputChange('materialDescription', e.target.value)}
                  className={`h-8 text-sm ${errors.materialDescription ? 'border-red-500' : ''}`}
                  placeholder="Description of goods"
                />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Packing Type</Label>
              <Select value={formData.packingType} onValueChange={(v: string) => handleInputChange('packingType', v)}>
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder="Select packing" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="box">Box</SelectItem>
                  <SelectItem value="bag">Bag</SelectItem>
                  <SelectItem value="crate">Crate</SelectItem>
                  <SelectItem value="pallet">Pallet</SelectItem>
                  <SelectItem value="loose">Loose</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Freight Terms</Label>
              <Select value={formData.freightTerms} onValueChange={(v: string) => handleInputChange('freightTerms', v)}>
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder="Select terms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="topay">To Pay</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="tbb">To Be Billed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Articles */}
        <Card className="p-3 bg-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Articles</h2>
            <Button onClick={addArticle} size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Article
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell>
                    <Input 
                      value={article.description}
                      onChange={(e) => updateArticle(article.id, 'description', e.target.value)}
                      placeholder="Article description"
                    />
                  </TableCell>
                  <TableCell>
                    <Input 
                      type="number"
                      value={article.quantity || ''}
                      onChange={(e) => updateArticle(article.id, 'quantity', parseInt(e.target.value) || 0)}
                      placeholder="0"
                      className="w-24"
                    />
                  </TableCell>
                  <TableCell>
                    <Input 
                      type="number"
                      value={article.weight || ''}
                      onChange={(e) => updateArticle(article.id, 'weight', parseFloat(e.target.value) || 0)}
                      placeholder="0"
                      className="w-24"
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={article.weightUnit}
                      onValueChange={(v: string) => updateArticle(article.id, 'weightUnit', v)}
                    >
                      <SelectTrigger className="h-8 text-sm w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">kg</SelectItem>
                        <SelectItem value="ton">ton</SelectItem>
                        <SelectItem value="qtl">qtl</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {articles.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeArticle(article.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Invoice Details */}
        <Card className="p-3 bg-white shadow-lg">
          <h2 className="text-base font-semibold mb-2 text-gray-900">Invoice Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="space-y-1">
              <Label className="text-xs">Invoice Number</Label>
              <Input 
                value={formData.invoiceNumber}
                onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
                placeholder="INV-XXXX"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Invoice Date</Label>
              <Input 
                type="date"
                value={formData.invoiceDate}
                onChange={(e) => handleInputChange('invoiceDate', e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Invoice Value (₹)</Label>
              <Input 
                type="number"
                value={formData.invoiceValue}
                onChange={(e) => handleInputChange('invoiceValue', e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>
        </Card>

        {/* E-way Bill Details */}
        <Card className="p-3 bg-white shadow-lg">
          <h2 className="text-base font-semibold mb-2 text-gray-900">E-way Bill Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="space-y-1">
              <Label className="text-xs">E-way Bill Number</Label>
              <Input 
                value={formData.ewayBillNumber}
                onChange={(e) => handleInputChange('ewayBillNumber', e.target.value)}
                placeholder="12-digit number"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Bill Date</Label>
              <Input 
                type="date"
                value={formData.ewayBillDate}
                onChange={(e) => handleInputChange('ewayBillDate', e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Expiry Date</Label>
              <Input 
                type="date"
                value={formData.ewayBillExpiry}
                onChange={(e) => handleInputChange('ewayBillExpiry', e.target.value)}
              />
            </div>
          </div>
        </Card>

        {/* Insurance Details */}
        <Card className="p-3 bg-white shadow-lg">
          <h2 className="text-base font-semibold mb-2 text-gray-900">Insurance Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="space-y-1">
              <Label className="text-xs">Insurance Company</Label>
              <Input 
                value={formData.insuranceCompany}
                onChange={(e) => handleInputChange('insuranceCompany', e.target.value)}
                placeholder="Company name"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Policy Number</Label>
              <Input 
                value={formData.insurancePolicyNumber}
                onChange={(e) => handleInputChange('insurancePolicyNumber', e.target.value)}
                placeholder="Policy number"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Insured Amount (₹)</Label>
              <Input 
                type="number"
                value={formData.insuranceAmount}
                onChange={(e) => handleInputChange('insuranceAmount', e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>
        </Card>

        {/* Freight & Charges */}
        <Card className="p-3 bg-white shadow-lg">
          <h2 className="text-base font-semibold mb-2 text-gray-900">Freight & Charges</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label className="text-xs">Base Freight (₹)</Label>
              <Input 
                type="number"
                value={formData.baseFreight}
                onChange={(e) => handleInputChange('baseFreight', e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Loading Charges (₹)</Label>
              <Input 
                type="number"
                value={formData.loadingCharges}
                onChange={(e) => handleInputChange('loadingCharges', e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Unloading Charges (₹)</Label>
              <Input 
                type="number"
                value={formData.unloadingCharges}
                onChange={(e) => handleInputChange('unloadingCharges', e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Door Delivery Charges (₹)</Label>
              <Input 
                type="number"
                value={formData.doorDeliveryCharges}
                onChange={(e) => handleInputChange('doorDeliveryCharges', e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Other Charges (₹)</Label>
              <Input 
                type="number"
                value={formData.otherCharges}
                onChange={(e) => handleInputChange('otherCharges', e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">GST Rate (%)</Label>
              <Select value={formData.gstRate} onValueChange={(v: string) => handleInputChange('gstRate', v)}>
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5%</SelectItem>
                  <SelectItem value="12">12%</SelectItem>
                  <SelectItem value="18">18%</SelectItem>
                  <SelectItem value="28">28%</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Totals */}
          <div className="space-y-3 bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between text-lg">
              <span className="font-medium">Subtotal:</span>
              <span className="font-semibold">₹{totals.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span className="font-medium">GST ({formData.gstRate}%):</span>
              <span className="font-semibold">₹{totals.gstAmount.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-2xl">
              <span className="font-bold">Total Amount:</span>
              <span className="font-bold text-blue-600">₹{totals.total.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        {/* Remarks */}
        <Card className="p-3 bg-white shadow-lg">
          <h2 className="text-base font-semibold mb-2 text-gray-900">Remarks</h2>
          <Textarea
            value={formData.remarks}
            onChange={(e) => handleInputChange('remarks', e.target.value)}
            placeholder="Enter any additional remarks or instructions..."
            className="min-h-16 text-sm"
          />
        </Card>

        {/* QR Code Display */}
        <Card className="p-3 bg-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-gray-900">LR QR Code</h2>
              <p className="text-xs text-gray-600 mt-1">Scan to view LR details</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <QrCode className="w-16 h-16 text-gray-400" />
            </div>
          </div>
        </Card>
        </div>
      </div>

      {/* Bottom Navigation - Action Buttons */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="grid grid-cols-2 divide-x divide-gray-200">
          <button 
            className="flex flex-col items-center justify-center py-3 active:bg-gray-50 transition-colors"
            onClick={handleSubmit}
          >
            <Save className="w-5 h-5 text-[#16A34A] mb-1" />
            <span className="text-xs text-[#0F172A] font-medium">Save LR</span>
          </button>
          <button 
            className="flex flex-col items-center justify-center py-3 active:bg-gray-50 transition-colors"
            onClick={() => window.location.reload()}
          >
            <X className="w-5 h-5 text-gray-600 mb-1" />
            <span className="text-xs text-[#0F172A] font-medium">Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
}
