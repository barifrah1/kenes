const clientPort = 3000;
const serverPort = 7000;
const localhostPath = "http://localhost:" + clientPort + "/";
const prodPath = "https://klafim.mecreativenlp.com/";
const authDomain = "kenesklafim.us.auth0.com";
const authClientId = "u1BFPSsZrPpqPP3FaTFPBkV4Lwe2Qd80";
const redirectUri = "klafim.mecreativenlp.com";
const kenesDate = "20/10/2021";
const helpMail = "nlpmiri@gmail.com";
const nlpLevelOptions = [
  { value: "Student", label: "Student" },
  { value: "NLP Practitioner", label: "NLP Practitioner" },
  { value: "NLP Master", label: "NLP Master" },
  { value: "NLP Trainer", label: "NLP Trainer" },
  { value: "NLP Master Trainer", label: "NLP Master Trainer" },
];
module.exports = {
  CLIENT_PORT: clientPort,
  SERVER_PORT: serverPort,
  localhostPath: localhostPath,
  prodPath: prodPath,
  authDomain: authDomain,
  authClientId: authClientId,
  redirectUri: redirectUri,
  kenesDate,
  helpMail,
  nlpLevelOptions,
};
