import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Bell, User, IndianRupee, TrendingUp, AlertCircle, FileText, Truck, Clock, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { TripDetailSheet } from "./TripDetailSheet";
import { Trip } from "./KanbanBoard";
import ctcLogo from "../assets/ctc-logo.gif";

type Screen = "dashboard" | "capture-lr" | "payment" | "parties" | "vehicles" | "reports" | "settings" | "dispatch" | "invoice" | "mark-delivered" | "drivers" | "rates" | "eway-expiring";

interface MobileDashboardProps {
  onNavigate?: (screen: Screen) => void;
}

export function MobileDashboard({ onNavigate }: MobileDashboardProps) {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const kpiData = [
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
      change: "8 dispatched",
      isPositive: true,
      icon: Truck,
      color: "bg-[#FACC15]",
      onClick: () => onNavigate?.('dispatch')
    },
    {
      title: "E-way Expiring",
      value: "8",
      change: "24 hours",
      isPositive: false,
      icon: Clock,
      color: "bg-[#DC2626]",
      onClick: () => onNavigate?.('eway-expiring')
    }
  ];

  const recentTrips: Trip[] = [
    {
      id: "1",
      lrNumber: "2024001",
      party: "ABC Industries",
      status: "In Transit",
      freight: "45,000",
      from: "Mumbai",
      to: "Delhi",
      vehicleNo: "MH12AB1234",
      articles: 25,
      date: "Nov 16, 2025"
    },
    {
      id: "2",
      lrNumber: "2024002",
      party: "XYZ Corp",
      status: "Dispatched",
      freight: "32,000",
      from: "Pune",
      to: "Bangalore",
      vehicleNo: "MH14CD5678",
      articles: 18,
      date: "Nov 16, 2025"
    },
    {
      id: "3",
      lrNumber: "2024003",
      party: "DEF Traders",
      status: "Delivered",
      freight: "28,500",
      from: "Delhi",
      to: "Jaipur",
      vehicleNo: "DL10EF9012",
      articles: 30,
      date: "Nov 15, 2025"
    },
    {
      id: "4",
      lrNumber: "2024004",
      party: "GHI Logistics",
      status: "In Transit",
      freight: "52,000",
      from: "Chennai",
      to: "Hyderabad",
      vehicleNo: "TN09GH3456",
      articles: 40,
      date: "Nov 16, 2025"
    },
    {
      id: "5",
      lrNumber: "2024005",
      party: "JKL Enterprises",
      status: "Dispatched",
      freight: "38,500",
      from: "Kolkata",
      to: "Bhubaneswar",
      vehicleNo: "WB12JK7890",
      articles: 22,
      date: "Nov 16, 2025"
    },
    {
      id: "6",
      lrNumber: "2024006",
      party: "MNO Industries",
      status: "In Transit",
      freight: "41,000",
      from: "Ahmedabad",
      to: "Surat",
      vehicleNo: "GJ01MN2345",
      articles: 28,
      date: "Nov 15, 2025"
    },
    {
      id: "7",
      lrNumber: "2024007",
      party: "PQR Trading",
      status: "Delivered",
      freight: "35,500",
      from: "Lucknow",
      to: "Kanpur",
      vehicleNo: "UP32PQ6789",
      articles: 19,
      date: "Nov 14, 2025"
    },
    {
      id: "8",
      lrNumber: "2024008",
      party: "STU Corp",
      status: "Dispatched",
      freight: "48,000",
      from: "Jaipur",
      to: "Udaipur",
      vehicleNo: "RJ14ST1234",
      articles: 35,
      date: "Nov 16, 2025"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Transit":
        return "bg-[#FACC15]";
      case "Dispatched":
        return "bg-[#1E88E5]";
      case "Delivered":
        return "bg-[#16A34A]";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="h-full max-h-full relative flex flex-col bg-[#F3F4F6]">
      {/* Mobile Header */}
      <div className="flex-shrink-0 bg-[#0F172A] text-white p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <div className="flex items-center gap-3">
            <button className="relative p-2" aria-label="Notifications">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#DC2626] rounded-full"></span>
            </button>
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-[#1E88E5] text-white text-sm">
                <User className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="p-3 space-y-3 pb-20">
          {/* KPI Cards - 3 columns on mobile, compact */}
          <div className="grid grid-cols-3 gap-2">
            {kpiData.map((kpi, index) => (
              <Card 
                key={index} 
                className="p-2 cursor-pointer hover:shadow-md transition-shadow active:scale-95"
                onClick={kpi.onClick}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center mb-1 ${kpi.color}`}>
                    <kpi.icon className="w-3 h-3 text-white" />
                  </div>
                  <p className="text-[10px] text-gray-600 mb-0.5 leading-tight">{kpi.title}</p>
                  <p className="text-base font-bold text-[#0F172A]">{kpi.value}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Recent Trips */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[#0F172A]">Recent Trips</h2>
              <button className="text-[#1E88E5] text-xs">View All</button>
            </div>

            {recentTrips.map((trip) => (
              <Card 
                key={trip.id} 
                className="p-3 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => {
                  setSelectedTrip(trip);
                  setIsSheetOpen(true);
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-[#0F172A] mb-0.5">LR #{trip.lrNumber}</p>
                    <p className="text-xs text-gray-600">{trip.party}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor(trip.status || '')}`}></div>
                    <span className="text-xs text-gray-600">{trip.status}</span>
                  </div>
                  <p className="text-sm font-semibold text-[#1E88E5]">₹{trip.freight}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Quick Actions */}
      <div className="flex-shrink-0 absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="grid grid-cols-2 divide-x divide-gray-200">
          <button 
            className="flex flex-col items-center justify-center py-3 active:bg-gray-50 transition-colors"
            onClick={() => onNavigate?.('capture-lr')}
          >
            <FileText className="w-5 h-5 text-[#1E88E5] mb-1" />
            <span className="text-xs text-[#0F172A] font-medium">New LR</span>
          </button>
          <button 
            className="flex flex-col items-center justify-center py-3 active:bg-gray-50 transition-colors"
            onClick={() => onNavigate?.('payment')}
          >
            <IndianRupee className="w-5 h-5 text-[#16A34A] mb-1" />
            <span className="text-xs text-[#0F172A] font-medium">Payment</span>
          </button>
        </div>
      </div>

      {/* Trip Detail Sheet */}
      <TripDetailSheet
        trip={selectedTrip}
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        viewMode="mobile"
      />
    </div>
  );
}
