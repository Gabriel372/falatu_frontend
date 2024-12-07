import Input from "./Input";
import { useState, useContext, useEffect } from "react";
import { Context } from "@/context/MyContext";
import { TglobalUtils, Tcontact, TcontactStoraged } from "@/types/Types";
import { IoCloseSharp } from "react-icons/io5";

function FormCreateContact() {
  const {
    socket,
    userLoged,
    contactList,
    setContactList,
    createContact,
    setModalStatus,
  } = useContext(Context) as TglobalUtils;
  const contactEmpty = { name: "", email: "", userId: userLoged._id };
  const [msgErro, setMsgErro] = useState("");
  const [contact, setContact] = useState(contactEmpty);
  // const [contact, setContact] = useState<Omit<Tcontact, "_id">>(contactEmpty);

  //   useEffect(() => {
  //     socket?.on("contact_added", (contact) => {
  //       setContact(contactEmpty);
  //     });

  //     socket?.on("error", (error) => {
  //       console.error(error.message);
  //     });

  //     // return () => {
  //     //   socket?.disconnect();
  //     // };
  //   }, [socket, userLoged]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (msgErro) {
      setMsgErro("");
    }
    setContact((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      userId: userLoged._id,
    }));
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!contact.name) {
      return setMsgErro("fillName");
    }
    if (!contact.email) {
      return setMsgErro("fillEmail");
    }
    const responseData = await createContact(contact);
    if (
      responseData?.response?.data?.message ==
      "email de contato ainda nao cadastrado"
    ) {
      setMsgErro("emailOfContactDontExists");
      return;
    }
    const newContact = responseData?.data?.newContact;
    if (newContact) {
      setContactList([...contactList, newContact]);
      setModalStatus({ item: "", modeOperation: "" });
    }
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`w-full max-w-96 flex flex-col `}
    >
      <div
        className=" btnCloseModal "
        onClick={() => setModalStatus({ item: "", modeOperation: "" })}
      >
        <IoCloseSharp className=" cursor-pointer " />
      </div>
      <form
        className={` w-full p-2 flex flex-col bg-gray-800 border-gray-800 border`}
        onSubmit={handleSubmit}
      >
        <Input
          textLabel="digite o nome"
          type="text"
          name="name"
          placeholder="nome"
          handleOnChange={handleChange}
          value={contact.name}
        />
        {msgErro === "fillName" && (
          <p className="text-red-700">Preencha o nome</p>
        )}
        <Input
          textLabel="digite o email"
          type="email"
          name="email"
          placeholder="email"
          handleOnChange={handleChange}
          value={contact.email}
        />{" "}
        {msgErro === "fillEmail" && (
          <p className="text-red-700">Preencha o email</p>
        )}
        {msgErro === "emailOfContactDontExists" && (
          <p className="text-red-700">
            Esse email de contato ainda não está cadastrado
          </p>
        )}
        <button className="cursor-pointer border-green-500 border mt-2 py-1 hover:bg-gray-900">
          Adicionar
        </button>
      </form>
    </div>
  );
}

export default FormCreateContact;
