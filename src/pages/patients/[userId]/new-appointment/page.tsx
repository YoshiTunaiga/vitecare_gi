import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as Sentry from "@sentry/react";

import ViteCareLogo from "../../../../components/ViteCareLogo";
import { AppointmentForm } from "../../../../components/forms/AppointmentForm";
import { getPatient } from "../../../../lib/actions/patient.actions";

const NewAppointment = () => {
  const [patient, setPatient] = useState({ $id: "", name: "" });
  const { userId } = useParams();

  // Sentry Metricts for page usage
  Sentry.metrics.set("user_view_new-appointment", patient.name);

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

  return (
    <div className="text-white flex h-screen max-h-screen bg-[url('./assets/images/onboarding-img.png')]">
      <section className="remove-scrollbar px-[8%] my-auto bg-gradient-to-r from-green-700">
        <div className="sub-container max-w-[840px] flex-1 justify-between">
          <ViteCareLogo />

          <AppointmentForm
            type="create"
            userId={userId || ""}
            patientId={patient.$id}
          />

          <p className="pt-5 justify-items-end text-light-200 xl:text-left">
            © 2024 ViteCare
          </p>
        </div>
      </section>
    </div>
  );
};

export default NewAppointment;
