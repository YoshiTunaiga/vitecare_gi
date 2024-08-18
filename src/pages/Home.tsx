import PatientForm from "../components/forms/PatientForm";
import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import AdminForm from "../components/forms/AdminForm";
import { Link } from "react-router-dom";
import ViteCareLogo from "../components/ViteCareLogo";

const Home = () => {
  return (
    <div className="bg-auto bg-no-repeat h-screen bg-center bg-[url('./assets/images/providerbg.png')]">
      <section className="remove-scrollbar px-[5%] my-auto relative overflow-y-auto flex-1 bg-gradient-to-r from-dark-600 h-screen">
        <div className="sub-container max-w-[450px]">
          <ViteCareLogo />
          <Tabs defaultValue="patient" className="w-[450px]">
            <TabsList className="grid w-full grid-cols-2 bg-light-200">
              <TabsTrigger
                value="patient"
                className="data-[state=active]:bg-white">
                Patient
              </TabsTrigger>
              <TabsTrigger
                value="admin"
                className="data-[state=active]:bg-white">
                Admin
              </TabsTrigger>
            </TabsList>
            <TabsContent value="patient" className="space-y-8">
              <PatientForm />
            </TabsContent>
            <TabsContent value="admin" className="overflow-hidden">
              <AdminForm />
            </TabsContent>
          </Tabs>

          {/* ========= FOOTER =========== */}
          <div className="text-14-regular mt-5 flex justify-between">
            <p className="justify-items-end text-light-200 xl:text-left">
              © 2024 ViteCare
            </p>
            <Link
              to="https://gidiaz.com"
              target="_blank"
              className="justify-items-end text-light-200 xl:text-right transition delay-150 duration-300 ease-in-out">
              Gi Diaz Solutions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
