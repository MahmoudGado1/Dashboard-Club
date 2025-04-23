import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Download,
  Printer,
  Eye,
  Edit,
  Trash,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for receipts
const mockReceipts = [
  {
    id: "REC-001",
    memberName: "Ahmed Hassan",
    type: "Subscription",
    date: "2025-04-15",
    amount: 500,
    status: "paid",
  },
  {
    id: "REC-002",
    memberName: "Sara Ahmed",
    type: "Daily Ticket",
    date: "2025-04-15",
    amount: 50,
    status: "paid",
  },
  {
    id: "REC-003",
    memberName: "Mohamed Ali",
    type: "Subscription",
    date: "2025-04-14",
    amount: 750,
    status: "pending",
  },
  {
    id: "REC-004",
    memberName: "Layla Ibrahim",
    type: "Personal Training",
    date: "2025-04-14",
    amount: 200,
    status: "paid",
  },
  {
    id: "REC-005",
    memberName: "Omar Mahmoud",
    type: "Subscription",
    date: "2025-04-13",
    amount: 500,
    status: "paid",
  },
  {
    id: "REC-006",
    memberName: "Fatima Hussein",
    type: "Daily Ticket",
    date: "2025-04-13",
    amount: 50,
    status: "refunded",
  },
  {
    id: "REC-007",
    memberName: "Youssef Kamal",
    type: "Subscription",
    date: "2025-04-12",
    amount: 750,
    status: "paid",
  },
];

export default function Receipts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const itemsPerPage = 4;

  const filteredReceipts = mockReceipts.filter((receipt) => {
    const matchesSearch =
      receipt.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      receipt.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "subscription" && receipt.type === "Subscription") ||
      (activeTab === "daily" && receipt.type === "Daily Ticket") ||
      (activeTab === "other" &&
        receipt.type !== "Subscription" &&
        receipt.type !== "Daily Ticket");

    const matchesStatus =
      selectedStatus === "all" || receipt.status === selectedStatus;

    const matchesType = selectedType === "all" || receipt.type === selectedType;

    return matchesSearch && matchesTab && matchesStatus && matchesType;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReceipts = filteredReceipts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredReceipts.length / itemsPerPage);

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 mt-11 lg:mt-0">
        <div>
          <h1 className="text-3xl font-bold">Receipts</h1>
          <p className="text-muted-foreground">Manage payment receipts</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Receipt
          </Button>
        </div>
      </div>
      <div className="max-sm:max-w-[20rem] max-md:max-w-[36rem] m-auto">
        <Card>
          <CardHeader>
            <CardTitle>All Receipts</CardTitle>
            <CardDescription>
              View and manage all payment records
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
                  <div className="relative w-full sm:w-[240px]">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search receipts..."
                      className="pl-8 w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select
                    value={selectedStatus}
                    onValueChange={setSelectedStatus}
                  >
                    <SelectTrigger className="w-full sm:w-[160px]">
                      <Filter className="mr-2 h-4 w-4" />
                      <span>Status</span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="refunded">Refunded</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-full sm:w-[160px]">
                      <Filter className="mr-2 h-4 w-4" />
                      <span>Type</span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Subscription">Subscription</SelectItem>
                      <SelectItem value="Daily Ticket">Daily Ticket</SelectItem>
                      <SelectItem value="Personal Training">
                        Personal Training
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="p-4 space-y-4">
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto rounded-md border">
                  <table className="w-full text-sm min-w-[700px]">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="py-3 px-4 text-left font-medium">
                          Receipt ID
                        </th>
                        <th className="py-3 px-4 text-left font-medium">
                          Member
                        </th>
                        <th className="py-3 px-4 text-left font-medium">
                          Type
                        </th>
                        <th className="py-3 px-4 text-left font-medium">
                          Date
                        </th>
                        <th className="py-3 px-4 text-left font-medium">
                          Amount
                        </th>
                        <th className="py-3 px-4 text-left font-medium">
                          Status
                        </th>
                        <th className="py-3 px-4 text-left font-medium">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentReceipts.map((receipt) => (
                        <tr
                          key={receipt.id}
                          className="border-t hover:bg-muted/30"
                        >
                          <td className="py-3 px-4">{receipt.id}</td>
                          <td className="py-3 px-4">{receipt.memberName}</td>
                          <td className="py-3 px-4">{receipt.type}</td>
                          <td className="py-3 px-4">{receipt.date}</td>
                          <td className="py-3 px-4">
                            ${receipt.amount.toFixed(2)}
                          </td>
                          <td className="py-3 px-4">
                            <Badge
                              variant={
                                receipt.status === "paid"
                                  ? "default"
                                  : receipt.status === "pending"
                                  ? "outline"
                                  : "secondary"
                              }
                            >
                              {receipt.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0"
                              >
                                <Printer className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="md:hidden space-y-4">
                  {currentReceipts.map((receipt) => (
                    <div
                      key={receipt.id}
                      className="border rounded-lg p-4 shadow-sm bg-white"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-sm">
                          Receipt #{receipt.id}
                        </h3>
                        <Badge
                          variant={
                            receipt.status === "paid"
                              ? "default"
                              : receipt.status === "pending"
                              ? "outline"
                              : "secondary"
                          }
                        >
                          {receipt.status}
                        </Badge>
                      </div>
                      <div className="text-sm space-y-1 mb-3">
                        <p>
                          <span className="font-medium">Member:</span>{" "}
                          {receipt.memberName}
                        </p>
                        <p>
                          <span className="font-medium">Type:</span>{" "}
                          {receipt.type}
                        </p>
                        <p>
                          <span className="font-medium">Date:</span>{" "}
                          {receipt.date}
                        </p>
                        <p>
                          <span className="font-medium">Amount:</span> $
                          {receipt.amount.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                        >
                          <Printer className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
