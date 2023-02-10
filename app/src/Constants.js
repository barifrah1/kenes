const clientPort = 3000;
const serverPort = 7000;
const localhostPath = "http://localhost:" + clientPort + "/";
const prodPath = "https://klafim.mecreativenlp.com/";
const authDomain = "kenesklafim.us.auth0.com";
const authClientId = "u1BFPSsZrPpqPP3FaTFPBkV4Lwe2Qd80";
const redirectUri = "klafim.mecreativenlp.com";
const facebookLink =
  "https://www.facebook.com/%D7%9B%D7%A0%D7%A1-%D7%A7%D7%9C%D7%A4%D7%99%D7%9D-%D7%91%D7%99%D7%A6%D7%99%D7%A8%D7%94-%D7%99%D7%A9%D7%A8%D7%90%D7%9C%D7%99%D7%AA-123753627695376";
const instgramLink = "https://www.instagram.com/nlpcreative/";
const nlpLevelOptions = [
  { value: "Student", label: "Student" },
  { value: "NLP Practitioner", label: "NLP Practitioner" },
  { value: "NLP Master", label: "NLP Master" },
  { value: "NLP Trainer", label: "NLP Trainer" },
  { value: "NLP Master Trainer", label: "NLP Master Trainer" },
];

/*options of category field*/
const categoryOptions = [
  { value: "משתתף", label: "משתתפ/ת" },
  { value: "מרצה", label: "מרצה" },
  { value: "צוות הפקה", label: "צוות הפקה" },
  { value: "עובד/ת בדוכן", label: "עובד/ת בדוכן" },
];

const formSteps = [
  {
    title: "פרטים אישיים",
    content: "השלם את הפרטים האישיים",
  },
  {
    title: "בחירת סדנאות",
    content: "בחר ממבחר הסדנאות שלנו...",
  },
  {
    title: "פרטים אחרונים ותשלום",
    content: "כמעט סיימנו",
  },
];
module.exports = {
  CLIENT_PORT: clientPort,
  SERVER_PORT: serverPort,
  localhostPath: localhostPath,
  prodPath: prodPath,
  authDomain: authDomain,
  authClientId: authClientId,
  redirectUri: redirectUri,
  nlpLevelOptions,
  categoryOptions,
  formSteps,
  facebookLink,
  instgramLink,
};
