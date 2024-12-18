import { Inter } from "next/font/google";
import Input from "@/components/Input";
import { FormEvent, useState, useContext, ChangeEvent } from "react";
import { Context } from "@/context/MyContext";
import useAuth from "@/hooks/useAuth";
import MsgFormError from "@/components/MsgFormError";
import { TglobalUtils } from "@/types/Types";
import Link from "next/link";
import FalaTuText from "@/components/FalaTuText";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [interrupt, setInterrupt] = useState(false);
  const { setMsgError, msgError } = useContext(Context) as TglobalUtils;
  const { login } = useAuth();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (msgError) {
      setMsgError("");
    }
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user.email) {
      return setMsgError("emailEmpty");
    }
    if (!user.password) {
      return setMsgError("passwordEmpty");
    }
    setInterrupt(true);
    login(user);
    setInterrupt(false);
  }

  return (
    <section className="flex h-screen w-full flex-col items-center justify-center">
      <FalaTuText />
      <div className="  max-w-[22rem] w-full px-2">
        <h1 className={` text-2xl text-center py-4`}>Login</h1>
        <form onSubmit={handleSubmit} className={` flex flex-col w-full`}>
          <Input
            type="email"
            textLabel="Digite seu email"
            name="email"
            placeholder="seu email"
            handleOnChange={handleChange}
            value={user.email}
          />
          {msgError.includes("email") && <MsgFormError />}
          <Input
            type="password"
            textLabel="Digite sua senha"
            name="password"
            placeholder="sua senha"
            handleOnChange={handleChange}
            value={user.password}
          />
          {msgError.includes("password") && <MsgFormError />}
          <input
            type="submit"
            value={`${interrupt ? "Aguarde..." : "Entrar"}`}
            className={` cursor-pointer border-green-500 border mt-2 py-1 hover:bg-gray-900`}
          />
        </form>
        <p className=" py-4 text-center">Não é registrado ainda ?</p>
        <Link
          href="/Register"
          className="border-blue-500 border mt-2 py-1 hover:bg-gray-900 w-full flex justify-center"
        >
          Registrar
        </Link>
      </div>
    </section>
  );
}
