import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  PlusCircle,
  Search,
  Edit,
  Trash,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react";

const mockSubscriptions = [
  {
    id: "1",
    name: "Ahmed Hassan",
    type: "Premium",
    startDate: "2025-01-15",
    endDate: "2025-04-15",
    status: "active",
    paymentStatus: "paid",
  },
  {
    id: "2",
    name: "Sara Ahmed",
    type: "Standard",
    startDate: "2025-02-01",
    endDate: "2025-05-01",
    status: "active",
    paymentStatus: "paid",
  },
  {
    id: "3",
    name: "Mohamed Ali",
    type: "Premium",
    startDate: "2024-12-10",
    endDate: "2025-03-10",
    status: "active",
    paymentStatus: "paid",
  },
  {
    id: "4",
    name: "Layla Ibrahim",
    type: "Standard",
    startDate: "2025-02-15",
    endDate: "2025-05-15",
    status: "active",
    paymentStatus: "pending",
  },
  {
    id: "5",
    name: "Omar Khalid",
    type: "Premium",
    startDate: "2024-11-01",
    endDate: "2025-02-01",
    status: "expired",
    paymentStatus: "paid",
  },
];

export default function Subscriptions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [subscriptions, setSubscriptions] = useState(mockSubscriptions);
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPayment, setFilterPayment] = useState("");
  const navigate = useNavigate();

  const filteredSubscriptions = subscriptions.filter((sub) => {
    const matchesSearch =
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.status.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType ? sub.type === filterType : true;
    const matchesStatus = filterStatus ? sub.status === filterStatus : true;
    const matchesPayment = filterPayment
      ? sub.paymentStatus === filterPayment
      : true;

    return matchesSearch && matchesType && matchesStatus && matchesPayment;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "expired":
        return "bg-red-100 text-red-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 mt-11 lg:mt-0">
        <div>
          <h1 className="text-2xl sm:text-3xl  font-bold">Subscriptions</h1>
          <p className="text-muted-foreground text-sm">
            Manage member subscriptions
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => navigate("/subscriptions/add")}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Subscription
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      <div className="max-sm:max-w-[22rem] max-md:max-w-[36rem]  m-auto">
        <Card>
          <CardHeader className="space-y-4">
            <CardTitle className="text-xl md:text-2xl font-semibold">
              Active Subscriptions
            </CardTitle>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search subscriptions..."
                  className="pl-9 py-2 text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap gap-3 w-full lg:w-auto">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="border rounded-md px-3 py-2 text-sm w-full sm:w-auto"
                >
                  <option value="">All Types</option>
                  <option value="Premium">Premium</option>
                  <option value="Standard">Standard</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border rounded-md px-3 py-2 text-sm w-full sm:w-auto"
                >
                  <option value="">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                </select>
                <select
                  value={filterPayment}
                  onChange={(e) => setFilterPayment(e.target.value)}
                  className="border rounded-md px-3 py-2 text-sm w-full sm:w-auto"
                >
                  <option value="">All Payments</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>

            <CardDescription className="text-sm text-muted-foreground">
              Manage and view subscription details
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Type</th>
                    <th className="py-3 px-4 text-left">Start</th>
                    <th className="py-3 px-4 text-left">End</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Payment</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubscriptions.length > 0 ? (
                    filteredSubscriptions.map((subscription) => (
                      <tr
                        key={subscription.id}
                        className="border-b hover:bg-muted/50"
                      >
                        <td className="py-3 px-4">{subscription.name}</td>
                        <td className="py-3 px-4">{subscription.type}</td>
                        <td className="py-3 px-4">
                          {formatDate(subscription.startDate)}
                        </td>
                        <td className="py-3 px-4">
                          {formatDate(subscription.endDate)}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              subscription.status
                            )}`}
                          >
                            {subscription.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(
                              subscription.paymentStatus
                            )}`}
                          >
                            {subscription.paymentStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="py-8 text-center text-muted-foreground"
                      >
                        No subscriptions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-end mt-4 flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
