import { useState } from "react";
import { Plus, Search, Phone, Edit, Trash2, Truck, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { TopBar } from "./TopBar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Owner {
  id: string;
  name: string;
  phone: string;
  email: string;
  panNumber: string;
  vehicleCount: number;
}

interface Vehicle {
  id: string;
  vehicleNumber: string;
  vehicleType: string;
  capacity: string;
  ownerId: string;
  ownerName: string;
  rcNumber: string;
  insuranceExpiry: string;
  fitnessExpiry: string;
  status: "active" | "maintenance" | "inactive";
}

export function VehicleManagement() {
  const [isVehicleDialogOpen, setIsVehicleDialogOpen] = useState(false);
  const [isOwnerDialogOpen, setIsOwnerDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"vehicles" | "owners">("vehicles");
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [editingOwner, setEditingOwner] = useState<Owner | null>(null);

  const [owners] = useState<Owner[]>([
    {
      id: "1",
      name: "Rajesh Kumar",
      phone: "+91 98765 43210",
      email: "rajesh.kumar@email.com",
      panNumber: "ABCDE1234F",
      vehicleCount: 3
    },
    {
      id: "2",
      name: "Suresh Patel",
      phone: "+91 98765 54321",
      email: "suresh.patel@email.com",
      panNumber: "BCDEF5678G",
      vehicleCount: 2
    }
  ]);

  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: "1",
      vehicleNumber: "MH12AB1234",
      vehicleType: "Container Truck",
      capacity: "20 Ton",
      ownerId: "1",
      ownerName: "Rajesh Kumar",
      rcNumber: "RC1234567890",
      insuranceExpiry: "Dec 31, 2025",
      fitnessExpiry: "Jun 30, 2026",
      status: "active"
    },
    {
      id: "2",
      vehicleNumber: "DL10EF9012",
      vehicleType: "Trailer",
      capacity: "25 Ton",
      ownerId: "1",
      ownerName: "Rajesh Kumar",
      rcNumber: "RC0987654321",
      insuranceExpiry: "Mar 15, 2026",
      fitnessExpiry: "Sep 20, 2025",
      status: "active"
    },
    {
      id: "3",
      vehicleNumber: "GJ01KL2345",
      vehicleType: "Open Truck",
      capacity: "15 Ton",
      ownerId: "2",
      ownerName: "Suresh Patel",
      rcNumber: "RC1122334455",
      insuranceExpiry: "Nov 10, 2025",
      fitnessExpiry: "May 25, 2026",
      status: "maintenance"
    }
  ]);

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.ownerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredOwners = owners.filter(owner =>
    owner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    owner.phone.includes(searchQuery)
  );

  const handleAddVehicle = () => {
    setEditingVehicle(null);
    setIsVehicleDialogOpen(true);
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setIsVehicleDialogOpen(true);
  };

  const handleDeleteVehicle = (id: string) => {
    setVehicles(vehicles.filter(v => v.id !== id));
  };

  const handleAddOwner = () => {
    setEditingOwner(null);
    setIsOwnerDialogOpen(true);
  };

  const handleEditOwner = (owner: Owner) => {
    setEditingOwner(owner);
    setIsOwnerDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-[#16A34A] text-white";
      case "maintenance":
        return "bg-[#FACC15] text-gray-900";
      case "inactive":
        return "bg-[#DC2626] text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* Header */}
      <div className="bg-[#0F172A] text-white p-4">
        <div className="flex items-center justify-between">
          <div className="w-8"></div>
          <h1 className="text-lg font-semibold">Vehicle Management</h1>
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 cursor-pointer" />
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Tabs */}
        <div className="flex gap-2 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("vehicles")}
            className={`px-4 py-2 font-medium transition-colors border-b-2 ${
              activeTab === "vehicles"
                ? "border-[#1E88E5] text-[#1E88E5]"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Vehicles ({vehicles.length})
          </button>
          <button
            onClick={() => setActiveTab("owners")}
            className={`px-4 py-2 font-medium transition-colors border-b-2 ${
              activeTab === "owners"
                ? "border-[#1E88E5] text-[#1E88E5]"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Owners ({owners.length})
          </button>
        </div>

        {/* Search Bar */}
        <Card className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder={activeTab === "vehicles" ? "Search vehicles..." : "Search owners..."}
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </Card>

        {/* Stats */}
        {activeTab === "vehicles" && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <p className="text-sm text-gray-600 mb-1">Total Vehicles</p>
              <p className="text-2xl font-semibold text-[#0F172A]">{vehicles.length}</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-gray-600 mb-1">Active</p>
              <p className="text-2xl font-semibold text-[#16A34A]">
                {vehicles.filter(v => v.status === "active").length}
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-gray-600 mb-1">In Maintenance</p>
              <p className="text-2xl font-semibold text-[#FACC15]">
                {vehicles.filter(v => v.status === "maintenance").length}
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-gray-600 mb-1">Inactive</p>
              <p className="text-2xl font-semibold text-[#DC2626]">
                {vehicles.filter(v => v.status === "inactive").length}
              </p>
            </Card>
          </div>
        )}

        {/* Vehicles List */}
        {activeTab === "vehicles" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredVehicles.map((vehicle) => (
              <Card key={vehicle.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-[#1E88E5] rounded-lg flex items-center justify-center">
                      <Truck className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#0F172A] mb-1">
                        {vehicle.vehicleNumber}
                      </h3>
                      <p className="text-sm text-gray-600">{vehicle.vehicleType}</p>
                      <Badge className={`mt-2 ${getStatusColor(vehicle.status)}`}>
                        {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditVehicle(vehicle)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteVehicle(vehicle.id)}
                    >
                      <Trash2 className="w-4 h-4 text-[#DC2626]" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Capacity</p>
                      <p className="text-sm text-[#0F172A]">{vehicle.capacity}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Owner</p>
                      <p className="text-sm text-[#0F172A]">{vehicle.ownerName}</p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-gray-100">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Insurance Expiry</p>
                        <p className="text-sm text-[#0F172A]">{vehicle.insuranceExpiry}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Fitness Expiry</p>
                        <p className="text-sm text-[#0F172A]">{vehicle.fitnessExpiry}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Owners List */}
        {activeTab === "owners" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredOwners.map((owner) => (
              <Card key={owner.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-[#16A34A] rounded-lg flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#0F172A] mb-1">{owner.name}</h3>
                      <p className="text-sm text-gray-600">{owner.phone}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditOwner(owner)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{owner.email}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-100 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">PAN Number</p>
                      <p className="text-sm text-[#0F172A]">{owner.panNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Total Vehicles</p>
                      <p className="text-sm text-[#1E88E5] font-semibold">{owner.vehicleCount}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Vehicle Dialog */}
      <Dialog open={isVehicleDialogOpen} onOpenChange={setIsVehicleDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingVehicle ? "Edit Vehicle" : "Add New Vehicle"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Vehicle Number *</Label>
                <Input placeholder="MH12AB1234" defaultValue={editingVehicle?.vehicleNumber} />
              </div>
              <div className="space-y-2">
                <Label>Vehicle Type *</Label>
                <Select defaultValue={editingVehicle?.vehicleType || "container"}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="container">Container Truck</SelectItem>
                    <SelectItem value="trailer">Trailer</SelectItem>
                    <SelectItem value="open">Open Truck</SelectItem>
                    <SelectItem value="closed">Closed Truck</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Capacity *</Label>
                <Input placeholder="20 Ton" defaultValue={editingVehicle?.capacity} />
              </div>
              <div className="space-y-2">
                <Label>Owner *</Label>
                <Select defaultValue={editingVehicle?.ownerId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select owner" />
                  </SelectTrigger>
                  <SelectContent>
                    {owners.map(owner => (
                      <SelectItem key={owner.id} value={owner.id}>{owner.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>RC Number *</Label>
              <Input placeholder="RC1234567890" defaultValue={editingVehicle?.rcNumber} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Insurance Expiry *</Label>
                <Input type="date" defaultValue={editingVehicle?.insuranceExpiry} />
              </div>
              <div className="space-y-2">
                <Label>Fitness Expiry *</Label>
                <Input type="date" defaultValue={editingVehicle?.fitnessExpiry} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Status *</Label>
              <Select defaultValue={editingVehicle?.status || "active"}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsVehicleDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-[#1E88E5] hover:bg-[#1E88E5]/90" onClick={() => setIsVehicleDialogOpen(false)}>
              {editingVehicle ? "Update" : "Add"} Vehicle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Owner Dialog */}
      <Dialog open={isOwnerDialogOpen} onOpenChange={setIsOwnerDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingOwner ? "Edit Owner" : "Add New Owner"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Owner Name *</Label>
              <Input placeholder="Enter owner name" defaultValue={editingOwner?.name} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Phone Number *</Label>
                <Input placeholder="+91 98765 43210" defaultValue={editingOwner?.phone} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="email@example.com" defaultValue={editingOwner?.email} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>PAN Number *</Label>
              <Input placeholder="ABCDE1234F" defaultValue={editingOwner?.panNumber} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOwnerDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-[#1E88E5] hover:bg-[#1E88E5]/90" onClick={() => setIsOwnerDialogOpen(false)}>
              {editingOwner ? "Update" : "Add"} Owner
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
