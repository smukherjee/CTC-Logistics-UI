import React, { useState, useRef } from 'react';
import { Camera, QrCode, Search, Mic, MapPin, Clock, Save, X, Plus, Check, ArrowLeft, ChevronRight, Bell, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';

interface LRRecord {
  id: string;
  lrNo: string;
  consignor: string;
  consignee: string;
  from: string;
  to: string;
  vehicleNo: string;
}

const mockLRData: LRRecord[] = [
  {
    id: '1',
    lrNo: 'LR001',
    consignor: 'ABC Industries',
    consignee: 'XYZ Retail Ltd',
    from: 'Mumbai',
    to: 'Pune',
    vehicleNo: 'MH12AB1234'
  },
  {
    id: '2',
    lrNo: 'LR002',
    consignor: 'ABC Industries',
    consignee: 'XYZ Retail Ltd',
    from: 'Mumbai',
    to: 'Pune',
    vehicleNo: 'MH12AB1234'
  },
  {
    id: '3',
    lrNo: 'LR003',
    consignor: 'PQR Manufacturing',
    consignee: 'LMN Distributors',
    from: 'Bangalore',
    to: 'Chennai',
    vehicleNo: 'KA03EF9012'
  }
];

const MarkDelivered: React.FC = () => {
  const [selectedLR, setSelectedLR] = useState<LRRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [podPhotos, setPodPhotos] = useState<string[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [description, setDescription] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [signatureSaved, setSignatureSaved] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null);

  const filteredLRs = mockLRData.filter(lr =>
    lr.lrNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lr.consignor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lr.consignee.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePhotoCapture = () => {
    // Simulate photo capture
    const newPhoto = `photo_${Date.now()}.jpg`;
    setPodPhotos([...podPhotos, newPhoto]);
  };

  const removePhoto = (index: number) => {
    setPodPhotos(podPhotos.filter((_, i) => i !== index));
  };

  const startDrawing = (e: React.TouchEvent<HTMLCanvasElement> | React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    
    setLastPos({ x, y });
  };

  const draw = (e: React.TouchEvent<HTMLCanvasElement> | React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPos) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(x, y);
    ctx.stroke();

    setLastPos({ x, y });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setLastPos(null);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureSaved(false);
  };

  const saveSignature = () => {
    setSignatureSaved(true);
  };

  const toggleVoiceRecording = () => {
    if (!isRecording) {
      // Start recording
      setIsRecording(true);
      // Simulate voice input after 2 seconds
      setTimeout(() => {
        setDescription(prev => prev + ' Delivered successfully at customer location.');
        setIsRecording(false);
      }, 2000);
    } else {
      // Stop recording
      setIsRecording(false);
    }
  };

  const handleScanQR = () => {
    // Simulate QR scan
    const scannedLR = mockLRData[0];
    setSelectedLR(scannedLR);
    setShowSearch(false);
  };

  const handleSaveDelivery = () => {
    // Get current GPS coordinates (simulated)
    const gpsCoords = {
      latitude: 18.5204,
      longitude: 73.8567
    };
    const timestamp = new Date().toISOString();

    alert(`Delivery marked successfully!\n\nLR: ${selectedLR?.lrNo}\nGPS: ${gpsCoords.latitude}, ${gpsCoords.longitude}\nTime: ${new Date(timestamp).toLocaleString('en-IN')}\nPhotos: ${podPhotos.length}\nSignature: ${signatureSaved ? 'Captured' : 'Not captured'}`);
    
    // Reset form
    setSelectedLR(null);
    setPodPhotos([]);
    setDescription('');
    clearSignature();
  };

  return (
    <div className="h-full relative flex flex-col bg-[#F3F4F6]">
      {/* Header */}
      <div className="bg-[#0F172A] text-white p-4">
        <div className="flex items-center justify-between">
          <div className="w-8"></div>
          <h1 className="text-lg font-semibold">Mark Delivered</h1>
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 cursor-pointer" />
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 pb-16">
        <div className="p-4 space-y-4">
          {/* LR Selection */}
          {!selectedLR ? (
            <Card className="p-4">
              <h2 className="font-semibold text-gray-900 mb-4">Select LR</h2>
              
              <div className="space-y-3">
                {/* QR Scan Button */}
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 h-14"
                  onClick={handleScanQR}
                >
                  <QrCode className="w-6 h-6 mr-2" />
                  Scan QR Code
                </Button>

                {/* Search Toggle */}
                <Button
                  variant="outline"
                  className="w-full h-14"
                  onClick={() => setShowSearch(!showSearch)}
                >
                  <Search className="w-6 h-6 mr-2" />
                  Search by LR Number
                </Button>

                {/* Search Input & Results */}
                {showSearch && (
                  <div className="space-y-2 mt-4">
                    <Input
                      placeholder="Enter LR number, consignor, or consignee..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-12 text-base"
                    />
                    
                    {searchQuery && (
                      <div className="space-y-2 mt-3">
                        {filteredLRs.length > 0 ? (
                          filteredLRs.map((lr) => (
                            <Card
                              key={lr.id}
                              className="p-3 cursor-pointer hover:bg-blue-50 transition-colors border-2 border-gray-200"
                              onClick={() => {
                                setSelectedLR(lr);
                                setShowSearch(false);
                                setSearchQuery('');
                              }}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <p className="font-bold text-gray-900 text-lg">{lr.lrNo}</p>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {lr.consignor} → {lr.consignee}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {lr.from} → {lr.to}
                                  </p>
                                  <Badge variant="outline" className="mt-2 font-mono">
                                    {lr.vehicleNo}
                                  </Badge>
                                </div>
                                <Check className="w-6 h-6 text-green-600" />
                              </div>
                            </Card>
                          ))
                        ) : (
                          <p className="text-center text-gray-500 py-4">No LRs found</p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Card>
          ) : (
            <>
              {/* Selected LR Info */}
              <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-300">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm text-gray-600">Selected LR</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedLR.lrNo}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedLR(null)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Change
                  </Button>
                </div>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-700">
                    <span className="font-medium">From:</span> {selectedLR.consignor}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">To:</span> {selectedLR.consignee}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Route:</span> {selectedLR.from} → {selectedLR.to}
                  </p>
                  <Badge variant="outline" className="mt-2 font-mono">
                    {selectedLR.vehicleNo}
                  </Badge>
                </div>
              </Card>

              {/* POD Photos */}
              <Card className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Camera className="w-5 h-5 mr-2 text-blue-600" />
                  POD Photos
                </h3>
                
                <div className="grid grid-cols-3 gap-3">
                  {podPhotos.map((photo, index) => (
                    <div key={index} className="relative aspect-square">
                      <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                        <Camera className="w-8 h-8 text-gray-400" />
                      </div>
                      <button
                        onClick={() => removePhoto(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg"
                        aria-label="Remove photo"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <p className="text-xs text-center text-gray-600 mt-1">Photo {index + 1}</p>
                    </div>
                  ))}
                  
                  {podPhotos.length < 6 && (
                    <button
                      onClick={handlePhotoCapture}
                      className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-blue-500 hover:bg-blue-50 transition-colors"
                    >
                      <Plus className="w-8 h-8 text-gray-400" />
                      <span className="text-xs text-gray-600 mt-1">Add Photo</span>
                    </button>
                  )}
                </div>

                {podPhotos.length === 0 && (
                  <Button
                    onClick={handlePhotoCapture}
                    className="w-full mt-3 bg-blue-600 hover:bg-blue-700 h-12"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    Capture POD Photo
                  </Button>
                )}
              </Card>

              {/* Customer Signature */}
              <Card className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Customer Signature</h3>
                
                <div className="border-2 border-gray-300 rounded-lg bg-white overflow-hidden">
                  <canvas
                    ref={canvasRef}
                    width={320}
                    height={180}
                    className="w-full touch-none"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                  />
                </div>

                <div className="flex gap-2 mt-3">
                  <Button
                    variant="outline"
                    onClick={clearSignature}
                    className="flex-1"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                  <Button
                    onClick={saveSignature}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    disabled={signatureSaved}
                  >
                    {signatureSaved ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </>
                    )}
                  </Button>
                </div>

                <p className="text-xs text-gray-500 mt-2 text-center">
                  Draw signature with finger or stylus
                </p>
              </Card>

              {/* Event Description */}
              <Card className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Delivery Notes</h3>
                
                <Textarea
                  placeholder="Enter delivery notes..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-24 text-base resize-none"
                />

                <Button
                  variant="outline"
                  onClick={toggleVoiceRecording}
                  className={`w-full mt-3 h-12 ${
                    isRecording
                      ? 'bg-red-50 border-red-300 text-red-600'
                      : 'border-blue-300 text-blue-600'
                  }`}
                >
                  <Mic className={`w-5 h-5 mr-2 ${isRecording ? 'animate-pulse' : ''}`} />
                  {isRecording ? 'Recording...' : 'Voice Input'}
                </Button>
              </Card>

              {/* Location & Timestamp Info */}
              <Card className="p-4 bg-gray-50">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <MapPin className="w-5 h-5 text-gray-600 mr-2" />
                    <span className="text-gray-700">GPS will be auto-captured</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="w-5 h-5 text-gray-600 mr-2" />
                    <span className="text-gray-700">
                      {new Date().toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </Card>

              {(podPhotos.length === 0 || !signatureSaved) && (
                <p className="text-sm text-center text-orange-600 mb-20">
                  {podPhotos.length === 0 && 'Add at least one POD photo. '}
                  {!signatureSaved && 'Save customer signature.'}
                </p>
              )}
            </>
          )}
        </div>
      </ScrollArea>

      {/* Bottom Navigation - Action Buttons */}
      {selectedLR && (
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
          <div className="p-3">
            <button
              onClick={handleSaveDelivery}
              disabled={podPhotos.length === 0 || !signatureSaved}
              className="w-full flex items-center justify-center py-3 bg-green-600 text-white rounded-lg font-semibold disabled:bg-gray-300 disabled:text-gray-500 active:scale-95 transition-transform"
            >
              <Save className="w-5 h-5 mr-2" />
              Mark as Delivered
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarkDelivered;