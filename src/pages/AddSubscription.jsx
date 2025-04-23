import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const subscriptionTypes = [
  { id: "1", name: "Regular" },
  { id: "2", name: "Premium" },
  { id: "3", name: "Student" },
  { id: "4", name: "Senior" },
];

const mockSubscriptionData = {
  "1": {
    name: "Ahmed Hassan",
    type: "Premium",
    startDate: new Date("2025-01-15"),
    endDate: new Date("2025-04-15"),
    paid: true,
    notes: "Regular customer for 2 years",
  },
  "2": {
    name: "Sara Ahmed",
    type: "Regular",
    startDate: new Date("2025-02-10"),
    endDate: new Date("2025-05-10"),
    paid: true,
    notes: "New member",
  },
};

export default function AddSubscription() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
    paid: false,
    notes: "",
  });

  useEffect(() => {
    if (isEditing && id && mockSubscriptionData[id]) {
      setFormData(mockSubscriptionData[id]);
    }
  }, [isEditing, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitting subscription data:", formData);

    toast({
      title: isEditing ? "Subscription Updated" : "Subscription Added",
      description: `${formData.name}'s subscription has been ${
        isEditing ? "updated" : "added"
      } successfully.`,
    });

    navigate("/subscriptions");
  };

  return (
    <div className="p-6">
      <div className="mb-6 mt-11 lg:mt-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/subscriptions")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Subscriptions
        </Button>
        <h1 className="text-3xl font-bold">
          {isEditing ? "Edit Subscription" : "Add New Subscription"}
        </h1>
        <p className="text-muted-foreground">
          {isEditing
            ? "Update the subscription details below"
            : "Fill in the subscription details below"}
        </p>
      </div>

      <div className="max-w-6xl m-auto">
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Subscription Information</CardTitle>
              <CardDescription>
                Enter the member's details and subscription preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Member Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter member name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Subscription Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, type: value }))
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subscription type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {subscriptionTypes.map((type) => (
                        <SelectItem key={type.id} value={type.name}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.startDate
                          ? format(formData.startDate, "PPP")
                          : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.startDate}
                        onSelect={(date) =>
                          setFormData((prev) => ({
                            ...prev,
                            startDate: date || new Date(),
                          }))
                        }
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.endDate
                          ? format(formData.endDate, "PPP")
                          : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.endDate}
                        onSelect={(date) =>
                          setFormData((prev) => ({
                            ...prev,
                            endDate: date || new Date(),
                          }))
                        }
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="paid"
                  checked={formData.paid}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, paid: !!checked }))
                  }
                />
                <Label htmlFor="paid" className="font-normal">
                  Payment received
                </Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Any additional notes about the member or subscription"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/subscriptions")}
              >
                Cancel
              </Button>
              <Button type="submit">{isEditing ? "Update" : "Save"}</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
