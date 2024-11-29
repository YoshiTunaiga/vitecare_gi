import React, { useEffect, useState } from "react";

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
// import { getRecentAppointmentList } from "../lib/actions/appointment.actions";
import { useLocation, redirect } from "react-router-dom";

const initialCounts = {
  scheduledCount: 0,
  pendingCount: 0,
  cancelledCount: 0,
  documents: [],
};

const AppointmentsTab = () => {
  const [appointments, setAppointments] = useState(initialCounts);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const encryptedKey =
    typeof window !== "undefined"
      ? window.sessionStorage.getItem("accessKey")
      : null;

  useEffect(() => {
    // const accessKey = encryptedKey && decryptKey(encryptedKey);
    fetch(`/api/${encryptedKey}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.user) {
          redirect("/");
        }
      })
      .catch((error) => console.error(`ERROR ON PORT 8080`));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/admin");
      const data = await response.json();
      setAppointments(data.apptsReturned);
    };

    if (location.state.userInfo) {
      fetchData();
    }
    return () => {
      setAppointments(initialCounts);
    };
  }, []);

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
        <DataTable columns={columns} data={appointments?.documents ?? []} />
      </div>
    </TabsContent>
  );
};

export default AppointmentsTab;
