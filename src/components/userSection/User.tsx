import React, { useState } from "react";
import { IoMdLogOut } from "react-icons/io";
import useClickOutside from "../../hooks/useClickOutside";
import { RootState, useAppSelector } from "../../interfaces/interfaces";
import ChangeUserName from "../modals/changeUserName/changeUserName";
import ConfirmLogOut from "../modals/confirmLogOut/ConfirmLogOut";
import ResetPassword from "../modals/resetPassword/ResetPassword";

const User = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openUserModal, setOpenUserModal] = useState<boolean>(false);
  const [openPasswordModal, setOpenPasswordModal] = useState<boolean>(false);
  const [openChangePasswordModal, setOpenChangePasswordModal] =
    useState<boolean>(false);

  const userName = useAppSelector(
    (state: RootState) => state.getTodoReducer.userName,
  );
  const dark = useAppSelector(
    (state: RootState) => state.darkModeReducer.darkMode,
  );
  const userRef = useClickOutside(() => {
    setOpenUserModal(false);
  });

  return (
    <div ref={userRef} className="relative flex items-center justify-center">
      <h1
        onClick={() => setOpenUserModal(!openUserModal)}
        className="select-none cursor-pointer"
      >
        {userName}
      </h1>
      <IoMdLogOut
        onClick={() => setOpenModal(true)}
        className={`scale-[1.8] cursor-pointer ml-5 mb-[.20rem] transition-all ease-in-out duration-500 ${
          openModal ? "rotate-[-90deg]" : ""
        }`}
      />
      <ConfirmLogOut setOpen={setOpenModal} open={openModal} />
      <div
        className={`absolute top-10 right-0 flex flex-col items-start justify-center  p-2 rounded text-xs  text-white ${
          openUserModal ? "block" : "hidden"
        } ${dark ? "bg-secondaryColor" : "bg-primaryColor"} `}
      >
        <button
          className="mb-3 "
          onClick={() => setOpenChangePasswordModal(true)}
        >
          Change user name
        </button>
        <button onClick={() => setOpenPasswordModal(true)}>
          Change password
        </button>
      </div>
      <ChangeUserName
        setOpen={setOpenChangePasswordModal}
        open={openChangePasswordModal}
      />
      <ResetPassword setOpen={setOpenPasswordModal} open={openPasswordModal} />
    </div>
  );
};

export default User;
