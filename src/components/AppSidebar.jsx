import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Users,
  Receipt,
  Timer,
  UserCheck,
  Send,
  UserPlus,
  DollarSign,
  CalendarRange,
  BarChart3,
  Settings,
  LogOut,
  Dumbbell,
} from "lucide-react";
import { cn } from "../lib/utils";

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { title: "Subscriptions", icon: Users, path: "/subscriptions" },
    { title: "Receipts", icon: Receipt, path: "/receipts" },
    { title: "Time Tickets", icon: Timer, path: "/tickets" },
    { title: "Attendance", icon: UserCheck, path: "/attendance" },
    { title: "Invitations", icon: Send, path: "/free-invites" },
    { title: "Leads", icon: UserPlus, path: "/leads" },
    { title: "Staff", icon: DollarSign, path: "/staff" },
    { title: "Shifts", icon: CalendarRange, path: "/shifts" },
  ];

  const reportItems = [
    {
      title: "Subscription Report",
      icon: BarChart3,
      path: "/reports/subscriptions",
    },
    { title: "Tickets Report", icon: BarChart3, path: "/reports/tickets" },
    { title: "Receipts Report", icon: BarChart3, path: "/reports/receipts" },
  ];

  return (
    <div className="md:flex ">
      <aside
        className={cn(
          "w-64 h-screen bg-white border-r fixed z-50 transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:relative lg:z-auto"
        )}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Dumbbell className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">FitManager</span>
            </div>
            <button className="lg:hidden" onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>

          {user && (
            <div className="mb-4 p-3 bg-gray-100 rounded">
              <div className="font-semibold">{user.name}</div>
              <div className="text-sm text-gray-500">{user.role}</div>
            </div>
          )}

          <nav>
            <h4 className="text-sm text-gray-500 mb-1">Main Menu</h4>
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setIsOpen(false);
                }}
                className={cn(
                  "flex items-center gap-2 w-full text-left px-3 py-2 rounded hover:bg-gray-100",
                  isActive(item.path) && "bg-gray-200 font-medium"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.title}
              </button>
            ))}

            <h4 className="text-sm text-gray-500 mt-6 mb-1">Reports</h4>
            {reportItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setIsOpen(false);
                }}
                className={cn(
                  "flex items-center gap-2 w-full text-left px-3 py-2 rounded hover:bg-gray-100",
                  isActive(item.path) && "bg-gray-200 font-medium"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.title}
              </button>
            ))}

            <div className="mt-6 border-t pt-4">
              <button
                onClick={() => {
                  navigate("/settings");
                  setIsOpen(false);
                }}
                className={cn(
                  "flex items-center gap-2 w-full text-left px-3 py-2 rounded hover:bg-gray-100",
                  isActive("/settings") && "bg-gray-200 font-medium"
                )}
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 w-full text-left px-3 py-2 rounded hover:bg-red-100 text-red-600"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </nav>
        </div>
      </aside>

      {!isOpen && (
        <button
          className="block md:block lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow border"
          onClick={() => setIsOpen(true)}
        >
          <svg
            className="w-6 h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
