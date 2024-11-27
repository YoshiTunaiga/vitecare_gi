import { Link } from "react-router-dom";

import RegisterForm from "../../../../components/forms/RegisterForm";

import registerImg from "../../../../assets/images/registerbg.png";
import ViteCareLogo from "../../../../components/ViteCareLogo";

const Register = () => {
  return (
    <div className="text-dark-200 flex h-screen max-h-screen ">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <header className=" flex items-center mb-5 rounded-2xl bg-dark-700 py-5 shadow-lg xl:px-12">
            <ViteCareLogo />
          </header>

          <RegisterForm />

          {/* TODO: DRY - Create Reusable copyrights / footer */}
          <div className="text-14-regular text-dark-200 mt-5 pb-12 flex justify-between">
            <p className="justify-items-end  xl:text-left">© 2024 ViteCare</p>
            <Link
              to="https://gidiaz.com"
              target="_blank"
              className="justify-items-end xl:text-right transition delay-150 duration-300 ease-in-out">
              Gi Diaz Solutions
            </Link>
          </div>
        </div>
      </section>

      <img
        src={registerImg}
        height={1000}
        width={1000}
        alt="patient"
        loading="lazy"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;
