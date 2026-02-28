import React from "react";
import { useGetDoctorAppointmentsQuery, useGetPatientAppointmentsQuery, useUpdateAppointmentStatusMutation } from "@/services/appointment.js";
import { useSelector } from "react-redux";

const AppointmentTable = () => {
  const { user } = useSelector(state => state.auth);
  const { data, isLoading, error } = user.role === "doctor"
    ? useGetDoctorAppointmentsQuery(user._id)
    : useGetPatientAppointmentsQuery(user._id);

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
        {data.map(appt => (
          <tr key={appt._id} className="border-t">
            <td>{appt.patientId.name}</td>
            <td>{appt.doctorId.name}</td>
            <td>{new Date(appt.date).toLocaleString()}</td>
            <td>
              {user.role === "doctor" || user.role === "receptionist" ? (
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