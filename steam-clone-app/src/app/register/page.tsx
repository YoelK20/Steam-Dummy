import React, { Suspense } from "react";
import logo from "@/app/assets/steam-logo.png";
import Image from "next/image";
import { ApiResponseType } from "../api/types";
import { redirect } from "next/navigation";
import ClientFlashComponent from "@/components/ClientFlashComponent";
import Link from "next/link";
import { baseUrl, localUrl } from "@/db/helpers/BaseUrl";
export default function Register() {
  const handleFormAction = async (formData: FormData) => {
    "use server";

    const res = await fetch(`${baseUrl}/api/register`, {
      method: "POST",

      body: JSON.stringify({
        name: formData.get("name"),
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseJson: ApiResponseType<unknown> = await res.json();
    console.log(responseJson);

    if (!res.ok) {
      let message = responseJson.error ?? "Something went wrong";
      return redirect(`/register?error=${message}`);
    }
    return redirect("/login");
  };
  return (
    <div className="bg-slate-800">
      <Suspense fallback={<div>Loading...</div>}>
        <ClientFlashComponent />
      </Suspense>
      <div className="relative flex flex-col justify-center h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-slate-900 rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-start text-white">
              CREATE YOUR ACCOUNT
            </h1>
            <Image src={logo} alt="steam-logo" className="w-12  text-end" />
          </div>
          <br />
          <form action={handleFormAction} className="space-y-4">
            <div>
              <label className="label">
                <span className="text-xs font-semibold label-text">NAME</span>
              </label>
              <input
                type="text"
                className="w-full input input-bordered"
                name="name"
              />
            </div>
            <div>
              <label className="label">
                <span className="text-xs font-semibold label-text">
                  USERNAME
                </span>
              </label>
              <input
                type="text"
                className="w-full input input-bordered"
                name="username"
              />
            </div>
            <div>
              <label className="label">
                <span className="text-xs font-semibold label-text">EMAIL</span>
              </label>
              <input
                type="text"
                className="w-full input input-bordered"
                name="email"
              />
            </div>
            <div>
              <label className="label">
                <span className="text-xs font-semibold label-text">
                  PASSWORD
                </span>
              </label>
              <input
                type="password"
                className="w-full input input-bordered"
                name="password"
              />
            </div>
            <br />
            <div>
              <button className="btn-neutral btn btn-block">Sign up</button>
            </div>
          </form>
          <br />
          <Link href={"/login"}>
            <p className="text-xs text-gray-600 hover:underline hover:text-blue-600 flex justify-center">
              Already have Account ?
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
