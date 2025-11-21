import { useState } from "react";
import { KPICard } from "./KPICard";
import { KanbanBoard, Trip } from "./KanbanBoard";
import { TripDetailSheet } from "./TripDetailSheet";
import { GoogleMap } from "./GoogleMap";
import { IndianRupee, TrendingUp, AlertCircle, FileText, Truck, Clock, LayoutGrid, Table as TableIcon, Map as MapIcon, Bell, User } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

type Screen = "dashboard" | "capture-lr" | "payment" | "parties" | "vehicles" | "reports" | "settings" | "dispatch" | "invoice" | "mark-delivered" | "drivers" | "rates" | "eway-expiring";

interface DashboardProps {
  onNavigate?: (screen: Screen) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"kanban" | "table" | "map">("kanban");

  const handleTripClick = (trip: Trip) => {
    setSelectedTrip(trip);
    setIsSheetOpen(true);
  };

  // Mock trip data for table and map views
  const allTrips: Trip[] = [
    { id: "1", lrNumber: "LR-2025-001", party: "ABC Industries", status: "In Transit", freight: "45,000", from: "Mumbai", to: "Delhi", vehicleNo: "MH12AB1234", articles: 25, date: "Nov 16, 2025", currentLocation: "Ahmedabad", lat: 23.0225, lng: 72.5714 },
    { id: "2", lrNumber: "LR-2025-002", party: "XYZ Corp", status: "Dispatched", freight: "32,000", from: "Bangalore", to: "Chennai", vehicleNo: "KA03CD5678", articles: 18, date: "Nov 17, 2025", currentLocation: "Bangalore", lat: 12.9716, lng: 77.5946 },
    { id: "3", lrNumber: "LR-2025-003", party: "DEF Traders", status: "Delivered", freight: "28,500", from: "Delhi", to: "Jaipur", vehicleNo: "DL10EF9012", articles: 30, date: "Nov 15, 2025", currentLocation: "Jaipur", lat: 26.9124, lng: 75.7873 },
    { id: "4", lrNumber: "LR-2025-004", party: "GHI Logistics", status: "In Transit", freight: "52,000", from: "Pune", to: "Hyderabad", vehicleNo: "MH14GH3456", articles: 22, date: "Nov 17, 2025", currentLocation: "Solapur", lat: 17.6599, lng: 75.9064 },
    { id: "5", lrNumber: "LR-2025-005", party: "JKL Enterprises", status: "Loading", freight: "38,000", from: "Ahmedabad", to: "Surat", vehicleNo: "GJ01IJ7890", articles: 15, date: "Nov 18, 2025", currentLocation: "Ahmedabad", lat: 23.0225, lng: 72.5714 },
    { id: "6", lrNumber: "LR-2025-006", party: "MNO Industries", status: "In Transit", freight: "41,500", from: "Kolkata", to: "Bhubaneswar", vehicleNo: "WB12KL3456", articles: 20, date: "Nov 16, 2025", currentLocation: "Balasore", lat: 21.4934, lng: 86.9336 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Transit": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Dispatched": return "bg-blue-100 text-blue-800 border-blue-300";
      case "Delivered": return "bg-green-100 text-green-800 border-green-300";
      case "Loading": return "bg-purple-100 text-purple-800 border-purple-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };
  const kpiData = [
    {
      title: "Total Freight",
      value: "₹12,45,000",
      change: "12.5% from last month",
      isPositive: true,
      icon: IndianRupee,
      color: "bg-[#1E88E5]",
      onClick: () => onNavigate?.('reports')
    },
    {
      title: "Owner Payouts",
      value: "₹8,75,000",
      change: "8.2% from last month",
      isPositive: true,
      icon: TrendingUp,
      color: "bg-[#16A34A]",
      onClick: () => onNavigate?.('payment')
    },
    {
      title: "Outstanding Dues",
      value: "₹2,15,000",
      change: "5.1% from last month",
      isPositive: false,
      icon: AlertCircle,
      color: "bg-[#DC2626]",
      onClick: () => onNavigate?.('reports')
    },
    {
      title: "LRs Created",
      value: "156",
      change: "23 today",
      isPositive: true,
      icon: FileText,
      color: "bg-[#1E88E5]",
      onClick: () => onNavigate?.('dispatch')
    },
    {
      title: "Trips In Transit",
      value: "42",
      change: "8 dispatched today",
      isPositive: true,
      icon: Truck,
      color: "bg-[#FACC15]",
      onClick: () => onNavigate?.('dispatch')
    },
    {
      title: "E-way Expiring",
      value: "8",
      change: "Within 24 hours",
      isPositive: false,
      icon: Clock,
      color: "bg-[#DC2626]",
      onClick: () => onNavigate?.('eway-expiring')
    }
  ];

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* Header */}
      <div className="bg-[#0F172A] text-white p-4">
        <div className="flex items-center justify-between">
          <div className="w-8"></div>
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 cursor-pointer" />
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="text-gray-900 font-medium">Dashboard</span>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-3 gap-4">
          {kpiData.map((kpi, index) => (
            <KPICard key={index} {...kpi} />
          ))}
        </div>

        {/* Trip Status with View Switcher */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#0F172A]">Trip Status</h2>
          </div>

          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "kanban" | "table" | "map")} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3 h-9">
              <TabsTrigger value="kanban" className="flex items-center gap-1 text-sm">
                <LayoutGrid className="w-4 h-4" />
                Kanban
              </TabsTrigger>
              <TabsTrigger value="table" className="flex items-center gap-1 text-sm">
                <TableIcon className="w-4 h-4" />
                Table
              </TabsTrigger>
              <TabsTrigger value="map" className="flex items-center gap-1 text-sm">
                <MapIcon className="w-4 h-4" />
                Map
              </TabsTrigger>
            </TabsList>

            {/* Kanban View */}
            <TabsContent value="kanban" className="mt-3">
              <KanbanBoard onTripClick={handleTripClick} />
            </TabsContent>

            {/* Table View */}
            <TabsContent value="table" className="mt-3">
              <Card className="p-2">
                <Table>
                  <TableHeader>
                    <TableRow className="h-8">
                      <TableHead className="text-xs py-1">LR Number</TableHead>
                      <TableHead className="text-xs py-1">Party</TableHead>
                      <TableHead className="text-xs py-1">Route</TableHead>
                      <TableHead className="text-xs py-1">Vehicle</TableHead>
                      <TableHead className="text-xs py-1">Articles</TableHead>
                      <TableHead className="text-xs py-1">Freight</TableHead>
                      <TableHead className="text-xs py-1">Status</TableHead>
                      <TableHead className="text-xs py-1">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allTrips.map((trip) => (
                      <TableRow 
                        key={trip.id} 
                        className="cursor-pointer hover:bg-gray-50 h-9"
                        onClick={() => handleTripClick(trip)}
                      >
                        <TableCell className="font-medium text-xs py-1">{trip.lrNumber}</TableCell>
                        <TableCell className="text-xs py-1">{trip.party}</TableCell>
                        <TableCell className="py-1">
                          <div className="flex items-center gap-1 text-xs">
                            <span>{trip.from}</span>
                            <span className="text-gray-400">→</span>
                            <span>{trip.to}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-xs py-1">{trip.vehicleNo}</TableCell>
                        <TableCell className="text-xs py-1">{trip.articles}</TableCell>
                        <TableCell className="font-semibold text-xs py-1">₹{trip.freight}</TableCell>
                        <TableCell className="py-1">
                          <Badge className={`${getStatusColor(trip.status || '')} text-xs py-0 px-2`}>
                            {trip.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs text-gray-600 py-1">{trip.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            {/* Map View */}
            <TabsContent value="map" className="mt-3">
              <GoogleMap trips={allTrips} onTripClick={handleTripClick} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Trip Detail Sheet */}
      <TripDetailSheet
        trip={selectedTrip}
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
      />
    </div>
  );
}
