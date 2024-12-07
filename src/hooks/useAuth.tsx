import api from "../utils/api";
import { useState, useEffect, use } from "react";
import { useContext } from "react";
import { Tuser, TresponseAxios, TglobalUtils } from "@/types/Types";
import { useRouter } from "next/router";
import { Context } from "@/context/MyContext";
import { Axios, AxiosError, AxiosPromise } from "axios";
import io from "socket.io-client";
import { Socket } from "dgram";

export default function useAuth() {
  const context = useContext<TglobalUtils | undefined>(Context);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  async function checkUserByToken(token: string) {
    api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    context?.setAuthenticated(true);
    try {
      const response = await api.get("/users/checkuserbytoken");
      const user = response.data;
      context?.setUserLoged(user);
      login(user);
    } catch (error) {
      console.error("Error fetching user by token:", error);
    }
    setLoading(false);
  }

  async function login(userData: Omit<Tuser, "name">) {
    try {
      if (!userData?.password) {
        authUser(userData);
        return;
      }
      const response: any = await api.post("/users/login", userData);
      const { message, token, user } = response?.data;
      localStorage.setItem("token", JSON.stringify(token));
      authUser(user);
    } catch (error: any) {
      const errorMessage = error.response?.data.message;
      if (errorMessage === "email nao cadastrado") {
        context?.setMsgError("emailNotRegistered");
      }
      if (errorMessage === "senha invalida") {
        context?.setMsgError("passwordInvalid");
      }
    }
  }

  function authUser(user: any) {
    context?.setAuthenticated(true);
    const { name, email, _id } = user;
    const userData = { name: user.name, email: user.email, _id };
    context?.setUserLoged(userData);
    const socket = context?.startSocket(user.email);
    socket && context?.setSocket(socket);
    router.push("/Dashboard");
  }

  async function register(userData: Tuser) {
    try {
      const response: any = await api.post("/users/register", userData);
      const { message, token, user } = response?.data;
      localStorage.setItem("token", JSON.stringify(token));
      authUser(user);
    } catch (error: any) {
      if (error.response?.data.message === "email ja existe") {
        context?.setMsgError("emailRegistAlreadyExist");
      }
    }
  }

  function logout() {
    context?.setUserLoged({ name: "", email: "", _id: "" });
    localStorage.removeItem("token");
    delete api.defaults.headers.Authorization;
    router.push("/");
    context?.setAuthenticated(false);
  }

  return { logout, login, register, checkUserByToken, setLoading };
}
