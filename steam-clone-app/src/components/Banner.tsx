import Image from "next/image";
import adImage from "@/app/assets/Palword.jpg";

const Banner = () => {
  return (
    <div className="w-full overflow-hidden">
      <div className="carousel w-full h-96 relative">
        <div id="item1" className="carousel-item w-full h-full">
          <img
            src="https://ltp-medias.s3.eu-west-3.amazonaws.com/wp-content/uploads/2022/09/16231043/palworld.jpg"
            className="w-full h-full object-contain"
          />
        </div>
        <div id="item2" className="carousel-item w-full h-full">
          <img
            src="https://i.ytimg.com/vi/SO5-G3Argu4/maxresdefault.jpg"
            className="w-full h-full object-contain"
          />
        </div>
        <div id="item3" className="carousel-item w-full h-full">
          <img
            src="https://jegged.com/img/Games/Final-Fantasy-IX/Walkthrough-PS4/FFIX-00023-Final-Fantasy-Title-Screen.png"
            className="w-full h-full object-contain"
          />
        </div>
        <div id="item4" className="carousel-item w-full h-full">
          <img
            src="https://res.cloudinary.com/drfs0ykc1/image/upload/v1722406203/wnpzpixvijorkqbavtgo.jpg"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <div className="flex w-full justify-center gap-2 py-2">
        <a href="#item1" className="btn btn-xs">
          1
        </a>
        <a href="#item2" className="btn btn-xs">
          2
        </a>
        <a href="#item3" className="btn btn-xs">
          3
        </a>
        <a href="#item4" className="btn btn-xs">
          4
        </a>
      </div>
    </div>
  );
};

export default Banner;
