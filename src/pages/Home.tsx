import PatientForm from "../components/forms/PatientForm";
import vitecarelogo from "../assets/vclogo.png";
import { useSearchParams } from "react-router-dom";
import { PasskeyModal } from "../components/PasskeyModal";
import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

const Home = () => {
  const [searchParams]: [URLSearchParams, Function] = useSearchParams();
  // const isAdmin = searchParams.get("admin");
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div
      className="bg-auto bg-no-repeat bg-center bg-[url('./assets/images/providerbg.png')]"
      // className="text-white flex h-screen max-h-screen bg-[url('./assets/images/providerbg.png')] bg-auto"
    >
      {isAdmin && <PasskeyModal />}

      <section className="remove-scrollbar my-auto relative overflow-y-auto flex-1 bg-gradient-to-r from-dark-600">
        <div className="sub-container max-w-[496px]">
          <img
            src={vitecarelogo}
            width={1000}
            height={1000}
            alt="vitecarelogo"
            className="mb-12 h-10 w-fit"
          />

          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-light-200 xl:text-left">
              © 2024 ViteCare
            </p>
            <p
              onClick={() => setIsAdmin(true)}
              className="cursor-pointer justify-items-end text-light-200 xl:text-right">
              Admin
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
