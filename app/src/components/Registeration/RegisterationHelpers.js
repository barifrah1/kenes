import AsyncAjax from "../../AsyncAjax";
export const fetchingPhones = async (token) => {
  const res = await AsyncAjax.get("participant/phone", {}, token);
  const phones = res.map((row) => row.tel);
  return phones;
};

export const isPhoneInUse = async (phone) => {
  const res = await AsyncAjax.get(`participant/${phone}`, {});
  return res;
};

export const fecthingPrices = async () => {
  const res = await AsyncAjax.get("payment");
  return res;
};

export const getSadnaot = async (values) => {
  /*get all sadnaot by rang*/
  const result = await AsyncAjax.get("sadnaot?available=true");
  if (result.error) throw result.error;
  const rangs = calculateRounds(result);
  const newUserSadnaot = rearrangeSadnaotByRound(rangs);
  const newVal = {...values,userSadnaot:newUserSadnaot};
  const sadnaByrangs = [];
  for (let i = 1; i <= rangs.length; i++) {
    sadnaByrangs[i - 1] = result.filter((row) => row.rang == i);
  }
  return { newVal, sadnaByrangs };//userWithSadnaot, sadnaotByRounds
};

export const rearrangeSadnaotByRound = (rounds)=>{
    /*rearange results by round in order to save it by round in state*/
    const mapper = rounds.map((rang) => "f_rang" + rang);
    const newUserSadnaot = {};
    mapper.map((__,index) => {
      newUserSadnaot[mapper[index]] = "";
      return __});
    return newUserSadnaot
}

export const calculateRounds = (sadnaot)=>{
  return sadnaot.map((sadna) => sadna.rang).filter((value, index, self) => self.indexOf(value) === index)
  .sort();
}