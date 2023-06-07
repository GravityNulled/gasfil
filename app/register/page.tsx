"use client";

import axios from "axios";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";

const Register = () => {
  const [regErrors, setRegErrors] = useState<string>();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const { data: session } = useSession();

  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/register", {
        email,
        password,
        name,
        address,
        city,
        phone,
      });
      toast.success("Registration successful");
      router.push("/login");
    } catch (error) {
      toast.error("Registration failed");
    }
  };

  if (session) {
    router.push("/");
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Toaster />
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Register an account</h3>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mt-4">
            <div className="flex gap-2">
              <div>
                <label className="block">Name</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600"
                />
              </div>
              <div>
                <label className="block">Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="enail"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block">Address</label>
              <input
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                placeholder="Moi Avenue"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600"
              />
            </div>
            <div className="mt-4">
              <label className="block">Phone Number</label>
              <input
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                minLength={10}
                maxLength={12}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600"
              />
            </div>
            <div className="mt-4">
              <label className="block">City</label>
              <input
                onChange={(e) => setCity(e.target.value)}
                type="text"
                placeholder="City"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600"
              />
            </div>
            <div className="mt-4">
              <label className="block">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600"
              />
            </div>
            <div className="flex flex-col items-baseline justify-between">
              <button className="px-6 py-2 mt-4 block w-full text-white bg-gray-800 rounded-lg hover:bg-gray-900">
                Register
              </button>
              <Link
                href="/login"
                className="text-sm text-blue-600 hover:underline mt-2 "
              >
                Login?
              </Link>
            </div>
          </div>
          <p className="text-pink-600 text-xs mt-1">{regErrors}</p>
        </form>
      </div>
    </div>
  );
};

export default Register;
