import React, { createContext, useState } from "react";
import {
  Tchildren,
  Tauthenticated,
  TglobalUtils,
  SocketState,
  Tcontact,
  TcontactStoraged,
  Tmessage,
} from "@/types/Types";
import useAuth from "@/hooks/useAuth";
import useSocket from "@/hooks/useSocket";
import useContact from "@/hooks/useContact";

export const Context = createContext<TglobalUtils | undefined>(undefined);

export function ContextProvider({ children }: Tchildren) {
  const [authenticated, setAuthenticated] = useState(false);
  const [msgError, setMsgError] = useState("");
  const [socket, setSocket] = useState<SocketState>(null);
  const [contactList, setContactList] = useState<TcontactStoraged[]>([]);
  const [chattingTo, setChattingTo] = useState<TcontactStoraged>();
  const [messageList, setMessageList] = useState<Tmessage[]>([]);
  const [userLoged, setUserLoged] = useState({
    name: "",
    email: "",
    _id: "",
  });
  const [modalStatus, setModalStatus] = useState({
    item: "",
    modeOperation: "",
  });
  const { logout, login, register } = useAuth();
  const { startSocket, returnList } = useSocket();
  const { createContact } = useContact();

  return (
    <Context.Provider
      value={{
        authenticated,
        msgError,
        socket,
        userLoged,
        modalStatus,
        contactList,
        chattingTo,
        messageList,
        setMessageList,
        setChattingTo,
        setContactList,
        setModalStatus,
        setUserLoged,
        returnList,
        setSocket,
        startSocket,
        setMsgError,
        setAuthenticated,
        logout,
        login,
        register,
        createContact,
      }}
    >
      {children}
    </Context.Provider>
  );
}
