import React from "react";
import { useGetDoctorAppointmentsQuery, useGetPatientAppointmentsQuery, useUpdateAppointmentStatusMutation } from "@/services/appointment.js";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const AppointmentTable = () => {
  const { user } = useSelector(state => state.auth || {});
  
  // Always call both hooks - React rules (skip filter prevents unnecessary calls)
  const doctorQuery = useGetDoctorAppointmentsQuery(user?._id || "", { skip: !user || user.role !== "doctor" });
  const patientQuery = useGetPatientAppointmentsQuery(user?._id || "", { skip: !user || user.role !== "patient" });
  
  const { data, isLoading, error } = user?.role === "doctor" ? doctorQuery : patientQuery;
  const [updateStatus] = useUpdateAppointmentStatusMutation();

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const handleStatusChange = async (id, status) => {
    const toastId = toast.loading("Updating status...");
    try { 
      await updateStatus({ id, status }).unwrap();
      toast.success("Status updated!", { id: toastId });
    } catch(err) { 
      toast.error(err.data?.message || "Failed to update status", { id: toastId });
    }
  }

  if (!user) {
    return (
      <Card className="border-orange-100 shadow-md">
        <CardContent className="pt-6">
          <div className="text-center py-8 text-orange-600 flex items-center justify-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <p>Please log in to view appointments</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="border-blue-100 shadow-md">
        <CardContent className="pt-6">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin">
              <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
            </div>
            <span className="ml-3 text-gray-600">Loading appointments...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-red-100 shadow-md">
        <CardContent className="pt-6">
          <div className="text-center py-8 text-red-600">
            <p>⚠️ Error loading appointments</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const appointments = data?.appointments || [];

  return (
    <Card className="border-blue-100 shadow-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <Calendar className="w-5 h-5 text-blue-600" />
          Appointments ({appointments.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 overflow-x-auto">
        {appointments.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No appointments found. Book an appointment to get started.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-blue-100 bg-blue-50/50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Patient</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Doctor</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date & Time</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt, idx) => (
                <tr
                  key={appt._id}
                  className={`border-b border-blue-50 transition-colors ${
                    idx % 2 === 0 ? "bg-white" : "bg-blue-50/30"
                  } hover:bg-blue-50`}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {appt.patientId?.name || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {appt.doctorId?.name || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {new Date(appt.date).toLocaleDateString()} {new Date(appt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-6 py-4">
                    {user?.role === "doctor" || user?.role === "receptionist" ? (
                      <select
                        value={appt.status}
                        onChange={e => handleStatusChange(appt._id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${getStatusColor(appt.status)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    ) : (
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appt.status)}`}>
                        {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CardContent>
    </Card>
  );
};

export default AppointmentTable;