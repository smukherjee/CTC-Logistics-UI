import { useState } from "react";
import { Plus, Search, Phone, MapPin, Edit, Trash2, Building2, Bell, User } from "lucide-react";
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

interface Party {
  id: string;
  name: string;
  type: "consignor" | "consignee" | "both";
  phone: string;
  email: string;
  address: string;
  city: string;
  gst: string;
  creditLimit?: string;
}

export function PartyManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingParty, setEditingParty] = useState<Party | null>(null);

  const [parties, setParties] = useState<Party[]>([
    {
      id: "1",
      name: "ABC Industries",
      type: "consignor",
      phone: "+91 98765 11111",
      email: "contact@abcindustries.com",
      address: "Plot 45, Industrial Area, Phase 1",
      city: "Mumbai",
      gst: "27AABCU9603R1Z2",
      creditLimit: "₹5,00,000"
    },
    {
      id: "2",
      name: "XYZ Corp",
      type: "both",
      phone: "+91 98765 22222",
      email: "info@xyzcorp.com",
      address: "Tower A, Business Park",
      city: "Delhi",
      gst: "07AABCX1234M1Z5",
      creditLimit: "₹8,00,000"
    },
    {
      id: "3",
      name: "GHI Logistics",
      type: "consignee",
      phone: "+91 98765 33333",
      email: "support@ghilogistics.com",
      address: "Warehouse 12, Sector 8",
      city: "Bangalore",
      gst: "29AABCG5678N1Z8",
      creditLimit: "₹3,00,000"
    }
  ]);

  const filteredParties = parties.filter(party =>
    party.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    party.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddParty = () => {
    setEditingParty(null);
    setIsDialogOpen(true);
  };

  const handleEditParty = (party: Party) => {
    setEditingParty(party);
    setIsDialogOpen(true);
  };

  const handleDeleteParty = (id: string) => {
    setParties(parties.filter(p => p.id !== id));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "consignor":
        return "bg-[#1E88E5] text-white";
      case "consignee":
        return "bg-[#16A34A] text-white";
      case "both":
        return "bg-[#FACC15] text-gray-900";
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
          <h1 className="text-lg font-semibold">Party Management</h1>
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 cursor-pointer" />
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">

        {/* Search Bar */}
        <Card className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by name or city..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <p className="text-sm text-gray-600 mb-1">Total Parties</p>
            <p className="text-2xl font-semibold text-[#0F172A]">{parties.length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-600 mb-1">Consignors Only</p>
            <p className="text-2xl font-semibold text-[#1E88E5]">
              {parties.filter(p => p.type === "consignor").length}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-600 mb-1">Consignees Only</p>
            <p className="text-2xl font-semibold text-[#16A34A]">
              {parties.filter(p => p.type === "consignee").length}
            </p>
          </Card>
        </div>

        {/* Party List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredParties.map((party) => (
            <Card key={party.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-[#1E88E5] rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0F172A] mb-1">{party.name}</h3>
                    <Badge className={getTypeColor(party.type)}>
                      {party.type === "both" ? "Consignor & Consignee" : 
                       party.type === "consignor" ? "Consignor" : "Consignee"}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditParty(party)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteParty(party.id)}
                  >
                    <Trash2 className="w-4 h-4 text-[#DC2626]" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{party.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{party.address}, {party.city}</span>
                </div>
                <div className="pt-3 border-t border-gray-100 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">GST Number</p>
                    <p className="text-sm text-[#0F172A]">{party.gst}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Credit Limit</p>
                    <p className="text-sm text-[#16A34A]">{party.creditLimit}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Add/Edit Party Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingParty ? "Edit Party" : "Add New Party"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Party Name *</Label>
                <Input placeholder="Enter party name" defaultValue={editingParty?.name} />
              </div>
              <div className="space-y-2">
                <Label>Party Type *</Label>
                <Select defaultValue={editingParty?.type || "consignor"}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consignor">Consignor</SelectItem>
                    <SelectItem value="consignee">Consignee</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Phone Number *</Label>
                <Input placeholder="+91 98765 43210" defaultValue={editingParty?.phone} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="email@example.com" defaultValue={editingParty?.email} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Address *</Label>
              <Input placeholder="Street address" defaultValue={editingParty?.address} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>City *</Label>
                <Input placeholder="City" defaultValue={editingParty?.city} />
              </div>
              <div className="space-y-2">
                <Label>GST Number</Label>
                <Input placeholder="27AABCU9603R1Z2" defaultValue={editingParty?.gst} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Credit Limit</Label>
              <Input placeholder="₹5,00,000" defaultValue={editingParty?.creditLimit} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-[#1E88E5] hover:bg-[#1E88E5]/90" onClick={() => setIsDialogOpen(false)}>
              {editingParty ? "Update" : "Add"} Party
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
