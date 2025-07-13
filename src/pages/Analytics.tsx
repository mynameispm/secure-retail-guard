import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Shield,
  Smartphone,
  AlertTriangle,
  Users,
  Activity,
  Eye,
  Clock,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from "recharts";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("7d");

  const getSecurityTrendData = () => {
    switch (timeRange) {
      case "7d":
        return [
          { date: "Jul 07", score: 92, threats: 12, devices: 2840 },
          { date: "Jul 08", score: 94, threats: 8, devices: 2845 },
          { date: "Jul 09", score: 96, threats: 5, devices: 2847 },
          { date: "Jul 10", score: 94, threats: 15, devices: 2850 },
          { date: "Jul 11", score: 95, threats: 9, devices: 2855 },
          { date: "Jul 12", score: 97, threats: 3, devices: 2860 },
          { date: "Jul 13", score: 94, threats: 18, devices: 2847 }
        ];
      case "30d":
        return [
          { date: "Jun 15", score: 88, threats: 45, devices: 2780 },
          { date: "Jun 20", score: 90, threats: 38, devices: 2795 },
          { date: "Jun 25", score: 92, threats: 32, devices: 2810 },
          { date: "Jun 30", score: 91, threats: 28, devices: 2825 },
          { date: "Jul 05", score: 93, threats: 25, devices: 2840 },
          { date: "Jul 10", score: 95, threats: 20, devices: 2855 },
          { date: "Jul 13", score: 94, threats: 18, devices: 2847 }
        ];
      case "90d":
        return [
          { date: "Apr 15", score: 82, threats: 85, devices: 2600 },
          { date: "May 01", score: 84, threats: 78, devices: 2650 },
          { date: "May 15", score: 86, threats: 72, devices: 2700 },
          { date: "Jun 01", score: 88, threats: 65, devices: 2750 },
          { date: "Jun 15", score: 90, threats: 58, devices: 2800 },
          { date: "Jul 01", score: 93, threats: 45, devices: 2840 },
          { date: "Jul 13", score: 94, threats: 18, devices: 2847 }
        ];
      default:
        return [];
    }
  };

  const getDeviceTypeData = () => {
    switch (timeRange) {
      case "7d":
        return [
          { name: "Mobile", value: 1580, color: "#6366f1" },
          { name: "Tablet", value: 789, color: "#8b5cf6" },
          { name: "Laptop", value: 456, color: "#06b6d4" },
          { name: "Desktop", value: 122, color: "#10b981" }
        ];
      case "30d":
        return [
          { name: "Mobile", value: 1520, color: "#6366f1" },
          { name: "Tablet", value: 745, color: "#8b5cf6" },
          { name: "Laptop", value: 425, color: "#06b6d4" },
          { name: "Desktop", value: 135, color: "#10b981" }
        ];
      case "90d":
        return [
          { name: "Mobile", value: 1450, color: "#6366f1" },
          { name: "Tablet", value: 680, color: "#8b5cf6" },
          { name: "Laptop", value: 380, color: "#06b6d4" },
          { name: "Desktop", value: 90, color: "#10b981" }
        ];
      default:
        return [];
    }
  };

  const getThreatTypeData = () => {
    switch (timeRange) {
      case "7d":
        return [
          { type: "Malware", count: 45, severity: "high" },
          { type: "Phishing", count: 32, severity: "medium" },
          { type: "Unauthorized Access", count: 28, severity: "high" },
          { type: "Data Breach Attempt", count: 15, severity: "critical" },
          { type: "Suspicious Activity", count: 36, severity: "low" }
        ];
      case "30d":
        return [
          { type: "Malware", count: 180, severity: "high" },
          { type: "Phishing", count: 145, severity: "medium" },
          { type: "Unauthorized Access", count: 92, severity: "high" },
          { type: "Data Breach Attempt", count: 38, severity: "critical" },
          { type: "Suspicious Activity", count: 125, severity: "low" }
        ];
      case "90d":
        return [
          { type: "Malware", count: 520, severity: "high" },
          { type: "Phishing", count: 445, severity: "medium" },
          { type: "Unauthorized Access", count: 285, severity: "high" },
          { type: "Data Breach Attempt", count: 128, severity: "critical" },
          { type: "Suspicious Activity", count: 365, severity: "low" }
        ];
      default:
        return [];
    }
  };

  const getPerformanceMetrics = () => {
    switch (timeRange) {
      case "7d":
        return [
          { metric: "Average Response Time", value: "0.3s", change: "-12%", positive: true },
          { metric: "System Uptime", value: "99.9%", change: "+0.1%", positive: true },
          { metric: "Failed Authentications", value: "0.02%", change: "-25%", positive: true },
          { metric: "Policy Compliance", value: "98.5%", change: "+2.1%", positive: true }
        ];
      case "30d":
        return [
          { metric: "Average Response Time", value: "0.35s", change: "-8%", positive: true },
          { metric: "System Uptime", value: "99.8%", change: "+0.2%", positive: true },
          { metric: "Failed Authentications", value: "0.03%", change: "-18%", positive: true },
          { metric: "Policy Compliance", value: "98.2%", change: "+1.8%", positive: true }
        ];
      case "90d":
        return [
          { metric: "Average Response Time", value: "0.42s", change: "-15%", positive: true },
          { metric: "System Uptime", value: "99.7%", change: "+0.3%", positive: true },
          { metric: "Failed Authentications", value: "0.05%", change: "-35%", positive: true },
          { metric: "Policy Compliance", value: "97.8%", change: "+3.2%", positive: true }
        ];
      default:
        return [];
    }
  };

  const securityTrendData = getSecurityTrendData();
  const deviceTypeData = getDeviceTypeData();
  const threatTypeData = getThreatTypeData();
  const performanceMetrics = getPerformanceMetrics();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const chartConfig = {
    score: {
      label: "Security Score",
      color: "hsl(var(--primary))",
    },
    threats: {
      label: "Threats Blocked",
      color: "hsl(var(--destructive))",
    },
    devices: {
      label: "Active Devices",
      color: "hsl(var(--secondary))",
    },
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 animate-fade-in-up">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold mb-2">Security Analytics</h1>
              <p className="text-muted-foreground">
                Comprehensive insights into your security framework performance
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={timeRange === "7d" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange("7d")}
            >
              7 Days
            </Button>
            <Button
              variant={timeRange === "30d" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange("30d")}
            >
              30 Days
            </Button>
            <Button
              variant={timeRange === "90d" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange("90d")}
            >
              90 Days
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {performanceMetrics.map((metric, index) => (
            <Card key={index} className="security-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{metric.metric}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <p className={`text-xs flex items-center mt-1 ${
                      metric.positive ? 'text-success' : 'text-destructive'
                    }`}>
                      {metric.positive ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {metric.change} from last period
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                    <Activity className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card className="security-card">
            <CardHeader>
              <CardTitle>Security Score Trend</CardTitle>
              <CardDescription>
                Security score and threat detection over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={securityTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.1}
                    />
                    <Line
                      type="monotone"
                      dataKey="threats"
                      stroke="hsl(var(--destructive))"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="security-card">
            <CardHeader>
              <CardTitle>Device Distribution</CardTitle>
              <CardDescription>
                Breakdown of enrolled devices by type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {deviceTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="flex flex-wrap gap-4 mt-4">
                {deviceTypeData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">{item.name}: {item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="security-card">
            <CardHeader>
              <CardTitle>Threat Analysis</CardTitle>
              <CardDescription>
                Recent security threats by category and severity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {threatTypeData.map((threat, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getSeverityColor(threat.severity)}`} />
                      <div>
                        <p className="font-medium">{threat.type}</p>
                        <p className="text-sm text-muted-foreground capitalize">{threat.severity} severity</p>
                      </div>
                    </div>
                    <Badge variant="outline">{threat.count} blocked</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="security-card">
            <CardHeader>
              <CardTitle>Active Monitoring</CardTitle>
              <CardDescription>
                Real-time system status and monitoring metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-success" />
                  <div>
                    <p className="font-medium">Security Policies</p>
                    <p className="text-sm text-muted-foreground">All systems compliant</p>
                  </div>
                </div>
                <Badge className="bg-success text-success-foreground">Active</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Eye className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Threat Detection</p>
                    <p className="text-sm text-muted-foreground">Real-time monitoring</p>
                  </div>
                </div>
                <Badge className="bg-primary text-primary-foreground">Online</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-secondary" />
                  <div>
                    <p className="font-medium">User Sessions</p>
                    <p className="text-sm text-muted-foreground">1,245 active users</p>
                  </div>
                </div>
                <Badge variant="outline">Normal</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-warning" />
                  <div>
                    <p className="font-medium">Last Backup</p>
                    <p className="text-sm text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <Badge className="bg-success text-success-foreground">Complete</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center bg-gradient-card rounded-2xl p-8 shadow-security">
          <h2 className="text-xl font-bold mb-4">Advanced Analytics</h2>
          <p className="text-muted-foreground mb-6">
            Get deeper insights with custom reports and advanced threat intelligence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Report
            </Button>
            <Button className="security-button">
              <TrendingUp className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
