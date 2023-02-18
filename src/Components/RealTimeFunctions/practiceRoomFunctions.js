import { database } from "../../appwrite";
import { Query } from "appwrite";

export const getFAQs = async (setState) => {
  const response = await database.listDocuments("main", "faqs", [
    Query.orderDesc("$createdAt"),
  ]);
  setState([...response.documents]);
};

export const getTopicList = async (setState) => {
  const response = await database.listDocuments("main", "topics", [
    Query.orderDesc("$createdAt"),
  ]);
  setState([...response.documents]);
};
