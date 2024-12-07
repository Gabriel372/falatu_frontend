import { useState, useContext, useRef, useEffect } from "react";
import {
  TglobalUtils,
  TchattingTo,
  Tmessage,
  TdataSoquet,
} from "@/types/Types";
import { Context } from "@/context/MyContext";
import { FaTrashAlt } from "react-icons/fa";
import useMessage from "@/hooks/useMessage";
import { TbMessage } from "react-icons/tb";
import { Content } from "next/font/google";
import MessageSend from "../components/MessageSend";
import Chat from "../components/Chat";

function WindowChat() {
  const { storageMessage, getListMessage } = useMessage();

  const {
    socket,
    userLoged,
    contactList,
    messageList,
    chattingTo,
    setMessageList,
    returnList,
    setModalStatus,
    modalStatus,
  } = useContext(Context) as TglobalUtils;

  useEffect(() => {
    if (socket) {
      receiveMessage();
    }
    return undefined;
  }, [socket, chattingTo?.email]);

  useEffect(() => {
    if (messageList?.length > 0) {
      const uniqueMessages = listWithoutDuplicateItems(messageList);
      if (uniqueMessages.length !== messageList.length) {
        setMessageList(uniqueMessages);
      }
    }
  }, [messageList]);

  function listWithoutDuplicateItems(array: any) {
    const uniqueItems = array.filter(
      (item: any, index: any, self: any) =>
        index === self.findIndex((i: any) => i._id === item._id)
    );
    return uniqueItems;
  }

  function receiveMessage() {
    const handleMessageReceive = async (data: Tmessage) => {
      const response = await storageMessage(data);
      const newMessage = data;
      const messageIsRepeated = messageList.find(
        (message) => message._id === newMessage?._id
      );
      if (!messageIsRepeated) {
        setMessageList((prev) => [...prev, newMessage]);
      }
    };
    socket?.on("receive_message", handleMessageReceive);
    return () => {
      socket?.off("receive_message", handleMessageReceive);
    };
  }

  useEffect(() => {
    const fetchMessages = async () => {
      if (chattingTo?.email) {
        const list = await getListMessage(chattingTo.email);
        setMessageList(list);
      }
    };
    fetchMessages();
  }, [chattingTo]);

  function openModal() {
    setModalStatus({
      item: `${chattingTo?._id}`,
      modeOperation: "deleteContact",
    });
  }
  //ADD RESPONSIVIDADE ABAIXO DE 500PX P/ REMOVER SCROLL
  return (
    <div className={` flex flex-col w-full h-screen`}>
      <h1 className=" text-center text-xl bg-slate-800">
        {contactList?.length > 0 && (
          <div className="my-4 ">
            Falando com :
            <span className="text-green-600"> {chattingTo?.email}</span>
            <button className=" ml-2" onClick={openModal}>
              <FaTrashAlt />
            </button>
          </div>
        )}
      </h1>
      <Chat />
      <MessageSend />
    </div>
  );
}

export default WindowChat;
