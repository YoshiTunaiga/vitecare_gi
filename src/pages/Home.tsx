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

const homeTabs = [
  { name: "Patient", value: "patient", form: <PatientForm /> },
  { name: "Admin", value: "admin", form: <AdminForm /> },
];
const Home = () => {
  return (
    <div className="bg-auto bg-no-repeat h-screen bg-center bg-[url('./assets/images/providerbg.png')]">
      <section className="remove-scrollbar px-[2%] relative flex-1 overflow-y-auto my-auto bg-gradient-to-r from-dark-600 h-screen">
        <div className="sub-container max-w-[450px]">
          <div className="mb-5 w-[40%] h-[auto] items-center justify-content-center">
            <ViteCareLogo />
          </div>
          <Tabs defaultValue="patient" className="">
            <TabsList className="grid w-full grid-cols-2 bg-light-200">
              {homeTabs.map((tabTrigger) => (
                <TabsTrigger
                  key={tabTrigger.value}
                  value={tabTrigger.value}
                  className="data-[state=active]:bg-white">
                  {tabTrigger.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {homeTabs.map((tabContent) => (
              <TabsContent value={tabContent.value} className="space-y-8">
                {tabContent.form}
              </TabsContent>
            ))}
          </Tabs>

          {/* ========= FOOTER =========== */}
          <div className="text-14-regular my-5 flex justify-between">
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
