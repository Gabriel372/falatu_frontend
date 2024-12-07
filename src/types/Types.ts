import { ReactNode } from "react";
import { AxiosResponse } from "axios";
import { Socket } from "socket.io-client";
import { FormEvent } from "react";

export type Tinput = {
  type: string;
  textLabel: string;
  name: string;
  placeholder: string;
  handleOnChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  value: string;
  multiple?: any;
};

export type Tchildren = {
  children: ReactNode;
};
export type TresponseAxios = {
  response: AxiosResponse<any, any>;
  data: AxiosResponse<Tcontact[], any>;
  contacts: Tcontact[];
};
export type TresponseData = {
  message: string;
  token: string;
};
export type Tauthenticated = {
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};
export type TmessageUtils = {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  handleChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  handleSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  // handleSubmit?:React.FormEvent<HTMLFormElement>
};
export type TchattingTo = {
  chattingTo: TcontactStoraged | undefined;
  setChattingTo: React.Dispatch<
    React.SetStateAction<TcontactStoraged | undefined>
  >;
};

// export type TstateSetter<T> = {
//   state: T;
//   setState: React.Dispatch<React.SetStateAction<T>>;
// };
// export type TmsgFormError = TstateSetter<boolean>;
export type TmsgFormError = {
  msgError: string;
  setMsgError: React.Dispatch<React.SetStateAction<string>>;
};
export type SocketState = Socket | null;

export type Tcontact = TuserBase & { userId: string; _id: string };

export type TuserBase = {
  name: string;
  email: string;
};
export type TcontactStoraged = TuserBase & {
  _id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export type TcontactList = {
  contactList: TcontactStoraged[];
  setContactList: React.Dispatch<React.SetStateAction<TcontactStoraged[]>>;
};

export type TuserLoged = TuserBase & {
  _id: string;
};
export type Tuser = TuserBase & {
  password: string;
};

// const [modalStatus, setModalStatus] = useState({
//   item: {},
//   modeOperation: "",
// });
export type TmodalStatus = {
  item: string;
  modeOperation: string;
};
// export type ReturnListFunction = (array: TMessage[], data: Tdata) => TMessage[];
export type TglobalUtils = {
  authenticated: boolean;
  msgError: string;
  socket: SocketState;
  userLoged: TuserLoged;
  modalStatus: TmodalStatus;
  contactList: TcontactStoraged[];
  chattingTo: TcontactStoraged | undefined;
  messageList: Tmessage[];
  setMessageList: React.Dispatch<React.SetStateAction<Tmessage[]>>;
  setChattingTo: React.Dispatch<
    React.SetStateAction<TcontactStoraged | undefined>
  >;
  setContactList: React.Dispatch<React.SetStateAction<TcontactStoraged[]>>;
  setModalStatus: React.Dispatch<React.SetStateAction<TmodalStatus>>;
  setUserLoged: React.Dispatch<React.SetStateAction<TuserLoged>>;
  returnList: (array: any[], data: any) => any[];
  setSocket: React.Dispatch<React.SetStateAction<SocketState>>;
  startSocket: (username: string) => void;
  setMsgError: React.Dispatch<React.SetStateAction<string>>;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
  login: (user: Omit<Tuser, "name">) => Promise<void>;
  register: (user: Tuser) => Promise<void>;
  createContact: (contact: Omit<Tcontact, "_id">) => Promise<any>;
};

export type Tmessage = {
  from: string;
  to: string;
  content: string;
  _id: string;
};

export type TMessage = {
  text: string;
  authorId: string;
  author: string;
  id: string;
};
// export type Tdata = Omit<TMessage, "id">;

export type TdataSoquet = {
  text: string;
  authorId: string;
  author: string;
};
// msgError, setMsgerror
// authenticated, setAuthenticated
