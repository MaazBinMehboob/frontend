import React, { useState } from "react";
import { useBookAppointmentMutation } from "@/services/appointment";
import { useGetPatientsQuery } from "@/services/patient";

// Temporary doctor list - should come from API
const DOCTORS = [
  { id: "doc1", name: "Dr. Smith" },
  { id: "doc2", name: "Dr. Johnson" },
  { id: "doc3", name: "Dr. Williams" },
];

const AppointmentForm = () => {
  const [form, setForm] = useState({ patientId:"", doctorId:"", date:"", notes:"" });
  const { data: patients } = useGetPatientsQuery();
  const [bookAppointment] = useBookAppointmentMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { await bookAppointment(form).unwrap(); alert("Appointment booked"); setForm({ patientId:"", doctorId:"", date:"", notes:"" }); }
    catch(err){ alert(err.data?.message || "Failed to book"); }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <select value={form.patientId} onChange={e => setForm({...form, patientId:e.target.value})} required>
        <option value="">Select Patient</option>
        {(patients?.patients || []).map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
      </select>
      <select value={form.doctorId} onChange={e => setForm({...form, doctorId:e.target.value})} required>
        <option value="">Select Doctor</option>
        {DOCTORS.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
      </select>
      <input type="datetime-local" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} required />
      <textarea placeholder="Notes" value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})} />
      <button type="submit" className="bg-green-500 text-white px-4 py-2">Book Appointment</button>
    </form>
  )
}

export default AppointmentForm;