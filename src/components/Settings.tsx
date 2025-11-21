import { TopBar } from "./TopBar";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { 
  User, 
  Bell, 
  Shield, 
  FileText, 
  Palette,
  Database,
  Download,
  Upload
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";

export function Settings() {
  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* Header */}
      <div className="bg-[#0F172A] text-white p-4">
        <div className="flex items-center justify-between">
          <div className="w-8"></div>
          <h1 className="text-lg font-semibold">Settings</h1>
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 cursor-pointer" />
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer">
              <UserIcon className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 max-w-6xl mx-auto">

        {/* Profile Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#1E88E5] rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#0F172A]">Profile Settings</h2>
              <p className="text-sm text-gray-600">Update your personal information</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input defaultValue="Admin User" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" defaultValue="admin@ctclogistics.com" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input defaultValue="+91 98765 43210" />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select defaultValue="admin">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="operator">Operator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex justify-end">
              <Button className="bg-[#1E88E5] hover:bg-[#1E88E5]/90">
                Save Changes
              </Button>
            </div>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#16A34A] rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#0F172A]">Notification Preferences</h2>
              <p className="text-sm text-gray-600">Manage how you receive notifications</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-[#0F172A]">E-way Bill Expiry Alerts</p>
                <p className="text-xs text-gray-600">Get notified 24 hours before expiry</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-[#0F172A]">Trip Status Updates</p>
                <p className="text-xs text-gray-600">Receive updates on trip milestones</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-[#0F172A]">Payment Reminders</p>
                <p className="text-xs text-gray-600">Alerts for pending payments</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-[#0F172A]">Daily Summary Report</p>
                <p className="text-xs text-gray-600">Receive daily business summary at 6 PM</p>
              </div>
              <Switch />
            </div>
          </div>
        </Card>

        {/* Security Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#DC2626] rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#0F172A]">Security</h2>
              <p className="text-sm text-gray-600">Manage your account security</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Current Password</Label>
              <Input type="password" placeholder="Enter current password" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input type="password" placeholder="Enter new password" />
              </div>
              <div className="space-y-2">
                <Label>Confirm Password</Label>
                <Input type="password" placeholder="Confirm new password" />
              </div>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-[#0F172A]">Two-Factor Authentication</p>
                <p className="text-xs text-gray-600">Add an extra layer of security</p>
              </div>
              <Button variant="outline">Enable</Button>
            </div>
            
            <div className="flex justify-end">
              <Button className="bg-[#DC2626] hover:bg-[#DC2626]/90">
                Change Password
              </Button>
            </div>
          </div>
        </Card>

        {/* Business Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#FACC15] rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#0F172A]">Business Configuration</h2>
              <p className="text-sm text-gray-600">Configure business-specific settings</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input defaultValue="CTC Logistics Pvt. Ltd." />
              </div>
              <div className="space-y-2">
                <Label>GST Number</Label>
                <Input defaultValue="27AABCC1234M1Z5" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Company Address</Label>
              <Input defaultValue="123 Business Park, Mumbai, Maharashtra - 400001" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Default Currency</Label>
                <Select defaultValue="inr">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inr">INR (₹)</SelectItem>
                    <SelectItem value="usd">USD ($)</SelectItem>
                    <SelectItem value="eur">EUR (€)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Timezone</Label>
                <Select defaultValue="ist">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ist">IST (UTC+5:30)</SelectItem>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="est">EST (UTC-5)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex justify-end">
              <Button className="bg-[#1E88E5] hover:bg-[#1E88E5]/90">
                Save Configuration
              </Button>
            </div>
          </div>
        </Card>

        {/* Appearance Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#8B5CF6] rounded-lg flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#0F172A]">Appearance</h2>
              <p className="text-sm text-gray-600">Customize the look and feel</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Theme</Label>
              <Select defaultValue="light">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="auto">Auto (System)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-[#0F172A]">Compact Mode</p>
                <p className="text-xs text-gray-600">Reduce spacing in the interface</p>
              </div>
              <Switch />
            </div>
          </div>
        </Card>

        {/* Data Management */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#0F172A] rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#0F172A]">Data Management</h2>
              <p className="text-sm text-gray-600">Import and export your data</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-[#0F172A]">Export All Data</p>
                <p className="text-xs text-gray-600">Download a complete backup of your data</p>
              </div>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-[#0F172A]">Import Data</p>
                <p className="text-xs text-gray-600">Import data from CSV or backup file</p>
              </div>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Import
              </Button>
            </div>
          </div>
        </Card>

        {/* About */}
        <Card className="p-6 text-center">
          <p className="text-sm text-gray-600 mb-2">CTC Logistics Management System</p>
          <p className="text-xs text-gray-500">Version 1.0.0 • © 2025 CTC Logistics Pvt. Ltd.</p>
        </Card>
      </div>
    </div>
  );
}
