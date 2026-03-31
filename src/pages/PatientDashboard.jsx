import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Heart, FileText, Clock, AlertCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppointmentForm from "@/components/appointmentModule/AppointmentForm";
import AppointmentTable from "@/components/appointmentModule/AppointmentTable";

const PatientDashboard = () => {
  const { user } = useSelector(state => state.auth || {});
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome, {user?.name}!</h1>
            <p className="text-gray-600">Manage your health and appointments</p>
          </div>

          {/* Health Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-blue-100 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-600" />
                  Health Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">Good</div>
                <p className="text-xs text-gray-500 mt-2">Last checkup: 2 weeks ago</p>
              </CardContent>
            </Card>

            <Card className="border-cyan-100 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-600" />
                  Upcoming Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">2</div>
                <p className="text-xs text-gray-500 mt-2">Next: Tomorrow at 2 PM</p>
              </CardContent>
            </Card>

            <Card className="border-green-100 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-green-600" />
                  Medical Records
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">5</div>
                <p className="text-xs text-gray-500 mt-2">View your records</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full max-w-md bg-blue-100 border-blue-200">
              <TabsTrigger value="overview" className="gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-600">
                <Heart className="w-4 h-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="appointments" className="gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-600">
                <Calendar className="w-4 h-4" />
                Appointments
              </TabsTrigger>
              <TabsTrigger value="records" className="gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-600">
                <FileText className="w-4 h-4" />
                Records
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Health Information */}
                <Card className="lg:col-span-2 border-blue-100 shadow-md">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
                    <CardTitle className="flex items-center gap-2 text-blue-900">
                      <Heart className="w-5 h-5 text-red-600" />
                      Your Health Profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Blood Type</p>
                          <p className="text-lg font-semibold text-gray-900">O+</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Age</p>
                          <p className="text-lg font-semibold text-gray-900">{user?.age || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Height</p>
                          <p className="text-lg font-semibold text-gray-900">5'10"</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Weight</p>
                          <p className="text-lg font-semibold text-gray-900">72 kg</p>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-500 font-medium mb-2">Allergies</p>
                        <p className="text-gray-700">None reported</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="border-blue-100 shadow-md">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
                    <CardTitle className="flex items-center gap-2 text-blue-900">
                      <AlertCircle className="w-5 h-5 text-blue-600" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-3">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 gap-2">
                      <Calendar className="w-4 h-4" />
                      Book Appointment
                    </Button>
                    <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Message Doctor
                    </Button>
                    <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 gap-2">
                      <FileText className="w-4 h-4" />
                      View Records
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="border-blue-100 shadow-md">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
                  <CardTitle className="flex items-center gap-2 text-blue-900">
                    <Clock className="w-5 h-5 text-cyan-600" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-gray-900">Appointment Completed</p>
                        <p className="text-sm text-gray-500">Dr. Smith - General Checkup</p>
                        <p className="text-xs text-gray-400 mt-1">2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="w-2 h-2 bg-cyan-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-gray-900">Prescription Issued</p>
                        <p className="text-sm text-gray-500">Antibiotics prescribed</p>
                        <p className="text-xs text-gray-400 mt-1">1 week ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-gray-900">Lab Results</p>
                        <p className="text-sm text-gray-500">All tests normal</p>
                        <p className="text-xs text-gray-400 mt-1">2 weeks ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appointments Tab */}
            <TabsContent value="appointments" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <div className="sticky top-24">
                    <AppointmentForm />
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <AppointmentTable />
                </div>
              </div>
            </TabsContent>

            {/* Medical Records Tab */}
            <TabsContent value="records">
              <Card className="border-blue-100 shadow-md">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
                  <CardTitle className="flex items-center gap-2 text-blue-900">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Medical Records
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {[
                      { name: "General Checkup", doctor: "Dr. Smith", date: "March 15, 2026" },
                      { name: "Blood Test Report", doctor: "Lab Results", date: "March 10, 2026" },
                      { name: "X-Ray Report", doctor: "Radiography", date: "March 5, 2026" },
                      { name: "Previous Consultation", doctor: "Dr. Johnson", date: "February 28, 2026" },
                      { name: "Vaccination Record", doctor: "Nurse", date: "February 15, 2026" },
                    ].map((record, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-medium text-gray-900">{record.name}</p>
                            <p className="text-sm text-gray-500">{record.doctor}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">{record.date}</p>
                          <Button variant="link" className="text-blue-600 text-xs p-0 h-auto">
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PatientDashboard;
