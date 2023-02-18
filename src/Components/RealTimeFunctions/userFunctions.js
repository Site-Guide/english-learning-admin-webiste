import { database } from "../../appwrite";
import { Query } from "appwrite";

export const getNonActiveUserList = async (setState) => {
  const response = await database.listDocuments("main", "razorpay_purchases", [
    Query.orderDesc("$createdAt"),
  ]);
  setState([...response.documents]);
};
