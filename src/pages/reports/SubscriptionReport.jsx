import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock data for subscription report
const reportData = [
  { month: "Jan", subscriptions: 45, revenue: 22500 },
  { month: "Feb", subscriptions: 52, revenue: 26000 },
  { month: "Mar", subscriptions: 48, revenue: 24000 },
  { month: "Apr", subscriptions: 61, revenue: 30500 },
  { month: "May", subscriptions: 55, revenue: 27500 },
  { month: "Jun", subscriptions: 67, revenue: 33500 },
];

export default function SubscriptionReport() {
  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 mt-11 lg:mt-0">
        <div>
          <h1 className="text-3xl font-bold">Subscription Report</h1>
          <p className="text-muted-foreground">Analyze subscription trends and revenue</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Excel
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">328</div>
            <CardDescription className="flex items-center mt-2">
              Active memberships
              <span className="text-green-500 ml-2 text-xs font-medium">+12.5%</span>
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$33,500</div>
            <CardDescription className="flex items-center mt-2">
              From subscriptions
              <span className="text-green-500 ml-2 text-xs font-medium">+8.2%</span>
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$500</div>
            <CardDescription className="flex items-center mt-2">
              Per subscription
              <span className="text-red-500 ml-2 text-xs font-medium">-2.1%</span>
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <CardTitle>Subscription Trends</CardTitle>
          </div>
          <CardDescription>Monthly subscription and revenue analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={reportData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="subscriptions" fill="#8884d8" name="Subscriptions" />
                <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="Revenue ($)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
