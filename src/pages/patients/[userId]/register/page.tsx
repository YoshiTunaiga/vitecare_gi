import { useNavigate } from "react-router-dom";
import logofull from "../../../../assets/vclogo.png";
import registerImg from "../../../../assets/images/registerbg.png";
import { useParams } from "react-router-dom";
import { getPatient, getUser } from "../../../../lib/actions/patient.actions";
import RegisterForm from "../../../../components/forms/RegisterForm";
import { useEffect, useState } from "react";

const Register = () => {
  const [user, setUser] = useState({ $id: "", phone: "", name: "", email: "" });
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async (userId: string) => {
      const userReturned = await getUser(userId);
      if (userReturned) {
        setUser(userReturned);
        const patient = await getPatient(userId);

        if (patient) navigate(`/patients/${userId}/new-appointment`);
      }
    };

    if (userId) {
      fetchData(userId);
    }
  }, [userId, navigate]);

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

          <RegisterForm user={user} />

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
