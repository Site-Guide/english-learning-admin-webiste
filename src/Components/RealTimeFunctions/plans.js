import { Query } from "appwrite";
import { database } from "../../appwrite";

const getPlans = async (setState) => {
  const response = await database.listDocuments("main", "plans", [
    Query.orderDesc("$createdAt"),
  ]);

  setState([...response.documents]);
};

const getPurchases = async (setState) => {
  const response = await database.listDocuments("main", "purchases", [
    Query.orderDesc("$createdAt"),
  ]);

  setState([...response.documents]);
};

export { getPlans, getPurchases };
