import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye, Edit, Trash } from "lucide-react";

const mockTickets = [
  {
    id: "TK-001",
    memberName: "Ahmed Hassan",
    type: "Daily",
    date: "2025-04-15",
    price: 50,
    status: "used",
  },
  {
    id: "TK-002",
    memberName: "Sara Ahmed",
    type: "Weekly",
    date: "2025-04-14",
    price: 200,
    status: "active",
  },
  {
    id: "TK-003",
    memberName: "Mohamed Ali",
    type: "Daily",
    date: "2025-04-14",
    price: 50,
    status: "used",
  },
  {
    id: "TK-004",
    memberName: "Layla Ibrahim",
    type: "Monthly",
    date: "2025-04-10",
    price: 500,
    status: "active",
  },
  {
    id: "TK-005",
    memberName: "Omar Mahmoud",
    type: "Daily",
    date: "2025-04-13",
    price: 50,
    status: "expired",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-600";
    case "used":
      return "bg-blue-100 text-blue-600";
    case "expired":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export default function Tickets() {
  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 mt-11 lg:mt-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Time Tickets</h1>
          <p className="text-sm text-muted-foreground">
            Manage daily and individual tickets
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/80 text-white">
          <Plus className="mr-2 h-4 w-4" />
          New Ticket
        </Button>
      </div>

      <div className="hidden md:block">
        <Card>
          <CardHeader className="space-y-4">
            <CardTitle className="text-xl md:text-2xl font-semibold">
              Active Subscriptions
            </CardTitle>
            <CardDescription>
              View and manage your active subscriptions
            </CardDescription>
          </CardHeader>
          <CardContent >
            <table className="w-full table-auto text-sm text-left  border-gray-200">
              <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Ticket Type</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Price (EGP)</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockTickets.map((ticket) => (
                  <tr key={ticket.id} className="border-t border-gray-200">
                    <td className="px-4 py-3">{ticket.memberName}</td>
                    <td className="px-4 py-3">{ticket.type}</td>
                    <td className="px-4 py-3">{ticket.date}</td>
                    <td className="px-4 py-3">{ticket.price}</td>
                    <td className="px-4 py-3">
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600"
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      <div className="md:hidden space-y-4">
        {mockTickets.map((ticket) => (
          <Card key={ticket.id}>
            <CardHeader>
              <CardTitle className="text-lg">{ticket.memberName}</CardTitle>
              <CardDescription>{ticket.date}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Type:</span>
                <span>{ticket.type}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Price:</span>
                <span>{ticket.price} EGP</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Status:</span>
                <Badge className={getStatusColor(ticket.status)}>
                  {ticket.status}
                </Badge>
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <Button variant="ghost" size="icon">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-red-600">
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
