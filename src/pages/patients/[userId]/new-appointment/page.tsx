import { AppointmentForm } from "../../../../components/forms/AppointmentForm";
import vitecarelogo from "../../../../assets/vclogo.png";
import { getPatient } from "../../../../lib/actions/patient.actions";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const NewAppointment = () => {
  const [patient, setPatient] = useState({ $id: "" });
  const { userId } = useParams();

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
          <img
            src={vitecarelogo}
            width={1000}
            height={1000}
            alt="vitecarelogo"
            className="mb-10 h-10 w-fit"
          />

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
