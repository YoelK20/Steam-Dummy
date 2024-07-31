import logo from "@/app/assets/steam-logo.png";
import Image from "next/image";
export default function Login() {
  
  return (
    <div className="bg-slate-800">
      <div className="relative flex flex-col justify-center h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-slate-900 rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-start text-white">
              Sign in
            </h1>
            <Image src={logo} alt="steam-logo" className="w-12  text-end" />
          </div>
          <br />
          <form className="space-y-4">
            <div>
              <label className="label">
                <span className="text-xs font-bold text-blue-500 label-text">
                  SIGN IN WITH ACCOUNT NAME
                </span>
              </label>
              <input type="text" className="w-full input input-bordered" />
            </div>
            <div>
              <label className="label">
                <span className="text-xs label-text">PASSWORD</span>
              </label>
              <input type="password" className="w-full input input-bordered" />
            </div>
            <a
              href="#"
              className="text-xs text-gray-600 hover:underline hover:text-blue-600"
            >
              Forget Password?
            </a>
            <div>
              <button className="btn-neutral btn btn-block">Sign in</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
