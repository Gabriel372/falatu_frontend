import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { useEffect, useContext, useState } from "react";
import { Context } from "@/context/MyContext";
import { Tauthenticated } from "@/types/Types";

function Navbar() {
  const { logout, checkUserByToken, setLoading } = useAuth();
  const [user, setUser] = useState({ email: "", password: "" });

  //   useEffect(() => {}, [authenticated]);
  const { authenticated } = useContext(Context) as Tauthenticated;

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token && token !== "undefined") {
  //     checkUserByToken(token);
  //   } else {
  //     setLoading(false);
  //     logout();
  //   }
  // }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token && token !== "undefined") {
        checkUserByToken(token);
      } else {
        setLoading(false);
        logout();
      }
    }
  }, []);

  return (
    <header className="border-b-[1px] hidden">
      <nav className=" flex justify-end w-full max-w-6xl m-auto py-5 px-1">
        {/* <button onClick={() => console.log("teste:", authenticated)}>
          teste
        </button> */}
        {/* <button onClick={() => setAuthenticated(!authenticated)}>
          alterar
        </button> */}
        {authenticated ? (
          <>
            <Link
              href="/Dashboard"
              className=" hover:border-b-black border-white border transition duration-200  ml-1 text-[1.1rem]"
            >
              dash
            </Link>
            <li
              onClick={logout}
              className=" hover:border-b-black border-white border transition duration-200  ml-1 text-[1.1rem] list-none cursor-pointer"
            >
              sair
            </li>
          </>
        ) : (
          <>
            <Link
              href="/"
              className=" hover:border-b-black border-white border transition duration-200  text-[1.1rem]"
            >
              login
            </Link>
            <Link
              href="/Register"
              className=" hover:border-b-black border-white border transition duration-200  ml-1 text-[1.1rem]"
            >
              register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
