import { TmsgFormError } from "../types/Types";
import { useContext, useEffect } from "react";
import { Context } from "@/context/MyContext";
import { TglobalUtils } from "../types/Types";

function MsgFormError() {
  const { setMsgError, msgError } = useContext(Context) as TglobalUtils;

  useEffect(() => {
    if (msgError) {
      setTimeout(() => setMsgError(""), 5000);
    }
  }, []);

  //recebe prop user  e isActive

  //msg email nao cadastrado

  //senha incorrreta email nao cadastrado

  //msg == email nao cadastrado && setMsg(emailNotRegister)
  {
    /* <p
        className={`text-red-700 transition-all duration-500 ease-in-out transform ${
          msgError ? "opacity-100 max-h-40" : "opacity-0 max-h-0"
        }`}
      > */
  }
  {
    /* <p className="text-red-700 transition-opacity duration-300 opacity-0 hover:opacity-100"> */
  }
  return (
    <p className={`text-red-700`}>
      {msgError === "emailEmpty" && "preencha seu email"}
      {msgError === "emailNotRegistered" && "este email não está cadastrado"}
      {msgError === "passwordEmpty" && "preencha sua senha"}
      {msgError === "passwordInvalid" && "senha incorreta"}
      {msgError === "nameRegisterEmpty" && "preencha seu nome"}
      {msgError === "emailRegisterEmpty" && "preencha seu email"}
      {msgError === "passwordRegisterEmpty" && "preencha sua senha"}
      {msgError === "emailRegistAlreadyExist" && "este email jé existe"}
    </p>
  );
}

export default MsgFormError;
