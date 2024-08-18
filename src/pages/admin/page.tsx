import React, { useEffect, useState } from "react";

import { getRecentAppointmentList } from "../../lib/actions/appointment.actions";

// Components
import StatCard from "../../components/StatCard";
import ViteCareLogo from "../../components/ViteCareLogo";
import { DataTable } from "../../components/table/DataTable";
import { columns } from "../../components/table/columns";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

// Assets
import calendarIcon from "../../assets/icons/appointments.svg";
import pendingIcon from "../../assets/icons/pending.svg";
import cancelledIcon from "../../assets/icons/cancelled.svg";

const initialCounts = {
  scheduledCount: 0,
  pendingCount: 0,
  cancelledCount: 0,
  documents: [],
};

const adminTabs = [
  { value: "appointments", label: "Appointments" },
  { value: "providers", label: "Providers" },
  { value: "notifications", label: "Notifications" },
];

const AdminPage = () => {
  const [appointments, setAppointments] = useState(initialCounts);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      const apptsReturned = await getRecentAppointmentList();
      setAppointments(apptsReturned);
      setIsLoading(!isLoading);
    };

    fetchAppointments();

    return () => {
      setAppointments(initialCounts);
    };
    // TODO: appointments should refresh on submit update not on refresh page
  }, []);

  if (isLoading) {
    return <>Loading...</>;
  } else {
    return (
      <div className="bg-white text-dark-600 mx-auto flex max-w-7xl flex-col space-y-14">
        <header className="admin-header justify-content-center">
          <ViteCareLogo />
          <p className="text-16-semibold">Admin Dashboard</p>
        </header>

        <main className="admin-main">
          <section className="w-full space-y-4">
            <h1 className="header">Welcome</h1>
            <p className="text-dark-200">
              Start the day with managing new appointments
            </p>
          </section>
          <Tabs defaultValue="appointments" className="space-y-4">
            <TabsList className="bg-light-200">
              {adminTabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="data-[state=active]:bg-white">
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="appointments" className="space-y-4">
              <div className="admin-stat">
                <StatCard
                  count={
                    appointments.scheduledCount +
                    appointments.pendingCount +
                    appointments.cancelledCount
                  }
                  icon={cancelledIcon}
                  type="total"
                  label="Total Appointments"
                />
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
              </div>
              <div className="data-table">
                <DataTable columns={columns} data={appointments.documents} />
              </div>
            </TabsContent>
          </Tabs>
          {/* <section className="admin-stat">
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
          </section> */}
        </main>
      </div>
    );
  }
};

export default AdminPage;
