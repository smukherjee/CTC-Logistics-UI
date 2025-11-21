import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
// @ts-ignore: imported asset without type declarations
import ctcLogo from "../assets/ctc-logo.gif";

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E88E5] to-[#0F172A] flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl border-0 bg-white/95 backdrop-blur">
        <CardHeader className="items-center text-center gap-3">
          <img src={ctcLogo} alt="CTC Logistics" className="h-16 w-auto mx-auto" />
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-semibold text-slate-700 tracking-wide uppercase">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12 rounded-xl border border-transparent bg-[#F5F6FA] px-5 text-base focus-visible:border-[#1E88E5]"
                autoComplete="username"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-semibold text-slate-700 tracking-wide uppercase">
                  Password
                </Label>
                <span className="text-xs text-gray-500">8+ characters</span>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-xl border border-transparent bg-[#F5F6FA] pr-12 pl-5 text-base focus-visible:border-[#1E88E5]"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 accent-[#1E88E5]"
                />
                Keep me signed in
              </label>
              <button
                type="button"
                className="text-sm font-medium text-[#1E88E5] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base bg-[#1E88E5] hover:bg-[#1E88E5]/90 shadow-lg shadow-blue-500/30"
            >
              Sign In
            </Button>

            <p className="text-center text-xs text-gray-500">
              Need access? Contact support@ctclogistics.com
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
