import React from "react";

// Components
import ViteCareLogo from "../../components/ViteCareLogo";
import AppointmentsTab from "../../components/AppointmentsTab";
import ProvidersList from "../../components/ProvidersList";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";

const adminTabs = [
  { value: "appointments", label: "Appointments" },
  { value: "providers", label: "Providers" },
  // { value: "notifications", label: "Notifications" },
];

const AdminPage = (props: any) => {
  return (
    <div className="bg-white text-dark-600 mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header justify-content-center mt-5">
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
        {/* <section className="w-full space-y-4">
          <Tabs defaultValue="appointments">
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
            <AppointmentsTab />
            <ProvidersList />
          </Tabs>
        </section> */}
      </main>
    </div>
  );
};

export default AdminPage;
