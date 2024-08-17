import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "../ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { useLocation, useNavigate } from "react-router-dom";
import { VITE_PUBLIC_ADMIN_PASSKEY } from "../../lib/appwrite.config";
import { decryptKey, encryptKey } from "../../lib/utils";
import { Button } from "../ui/button";

const AdminForm = () => {
  const router = useNavigate();
  // const { pathname } = useLocation();
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");

  const encryptedKey =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accessKey")
      : null;

  const validatePasskey = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (passkey === VITE_PUBLIC_ADMIN_PASSKEY) {
      const encryptedKey = encryptKey(passkey);

      localStorage.setItem("accessKey", encryptedKey);

      router("/admin");
    } else {
      setPasskey("");
      setError("Invalid passkey. Please try again.");
    }
  };

  return (
    <Card className="bg-white text-dark-200">
      <CardHeader>
        <CardTitle>Admin Access Verification</CardTitle>
        <CardDescription>
          To access the admin page, please enter the passkey.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <InputOTP
          maxLength={6}
          value={passkey}
          onChange={(value) => setPasskey(value)}>
          <InputOTPGroup className="shad-otp">
            <InputOTPSlot className="shad-otp-slot" index={0} />
            <InputOTPSlot className="shad-otp-slot" index={1} />
            <InputOTPSlot className="shad-otp-slot" index={2} />
            <InputOTPSlot className="shad-otp-slot" index={3} />
            <InputOTPSlot className="shad-otp-slot" index={4} />
            <InputOTPSlot className="shad-otp-slot" index={5} />
          </InputOTPGroup>
        </InputOTP>
        {error && (
          <p className="shad-error text-14-regular mt-4 flex justify-center">
            {error}
          </p>
        )}
        <Button
          onClick={(event: any) => validatePasskey(event)}
          className="shad-primary-btn w-full mt-8">
          Enter Admin Passkey
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdminForm;
