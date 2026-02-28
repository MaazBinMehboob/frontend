import React from "react";
import PatientTable from "@/components/patientModule/PatientTable";
import PatientForm from "@/components/patientModule/PatientForm";
import AppointmentForm from "@/components/appointmentModule/AppointmentForm";
import AppointmentTable from "@/components/appointmentModule/AppointmentTable";

const ReceptionistDashboard = () => {
  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-2">Patient Management</h2>
        <PatientForm />
        {/* <PatientTable /> */}
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Appointment Management</h2>
        {/* <AppointmentForm />
        <AppointmentTable /> */}
      </div>
    </div>
  );
};

export default ReceptionistDashboard;