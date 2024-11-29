import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

import { getUser } from "../../../../../lib/actions/patient.actions";
import { getAppointment } from "../../../../../lib/actions/appointment.actions";
import { Doctors } from "../../../../../constants";

import { formatDateTime } from "../../../../../lib/utils";
import { Button } from "../../../../../components/ui/button";

import vclogo from "../../../../../assets/vclogo.png";
import successgif from "../../../../../assets/gifs/success.gif";
import calendargif from "../../../../../assets/icons/calendar.svg";

const RequestSuccess = () => {
  let [searchParams]: [URLSearchParams, Function] = useSearchParams();
  const [user, setUser] = useState({ $id: "", phone: "", name: "", email: "" });
  const { userId } = useParams();
  const [doctor, setDoctor] = useState({ image: "", name: "" });
  const [appointment, setAppointment] = useState({ schedule: "" });

  useEffect(() => {
    const fetchDoctor = async (userId: string) => {
      const userReturned = await getUser(userId);
      setUser(userReturned);
      const appointmentId = (searchParams.get("appointmentId") as string) || "";

      const appointment = await getAppointment(appointmentId);
      if (appointment) setAppointment(appointment);
      const doctor = Doctors.find(
        (doctor) => doctor.name === appointment.primaryPhysician
      );
      if (doctor) setDoctor(doctor);
    };

    if (userId) {
      fetchDoctor(userId);
    }
  }, []);

  return (
    <div className=" flex h-screen bg-green-700/25 text-black max-h-screen px-[5%] bg-white">
      <div className="success-img bg-green-700/40">
        <Link to="/">
          <img
            src={vclogo}
            height={1000}
            width={1000}
            alt="logo"
            loading="lazy"
            className="h-10 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center">
          <img
            src={successgif}
            height={300}
            width={280}
            alt="success"
            loading="lazy"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p>We&apos;ll be in touch shortly to confirm.</p>
        </section>

        <section className="request-details">
          <p>Requested appointment details: </p>
          <div className="flex items-center gap-3">
            <img
              src={doctor?.image!}
              alt="doctor"
              width={100}
              height={100}
              loading="lazy"
              className="size-10"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>
          <div className="flex gap-2">
            <img
              src={calendargif}
              height={24}
              width={24}
              alt="calendar"
              loading="lazy"
              className="bg-green-700/50"
            />
            <p> {formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link to={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>

        <p className="copyright">© 2024 ViteCare</p>
      </div>
    </div>
  );
};

export default RequestSuccess;
