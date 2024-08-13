import PatientForm from "../components/forms/PatientForm";
import vitecarelogo from "../assets/vclogo.png";

const Home = () => {
  return (
    <div className="text-white flex h-screen max-h-screen bg-[url('./assets/images/providerbg.png')]">
      {/* TODO: OTP VERIFICATION | PassKeyModal */}
      <section className="remove-scrollbar container my-auto bg-gradient-to-r from-dark-600">
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
            <a href="/?admin=true" className="hover:text-dark-400 ">
              Admin
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
