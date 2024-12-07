import Input from "@/components/Input";
import { FormEvent, useState, useContext } from "react";
import { ChangeEvent } from "react";
import { Context } from "@/context/MyContext";
import useAuth from "@/hooks/useAuth";
import MsgFormError from "@/components/MsgFormError";
import { TglobalUtils } from "@/types/Types";
import FalaTuText from "@/components/FalaTuText";

function Register() {
  const userEmpty = { name: "", email: "", password: "" };
  const [user, setUser] = useState(userEmpty);
  const { register } = useAuth();
  const { setMsgError, msgError } = useContext(Context) as TglobalUtils;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (msgError) {
      setMsgError("");
    }
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user.name) {
      return setMsgError("nameRegisterEmpty");
    }
    if (!user.email) {
      return setMsgError("emailRegisterEmpty");
    }
    if (!user.password) {
      return setMsgError("passwordRegisterEmpty");
    }
    register(user);
  }

  return (
    <section className="flex h-screen w-full flex-col items-center justify-center">
      <FalaTuText />
      <div className="  max-w-[22rem] w-full px-2">
        <h1 className={` text-2xl text-center my-4`}>Registrar</h1>
        <form
          onSubmit={handleSubmit}
          className={` m-auto flex flex-col max-w-[22rem] px-2`}
        >
          <Input
            type="text"
            textLabel="Digite seu nome"
            name="name"
            placeholder="seu nome"
            handleOnChange={handleChange}
            value={user.name}
          />
          {msgError.includes("nameRegister") && <MsgFormError />}
          <Input
            type="email"
            textLabel="Digite seu email"
            name="email"
            placeholder="seu email"
            handleOnChange={handleChange}
            value={user.email}
          />{" "}
          {msgError.includes("emailRegist") && <MsgFormError />}
          <Input
            type="password"
            textLabel="Digite sua senha"
            name="password"
            placeholder="sua senha"
            handleOnChange={handleChange}
            value={user.password}
          />{" "}
          {msgError.includes("passwordRegister") && <MsgFormError />}
          <input
            type="submit"
            value="Cadastrar"
            className={`cursor-pointer  border-green-500 border mt-2 py-1 hover:bg-gray-900`}
          />
        </form>
      </div>
    </section>
  );
}

export default Register;
