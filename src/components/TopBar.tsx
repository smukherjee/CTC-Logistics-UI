import { Search, Bell, User } from "lucide-react";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
// @ts-ignore: Allow importing GIF asset without type declarations
import ctcLogo from "../assets/ctc-logo.gif";

export function TopBar() {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2">
      <div className="flex items-center justify-between">
        {/* Logo and Company Info */}
        <div className="flex items-center gap-2">
          <img src={ctcLogo} alt="CTC Logistics" className="h-8 w-auto" />
          <div className="border-l border-gray-300 pl-2">
            <p className="text-[10px] text-gray-600 font-medium">GST: 08AAEFC3940P1Z4</p>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
            <Input
              placeholder="Search trips, LR, invoices..."
              className="pl-8 bg-[#F3F4F6] border-0 h-7 text-xs"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          <button type="button" aria-label="Notifications" title="Notifications" className="relative p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-4 h-4 text-gray-600" />
            <span className="sr-only">Notifications</span>
            <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-[#DC2626] rounded-full" aria-hidden="true"></span>
          </button>
          <Avatar className="w-7 h-7">
            <AvatarFallback className="bg-[#1E88E5] text-white">
              <User className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}
