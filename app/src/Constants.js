const clientPort = 3000;
const serverPort = 7000;
const localhostPath = "http://localhost:" + clientPort + "/";
const prodPath = "https://klafim.mecreativenlp.com/";
const authDomain = "kenesklafim.us.auth0.com";
const authClientId = "u1BFPSsZrPpqPP3FaTFPBkV4Lwe2Qd80";
const redirectUri = "klafim.mecreativenlp.com";
module.exports = {
  CLIENT_PORT: clientPort,
  SERVER_PORT: serverPort,
  localhostPath: localhostPath,
  prodPath: prodPath,
  authDomain: authDomain,
  authClientId: authClientId,
  redirectUri: redirectUri,
};
