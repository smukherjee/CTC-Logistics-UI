import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import {
  MapPin,
  Phone,
  User,
  Truck,
  Package,
  Calendar,
  Clock,
  Navigation,
  FileText,
  IndianRupee,
  CheckCircle2,
  Circle,
  X,
} from "lucide-react";

interface Trip {
  id: string;
  lrNumber: string;
  from: string;
  to: string;
  vehicleNo: string;
  articles: number;
  freight: string;
  date: string;
  party: string;
  status?: string;
}

interface TripDetailSheetProps {
  trip: Trip | null;
  isOpen: boolean;
  onClose: () => void;
  viewMode?: 'desktop' | 'mobile';
}



function TripDetailContent({ trip, isMobile }: { trip: Trip; isMobile: boolean }) {
  // Mock data for additional trip details
  const tripDetails = {
    driverName: "Rajesh Kumar",
    driverPhone: "+91 98765 43210",
    consignor: "ABC Industries",
    consignorPhone: "+91 98765 11111",
    consignee: "XYZ Corporation",
    consigneePhone: "+91 98765 22222",
    pickupAddress: "Plot 45, Industrial Area, Phase 1, " + trip.from,
    dropoffAddress: "Warehouse 12, Sector 8, " + trip.to,
    estimatedDelivery: "Nov 18, 2025 - 3:00 PM",
    currentLocation: "Near Toll Plaza, NH-48",
    distanceCovered: "245 km",
    distanceRemaining: "180 km",
  };

  const statusSteps = [
    { name: "Created", completed: true, icon: CheckCircle2 },
    { name: "Dispatched", completed: true, icon: CheckCircle2 },
    { name: "In Transit", completed: true, icon: Truck },
    { name: "Delivered", completed: false, icon: Circle },
  ];

  return (
    <>
      {/* Map View */}
      <div className="relative h-[300px] bg-gray-200 overflow-hidden">
        {/* Map placeholder - using a styled div with markers */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-gray-100 to-green-50">
          {/* Map controls */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            <Button size="icon" variant="outline" className="bg-white shadow-md">
              +
            </Button>
            <Button size="icon" variant="outline" className="bg-white shadow-md">
              −
            </Button>
            <Button size="icon" variant="outline" className="bg-white shadow-md">
              <Navigation className="w-4 h-4" />
            </Button>
          </div>

          {/* Route line */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <line
              x1="20%"
              y1="70%"
              x2="80%"
              y2="30%"
              stroke="#1E88E5"
              strokeWidth="3"
              strokeDasharray="10,5"
            />
          </svg>

          {/* Pickup marker */}
          <div className="absolute left-[20%] top-[70%] -translate-x-1/2 -translate-y-full">
            <div className="bg-[#16A34A] text-white px-2 py-1 rounded text-xs mb-1 shadow-lg whitespace-nowrap">
              Pickup: {trip.from}
            </div>
            <div className="w-6 h-6 bg-[#16A34A] rounded-full border-4 border-white shadow-lg"></div>
          </div>

          {/* Current location marker (truck) */}
          <div className="absolute left-[55%] top-[45%] -translate-x-1/2 -translate-y-full">
            <div className="bg-[#1E88E5] text-white px-2 py-1 rounded text-xs mb-1 shadow-lg whitespace-nowrap">
              {trip.vehicleNo}
            </div>
            <div className="w-8 h-8 bg-[#1E88E5] rounded-full border-4 border-white shadow-lg flex items-center justify-center animate-pulse">
              <Truck className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Dropoff marker */}
          <div className="absolute left-[80%] top-[30%] -translate-x-1/2 -translate-y-full">
            <div className="bg-[#DC2626] text-white px-2 py-1 rounded text-xs mb-1 shadow-lg whitespace-nowrap">
              Dropoff: {trip.to}
            </div>
            <div className="w-6 h-6 bg-[#DC2626] rounded-full border-4 border-white shadow-lg"></div>
          </div>
        </div>

        {/* Live tracking badge */}
        <div className="absolute bottom-4 right-4 bg-white px-3 py-2 rounded-lg shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#16A34A] rounded-full animate-pulse"></div>
            <span className="text-sm">Live Tracking</span>
          </div>
        </div>
      </div>

      {/* Trip Details */}
      <div className="p-6 space-y-6">
        {/* Header */}
        <SheetHeader>
          <div className="flex items-start justify-between">
            <div>
              {isMobile ? (
                <h2 className="text-2xl font-semibold text-foreground">LR #{trip.lrNumber}</h2>
              ) : (
                <SheetTitle className="text-2xl">LR #{trip.lrNumber}</SheetTitle>
              )}
              <p className="text-gray-600 mt-1">{trip.party}</p>
            </div>
            <Badge className="bg-[#FACC15] text-gray-900 hover:bg-[#FACC15]/90">
              In Transit
            </Badge>
          </div>
        </SheetHeader>

        {/* Status Timeline */}
        <div className="space-y-3">
          <h3 className="text-[#0F172A]">Trip Status</h3>
          <div className="flex items-center justify-between relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
            <div className="absolute top-5 left-0 h-0.5 bg-[#1E88E5] -z-10 w-2/3"></div>
            {statusSteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.completed
                      ? 'bg-[#1E88E5] text-white'
                      : 'bg-white border-2 border-gray-300 text-gray-400'
                  }`}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                <span className="text-xs text-center whitespace-nowrap">{step.name}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Route Information */}
        <div className="space-y-4">
          <h3 className="text-[#0F172A]">Route Details</h3>
          
          <Card className="p-4 bg-[#F3F4F6] border-0">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#16A34A] rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Pickup</p>
                <p className="text-[#0F172A]">{tripDetails.pickupAddress}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-[#F3F4F6] border-0">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#DC2626] rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Dropoff</p>
                <p className="text-[#0F172A]">{tripDetails.dropoffAddress}</p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-3">
              <p className="text-sm text-gray-600 mb-1">Distance Covered</p>
              <p className="text-[#0F172A]">{tripDetails.distanceCovered}</p>
            </Card>
            <Card className="p-3">
              <p className="text-sm text-gray-600 mb-1">Remaining</p>
              <p className="text-[#0F172A]">{tripDetails.distanceRemaining}</p>
            </Card>
          </div>
        </div>

        <Separator />

        {/* Driver Information */}
        <div className="space-y-4">
          <h3 className="text-[#0F172A]">Driver Details</h3>
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#1E88E5] rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-[#0F172A] mb-1">{tripDetails.driverName}</p>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {tripDetails.driverPhone}
                </p>
              </div>
              <Button size="sm" variant="outline">
                <Phone className="w-4 h-4 mr-2" />
                Call
              </Button>
            </div>
          </Card>
        </div>

        <Separator />

        {/* Vehicle & Cargo Information */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <h3 className="text-[#0F172A]">Vehicle</h3>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-gray-600" />
              <span className="text-[#0F172A]">{trip.vehicleNo}</span>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-[#0F172A]">Cargo</h3>
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-gray-600" />
              <span className="text-[#0F172A]">{trip.articles} Articles</span>
            </div>
          </div>
        </div>

        {/* Party Information */}
        <div className="space-y-4">
          <h3 className="text-[#0F172A]">Party Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
              <p className="text-sm text-gray-600 mb-2">Consignor</p>
              <p className="text-[#0F172A] mb-1">{tripDetails.consignor}</p>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <Phone className="w-3 h-3" />
                {tripDetails.consignorPhone}
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-gray-600 mb-2">Consignee</p>
              <p className="text-[#0F172A] mb-1">{tripDetails.consignee}</p>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <Phone className="w-3 h-3" />
                {tripDetails.consigneePhone}
              </p>
            </Card>
          </div>
        </div>

        <Separator />

        {/* Financial Details */}
        <div className="space-y-4">
          <h3 className="text-[#0F172A]">Financial Details</h3>
          <Card className="p-4 bg-blue-50 border-[#1E88E5]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-[#1E88E5]" />
                <span className="text-gray-600">Total Freight</span>
              </div>
              <p className="text-2xl text-[#0F172A]">₹{trip.freight}</p>
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button className="flex-1 bg-[#1E88E5] hover:bg-[#1E88E5]/90">
            <FileText className="w-4 h-4 mr-2" />
            View Documents
          </Button>
          <Button variant="outline" className="flex-1">
            <Calendar className="w-4 h-4 mr-2" />
            Update Status
          </Button>
        </div>
      </div>
    </>
  );
}

export function TripDetailSheet({ trip, isOpen, onClose, viewMode = 'desktop' }: TripDetailSheetProps) {
  if (!trip) return null;

  if (viewMode === 'mobile') {
    return (
      <>
        {/* Backdrop */}
        {isOpen && (
          <div 
            className="absolute inset-0 bg-black/50 z-[100] transition-opacity"
            onClick={onClose}
          />
        )}
        
        {/* Drawer */}
        <div 
          className={`absolute top-0 left-0 h-full w-full bg-white z-[100] transition-transform duration-300 ease-in-out transform ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="h-full overflow-y-auto relative">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-20 bg-white/80 rounded-full p-2 shadow-sm"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <TripDetailContent trip={trip} isMobile={true} />
          </div>
        </div>
      </>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-2xl p-0 overflow-auto">
        <TripDetailContent trip={trip} isMobile={false} />
      </SheetContent>
    </Sheet>
  );
}
