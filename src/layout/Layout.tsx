// import Footer from "@/pages/Footer";
// import Header from "../pages/Header";
// import { useContext } from "react";
// import { TstateTheme } from "@/types/Types";
// import { MyContext } from "@/context/MyContext";
import { useRef, useEffect, useContext } from "react";
import Navbar from "@/components/Navbar";
import { Context } from "@/context/MyContext";
import { TglobalUtils } from "@/types/Types";
import SideBar from "@/SideBar";
import Container from "@/components/Container";
import { Modal } from "@/components/Modal";

function Layout({ children }: any) {
  const bottomRef = useRef<HTMLElement | null>(null);
  const { socket } = useContext(Context) as TglobalUtils;

  return (
    <>
      <div className={` h-screen `}>
        <Navbar />
        {children}
        <Modal />
      </div>
    </>
  );
}

export default Layout;
