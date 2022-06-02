import { BsFillPersonFill } from "react-icons/bs";
import { MdWork } from "react-icons/md";
import { IoGameController } from "react-icons/io5";

const CardIcon = ({ icon }: { icon: string }) => {
  const dynamicIconHandler = () => {
    if (icon === "work") {
      return <MdWork className="scale-[1.8] md:scale-[1.5] mt-2 md:mt-0" />;
    }

    if (icon === "personal") {
      return (
        <BsFillPersonFill className="scale-[1.8] md:scale-[1.5] mt-2 md:mt-0" />
      );
    }
    if (icon === "fun") {
      return (
        <IoGameController className="scale-[1.8] md:scale-[1.5] mt-2 md:mt-0" />
      );
    }
  };
  return <div>{dynamicIconHandler()}</div>;
};

export default CardIcon;
