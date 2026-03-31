import React, { useState } from "react";
import { useAddPatientMutation, useUpdatePatientMutation } from "@/services/patient";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Users, Save } from "lucide-react";

const PatientForm = ({ existingPatient, onSuccess }) => {
  const [form, setForm] = useState({
    name: existingPatient?.name || "",
    age: existingPatient?.age || "",
    gender: existingPatient?.gender || "male",
    contact: existingPatient?.contact || "",
    address: existingPatient?.address || "",
    medicalNotes: existingPatient?.medicalNotes || "",
  });

  const [addPatient, { isLoading: addLoading }] = useAddPatientMutation();
  const [updatePatient, { isLoading: updateLoading }] = useUpdatePatientMutation();
  const isLoading = addLoading || updateLoading;

  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading(existingPatient ? "Updating patient..." : "Adding patient...");
    try {
      if(existingPatient) {
        await updatePatient({ id: existingPatient._id, ...form }).unwrap();
        toast.success("Patient updated successfully!", { id: toastId });
      } else {
        await addPatient(form).unwrap();
        toast.success("Patient added successfully!", { id: toastId });
      }
      onSuccess && onSuccess();
      setForm({ name:"", age:"", gender:"male", contact:"", address:"", medicalNotes:"" });
    } catch(err) {
      toast.error(err.data?.message || "Error saving patient", { id: toastId });
    }
  }

  return (
    <Card className="border-blue-100 shadow-md">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <Users className="w-5 h-5 text-blue-600" />
          {existingPatient ? "Update Patient" : "Add New Patient"}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <Input
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                required
                className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
              <Input
                name="age"
                placeholder="30"
                type="number"
                value={form.age}
                onChange={handleChange}
                required
                className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number *</label>
              <Input
                name="contact"
                placeholder="+1 (555) 123-4567"
                value={form.contact}
                onChange={handleChange}
                required
                className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <Input
              name="address"
              placeholder="123 Health Street, Medical City, MC 12345"
              value={form.address}
              onChange={handleChange}
              className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Medical Notes</label>
            <textarea
              name="medicalNotes"
              placeholder="Any relevant medical information or notes..."
              value={form.medicalNotes}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold gap-2"
          >
            <Save className="w-4 h-4" />
            {isLoading ? "Saving..." : existingPatient ? "Update Patient" : "Add Patient"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default PatientForm;