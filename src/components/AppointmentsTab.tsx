import React, { useEffect, useState } from "react";
import * as Sentry from "@sentry/react";

// Components
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import StatCard from "./StatCard";
import { columns } from "./table/PatientAppointments/columns";
import { DataTable } from "./table/PatientAppointments/DataTable";

// Assets
import calendarIcon from "../assets/icons/appointments.svg";
import pendingIcon from "../assets/icons/pending.svg";
import cancelledIcon from "../assets/icons/cancelled.svg";
import { getRecentAppointmentList } from "../lib/actions/appointment.actions";

const initialCounts = {
  scheduledCount: 0,
  pendingCount: 0,
  cancelledCount: 0,
  documents: [],
};

const AppointmentsTab = () => {
  const [appointments, setAppointments] = useState(initialCounts);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      const apptsReturned = await getRecentAppointmentList("");
      setAppointments(apptsReturned);
      setIsLoading(!isLoading);
    };

    fetchAppointments();

    return () => {
      setAppointments(initialCounts);
    };
    // TODO: appointments should refresh on submit update not on refresh page
  }, []);

  // Sentry Metricts for page usage
  Sentry.metrics.set("user_admin_view", appointments.scheduledCount);

  return (
    <TabsContent value="appointments" className="space-y-4">
      <div className="admin-stat">
        <StatCard
          count={
            appointments?.scheduledCount +
            appointments?.pendingCount +
            appointments?.cancelledCount
          }
          icon={cancelledIcon}
          type="total"
          label="Total Appointments"
        />
        <StatCard
          count={appointments?.scheduledCount}
          icon={calendarIcon}
          type="appointments"
          label="Scheduled appointments"
        />
        <StatCard
          count={appointments?.pendingCount}
          icon={pendingIcon}
          type="pending"
          label="Pending appointments"
        />
        <StatCard
          count={appointments?.cancelledCount}
          icon={cancelledIcon}
          type="cancelled"
          label="Cancelled appointments"
        />
      </div>
      <div className="data-table">
        <DataTable columns={columns} data={appointments?.documents} />
      </div>
    </TabsContent>
  );
};

export default AppointmentsTab;
