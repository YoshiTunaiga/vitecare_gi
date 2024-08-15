import { Link } from "react-router-dom";

import RegisterForm from "../../../../components/forms/RegisterForm";

import logofull from "../../../../assets/vclogo.png";
import registerImg from "../../../../assets/images/registerbg.png";

const Register = () => {
  return (
    <div className="text-white flex h-screen max-h-screen ">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Link to="/" className="cursor-pointer">
            <img
              src={logofull}
              height={1000}
              width={1000}
              alt="patient"
              className="mb-12 h-10 w-fit"
            />
          </Link>

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
