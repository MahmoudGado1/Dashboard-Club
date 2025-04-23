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

export default function ReceiptsReport() {
  // Static mock values for start and end dates
  const mockStartDate = "2025-04-01";
  const mockEndDate = "2025-04-05";
  
  const [startDate, setStartDate] = useState(mockStartDate);
  const [endDate, setEndDate] = useState(mockEndDate);
  const [filteredReceipts, setFilteredReceipts] = useState([]);
  
  const receipts = [
    { date: "2025-04-01", amount: 120 },
    { date: "2025-04-02", amount: 150 },
    { date: "2025-04-03", amount: 100 },
    { date: "2025-04-04", amount: 200 },
    { date: "2025-04-05", amount: 180 },
  ];

  const totalAmount = filteredReceipts.reduce((sum, receipt) => sum + receipt.amount, 0);

  const handleDateFilter = () => {
    const filtered = receipts.filter(
      (receipt) =>
        (!startDate || new Date(receipt.date) >= new Date(startDate)) &&
        (!endDate || new Date(receipt.date) <= new Date(endDate))
    );
    setFilteredReceipts(filtered);
  };

  const exportReport = () => {
    const reportData = filteredReceipts.map((receipt) => ({
      Date: receipt.date,
      Amount: `$${receipt.amount}`,
    }));
    const csvData = [
      ["Date", "Amount"],
      ...reportData.map((row) => [row.Date, row.Amount]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "receipts_report.csv";
    link.click();
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 mt-11 lg:mt-0">
        <div>
          <h1 className="text-3xl font-bold">Receipts Report</h1>
          <p className="text-muted-foreground">Financial analysis and reporting</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportReport}>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <CardTitle>Financial Analysis</CardTitle>
          </div>
          <CardDescription>
            Comprehensive report of all financial transactions
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 py-6">
          <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <Button onClick={handleDateFilter} className="self-center  mt-6 col-span-2 sm:col-auto">
              Apply Filters
            </Button>
          </div>

          {filteredReceipts.length > 0 ? (
            <div className="text-center">
              <h3 className="text-lg font-semibold">Total Amount Paid</h3>
              <p className="text-2xl font-bold">${totalAmount}</p>
            </div>
          ) : (
            <p className="text-muted-foreground text-center mt-4">
              No receipts found for the selected dates.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
