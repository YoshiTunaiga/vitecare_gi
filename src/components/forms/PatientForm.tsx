"use client";
// Browser key app on the client side

// form validation
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// Components
import { UserFormValidation } from "../../lib/validation";
import { createUser } from "../../lib/actions/patient.actions";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { Form } from "../ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

//Assets
import emailIcon from "../../assets/icons/email.svg";
import userIcon from "../../assets/icons/user.svg";

// Style
import "react-phone-number-input/style.css";
import { PasskeyModal } from "../PasskeyModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import AdminForm from "./AdminForm";

const PatientForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);

    try {
      const user = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };

      const response: { newUser?: any; isMember?: boolean } | any =
        await createUser(user);

      if (!response.isMember) {
        navigate(`/patients/${response.newUser.$id}/register`);
      } else {
        navigate(`/patients/${response.newUser.$id}/new-appointment`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Card className="bg-white">
      <CardHeader className="text-dark-200">
        <CardTitle>Hi There</CardTitle>
        <CardDescription>Schedule your first appointment.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="name"
              label="Full name"
              placeholder="John Doe"
              iconSrc={userIcon}
              iconAlt="user"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email"
              placeholder="johndoe@gmail.com"
              iconSrc={emailIcon}
              iconAlt="email"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Phone number"
              placeholder="(555) 123-4567"
            />

            <SubmitButton
              isLoading={isLoading}
              className="text-white bg-green-500 w-full hover:bg-green-700">
              Get Started
            </SubmitButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PatientForm;
