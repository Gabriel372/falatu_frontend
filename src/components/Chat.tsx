import { TglobalUtils } from "@/types/Types";
import { useContext, useEffect, useRef } from "react";
import { Context } from "@/context/MyContext";

function Chat() {
  const { userLoged, messageList, chattingTo, setMessageList } = useContext(
    Context
  ) as TglobalUtils;
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messageList?.length > 0) {
      scrollDown();
    }
  }, [messageList]);

  useEffect(() => {
    if (!chattingTo) {
      setMessageList([]);
    }
  }, [chattingTo]);

  function scrollDown() {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="h-full box pt-1">
      {messageList?.length === 0 ? (
        <div className=" px-1 h-full text-center">
          sem menssagens no momento
        </div>
      ) : (
        <ul className=" overflow-y-scroll px-1 h-full max-h-[80.6vh]">
          {messageList?.map((msg, index) => (
            <li
              key={index}
              className={`${
                userLoged.email === msg.from
                  ? "bg-green-500 ml-auto"
                  : "bg-gray-500"
              } flex flex-col  max-w-max px-2 mb-1`}
            >
              <p className=" text-[0.7em]">
                {userLoged.email === msg.from ? "voçê" : msg.from}
              </p>
              <p className=" text-[1em]">{msg.content}</p>
            </li>
          ))}
          <div className="" ref={bottomRef}></div>
        </ul>
      )}
    </div>
  );
}

export default Chat;
