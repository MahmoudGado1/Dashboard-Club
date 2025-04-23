import React, { useState } from "react";
import moment from "moment";
import { UserCheck, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Attendance() {
  const [attendance, setAttendance] = useState([
    {
      name: "Ahmed Samir",
      time: moment().format("YYYY-MM-DD HH:mm:ss"),
      subscription: "Gold",
    },
    {
      name: "Nour Hassan",
      time: moment().subtract(1, "hour").format("YYYY-MM-DD HH:mm:ss"),
      subscription: "Silver",
    },
    {
      name: "Nour Hassan",
      time: moment().subtract(2, "hour").format("YYYY-MM-DD HH:mm:ss"),
      subscription: "Silver",
    },
    {
      name: "Nour Hassan",
      time: moment().subtract(3, "hour").format("YYYY-MM-DD HH:mm:ss"),
      subscription: "Silver",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(attendance.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = attendance.slice(indexOfFirstItem, indexOfLastItem);

  const handleManualRegister = () => {
    const newEntry = {
      name: "New Member",
      time: moment().format("YYYY-MM-DD HH:mm:ss"),
      subscription: "Basic",
    };
    setAttendance([newEntry, ...attendance]);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-11 lg:mt-0">
        <div>
          <h2 className="text-3xl font-bold">Attendance</h2>
          <p className="text-muted-foreground">
            Track and manage member check-ins
          </p>
        </div>
        <Button onClick={handleManualRegister}>Manual Register</Button>
      </div>

      <div className="max-sm:max-w-[22rem] max-md:max-w-[36rem] m-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <UserCheck className="w-5 h-5 text-primary" />
              <CardTitle>Member Attendance</CardTitle>
            </div>
            <CardDescription>View member entry records</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto px-2">
            <div className="space-y-4">
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="py-3 px-4 text-left font-medium">Name</th>
                        <th className="py-3 px-4 text-left font-medium">Time of Entry</th>
                        <th className="py-3 px-4 text-left font-medium">Subscription Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((entry, idx) => (
                        <tr key={idx} className="border-t hover:bg-muted/30">
                          <td className="py-3 px-4">{entry.name}</td>
                          <td className="py-3 px-4">{entry.time}</td>
                          <td className="py-3 px-4">{entry.subscription}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between px-4 py-4 border-t">
                  <div className="text-sm text-muted-foreground">
                    Showing {indexOfFirstItem + 1} to{" "}
                    {Math.min(indexOfLastItem, attendance.length)} of{" "}
                    {attendance.length} entries
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="text-sm">
                      Page {currentPage} of {totalPages || 1}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages || totalPages === 0}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
