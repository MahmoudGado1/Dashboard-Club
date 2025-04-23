import React from "react";
import { UserPlus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Leads() {
  const leads = [
    {
      name: "Ahmed Mahmoud",
      method: "Phone",
      status: "Pending",
    },
    {
      name: "Laila Saeed",
      method: "Instagram",
      status: "Contacted",
    },
    {
      name: "Hassan Khaled",
      method: "Walk-in",
      status: "Interested",
    },
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-11 lg:mt-0">
        <div>
          <h2 className="text-3xl font-bold">Leads</h2>
          <p className="text-muted-foreground">Manage potential members</p>
        </div>
        <Button>Add New Lead</Button>
      </div>

      <div className="max-sm:max-w-[20rem] max-md:max-w-[36rem] m-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <UserPlus className="w-5 h-5 text-primary" />
              <CardTitle>Potential Members</CardTitle>
            </div>
            <CardDescription>Track and convert leads into members</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto px-2">
            <div className="space-y-4">
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="py-3 px-4 text-left font-medium">Name</th>
                        <th className="py-3 px-4 text-left font-medium">Method</th>
                        <th className="py-3 px-4 text-left font-medium">Status</th>
                        <th className="py-3 px-4 text-left font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map((lead, idx) => (
                        <tr key={idx} className="border-t hover:bg-muted/30">
                          <td className="py-3 px-4">{lead.name}</td>
                          <td className="py-3 px-4">{lead.method}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                lead.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : lead.status === "Contacted"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-green-100 text-green-700"
                              }`}
                            >
                              {lead.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="secondary" size="sm">
                              Convert to Subscriber
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
