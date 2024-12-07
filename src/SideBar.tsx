import { useState, useContext, useRef, useEffect } from "react";
import { Context } from "@/context/MyContext";
import { TglobalUtils } from "./types/Types";
import Contacts from "./components/Contacts";
import useAuth from "./hooks/useAuth";
// import { GiExitDoor } from "react-icons/gi";
import { IoIosPower } from "react-icons/io";
import { IoPersonCircleOutline } from "react-icons/io5";

// import "./styles/Makeshift.css";

function SideBar() {
  const {
    userLoged,
    contactList,
    chattingTo,
    setChattingTo,
    returnList,
    setModalStatus,
    setContactList,
  } = useContext(Context) as TglobalUtils;
  const { logout, checkUserByToken, setLoading } = useAuth();

  return (
    <div className="sideBarSquare px-2">
      <div>
        <IoPersonCircleOutline className=" iconPerson" />

        <h3 className={` text-2xl px-2 text-center`}>
          Olá sr. {userLoged.name}!
        </h3>
        <Contacts />
      </div>
      <h3
        onClick={logout}
        className={` justify-center  text-5xl flex border-green-600 border text-[1.1rem] list-none cursor-pointer btnExit mb-2`}
      >
        <p className=""> sair</p>
        <IoIosPower className={`exitIcon`} />
      </h3>
    </div>
  );
}

export default SideBar;
