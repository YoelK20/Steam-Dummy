import React, { Suspense } from "react";
import logo from "@/app/assets/steam-logo.png";
import Image from "next/image";
import { doLogin } from "./action";
import ClientFlashComponent from "@/components/ClientFlashComponent";
import { localUrl } from "@/db/helpers/BaseUrl";
import { ApiResponseType } from "../api/types";
import { redirect } from "next/navigation";

export default function Login() {
  // const handleFormAction = async(form : FormData) => {
  /* token gk tersimpan */
  //   "use server";
  //   const res = await fetch(`${localUrl}/api/login`, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       username: form.get("username"),
  //       password: form.get("password")
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //   const responseJson : ApiResponseType<unknown> = await res.json();
  //   console.log(responseJson);

  //   if(!res.ok){
  //     let message = responseJson.error ?? "Something went wrong";
  //     return redirect(`/login?error=${message}`)
  //   }
  //   return redirect("/")
  // }

  return (
    <div className="bg-slate-800">
      <Suspense fallback={<div>Loading...</div>}>
        <ClientFlashComponent />
      </Suspense>
      <div className="relative flex flex-col justify-center h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-slate-900 rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-start text-white">
              Sign in
            </h1>
            <Image src={logo} alt="steam-logo" className="w-12  text-end" />
          </div>
          <br />
          <form className="space-y-4" action={doLogin}>
            <div>
              <label className="label">
                <span className="text-xs font-bold text-blue-500 label-text">
                  SIGN IN WITH ACCOUNT NAME
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
                <span className="text-xs label-text">PASSWORD</span>
              </label>
              <input
                type="password"
                className="w-full input input-bordered"
                name="password"
              />
            </div>
            <div>
              <button className="btn-neutral btn btn-block">Sign in</button>
            </div>
          </form>
          <br />
          <a
            href="/register"
            className="text-xs text-gray-600 hover:underline hover:text-blue-600 flex justify-center "
          >
            Dont have Account ?
          </a>
        </div>
      </div>
    </div>
  );
}
