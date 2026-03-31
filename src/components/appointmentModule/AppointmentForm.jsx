import React, { useState } from "react";
import { useBookAppointmentMutation } from "@/services/appointment";
import { useGetPatientsQuery } from "@/services/patient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MessageSquare } from "lucide-react";
import { toast } from "sonner";

// Temporary doctor list - should come from API
const DOCTORS = [
  { id: "doc1", name: "Dr. Smith" },
  { id: "doc2", name: "Dr. Johnson" },
  { id: "doc3", name: "Dr. Williams" },
];

const AppointmentForm = () => {
  const [form, setForm] = useState({ patientId:"", doctorId:"", date:"", notes:"" });
  const { data: patients } = useGetPatientsQuery();
  const [bookAppointment, { isLoading }] = useBookAppointmentMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Booking appointment...");
    try {
      await bookAppointment(form).unwrap();
      toast.success("Appointment booked successfully!", { id: toastId });
      setForm({ patientId:"", doctorId:"", date:"", notes:"" });
    } catch(err) {
      toast.error(err.data?.message || "Failed to book appointment", { id: toastId });
    }
  }

  return (
    <Card className="border-blue-100 shadow-md">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <Calendar className="w-5 h-5 text-blue-600" />
          Book Appointment
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Patient *</label>
              <select
                value={form.patientId}
                onChange={e => setForm({...form, patientId:e.target.value})}
                required
                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
              >
                <option value="">Choose a patient...</option>
                {(patients?.patients || []).map(p => (
                  <option key={p._id} value={p._id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Doctor *</label>
              <select
                value={form.doctorId}
                onChange={e => setForm({...form, doctorId:e.target.value})}
                required
                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
              >
                <option value="">Choose a doctor...</option>
                {DOCTORS.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              Appointment Date & Time *
            </label>
            <Input
              type="datetime-local"
              value={form.date}
              onChange={e=>setForm({...form, date:e.target.value})}
              required
              className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              Notes
            </label>
            <textarea
              placeholder="Any relevant notes or special requirements..."
              value={form.notes}
              onChange={e=>setForm({...form, notes:e.target.value})}
              rows={3}
              className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold gap-2"
          >
            <Calendar className="w-4 h-4" />
            {isLoading ? "Booking..." : "Book Appointment"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default AppointmentForm;