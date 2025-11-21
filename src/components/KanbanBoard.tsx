import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin, Calendar, Truck, Package } from "lucide-react";

export interface Trip {
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
  currentLocation?: string;
  lat?: number;
  lng?: number;
}

interface KanbanColumnProps {
  title: string;
  count: number;
  trips: Trip[];
  color: string;
  onTripClick: (trip: Trip) => void;
}

function TripCard({ trip, onClick }: { trip: Trip; onClick: () => void }) {
  return (
    <Card className="p-3 mb-3 hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-[#0F172A] text-sm font-semibold mb-0.5">LR #{trip.lrNumber}</p>
          <p className="text-xs text-gray-600">{trip.party}</p>
        </div>
        <Badge variant="outline" className="text-xs py-0.5 px-2">{trip.vehicleNo}</Badge>
      </div>
      
      <div className="space-y-1.5 mb-2">
        <div className="flex items-center gap-1.5 text-xs text-gray-600">
          <MapPin className="w-3.5 h-3.5" />
          <span>{trip.from} → {trip.to}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-600">
          <Package className="w-3.5 h-3.5" />
          <span>{trip.articles} Articles</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-600">
          <Calendar className="w-3.5 h-3.5" />
          <span>{trip.date}</span>
        </div>
      </div>
      
      <div className="pt-2 border-t border-gray-100">
        <p className="text-[#1E88E5] text-sm font-semibold">₹{trip.freight}</p>
      </div>
    </Card>
  );
}

function KanbanColumn({ title, count, trips, color, onTripClick }: KanbanColumnProps) {
  return (
    <div className="flex-shrink-0 w-[260px]">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${color}`}></div>
          <span className="text-[#0F172A] text-sm font-semibold">{title}</span>
        </div>
        <Badge variant="secondary" className="text-xs h-5 px-2">{count}</Badge>
      </div>
      <div className="space-y-0">
        {trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} onClick={() => onTripClick(trip)} />
        ))}
      </div>
    </div>
  );
}

interface KanbanBoardProps {
  onTripClick: (trip: Trip) => void;
}

export function KanbanBoard({ onTripClick }: KanbanBoardProps) {
  const columns = [
    {
      title: "Created",
      color: "bg-gray-400",
      trips: [
        {
          id: "1",
          lrNumber: "2024001",
          from: "Mumbai",
          to: "Delhi",
          vehicleNo: "MH12AB1234",
          articles: 25,
          freight: "45,000",
          date: "Nov 16, 2025",
          party: "ABC Industries"
        },
        {
          id: "2",
          lrNumber: "2024002",
          from: "Pune",
          to: "Bangalore",
          vehicleNo: "MH14CD5678",
          articles: 18,
          freight: "32,000",
          date: "Nov 16, 2025",
          party: "XYZ Corp"
        }
      ]
    },
    {
      title: "Dispatched",
      color: "bg-[#1E88E5]",
      trips: [
        {
          id: "3",
          lrNumber: "2024003",
          from: "Delhi",
          to: "Jaipur",
          vehicleNo: "DL10EF9012",
          articles: 30,
          freight: "28,500",
          date: "Nov 15, 2025",
          party: "DEF Traders"
        }
      ]
    },
    {
      title: "In Transit",
      color: "bg-[#FACC15]",
      trips: [
        {
          id: "4",
          lrNumber: "2024004",
          from: "Chennai",
          to: "Hyderabad",
          vehicleNo: "TN09GH3456",
          articles: 22,
          freight: "38,000",
          date: "Nov 14, 2025",
          party: "GHI Logistics"
        },
        {
          id: "5",
          lrNumber: "2024005",
          from: "Kolkata",
          to: "Bhubaneswar",
          vehicleNo: "WB07IJ7890",
          articles: 15,
          freight: "25,000",
          date: "Nov 14, 2025",
          party: "JKL Enterprises"
        }
      ]
    },
    {
      title: "Delivered",
      color: "bg-[#16A34A]",
      trips: [
        {
          id: "6",
          lrNumber: "2024006",
          from: "Ahmedabad",
          to: "Surat",
          vehicleNo: "GJ01KL2345",
          articles: 20,
          freight: "18,000",
          date: "Nov 13, 2025",
          party: "MNO Supplies"
        }
      ]
    },
    {
      title: "Billing Pending",
      color: "bg-[#DC2626]",
      trips: [
        {
          id: "7",
          lrNumber: "2024007",
          from: "Nagpur",
          to: "Indore",
          vehicleNo: "MH31MN6789",
          articles: 28,
          freight: "35,000",
          date: "Nov 12, 2025",
          party: "PQR Industries"
        }
      ]
    }
  ];

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-4">
        {columns.map((column) => (
          <KanbanColumn
            key={column.title}
            title={column.title}
            count={column.trips.length}
            trips={column.trips}
            color={column.color}
            onTripClick={onTripClick}
          />
        ))}
      </div>
    </div>
  );
}
