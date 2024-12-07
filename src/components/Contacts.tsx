import { useContext, useState, useEffect } from "react";
import { Context } from "@/context/MyContext";
import {
  TchattingTo,
  Tcontact,
  TcontactList,
  TcontactStoraged,
  TglobalUtils,
} from "@/types/Types";
import { Modal } from "./Modal";
import useContact from "@/hooks/useContact";
import useMessage from "@/hooks/useMessage";
import Link from "next/link";

function Contacts() {
  const {
    setModalStatus,
    setMessageList,
    setChattingTo,
    setContactList,
    chattingTo,
    contactList,
    modalStatus,
    socket,
    userLoged,
  } = useContext(Context) as TglobalUtils;
  const { getAllContacts } = useContact();
  const { getListMessage } = useMessage();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  let interrupt = true;

  useEffect(() => {
    if (token) {
      (async () => {
        const list = await getAllContacts(token);
        setContactList(list);
        interrupt = false;
      })();
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("contact_added", getContactAdded);
      return () => {
        socket.off("contact_added", getContactAdded);
      };
    }
  }, [socket]);

  function getContactAdded(contact: any) {
    setContactList((prevList) => {
      const itemExists = prevList.some((item) => item._id === contact._id);
      return itemExists ? prevList : [...prevList, contact];
    });
  }

  async function selectContact(contact: TcontactStoraged) {
    setChattingTo(contact);
    const response = await getListMessage(contact.email);
    const list = response?.data?.listMessages;
    if (list && list.length > 0) {
      setMessageList(list);
    }
  }

  return (
    <div className={`  h-full overflow-y-auto `}>
      <h1 className={` text-[1.5rem] text-center`}>contatos</h1>
      <button
        className={` text-green-700 border border-green-300 bg-green-200 p-2 hover:bg-green-300`}
        onClick={() => {
          setModalStatus({ item: "", modeOperation: "createContact" });
        }}
      >
        Criar contato
      </button>
      <Modal />
      <h1 className=" text-center">Lista de contatos</h1>
      <ul>
        {contactList?.length > 0 ? (
          contactList.map((item, index) => (
            <li
              onClick={() => selectContact(item)}
              key={index}
              className={`  cursor-pointer px-3 border border-gray-800 my-2${
                chattingTo?.email === item?.email ? " bg-gray-500" : ""
              }`}
            >
              <p className="w-screen500:hidden">{item?.email}</p>
              <Link href="/WindowChat" className=" hidden w-screen500:flex">
                {item?.email}
              </Link>
            </li>
          ))
        ) : (
          <li>sem contatos no momento</li>
        )}
      </ul>
    </div>
  );
}

export default Contacts;
