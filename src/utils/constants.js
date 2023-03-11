const PROJECT_ID = "63ca393fc7b7f28ab286";
const ENDPOINT =
  process.env.NODE_ENV == "development"
    ? "https://appwrite.engexpert.in/v1"
    : "https://appwrite.engexpert.in/v1";
const EMAIL_FUNCTION_ID = "63d9f6fb5afb9ab72de6";
const TEST_CSV_LINK =
  "https://engapp-csvfile.s3.ap-south-1.amazonaws.com/user-format.csv";
const baseColor = "#f2c702"; //Main
const secondBase = "black";
const EMAIL_BODY = "Hello User, You have been registered to Engexpert!";
const EMAIL_SUBJECT = "Welcome to Engexpert";

export {
  PROJECT_ID,
  ENDPOINT,
  baseColor,
  secondBase,
  EMAIL_BODY,
  EMAIL_SUBJECT,
  EMAIL_FUNCTION_ID,
  TEST_CSV_LINK,
};
