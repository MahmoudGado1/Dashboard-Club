import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Receipt,
  Timer,
  TrendingUp,
  ChevronRight,
  PlusCircle,
  User,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useAuth } from "@/contexts/AuthContext";

const chartData = [
  { name: "Jan", members: 340, revenue: 5400 },
  { name: "Feb", members: 380, revenue: 5800 },
  { name: "Mar", members: 420, revenue: 6400 },
  { name: "Apr", members: 450, revenue: 6900 },
  { name: "May", members: 470, revenue: 7200 },
  { name: "Jun", members: 540, revenue: 8400 },
  { name: "Jul", members: 580, revenue: 9100 },
];

const recentActivity = [
  { id: 1, name: "Ahmed Hassan", action: "Check-in", time: "10 minutes ago", type: "Regular Member" },
  { id: 2, name: "Sara Ahmed", action: "New Subscription", time: "1 hour ago", type: "Premium Member" },
  { id: 3, name: "Mohamed Ali", action: "Payment Received", time: "2 hours ago", type: "Regular Member" },
  { id: 4, name: "Layla Ibrahim", action: "Check-in", time: "3 hours ago", type: "Daily Ticket" },
];

export default function Dashboard() {
  const { user } = useAuth();
  
  const stats = [
    {
      title: "Total Members",
      value: "2,345",
      description: "Active memberships",
      icon: Users,
      trend: "+12.5%",
    },
    {
      title: "Today's Revenue",
      value: "$1,234",
      description: "From all sources",
      icon: Receipt,
      trend: "+8.2%",
    },
    {
      title: "Check-ins Today",
      value: "156",
      description: "Member visits",
      icon: Timer,
      trend: "+5.4%",
    },
    {
      title: "New Leads",
      value: "24",
      description: "Potential members",
      icon: TrendingUp,
      trend: "+15.8%",
    },
  ];

  return (
    <div className="p-6 max-sm:p-1">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 mt-16 lg:mt-0">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name || "User"}!
          </p>
        </div>
        <div className="flex space-x-2">

          <Button size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Member
          </Button>
          <Button variant="outline" size="sm">
            Export Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className="rounded-full bg-primary/10 p-1">
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <CardDescription className="flex items-center mt-2">
                {stat.description}
                <span className="text-green-500 ml-2 text-xs font-medium">
                  {stat.trend}
                </span>
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Membership & Revenue Overview</CardTitle>
              <CardDescription>Monthly growth analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="members"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.3}
                    />
                    <Area
                      yAxisId="right"
                      type="monotone"
                      dataKey="revenue"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Activity</CardTitle>
                <Button variant="ghost" size="sm" className="text-xs">
                  View All <ChevronRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="bg-primary/10 rounded-full p-1.5">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{activity.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center justify-between">
                        <span>{activity.action}</span>
                        <span className="text-xs">{activity.time}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {activity.type}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
