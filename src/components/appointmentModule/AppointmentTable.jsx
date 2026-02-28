import React from "react";
import { useGetDoctorAppointmentsQuery, useGetPatientAppointmentsQuery, useUpdateAppointmentStatusMutation } from "@/services/appointment.js";
import { useSelector } from "react-redux";

const AppointmentTable = () => {
  const { user } = useSelector(state => state.auth);
  
  // Always call both hooks - React rules
  const doctorQuery = useGetDoctorAppointmentsQuery(user?._id, { skip: !user || user.role !== "doctor" });
  const patientQuery = useGetPatientAppointmentsQuery(user?._id, { skip: !user || user.role !== "patient" });
  
  const { data, isLoading, error } = user?.role === "doctor" ? doctorQuery : patientQuery;
  const [updateStatus] = useUpdateAppointmentStatusMutation();

  if (isLoading) return <p>Loading appointments...</p>;
  if (error) return <p>Error loading appointments</p>;

  const handleStatusChange = async (id, status) => {
    try { await updateStatus({ id, status }).unwrap(); }
    catch(err){ alert(err.data?.message || "Failed to update status"); }
  }

  return (
    <table className="min-w-full border">
      <thead>
        <tr>
          <th>Patient</th>
          <th>Doctor</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {(data?.appointments || []).map(appt => (
          <tr key={appt._id} className="border-t">
            <td>{appt.patientId?.name || 'N/A'}</td>
            <td>{appt.doctorId?.name || 'N/A'}</td>
            <td>{new Date(appt.date).toLocaleString()}</td>
            <td>
              {user?.role === "doctor" || user?.role === "receptionist" ? (
                <select value={appt.status} onChange={e => handleStatusChange(appt._id, e.target.value)}>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              ) : appt.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AppointmentTable;