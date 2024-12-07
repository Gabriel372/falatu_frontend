import styles from "./Modal.module.css";
import React, { useContext } from "react";
import { Context } from "@/context/MyContext";
import { TglobalUtils } from "@/types/Types";
import FormCreateContact from "./FormCreateContact";
import DeleteItem from "../components/DeleteItem";
import { IoCloseSharp } from "react-icons/io5";

export function Modal() {
  const { modalStatus, setModalStatus } = useContext(Context) as TglobalUtils;

  return (
    <>
      {modalStatus.modeOperation && (
        <section
          className={`absolute top-0 left-0 bg-black bg-opacity-50 w-full h-full flex justify-center items-center z-10`}
          onClick={() =>
            setModalStatus((prev) => ({ ...prev, modeOperation: "" }))
          }
        >
          <div className=" flex flex-col w-full items-center">
            {modalStatus.modeOperation === "createContact" && (
              <FormCreateContact />
            )}

            {modalStatus.modeOperation.includes("delete") && <DeleteItem />}
          </div>
        </section>
      )}
    </>
  );
}
