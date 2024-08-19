import React, { useEffect, useState } from "react";
import ViteCareLogo from "../../../../components/ViteCareLogo";
import { DataTable } from "../../../../components/table/PatientAppointments/DataTable";
import { useParams } from "react-router-dom";
import { getUser } from "../../../../lib/actions/patient.actions";
import { getRecentAppointmentList } from "../../../../lib/actions/appointment.actions";

const MyAppointments = () => {
  const [user, setUser] = useState({ $id: "", phone: "", name: "", email: "" });
  const { userId } = useParams();
  const [appointments, setAppointments] = useState({ schedule: "" });

  useEffect(() => {
    const fetchPatientInformation = async (userId: string) => {
      const userReturned = await getUser(userId);
      setUser(userReturned);
      // const appointmentId = (searchParams.get("appointmentId") as string) || "";

      const data = await getRecentAppointmentList(userId);
      if (data) setAppointments(data);
    };

    if (userId) {
      fetchPatientInformation(userId);
    }
  }, []);

  return (
    <div className="bg-white text-dark-600 mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header justify-content-center mt-5">
        <ViteCareLogo />
        <p className="text-16-semibold">My Appointments</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome back, {user.name || ""}!</h1>
          <p className="text-dark-200">
            Start the day managing your appointments
          </p>
        </section>

        <section className="w-full space-y-4"></section>
      </main>
    </div>
  );
};

export default MyAppointments;
