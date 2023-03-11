import { Query } from "appwrite";
import { database } from "../../appwrite";

const getDiscussion = async (setState) => {
  const response = await database.listDocuments("main", "discussions", [
    Query.orderDesc("$createdAt"),
  ]);

  setState([...response.documents]);
};

export { getDiscussion };
