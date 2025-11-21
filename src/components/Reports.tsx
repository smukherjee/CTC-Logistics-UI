import { TopBar } from "./TopBar";
import { Card } from "./ui/card";
import { 
  IndianRupee, 
  TrendingUp, 
  TrendingDown,
  Bell,
  User, 
  Truck, 
  FileText, 
  Users,
  Package,
  Calendar
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";

export function Reports() {
  const monthlyData = [
    { month: "Jan", revenue: 245000, expenses: 180000, profit: 65000 },
    { month: "Feb", revenue: 280000, expenses: 195000, profit: 85000 },
    { month: "Mar", revenue: 310000, expenses: 220000, profit: 90000 },
    { month: "Apr", revenue: 295000, expenses: 205000, profit: 90000 },
    { month: "May", revenue: 335000, expenses: 230000, profit: 105000 },
    { month: "Jun", revenue: 350000, expenses: 240000, profit: 110000 }
  ];

  const topParties = [
    { name: "ABC Industries", trips: 45, revenue: "₹5,25,000", growth: "+12%" },
    { name: "XYZ Corp", trips: 38, revenue: "₹4,80,000", growth: "+8%" },
    { name: "DEF Traders", trips: 32, revenue: "₹3,95,000", growth: "+15%" },
    { name: "GHI Logistics", trips: 28, revenue: "₹3,45,000", growth: "+5%" },
    { name: "JKL Enterprises", trips: 24, revenue: "₹2,98,000", growth: "+10%" }
  ];

  const topVehicles = [
    { vehicleNo: "MH12AB1234", trips: 28, revenue: "₹4,20,000", utilization: "95%" },
    { vehicleNo: "DL10EF9012", trips: 25, revenue: "₹3,75,000", utilization: "90%" },
    { vehicleNo: "GJ01KL2345", trips: 22, revenue: "₹3,30,000", utilization: "85%" },
    { vehicleNo: "MH14CD5678", trips: 20, revenue: "₹3,00,000", utilization: "80%" },
    { vehicleNo: "TN09GH3456", trips: 18, revenue: "₹2,70,000", utilization: "75%" }
  ];

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* Header */}
      <div className="bg-[#0F172A] text-white p-4">
        <div className="flex items-center justify-between">
          <div className="w-8"></div>
          <h1 className="text-lg font-semibold">Reports & Analytics</h1>
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 cursor-pointer" />
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#1E88E5] rounded-lg flex items-center justify-center">
                <IndianRupee className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-[#16A34A]" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
            <p className="text-2xl font-semibold text-[#0F172A] mb-2">₹18,15,000</p>
            <p className="text-xs text-[#16A34A]">+18.5% from last period</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#16A34A] rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-[#16A34A]" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Net Profit</p>
            <p className="text-2xl font-semibold text-[#0F172A] mb-2">₹5,45,000</p>
            <p className="text-xs text-[#16A34A]">+22.3% from last period</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#FACC15] rounded-lg flex items-center justify-center">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-[#16A34A]" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Trips</p>
            <p className="text-2xl font-semibold text-[#0F172A] mb-2">287</p>
            <p className="text-xs text-[#16A34A]">+15.8% from last period</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#DC2626] rounded-lg flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
              <TrendingDown className="w-5 h-5 text-[#DC2626]" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Avg Delivery Time</p>
            <p className="text-2xl font-semibold text-[#0F172A] mb-2">2.8 days</p>
            <p className="text-xs text-[#DC2626]">-12% from last period</p>
          </Card>
        </div>

        {/* Monthly Revenue Chart */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-[#0F172A] mb-6">Monthly Revenue vs Expenses</h2>
          <div className="space-y-4">
            {monthlyData.map((data) => (
              <div key={data.month}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 w-12">{data.month}</span>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                      {/* eslint-disable-next-line react/forbid-dom-props */}
                      <div
                        className="absolute top-0 left-0 h-full bg-[#1E88E5] rounded-full transition-all"
                        style={{ width: `${(data.revenue / 350000) * 100}%` }}
                      />
                      {/* eslint-disable-next-line react/forbid-dom-props */}
                      <div
                        className="absolute top-0 left-0 h-full bg-[#DC2626] rounded-full transition-all opacity-60"
                        style={{ width: `${(data.expenses / 350000) * 100}%` }}
                      />
                    </div>
                    <div className="w-32 text-right">
                      <span className="text-sm text-[#16A34A] font-semibold">
                        ₹{(data.profit / 1000).toFixed(0)}K
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-center gap-6 pt-4 border-t">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#1E88E5] rounded"></div>
                <span className="text-sm text-gray-600">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#DC2626] rounded"></div>
                <span className="text-sm text-gray-600">Expenses</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#16A34A] rounded"></div>
                <span className="text-sm text-gray-600">Profit</span>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Performing Parties */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-[#0F172A]">Top Performing Parties</h2>
              <Users className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {topParties.map((party, index) => (
                <div key={party.name} className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-[#1E88E5] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#0F172A]">{party.name}</p>
                    <p className="text-xs text-gray-600">{party.trips} trips</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#0F172A]">{party.revenue}</p>
                    <Badge variant="outline" className="text-xs text-[#16A34A] border-[#16A34A]">
                      {party.growth}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Performing Vehicles */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-[#0F172A]">Top Performing Vehicles</h2>
              <Truck className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {topVehicles.map((vehicle, index) => (
                <div key={vehicle.vehicleNo} className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-[#16A34A] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#0F172A]">{vehicle.vehicleNo}</p>
                    <p className="text-xs text-gray-600">{vehicle.trips} trips</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#0F172A]">{vehicle.revenue}</p>
                    <Badge variant="outline" className="text-xs text-[#1E88E5] border-[#1E88E5]">
                      {vehicle.utilization}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#1E88E5] rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">LRs Generated</p>
                <p className="text-xl font-semibold text-[#0F172A]">1,245</p>
              </div>
            </div>
            <p className="text-xs text-[#16A34A]">+25% from last period</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#16A34A] rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Articles</p>
                <p className="text-xl font-semibold text-[#0F172A]">6,842</p>
              </div>
            </div>
            <p className="text-xs text-[#16A34A]">+18% from last period</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#FACC15] rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">On-Time Delivery</p>
                <p className="text-xl font-semibold text-[#0F172A]">92%</p>
              </div>
            </div>
            <p className="text-xs text-[#16A34A]">+5% from last period</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
