import React, { useState } from "react";
import { CalendarRange, Edit, Trash } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Shifts() {
  const shifts = [
    {
      employee: "John Doe",
      date: "2025-04-22",
      time: "9:00 AM - 5:00 PM",
      hours: 8,
    },
    {
      employee: "Jane Smith",
      date: "2025-04-22",
      time: "10:00 AM - 6:00 PM",
      hours: 8,
    },
    {
      employee: "Alex Johnson",
      date: "2025-04-23",
      time: "12:00 PM - 8:00 PM",
      hours: 8,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-11 lg:mt-0">
        <div>
          <h1 className="text-3xl font-bold">Shifts</h1>
          <p className="text-muted-foreground">Manage staff schedules</p>
        </div>
        <Button>Create Shift</Button>
      </div>

      <div className="max-sm:max-w-[20rem] max-md:max-w-[36rem] m-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <CalendarRange className="h-5 w-5 text-primary" />
              <CardTitle>Shift Schedule</CardTitle>
            </div>
            <CardDescription>
              View and edit employee work schedules
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto px-2">
            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="py-3 px-4 text-left font-medium">
                        Employee
                      </th>
                      <th className="py-3 px-4 text-left font-medium">Date</th>
                      <th className="py-3 px-4 text-left font-medium">Time</th>
                      <th className="py-3 px-4 text-left font-medium">Hours</th>
                      <th className="py-3 px-4 text-left font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {shifts.map((shift, idx) => (
                      <tr key={idx} className="border-t hover:bg-muted/30">
                        <td className="py-3 px-4">{shift.employee}</td>
                        <td className="py-3 px-4">{shift.date}</td>
                        <td className="py-3 px-4">{shift.time}</td>
                        <td className="py-3 px-4">{shift.hours} hours</td>
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
