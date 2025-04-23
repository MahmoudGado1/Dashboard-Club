import React from "react";
import { DollarSign, Edit, Trash } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Staff() {
  const staffMembers = [
    {
      name: "John Doe",
      role: "Trainer",
      status: "Active",
    },
    {
      name: "Jane Smith",
      role: "Manager",
      status: "Inactive",
    },
    {
      name: "Alex Johnson",
      role: "Front Desk",
      status: "Active",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-11 lg:mt-0">
        <div>
          <h1 className="text-3xl font-bold">Staff</h1>
          <p className="text-muted-foreground">Manage gym employees</p>
        </div>
        <Button>Add Staff Member</Button>
      </div>

      <div className="max-sm:max-w-[20rem] max-md:max-w-[36rem] m-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <CardTitle>Staff Management</CardTitle>
            </div>
            <CardDescription>Manage staff members and salaries</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto px-2">
            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="py-3 px-4 text-left font-medium">Name</th>
                      <th className="py-3 px-4 text-left font-medium">Role</th>
                      <th className="py-3 px-4 text-left font-medium">
                        Status
                      </th>
                      <th className="py-3 px-4 text-left font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffMembers.map((member, idx) => (
                      <tr key={idx} className="border-t hover:bg-muted/30">
                        <td className="py-3 px-4">{member.name}</td>
                        <td className="py-3 px-4">{member.role}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              member.status === "Active"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {member.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 flex space-x-2">
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
                            <Trash className="h-4 w-4 " />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
