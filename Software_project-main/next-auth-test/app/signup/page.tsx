"use client";

import React, { useState } from "react";
import "../style.css"
import { useRouter } from 'next/navigation';
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";

const SignupForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const router = useRouter();

  const validateEmail = (email: string) => {
    return email.includes("@");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!agreeTerms) {
      setError("Please agree to the terms and conditions.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email format. Please include '@' in your email address.");
      return;
    }

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful signup
        router.push('/login');
      } else if (response.status === 409) {
        // User already exists
        setError("User already exists.");
      } else {
        // Other signup failures
        setError(data.error || "Signup failed: " + response.statusText);
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError("An error occurred during signup. Please try again.");
    }
  };

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <Card style={{padding:"10px" , width:"400px" }} color="transparent" shadow={true}>
        <div className='flex items-center justify-center'>
          <img src='logowh.jpg' style={{width:"70px", marginBottom:"5px"}} alt="Logo" />
        </div>
        
        <Typography variant="h3" color="blue-gray" className='flex items-center justify-center mb-8'>
          Sign up
        </Typography>
        <Typography color="gray" className="flex items-center justify-center mt-5 font-normal">
          Get started with PaintRouteX!
        </Typography>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Name
            </Typography>
            <Input
              size="sm"
              placeholder="John Doe"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={e => setName(e.target.value)}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="sm"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={e => setEmail(e.target.value)}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              size="sm"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal gap-4"
              >
                I agree to the terms & conditions
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
          />
          
          {error && (
            <Typography color="red" className="mt-2 text-center">
              {error}
            </Typography>
          )}
          
          <Button type="submit" className="mt-6" fullWidth>
            Sign up
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <a href="#" onClick={handleLoginClick} className="font-medium text-gray-900">
              Sign in
            </a>
          </Typography>
        </form>
      </Card>
    </div>
  );
};

export default SignupForm;