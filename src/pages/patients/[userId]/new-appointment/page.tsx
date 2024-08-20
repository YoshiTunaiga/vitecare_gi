import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import ViteCareLogo from "../../../../components/ViteCareLogo";
import { AppointmentForm } from "../../../../components/forms/AppointmentForm";
import { getPatient } from "../../../../lib/actions/patient.actions";
import { Button } from "../../../../components/ui/button";

const NewAppointment = () => {
  const [patient, setPatient] = useState({ $id: "", name: "" });
  const { userId } = useParams();
  const router = useNavigate();

  useEffect(() => {
    const fetchPatient = async (userId: string) => {
      const patient = await getPatient(userId);

      if (patient) {
        setPatient(patient);
      }
    };

    if (userId) {
      fetchPatient(userId);
    }
  }, []);

  const navigateToMyAppointments = () => {
    router(`/patients/${userId}/my-appointments`);
  };

  return (
    <div className="text-white flex h-screen max-h-screen bg-auto bg-no-repeat bg-right bg-[url('./assets/images/onboarding-img.png')]">
      <section className="remove-scrollbar px-[8%] my-auto bg-gradient-to-r from-green-600">
        <div className="sub-container max-w-[840px] flex-1 justify-between grid gap-6">
          <div className="mb-5 w-[40%] h-[auto] items-center justify-content-center">
            <ViteCareLogo />
          </div>

          <AppointmentForm
            type="create"
            userId={userId || ""}
            patientId={patient.$id}
          />
          {/* <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-dark-600 bg-white">
                Or
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            type="button"
            onClick={navigateToMyAppointments}
            className="hover:bg-green-500 hover:text-white">
            See My Appointments
          </Button> */}

          <p className="pt-5 justify-items-end text-light-200 xl:text-left">
            © 2024 ViteCare
          </p>
        </div>
      </section>
    </div>
  );
};

export default NewAppointment;
