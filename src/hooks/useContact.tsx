import { Tcontact, TcontactStoraged, TresponseAxios } from "@/types/Types";
import api from "@/utils/api";
import { Axios, AxiosPromise, AxiosResponse } from "axios";

function useContact() {
  function returnToken() {
    let token = localStorage.getItem("token") || "";
    return token;
  }

  async function createContact(contact: Omit<Tcontact, "_id">): Promise<any> {
    const token = returnToken();
    try {
      const response = await api.post("/contacts/create", contact, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      return response;
    } catch (error: any) {
      return error;
    }
  }
  async function getAllContacts(token: string) {
    try {
      const response = await api.get("/contacts/allusercontacts", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      return response.data.contacts;
    } catch (error: any) {
      console.log("deu ruim:", error);
    }
  }

  async function deleteContact(contactId: string) {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    try {
      if (token) {
        const response = await api.delete(`/contacts/${contactId}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        });
        return response;
      }
    } catch (error) {
      console.log("deu ruim:", error);
    }
  }

  return { createContact, getAllContacts, deleteContact };
}
export default useContact;
