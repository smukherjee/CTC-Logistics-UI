import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { MobileDashboard } from "./components/MobileDashboard";
import { CaptureLR } from "./components/CaptureLR";
import { PaymentCapture } from "./components/PaymentCapture";
import { PartyManagement } from "./components/PartyManagement";
import { VehicleManagement } from "./components/VehicleManagement";
import { Reports } from "./components/Reports";
import { Settings } from "./components/Settings";
import { Login } from "./components/Login";
const ctcLogo = "/ctc-logo.gif";
import DispatchRegister from "./components/DispatchRegister";
import InvoiceBuilder from "./components/InvoiceBuilder";
import MarkDelivered from "./components/MarkDelivered";
import DriverManagement from "./components/DriverManagement";
import RateMaster from "./components/RateMaster";
import EwayBillExpiring from "./components/EwayBillExpiring";
import { LayoutDashboard, FileText, CreditCard, Monitor, Smartphone, Users, Truck, BarChart3, Settings as SettingsIcon, List, Receipt, CheckCircle2, Menu, X, UserCog, DollarSign, AlertTriangle, ChevronRight, ChevronLeft, Home } from "lucide-react";
import { Button } from "./components/ui/button";
import { ScrollArea } from "./components/ui/scroll-area";

type Screen = "dashboard" | "capture-lr" | "payment" | "parties" | "vehicles" | "reports" | "settings" | "dispatch" | "invoice" | "mark-delivered" | "drivers" | "rates" | "eway-expiring";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>("dashboard");
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Show login screen if not logged in
  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  const menuItems = [
    { id: 'dashboard' as Screen, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'capture-lr' as Screen, label: 'Capture LR', icon: FileText },
    { id: 'dispatch' as Screen, label: 'Dispatch Register', icon: List },
    { id: 'mark-delivered' as Screen, label: 'Mark Delivered', icon: CheckCircle2 },
    { id: 'eway-expiring' as Screen, label: 'E-way Bill Expiring', icon: AlertTriangle },
    { id: 'payment' as Screen, label: 'Payment Capture', icon: CreditCard },
    { id: 'invoice' as Screen, label: 'Invoice Builder', icon: Receipt },
    { id: 'parties' as Screen, label: 'Party Management', icon: Users },
    { id: 'vehicles' as Screen, label: 'Vehicle Management', icon: Truck },
    { id: 'drivers' as Screen, label: 'Driver Management', icon: UserCog },
    { id: 'rates' as Screen, label: 'Rate Master', icon: DollarSign },
    { id: 'reports' as Screen, label: 'Reports', icon: BarChart3 },
    { id: 'settings' as Screen, label: 'Settings', icon: SettingsIcon },
  ];

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
    if (viewMode === "mobile") {
      setIsSidebarOpen(false);
    }
  };

  const handleBackToDashboard = () => {
    setCurrentScreen('dashboard');
  };

  const getCurrentScreenLabel = () => {
    const item = menuItems.find(m => m.id === currentScreen);
    return item?.label || 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* View Mode Switcher - Fixed top right */}
      <div className="fixed top-4 right-4 z-[60] flex gap-2 bg-white rounded-lg shadow-lg p-1">
        <Button
          variant={viewMode === "desktop" ? "default" : "ghost"}
          size="sm"
          onClick={() => {
            setViewMode("desktop");
            setCurrentScreen("dashboard");
            setIsSidebarOpen(false);
          }}
          className={viewMode === "desktop" ? "bg-[#1E88E5]" : ""}
        >
          <Monitor className="w-4 h-4 mr-2" />
          Desktop
        </Button>
        <Button
          variant={viewMode === "mobile" ? "default" : "ghost"}
          size="sm"
          onClick={() => {
            setViewMode("mobile");
            setCurrentScreen("dashboard");
            setIsSidebarOpen(false);
          }}
          className={viewMode === "mobile" ? "bg-[#1E88E5]" : ""}
        >
          <Smartphone className="w-4 h-4 mr-2" />
          Mobile
        </Button>
      </div>

      {/* Main Content */}
      {viewMode === "desktop" ? (
        <div className="flex min-h-screen">
          {/* Desktop Sidebar */}
          <aside className={`sticky top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-40 flex-shrink-0 ${
            isSidebarCollapsed ? "w-20" : "w-72"
          }`}>
            {/* Sidebar Header */}
            <div className="h-20 border-b border-gray-200 flex items-center justify-between px-6">
              {!isSidebarCollapsed && (
                <div className="flex items-center gap-2">
                  <img src={ctcLogo} alt="CTC Logistics" className="h-12 w-auto" />
                </div>
              )}
              {isSidebarCollapsed && <img src={ctcLogo} alt="CTC Logistics" className="h-10 w-auto mx-auto" />}
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
            </div>

            {/* Sidebar Menu */}
            <ScrollArea className="h-[calc(100vh-140px)]">
              <div className="px-4 py-6 space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentScreen === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigate(item.id)}
                      className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-4 px-4'} py-3.5 rounded-xl transition-all text-[15px] font-medium ${
                        isActive
                          ? 'bg-gradient-to-r from-[#1E88E5] to-[#42A5F5] shadow-md shadow-blue-500/30'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                      title={isSidebarCollapsed ? item.label : undefined}
                    >
                      <Icon className={`${isSidebarCollapsed ? 'w-6 h-6' : 'w-5 h-5'} flex-shrink-0 ${isActive ? 'text-white' : ''}`} />
                      {!isSidebarCollapsed && <span className={`truncate ${isActive ? 'text-white' : ''}`}>{item.label}</span>}
                    </button>
                  );
                })}
              </div>
            </ScrollArea>

            {/* Sidebar Footer */}
            {!isSidebarCollapsed && (
              <div className="absolute bottom-0 left-0 right-0 px-6 py-4 border-t border-gray-200 bg-white">
                <p className="text-xs text-gray-500 font-medium">GST: 08AAEFC3940P1Z4</p>
              </div>
            )}
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0 bg-[#F3F4F6]">
            {/* Breadcrumb Navigation - Only show when not on dashboard */}
            {currentScreen !== "dashboard" && (
              <div className="bg-white border-b border-gray-200 px-6 py-3">
                <div className="flex items-center gap-2 text-sm">
                  <button
                    onClick={handleBackToDashboard}
                    className="flex items-center gap-1 text-gray-600 hover:text-[#1E88E5] transition-colors"
                  >
                    <Home className="w-4 h-4" />
                    <span>Dashboard</span>
                  </button>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900 font-medium">{getCurrentScreenLabel()}</span>
                </div>
              </div>
            )}

            {/* Screen Content */}
            {currentScreen === "dashboard" && <Dashboard onNavigate={(s) => handleNavigate(s as Screen)} />}
            {currentScreen === "capture-lr" && <CaptureLR />}
            {currentScreen === "payment" && <PaymentCapture />}
            {currentScreen === "parties" && <PartyManagement />}
            {currentScreen === "vehicles" && <VehicleManagement />}
            {currentScreen === "drivers" && <DriverManagement />}
            {currentScreen === "rates" && <RateMaster />}
            {currentScreen === "eway-expiring" && <EwayBillExpiring />}
            {currentScreen === "reports" && <Reports />}
            {currentScreen === "settings" && <Settings />}
            {currentScreen === "dispatch" && <DispatchRegister />}
            {currentScreen === "invoice" && <InvoiceBuilder />}
            {currentScreen === "mark-delivered" && <MarkDelivered />}
          </div>
        </div>
      ) : (
        <div className="max-w-[390px] mx-auto shadow-2xl h-[calc(100vh-2rem)] mt-4 bg-white relative rounded-[3rem] border-[8px] border-gray-900 overflow-hidden">
          <div className="h-full overflow-hidden rounded-[calc(3rem-8px)]">
          {/* Mobile Hamburger Menu */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="fixed top-4 left-[calc((100vw-390px)/2+16px)] z-[60] bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors p-2"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Mobile Sidebar */}
          {isSidebarOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 left-[calc((100vw-390px)/2)] right-[calc((100vw-390px)/2)]"
                onClick={() => setIsSidebarOpen(false)}
              />
              
              {/* Sidebar */}
              <div className="fixed top-0 h-full w-[280px] left-[calc((100vw-390px)/2)] bg-white shadow-2xl z-50 transform transition-transform duration-300">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <img src={ctcLogo} alt="CTC Logistics" className="h-10 w-auto" />
                  </div>
                  <p className="text-[10px] text-gray-600">GST: 08AAEFC3940P1Z4</p>
                </div>
                
                <ScrollArea className="h-[calc(100vh-100px)]">
                  <div className="p-3 space-y-1">
                    {menuItems
                      .filter(item => ['dashboard', 'capture-lr', 'mark-delivered', 'payment'].includes(item.id))
                      .map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavigate(item.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
                            currentScreen === item.id
                              ? 'bg-blue-50 text-[#1E88E5] font-medium'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </ScrollArea>
              </div>
            </>
          )}

          {/* Mobile Breadcrumb Navigation - Only show when not on dashboard */}
          {currentScreen !== "dashboard" && (
            <div className="bg-white border-b border-gray-200 px-4 py-3">
              <div className="flex items-center gap-2 text-sm">
                <button
                  onClick={handleBackToDashboard}
                  className="flex items-center gap-1 text-gray-600 hover:text-[#1E88E5] transition-colors"
                >
                  <Home className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900 font-medium">{getCurrentScreenLabel()}</span>
              </div>
            </div>
          )}

          {/* Mobile Screen Content */}
          {currentScreen === "dashboard" && <MobileDashboard onNavigate={(s) => handleNavigate(s as Screen)} />}
          {currentScreen === "capture-lr" && <CaptureLR />}
          {currentScreen === "payment" && <PaymentCapture />}
          {currentScreen === "parties" && <PartyManagement />}
          {currentScreen === "vehicles" && <VehicleManagement />}
          {currentScreen === "drivers" && <DriverManagement />}
          {currentScreen === "rates" && <RateMaster />}
          {currentScreen === "eway-expiring" && <EwayBillExpiring />}
          {currentScreen === "reports" && <Reports />}
          {currentScreen === "settings" && <Settings />}
          {currentScreen === "dispatch" && <DispatchRegister />}
          {currentScreen === "invoice" && <InvoiceBuilder />}
          {currentScreen === "mark-delivered" && <MarkDelivered />}
          </div>
        </div>
      )}
    </div>
  );
}
