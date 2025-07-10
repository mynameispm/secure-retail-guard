import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Shield, 
  Smartphone, 
  Plus, 
  MoreVertical,
  CheckCircle,
  AlertTriangle,
  Clock,
  Trash2,
  Edit,
  QrCode,
  Activity,
  Users,
  TrendingUp,
  Eye
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
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const [devices, setDevices] = useState([
    {
      id: 1,
      name: "iPhone 15 Pro",
      type: "Mobile",
      status: "active",
      lastSeen: "2 minutes ago",
      securityScore: 98,
      location: "Store #001",
      enrolledDate: "2024-01-15"
    },
    {
      id: 2,
      name: "Samsung Galaxy S24",
      type: "Mobile",
      status: "active",
      lastSeen: "5 minutes ago",
      securityScore: 95,
      location: "Store #001",
      enrolledDate: "2024-01-20"
    },
    {
      id: 3,
      name: "iPad Pro",
      type: "Tablet",
      status: "inactive",
      lastSeen: "2 hours ago",
      securityScore: 87,
      location: "Store #002",
      enrolledDate: "2024-01-10"
    },
    {
      id: 4,
      name: "MacBook Pro",
      type: "Laptop",
      status: "warning",
      lastSeen: "30 minutes ago",
      securityScore: 72,
      location: "Store #001",
      enrolledDate: "2024-01-25"
    }
  ]);

  const [showAddDevice, setShowAddDevice] = useState(false);

  const stats = [
    {
      title: "Active Devices",
      value: "2,847",
      change: "+12%",
      icon: Smartphone,
      color: "text-primary"
    },
    {
      title: "Security Score",
      value: "94.2%",
      change: "+2.1%",
      icon: Shield,
      color: "text-success"
    },
    {
      title: "Blocked Attempts",
      value: "156",
      change: "-8%",
      icon: AlertTriangle,
      color: "text-warning"
    },
    {
      title: "Active Users",
      value: "1,245",
      change: "+5%",
      icon: Users,
      color: "text-secondary"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "enrollment",
      message: "New device enrolled successfully",
      time: "5 minutes ago",
      severity: "success"
    },
    {
      id: 2,
      type: "security",
      message: "Suspicious authentication attempt blocked",
      time: "12 minutes ago",
      severity: "warning"
    },
    {
      id: 3,
      type: "verification",
      message: "Context verification completed",
      time: "18 minutes ago",
      severity: "info"
    },
    {
      id: 4,
      type: "token",
      message: "Access token issued",
      time: "25 minutes ago",
      severity: "success"
    }
  ];

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

  const removeDevice = (deviceId: number) => {
    setDevices(devices.filter(device => device.id !== deviceId));
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 animate-fade-in-up">
          <div>
            <h1 className="text-3xl font-bold mb-2">Security Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor and manage your privacy-preserving security framework
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              <Activity className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
            <Button 
              onClick={() => setShowAddDevice(true)}
              className="security-button"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Device
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="security-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-xs flex items-center mt-1 ${
                      stat.change.startsWith('+') ? 'text-success' : 'text-destructive'
                    }`}>
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Device Management */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="security-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Enrolled Devices</CardTitle>
                    <CardDescription>
                      Manage and monitor connected devices
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {devices.map((device) => (
                    <div
                      key={device.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center">
                          <Smartphone className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium">{device.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {device.type} • {device.location}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Last seen: {device.lastSeen}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <Badge className={getStatusColor(device.status)}>
                            {device.status}
                          </Badge>
                          <p className={`text-sm font-medium mt-1 ${getSecurityScoreColor(device.securityScore)}`}>
                            {device.securityScore}% secure
                          </p>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Device
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Activity className="h-4 w-4 mr-2" />
                              View Activity
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-destructive"
                              onClick={() => removeDevice(device.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove Device
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card className="security-card">
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
                <CardDescription>Latest security events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.severity === 'success' ? 'bg-success' :
                        activity.severity === 'warning' ? 'bg-warning' :
                        'bg-primary'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Security Tips */}
            <Card className="security-card">
              <CardHeader>
                <CardTitle className="text-lg">Security Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Regular Updates</p>
                    <p className="text-xs text-muted-foreground">
                      Keep your devices updated for optimal security
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Eye className="h-5 w-5 text-success mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Monitor Activity</p>
                    <p className="text-xs text-muted-foreground">
                      Review device activity logs regularly
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Session Management</p>
                    <p className="text-xs text-muted-foreground">
                      Inactive devices are automatically secured
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Add Device Modal Placeholder */}
        {showAddDevice && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md security-card">
              <CardHeader>
                <CardTitle>Add New Device</CardTitle>
                <CardDescription>
                  Scan the QR code to enroll a new device
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-center">
                  <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center">
                    <QrCode className="h-16 w-16 text-muted-foreground" />
                  </div>
                </div>
                <p className="text-sm text-center text-muted-foreground">
                  Point your device camera at this QR code to begin enrollment
                </p>
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowAddDevice(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1 security-button"
                    onClick={() => setShowAddDevice(false)}
                  >
                    Complete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12 text-center bg-gradient-card rounded-2xl p-8 shadow-security">
          <h2 className="text-xl font-bold mb-4">Need Help?</h2>
          <p className="text-muted-foreground mb-6">
            Get support or learn more about using the security framework
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/support">
              <Button variant="outline">
                Contact Support
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button className="security-button">
                View Documentation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;