// import styles from './Input.module.css'
import { Tinput } from "@/types/Types";

function Input({
  type,
  textLabel,
  name,
  placeholder,
  handleOnChange,
  value,
  multiple,
}: Tinput) {
  return (
    <div className={`flex flex-col mb-2 `}>
      <label htmlFor={name}>{textLabel}</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        title="" // Desativa o tooltip automático
        {...(multiple ? { multiple } : "")}
        className={` px-2 outline-none border-b-[1px] border-green-500 bg-black`}
      />
    </div>
  );
}

export default Input;
