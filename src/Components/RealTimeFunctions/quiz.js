import { Query } from "appwrite";
import { database } from "../../appwrite";

const getQuiz = async (setState) => {
  const response = await database.listDocuments("main", "quiz_questions");
  console.log(response);

  const sorted = response.documents.sort(function (a, b) {
    return a.index - b.index;
  });
  setState([...sorted]);
};

export { getQuiz };
