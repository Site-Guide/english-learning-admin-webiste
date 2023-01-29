import { Client, Account, Databases } from "appwrite";
import { ENDPOINT, PROJECT_ID } from "./utils/constants";

const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);

const account = new Account(client);
const database = new Databases(client);

export { account, database };
