import Image from "next/image";
import logo from "@/app/assets/guardians-galaxy-scaled.jpg";

export const Card = () => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <Image
        src={logo}
        alt="Guardians of the Galaxy"
        width={300}
        height={170}
        className="w-full"
      />
      <div className="px-6 py-4 bg-cyan-700 text-white">
        <div className="font-bold text-xl mb-2">GUARDIANS OF THE GALAXY</div>
        <p className="text-base">MIDWEEK DEAL</p>
        <p className="text-sm">Offer ends 13 Aug @ 12:00am.</p>
        <div className="flex items-center mt-4">
          <span className="text-2xl font-bold">Rp 130 200</span>
          <button className="ml-auto bg-sky-900 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">
            Show Detail
          </button>
        </div>
      </div>
    </div>
  );
};
