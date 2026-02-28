import React, { useState } from "react";
import { useAddPatientMutation, useUpdatePatientMutation } from "@/services/patient";

const PatientForm = ({ existingPatient, onSuccess }) => {
  const [form, setForm] = useState({
    name: existingPatient?.name || "",
    age: existingPatient?.age || "",
    gender: existingPatient?.gender || "male",
    contact: existingPatient?.contact || "",
    address: existingPatient?.address || "",
    medicalNotes: existingPatient?.medicalNotes || "",
  });

  const [addPatient] = useAddPatientMutation();
  const [updatePatient] = useUpdatePatientMutation();

  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(existingPatient) {
        await updatePatient({ id: existingPatient._id, ...form }).unwrap();
      } else {
        await addPatient(form).unwrap();
      }
      onSuccess && onSuccess();
      setForm({ name:"", age:"", gender:"male", contact:"", address:"", medicalNotes:"" });
    } catch(err) {
      alert(err.data?.message || "Error saving patient");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="age" placeholder="Age" type="number" value={form.age} onChange={handleChange} required />
      <select name="gender" value={form.gender} onChange={handleChange}>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <input name="contact" placeholder="Contact" value={form.contact} onChange={handleChange} required />
      <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
      <textarea name="medicalNotes" placeholder="Medical Notes" value={form.medicalNotes} onChange={handleChange} />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">{existingPatient ? "Update" : "Add"} Patient</button>
    </form>
  );
}

export default PatientForm;