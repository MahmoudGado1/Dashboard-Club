import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";      
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { SidebarProvider } from "./components/ui/sidebar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Subscriptions from "./pages/Subscriptions";
import AddSubscription from "./pages/AddSubscription";
import Receipts from "./pages/Receipts";
import Tickets from "./pages/Tickets";
import Attendance from "./pages/Attendance";
import FreeInvites from "./pages/FreeInvites";
import Leads from "./pages/Leads";
import Staff from "./pages/Staff";
import Shifts from "./pages/Shifts";
import SubscriptionReport from "./pages/reports/SubscriptionReport";
import TicketsReport from "./pages/reports/TicketsReport";
import ReceiptsReport from "./pages/reports/ReceiptsReport";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { AppSidebar } from "./components/AppSidebar";

const queryClient = new QueryClient();

function ProtectedRoute({ children }) {
  // const { isAuthenticated } = useAuth();
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" />;
  // }
  return children;
}

function AppLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1">{children}</main>
      </div>
    </SidebarProvider>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />

            {[
              { path: "/dashboard", Component: Dashboard },
              { path: "/subscriptions", Component: Subscriptions },
              { path: "/subscriptions/add", Component: AddSubscription },
              { path: "/subscriptions/edit/:id", Component: AddSubscription },
              { path: "/receipts", Component: Receipts },
              { path: "/tickets", Component: Tickets },
              { path: "/attendance", Component: Attendance },
              { path: "/free-invites", Component: FreeInvites },
              { path: "/leads", Component: Leads },
              { path: "/staff", Component: Staff },
              { path: "/shifts", Component: Shifts },
              {
                path: "/reports/subscriptions",
                Component: SubscriptionReport,
              },
              { path: "/reports/tickets", Component: TicketsReport },
              { path: "/reports/receipts", Component: ReceiptsReport },
              { path: "/settings", Component: Settings },
            ].map(({ path, Component }) => (
              <Route
                key={path}
                path={path}
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <Component />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
            ))}

            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
