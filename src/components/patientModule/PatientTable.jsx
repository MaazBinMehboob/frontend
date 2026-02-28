import React from "react";
import { useGetPatientsQuery } from "@/services/patient";

const PatientTable = () => {
  const { data, error, isLoading } = useGetPatientsQuery();

  if (isLoading) return <p>Loading patients...</p>;
  if (error) return <p>Error fetching patients</p>;

  return (
    <table className="min-w-full border">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Contact</th>
          <th>Created By</th>
        </tr>
      </thead>
      <tbody>
        {data.patients.map((patient) => (
          <tr key={patient._id} className="border-t">
            <td>{patient.name}</td>
            <td>{patient.age}</td>
            <td>{patient.gender}</td>
            <td>{patient.contact}</td>
            <td>{patient.createdBy.name} ({patient.createdBy.role})</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PatientTable;