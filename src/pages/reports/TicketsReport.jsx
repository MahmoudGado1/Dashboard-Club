import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Download } from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function TicketsReport() {
  const [filter, setFilter] = useState("daily");
  const [ticketsData, setTicketsData] = useState({
    labels: ["2025-04-01", "2025-04-02", "2025-04-03", "2025-04-04", "2025-04-05"],
    datasets: [
      {
        label: "Tickets Sold",
        data: [120, 90, 150, 200, 180],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  });

  const dailyTickets = [
    { date: "2025-04-01", ticketsSold: 120, revenue: "$300" },
    { date: "2025-04-02", ticketsSold: 90, revenue: "$225" },
    { date: "2025-04-03", ticketsSold: 150, revenue: "$375" },
    { date: "2025-04-04", ticketsSold: 200, revenue: "$500" },
    { date: "2025-04-05", ticketsSold: 180, revenue: "$450" },
  ];

  const monthlyTickets = [
    { month: "January", ticketsSold: 3500, revenue: "$8750" },
    { month: "February", ticketsSold: 3200, revenue: "$8000" },
    { month: "March", ticketsSold: 4000, revenue: "$10000" },
    { month: "April", ticketsSold: 3500, revenue: "$8750" },
  ];

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    if (e.target.value === "daily") {
      setTicketsData({
        labels: ["2025-04-01", "2025-04-02", "2025-04-03", "2025-04-04", "2025-04-05"],
        datasets: [
          {
            label: "Tickets Sold",
            data: [120, 90, 150, 200, 180],
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: true,
          },
        ],
      });
    } else {
      setTicketsData({
        labels: ["January", "February", "March", "April"],
        datasets: [
          {
            label: "Tickets Sold",
            data: [3500, 3200, 4000, 3500],
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: true,
          },
        ],
      });
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 mt-11 lg:mt-0">
        <div>
          <h1 className="text-3xl font-bold">Tickets Report</h1>
          <p className="text-muted-foreground">Analyze daily and monthly tickets usage</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>
      <div className="max-sm:max-w-[20rem] max-md:max-w-[36rem] m-auto">

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <CardTitle>Tickets Analysis</CardTitle>
          </div>
          <CardDescription>Comprehensive report of tickets usage</CardDescription>
        </CardHeader>
        <CardContent className="px-4 py-6">
          <div className="flex justify-between items-center mb-4">
            <select
              value={filter}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded-lg p-2"
            >
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div className="mb-6">
            <Line data={ticketsData} />
          </div>

          <div className="overflow-x-auto rounded-md border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  {filter === "daily" ? (
                    <>
                      <th className="py-3 px-4 text-left font-medium">Date</th>
                      <th className="py-3 px-4 text-left font-medium">Tickets Sold</th>
                      <th className="py-3 px-4 text-left font-medium">Revenue</th>
                    </>
                  ) : (
                    <>
                      <th className="py-3 px-4 text-left font-medium">Month</th>
                      <th className="py-3 px-4 text-left font-medium">Tickets Sold</th>
                      <th className="py-3 px-4 text-left font-medium">Revenue</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {(filter === "daily" ? dailyTickets : monthlyTickets).map((ticket, idx) => (
                  <tr key={idx} className="border-t hover:bg-muted/30">
                    {filter === "daily" ? (
                      <>
                        <td className="py-3 px-4">{ticket.date}</td>
                        <td className="py-3 px-4">{ticket.ticketsSold}</td>
                        <td className="py-3 px-4">{ticket.revenue}</td>
                      </>
                    ) : (
                      <>
                        <td className="py-3 px-4">{ticket.month}</td>
                        <td className="py-3 px-4">{ticket.ticketsSold}</td>
                        <td className="py-3 px-4">{ticket.revenue}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}