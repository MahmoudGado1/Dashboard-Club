import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon, Tag, GitBranch } from "lucide-react";

export default function Settings() {
  return (
    <div className="p-6">
      <div className="mb-6 mt-11 lg:mt-0">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Configure system settings</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <SettingsIcon className="h-5 w-5 text-primary" />
            <CardTitle>System Settings</CardTitle>
          </div>
          <CardDescription>Configure gym management settings</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-10">
          <p className="text-muted-foreground">Settings configuration coming soon.</p>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Tag className="h-5 w-5 text-primary" />
            <CardTitle>Configure Subscriptions</CardTitle>
          </div>
          <CardDescription>Manage gym membership subscription settings</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-10">
          <p className="text-muted-foreground">Configure subscription plans, pricing, and billing cycles.</p>
          <Button variant="outline" className="mt-4">Configure Subscriptions</Button>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Tag className="h-5 w-5 text-primary" />
            <CardTitle>Ticket Types</CardTitle>
          </div>
          <CardDescription>Set up different ticket types for events or services</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-10">
          <p className="text-muted-foreground">Define various ticket types for gym events or services.</p>
          <Button variant="outline" className="mt-4">Configure Ticket Types</Button>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <GitBranch className="h-5 w-5 text-primary" />
            <CardTitle>Set Up Branches</CardTitle>
          </div>
          <CardDescription>Manage gym locations and branches</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-10">
          <p className="text-muted-foreground">Add, edit, or remove branches for the gym system.</p>
          <Button variant="outline" className="mt-4">Set Up Branches</Button>
        </CardContent>
      </Card>
    </div>
  );
}
