import { IoChatboxEllipsesOutline } from "react-icons/io5";

function FalaTuText() {
  return (
    <h1 className=" text-5xl text-green-500 flex w-full justify-center mb-2">
      Fala <span className=" text-white">Tú</span>
      <IoChatboxEllipsesOutline className=" relative bottom-7" />
    </h1>
  );
}

export default FalaTuText;
