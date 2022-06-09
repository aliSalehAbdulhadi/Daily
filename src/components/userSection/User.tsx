import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { IoMdLogOut } from "react-icons/io";
import { auth } from "../../container/firebase";
import { RootState, useAppSelector } from "../../interfaces/interfaces";
import ConfirmLogOut from "../modals/confirmLogOut/ConfirmLogOut";

const User = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const userName = useAppSelector(
    (state: RootState) => state.getTodoReducer.userName,
  );

  return (
    <div className="relative flex items-center justify-center">
      <h1 className="select-none">{userName}</h1>
      <IoMdLogOut
        onClick={() => setOpenModal(true)}
        className={`scale-[1.8] cursor-pointer ml-5 mb-[.20rem] transition-all ease-in-out duration-500 ${
          openModal ? "rotate-[-90deg]" : ""
        }`}
      />
      <ConfirmLogOut setOpen={setOpenModal} open={openModal} />
    </div>
  );
};

export default User;
