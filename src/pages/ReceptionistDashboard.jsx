import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PatientTable from "@/components/patientModule/PatientTable";
import PatientForm from "@/components/patientModule/PatientForm";
import AppointmentForm from "@/components/appointmentModule/AppointmentForm";
import AppointmentTable from "@/components/appointmentModule/AppointmentTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Calendar } from "lucide-react";

const ReceptionistDashboard = () => {
  const [activeTab, setActiveTab] = useState("patients");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleFormSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Healthcare Dashboard</h1>
            <p className="text-gray-600">Manage patients and appointments efficiently</p>
          </div>

          {/* Dashboard Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2 bg-blue-100 border-blue-200">
              <TabsTrigger value="patients" className="gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-600">
                <Users className="w-4 h-4" />
                Patients
              </TabsTrigger>
              <TabsTrigger value="appointments" className="gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-600">
                <Calendar className="w-4 h-4" />
                Appointments
              </TabsTrigger>
            </TabsList>

            {/* Patients Tab */}
            <TabsContent value="patients" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <div className="sticky top-24">
                    <PatientForm onSuccess={handleFormSuccess} />
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <PatientTable key={`patient-${refreshKey}`} />
                </div>
              </div>
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
                  <AppointmentTable key={`appointment-${refreshKey}`} />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReceptionistDashboard;