import React from "react";
import { useGetPatientsQuery } from "@/services/patient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

const PatientTable = () => {
  const { data, error, isLoading } = useGetPatientsQuery();

  if (isLoading) {
    return (
      <Card className="border-blue-100 shadow-md">
        <CardContent className="pt-6">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin">
              <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
            </div>
            <span className="ml-3 text-gray-600">Loading patients...</span>
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
            <p>⚠️ Error fetching patients</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const patients = data?.patients || [];

  return (
    <Card className="border-blue-100 shadow-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <Users className="w-5 h-5 text-blue-600" />
          Patient Records ({patients.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 overflow-x-auto">
        {patients.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No patients found. Add your first patient to get started.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-blue-100 bg-blue-50/50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Age</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Gender</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Contact</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Registered By</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, idx) => (
                <tr
                  key={patient._id}
                  className={`border-b border-blue-50 transition-colors ${
                    idx % 2 === 0 ? "bg-white" : "bg-blue-50/30"
                  } hover:bg-blue-50`}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{patient.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{patient.age}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 capitalize">{patient.gender}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{patient.contact}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                      {patient.createdBy?.name || 'N/A'}
                      <span className="text-blue-500">•</span>
                      <span className="capitalize">{patient.createdBy?.role || 'N/A'}</span>
                    </span>
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

export default PatientTable;