import Banner from "@/components/Banner";
import { Card } from "@/components/Card";
// import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-slate-800 min-h-screen">
      <div className="bg-slate-700">
        <Banner />
      </div>
      <div className="flex flex-wrap justify-center mx-auto gap-4 p-4">
        {/* <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card /> */}
      </div>
    </div>  
  );
}
