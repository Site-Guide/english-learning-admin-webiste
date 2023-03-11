import { Query } from "appwrite";
import { database } from "../../appwrite";

const getCourses = async (setState) => {
  const response = await database.listDocuments("main", "courses", [
    Query.orderDesc("$createdAt"),
  ]);
  setState([...response.documents]);
};

const getContents = async (setState) => {
  const response = await database.listDocuments("main", "contents", [
    Query.orderDesc("$createdAt"),
  ]);
  setState([...response.documents]);
};

export { getCourses, getContents };
