import { Tmessage } from "@/types/Types";
import { Axios, AxiosPromise, AxiosResponse } from "axios";
import api from "@/utils/api";

function useMessage() {
  async function storageMessage(
    message: Tmessage
  ): Promise<AxiosResponse | undefined> {
    if (!message.content || !message) {
      return;
    }
    try {
      const response = await api.post("/messages/create", message);
      return response;
    } catch (error: any) {
      console.log("deu ruim:", error);
      return;
    }
  }

  async function getListMessage(chattingToEmail: string) {
    const token = localStorage.getItem("token") || "";
    try {
      const response = await api.post(
        "/messages/listmessages",
        { chattingToEmail },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );
      return response.data.listMessages;
    } catch (error: any) {
      console.log("deu ruim:", error);
    }
  }

  return { storageMessage, getListMessage };
}

export default useMessage;
