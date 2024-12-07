import { useContext } from "react";
import { Context } from "@/context/MyContext";
import { TglobalUtils } from "@/types/Types";
import useContact from "@/hooks/useContact";
import { IoCloseSharp } from "react-icons/io5";

function DeleteItem() {
  const {
    modalStatus,
    contactList,
    setModalStatus,
    setContactList,
    setChattingTo,
  } = useContext(Context) as TglobalUtils;
  const { deleteContact } = useContact();

  async function deleteItem() {
    const wasDeleted = await deleteContact(modalStatus.item);
    if (wasDeleted) {
      const listFiltred = contactList.filter(
        (item) => item?._id !== modalStatus?.item
      );
      setContactList(listFiltred);
      setChattingTo(listFiltred[0]);
      setModalStatus({ item: "", modeOperation: "" });
    }
  }

  return (
    <div
      className={`  max-w-62 flex flex-col`}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className={`mb-2 text-xl w-full justify-items-end content-end${
          modalStatus.modeOperation.includes("delete") ? "flex" : "hidden"
        }`}
        onClick={() => setModalStatus({ item: "", modeOperation: "" })}
      >
        <IoCloseSharp className=" cursor-pointer" />
      </div>

      <div className="bg-gray-800 border-gray-700 border flex flex-col p-3">
        Deseja deletar esse
        {modalStatus.modeOperation === "deleteContact"
          ? " contato ?"
          : "item ?"}
        <div className={` flex justify-around mt-1 `}>
          <button
            onClick={() =>
              setModalStatus({
                item: "",
                modeOperation: "",
              })
            }
            className={` px-7 border border-green-700 hover:bg-gray-700`}
          >
            Nao
          </button>
          <button
            onClick={deleteItem}
            className={` px-7 border border-green-700 hover:bg-gray-700`}
          >
            Sim
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteItem;
