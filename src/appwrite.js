import { Client, Account, Databases, Functions, Storage } from "appwrite";
import { ENDPOINT, PROJECT_ID } from "./utils/constants";

const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);

const account = new Account(client);
const database = new Databases(client);
const functions = new Functions(client);
const storage = new Storage(client);

export { account, database, functions, storage };
