import Input from "./Input";
import { useState } from "react";
import { ChangeEvent } from "react";

function UserForm() {
  const userEmpty = { name: "", email: "", password: "" };
  const [user, setUser] = useState(userEmpty);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  return (
    <form>
      {/* <Input
        type="text"
        text="Digite seu nome"
        name="name"
        placeholder="seu nome"
        handleOnChange={handleChange}
        value={user.name}
      />
      <Input
        type="text"
        text="Digite seu email"
        name="email"
        placeholder="seu email"
        handleOnChange={handleChange}
        value={user.email}
      />{" "}
      <Input
        type="text"
        text="Digite sua senha"
        name="password"
        placeholder="sua senha"
        handleOnChange={handleChange}
        value={user.password}
      /> */}
    </form>
  );
}

export default UserForm;
