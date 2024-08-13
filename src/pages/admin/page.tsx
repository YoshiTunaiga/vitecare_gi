import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import vitecarelogo from "../../assets/vclogo.png";
import { getRecentAppointmentList } from "../../lib/actions/appointment.actions";
import StatCard from "../../components/StatCard";
import calendarIcon from "../../assets/icons/appointments.svg";
import pendingIcon from "../../assets/icons/pending.svg";
import cancelledIcon from "../../assets/icons/cancelled.svg";
import { DataTable } from "../../components/table/DataTable";
import { columns } from "../../components/table/columns";

const initialCounts = {
  scheduledCount: 0,
  pendingCount: 0,
  cancelledCount: 0,
  documents: [],
};

const AdminPage = () => {
  const [appointments, setAppointments] = useState(initialCounts);

  useEffect(() => {
    const fetchAppointments = async () => {
      const apptsReturned = await getRecentAppointmentList();
      setAppointments(apptsReturned);
    };

    fetchAppointments();

    return () => {
      setAppointments(initialCounts);
    };
    // TODO: appointments should refresh on submit update not on refresh page
  }, []);

  return (
    <div className="text-white mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link to="/" className="cursor-pointer">
          <img
            src={vitecarelogo}
            width={1000}
            height={1000}
            alt="vitecarelogo"
            className="mb-12 h-10 w-fit"
          />
        </Link>
        <p className="text-16-semibold">Admin Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome</h1>
          <p className="text-dark-200">
            Start the day with managing new appointments
          </p>
        </section>

        <section className="admin-stat">
          <StatCard
            count={appointments.scheduledCount}
            icon={calendarIcon}
            type="appointments"
            label="Scheduled appointments"
          />
          <StatCard
            count={appointments.pendingCount}
            icon={pendingIcon}
            type="pending"
            label="Pending appointments"
          />
          <StatCard
            count={appointments.cancelledCount}
            icon={cancelledIcon}
            type="cancelled"
            label="Cancelled appointments"
          />
        </section>

        <DataTable columns={columns} data={appointments.documents} />
      </main>
    </div>
  );
};

export default AdminPage;
