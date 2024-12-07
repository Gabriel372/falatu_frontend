import { TmessageUtils, TglobalUtils } from "@/types/Types";
import Input from "./Input";
import { Context } from "@/context/MyContext";
import { FormEvent, ChangeEvent, useState, useContext } from "react";
import useMessage from "@/hooks/useMessage";
import { nanoid } from "nanoid";

function MessageSend() {
  const { socket, chattingTo, userLoged } = useContext(Context) as TglobalUtils;
  const emptyMessage = { from: "", to: "", content: "", _id: "" };
  const [message, setMessage] = useState(emptyMessage);
  const { storageMessage } = useMessage();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!message.content) {
      return;
    }
    socket?.emit("message", message);
    //storageMessage(message);
    setMessage(emptyMessage);
    //socket emite a msg
    //armazenar msg no banco
    //inserir na listmsg
  }
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const newMessage = {
      from: userLoged.email,
      to: chattingTo?.email ? chattingTo.email : "",
      content: e.target.value,
      _id: nanoid(),
    };
    setMessage(newMessage);
  }
  return (
    <form
      className={` sticky  w-full bg-slate-800 flex justify-center text-white`}
      onSubmit={handleSubmit}
    >
      <div className=" flex align-middle">
        <div className=" pt-5">
          <Input
            type="text"
            textLabel=""
            name="message"
            placeholder="mensagem"
            handleOnChange={handleChange}
            value={message.content}
          />
        </div>

        <input
          type="submit"
          value="Enviar"
          className={` cursor-pointer border border-green-500 mt-2  
 ml-2 px-2 max-h-9 hover:bg-gray-900`}
        />
      </div>
    </form>
  );
}

export default MessageSend;
