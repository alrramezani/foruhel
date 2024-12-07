"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import Input from "@/app/dash/components/input";
import Button from "@/app/dash/components/button";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const validate = () => {
    const errors: { username?: string; password?: string } = {};
    const values = formik.values;
    if (!values.username) {
      errors.username = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 5) {
      errors.password = "must be bigger than 5 chars";
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: validate,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });
  const handleLogin = async (values: unknown) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      router.push("/dash");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-svh">
      <div className="w-80">
        <form onSubmit={formik.handleSubmit}>
          <h1 className=" border-l-red-500 mb-4">Login</h1>
          <Input
            type="text"
            label="Username"
            placeholder="Username"
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          {formik.errors.username && (
            <p className="text-red-600 mb-2 text-xs">
              {formik.errors.username}
            </p>
          )}
          <Input
            label="Password"
            type="password"
            placeholder="Password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && (
            <p className="text-red-600 mb-2 text-xs">
              {formik.errors.password}
            </p>
          )}
          <Button label="Login" />
          {error && <p className="text-red-600 mb-2 text-xs">{error}</p>}
        </form>
      </div>
    </div>
  );
}
