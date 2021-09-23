import Utils from "../../Utils";
import AsyncAjax from "../../AsyncAjax";
import Swal from "sweetalert2";

export const fetchingPhones = async (token) => {
  const res = await AsyncAjax.get("participants/phone", {}, token);
  const phones = res.map((row) => row.tel);
  return phones;
};

export const isPhoneInUse = async (phone) => {
  const res = await AsyncAjax.get(`participant/${phone}`, {});
  return res;
};

export const fecthingPrices = async () => {
  const res = await AsyncAjax.get("payments");
  return res;
};

export const getSadnaot = async (values) => {
  /*get all sadnaot by rang*/
  const result = await AsyncAjax.get("sadnaot?available=true");
  if (result.error) throw result.error;
  /*rearange results by rang in order to save it by rangs in state*/
  let rangs = result.map((sadna) => sadna.rang);
  rangs = rangs
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort();
  let mapper = rangs.map((rang) => "f_rang" + rang);
  let newUserSadnaot = {};
  for (let j = 0; j < rangs.length; j++) {
    newUserSadnaot[mapper[j]] = "";
  }
  let newVal = values;
  newVal.userSadnaot = newUserSadnaot;
  //setValues(newVal);
  let sadnaByrangs = [];
  for (let i = 1; i <= rangs.length; i++) {
    sadnaByrangs[i - 1] = result.filter((row) => row.rang == i);
  }
  //setSadnaot(sadnaByrangs);
  return { newVal, sadnaByrangs };
};
