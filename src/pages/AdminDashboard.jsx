import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, UserCheck, BarChart3, Settings, AlertCircle, TrendingUp } from "lucide-react";
import PatientTable from "@/components/patientModule/PatientTable";
import AppointmentTable from "@/components/appointmentModule/AppointmentTable";

const AdminDashboard = () => {
  const { user } = useSelector(state => state.auth || {});
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">System management and monitoring</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-blue-100 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  Total Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">1,234</div>
                <p className="text-xs text-green-600 mt-2">↑ 12% from last month</p>
              </CardContent>
            </Card>

            <Card className="border-green-100 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-green-600" />
                  Active Patients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">892</div>
                <p className="text-xs text-green-600 mt-2">↑ 8% from last month</p>
              </CardContent>
            </Card>

            <Card className="border-cyan-100 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-cyan-600" />
                  Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">342</div>
                <p className="text-xs text-green-600 mt-2">This month</p>
              </CardContent>
            </Card>

            <Card className="border-purple-100 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-purple-600" />
                  System Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">98%</div>
                <p className="text-xs text-green-600 mt-2">Uptime</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full max-w-md bg-blue-100 border-blue-200">
              <TabsTrigger value="overview" className="gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-600">
                <BarChart3 className="w-4 h-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="patients" className="gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-600">
                <Users className="w-4 h-4" />
                Patients
              </TabsTrigger>
              <TabsTrigger value="appointments" className="gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-600">
                <AlertCircle className="w-4 h-4" />
                Appointments
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* System Status */}
                <Card className="lg:col-span-2 border-blue-100 shadow-md">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
                    <CardTitle className="flex items-center gap-2 text-blue-900">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                      System Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 font-medium">Server Status</span>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-green-600">Healthy</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 font-medium">Database</span>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-green-600">Connected</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 font-medium">API Response</span>
                        <span className="text-sm text-gray-600">42ms</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="border-blue-100 shadow-md">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
                    <CardTitle className="flex items-center gap-2 text-blue-900">
                      <Settings className="w-5 h-5 text-blue-600" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-3">
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      Generate Report
                    </button>
                    <button className="w-full px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium">
                      System Settings
                    </button>
                    <button className="w-full px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium">
                      View Logs
                    </button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Patients Tab */}
            <TabsContent value="patients">
              <PatientTable />
            </TabsContent>

            {/* Appointments Tab */}
            <TabsContent value="appointments">
              <AppointmentTable />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
