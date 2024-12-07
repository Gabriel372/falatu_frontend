import io from "socket.io-client";
import { Context } from "@/context/MyContext";
import { useContext } from "react";
import {
  Tuser,
  TresponseAxios,
  TglobalUtils,
  TdataSoquet,
  TMessage,
} from "@/types/Types";
import { nanoid } from "nanoid";

export default function useSocket() {
  const context = useContext<TglobalUtils | undefined>(Context);

  function startSocket(username: string) {
    const socket = io("http://localhost:5000");
    socket.emit("set_username", username);
    return socket;
  }

  // function returnList(array: TMessage[], data: Tdata) {
  //   const id = nanoid();
  //   let newMsg = { ...data, id };
  //   const messageExists = array.some((msg) => msg.id === newMsg.id);
  //   return messageExists ? array : [...array, newMsg];
  // }
  function returnList(array: TMessage[], data: TdataSoquet) {
    //funcao que retorna o objt message armazenado do db
    const _id = nanoid();
    let newMsg = { ...data, _id };
    const messageExists = array.some((msg) => msg.id === newMsg._id);
    return messageExists ? array : [...array, newMsg];
  }
  return {
    startSocket,
    returnList,
  };
}
