import logo from "@/app/assets/steam-logo.png";
import Image from "next/image";
export default function Register() {
  return (
    <div className="bg-slate-800">
      <div className="relative flex flex-col justify-center h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-slate-900 rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-start text-white">
              CREATE YOUR ACCOUNT
            </h1>
            <Image src={logo} alt="steam-logo" className="w-12  text-end" />
          </div>
          <br />
          <form className="space-y-4">
            <div>
              <label className="label">
                <span className="text-xs font-semibold label-text">NAME</span>
              </label>
              <input type="text" className="w-full input input-bordered" />
            </div>
            <div>
              <label className="label">
                <span className="text-xs font-semibold label-text">
                  USERNAME
                </span>
              </label>
              <input type="text" className="w-full input input-bordered" />
            </div>
            <div>
              <label className="label">
                <span className="text-xs font-semibold label-text">EMAIL</span>
              </label>
              <input type="text" className="w-full input input-bordered" />
            </div>
            <div>
              <label className="label">
                <span className="text-xs font-semibold label-text">
                  PASSWORD
                </span>
              </label>
              <input type="password" className="w-full input input-bordered" />
            </div>
            <br />
            <div>
              <button className="btn-neutral btn btn-block">Sign in</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
