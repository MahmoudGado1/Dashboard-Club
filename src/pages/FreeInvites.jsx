import React, { useState } from "react";
import { Send } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FreeInvites() {
  const [invites, setInvites] = useState([
    {
      name: "Ali Mohamed",
      date: "2025-04-20",
      used: true,
      source: "Facebook Ad",
    },
    {
      name: "Laila Sherif",
      date: "2025-04-18",
      used: false,
      source: "Referral",
    },
    {
      name: "Kareem Fathy",
      date: "2025-04-15",
      used: true,
      source: "Instagram DM",
    },
  ]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-11 lg:mt-0">
        <div>
          <h2 className="text-3xl font-bold">Free Invitations</h2>
          <p className="text-muted-foreground">Manage free gym passes</p>
        </div>
        <Button>Create Invitation</Button>
      </div>

      <div className="max-sm:max-w-[22rem] max-md:max-w-[36rem] m-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Send className="w-5 h-5 text-primary" />
              <CardTitle>Free Invitations</CardTitle>
            </div>
            <CardDescription>Track and manage free guest passes</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto px-2">
            <div className="space-y-4">
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="py-3 px-4 text-left font-medium">Name</th>
                        <th className="py-3 px-4 text-left font-medium">Date</th>
                        <th className="py-3 px-4 text-left font-medium">Used</th>
                        <th className="py-3 px-4 text-left font-medium">Source</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invites.map((invite, idx) => (
                        <tr key={idx} className="border-t hover:bg-muted/30">
                          <td className="py-3 px-4">{invite.name}</td>
                          <td className="py-3 px-4">{invite.date}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                invite.used
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {invite.used ? "Used" : "Not Used"}
                            </span>
                          </td>
                          <td className="py-3 px-4">{invite.source}</td>
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
