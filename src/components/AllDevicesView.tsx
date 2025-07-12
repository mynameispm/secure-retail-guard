
import { useState } from "react";
import { 
  Smartphone, 
  MoreVertical,
  Edit,
  Activity,
  Trash2,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Device {
  id: number;
  name: string;
  type: string;
  status: string;
  lastSeen: string;
  securityScore: number;
  location: string;
  enrolledDate: string;
}

interface AllDevicesViewProps {
  devices: Device[];
  onBack: () => void;
  onEditDevice: (device: Device) => void;
  onViewActivity: (device: Device) => void;
  onRemoveDevice: (device: Device) => void;
}

const AllDevicesView = ({ 
  devices, 
  onBack, 
  onEditDevice, 
  onViewActivity, 
  onRemoveDevice 
}: AllDevicesViewProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'inactive': return 'bg-muted text-muted-foreground';
      case 'warning': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getSecurityScoreColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 75) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold">All Enrolled Devices</h1>
            <p className="text-muted-foreground">
              Complete list of all devices in your security framework
            </p>
          </div>
        </div>

        <Card className="security-card">
          <CardHeader>
            <CardTitle>Device Management</CardTitle>
            <CardDescription>
              {devices.length} devices currently enrolled in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Device</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Security Score</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Last Seen</TableHead>
                    <TableHead>Enrolled Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {devices.map((device) => (
                    <TableRow key={device.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-secondary rounded-lg flex items-center justify-center">
                            <Smartphone className="h-4 w-4 text-white" />
                          </div>
                          <span className="font-medium">{device.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{device.type}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(device.status)}>
                          {device.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className={`font-medium ${getSecurityScoreColor(device.securityScore)}`}>
                          {device.securityScore}%
                        </span>
                      </TableCell>
                      <TableCell>{device.location}</TableCell>
                      <TableCell className="text-muted-foreground">{device.lastSeen}</TableCell>
                      <TableCell className="text-muted-foreground">{device.enrolledDate}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onEditDevice(device)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Device
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onViewActivity(device)}>
                              <Activity className="h-4 w-4 mr-2" />
                              View Activity
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-destructive"
                              onClick={() => onRemoveDevice(device)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove Device
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AllDevicesView;
