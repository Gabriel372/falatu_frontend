import { useContext, useEffect, useRef } from "react";
import { Context } from "@/context/MyContext";
import { TglobalUtils } from "../types/Types";
import Contacts from "@/components/Contacts";
import WindowChat from "@/pages/WindowChat";
import useContact from "@/hooks/useContact";
import MessageSend from "@/components/MessageSend";
import SideBar from "@/SideBar";

function Dashboard() {
  const { getAllContacts } = useContact();
  const {
    userLoged,
    contactList,
    chattingTo,
    setChattingTo,
    returnList,
    setModalStatus,
    setContactList,
  } = useContext(Context) as TglobalUtils;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  let interrupt = true;

  useEffect(() => {
    if (contactList?.length > 0 && !chattingTo) {
      setChattingTo(contactList[0]);
    }
  }, [contactList, chattingTo]);

  useEffect(() => {
    if (token) {
      (async () => {
        const list = await getAllContacts(token);
        setContactList(list);
        interrupt = false;
      })();
    }
  }, []);

  return (
    <div className={` flex flex-row h-screen`}>
      <SideBar />
      {/* <Contacts /> */}
      <div className={`w-screen500:hidden w-full`}>
        <WindowChat />
      </div>
    </div>
  );
}
export default Dashboard;
