import { useEffect, useState } from "react";
import * as Sentry from "@sentry/react";
import { useNavigate, useParams } from "react-router-dom";

import { getPatient, getUser } from "../../../../lib/actions/patient.actions";

import RegisterForm from "../../../../components/forms/RegisterForm";

import logofull from "../../../../assets/vclogo.png";
import registerImg from "../../../../assets/images/registerbg.png";

const Register = () => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [user, setUser] = useState({ $id: "", phone: "", name: "", email: "" });
  // const navigate = useNavigate();
  // const { userId } = useParams();

  // useEffect(() => {
  //   setIsLoading(true);
  //   const fetchData = async (userId: string) => {
  //     const userReturned = await getUser(userId);
  //     if (userReturned) {
  //       setUser(userReturned);
  //       // const patient = await getPatient(userId);

  //       // if (patient) navigate(`/patients/${userId}/new-appointment`);
  //     }
  //   };

  //   if (userId) {
  //     fetchData(userId);
  //     setIsLoading(false);
  //   }
  // }, [userId, navigate]);

  // Sentry Metricts for page usage
  // Sentry.metrics.set("user_view_register", user.name);

  return (
    <div className="text-white flex h-screen max-h-screen ">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <img
            src={logofull}
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          <RegisterForm />

          <p className="copyright py-12">© 2024 ViteCare</p>
        </div>
      </section>

      <img
        src={registerImg}
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;
