import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { cn } from "./lib/utils";
import vitecarelogo from "./assets/vclogo.png";
import onboardingimg from "./assets/images/onboardingimg.png";
import PatientForm from "./components/forms/PatientForm";

function App() {
  return (
    <div className={cn("min-h-screen bg-dark-300 font-sans antialiased")}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="text-white flex h-screen max-h-screen">
          {/* TODO: OTP VERIFICATION | PassKeyModal */}
          <section className="remove-scrollbar container my-auto">
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
                <p className="justify-items-end text-dark-600 xl:text-left">
                  © 2024 ViteCare
                </p>
                <a href="/?admin=true" className="text-green-500">
                  Admin
                </a>
              </div>
            </div>
          </section>

          <img
            src={onboardingimg}
            height={1000}
            width={1000}
            alt="patient"
            className="side-img max-w-[50%]"
          />
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
