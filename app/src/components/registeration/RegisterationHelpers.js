import Utils from "../../Utils";
import AsyncAjax from "../../AsyncAjax";
import Swal from "sweetalert2";

export const fetchingPhones = async () => {
  const res = await AsyncAjax.post("getAllPhones");
  const phones = res.map((row) => row.tel);
  return phones;
};

export const fecthingPrices = async () => {
  const res = await AsyncAjax.post("getPaymentOptions");
  return res;
};

export const getSadnaot = async (values) => {
  /*get all sadnaot by rang*/
  const result = await AsyncAjax.get("sadnaot");
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

export const handleSubmit = async (values, prices, setSubmitting) => {
  const userSadnaotParams = Object.values(values.userSadnaot).map((sad) => [
    sad,
    values["phone"],
  ]);
  let id = -1;
  /*first we get new id*/
  await fetch(Utils.resolvePath() + "api/getMaxId", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      id = res[0].id;
    });

  const newUserParams = [
    id,
    values["Fname"],
    values["Lname"],
    values["email"],
    values["city"],
    values["phone"],
    parseInt(values["photos"]),
    "code",
    parseInt(values["vegan"]),
    values["way"],
    values["nlplevel"],
  ];

  /*add user and his sadnaot ajax call*/
  /*const dataToSend = JSON.stringify({
      user: newUserParams,
      email: values["email"],
      sadnaot: [userSadnaotParams],
      takanon: [values["phone"], values["takanon"]],
    });
    const insertResult = await AsyncAjax("InsertUserAndSadnaot",dataToSend);*/
  await fetch(Utils.resolvePath() + "api/participant", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      user: newUserParams,
      email: values["email"],
      sadnaot: [userSadnaotParams],
      takanon: [values["phone"], values["takanon"]],
    }),
  })
    .then((result) => result.json())
    .then(async (result) => {
      /*build object to replace parameter in mail template*/
      const userSadnaot = result;
      const paymentLink = Utils.getActivePaymentLink(prices);
      const toReplace = Utils.buildReplacingObjectMail(
        values,
        paymentLink,
        userSadnaot
      );
      const res = await AsyncAjax.post("sendMail", {
        toReplace: toReplace,
      });
      console.log(res);
    })
    .catch(
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      async (error) => {
        console.log("error when fetching");
        await Swal.fire({
          title: "תהליך ההרשמה נכשל",
          text: "נסה שוב",
          icon: "error",
          customClass: {
            container: "my-swal",
          },
        });
        throw error;
      }
    );
  await Swal.fire({
    title: "הפרטים נקלטו!",
    text: "הפרטים נקלטו מיד תועבר לעמוד התשלום",
    icon: "success",
    customClass: {
      container: "my-swal",
    },
  });
  await alert(JSON.stringify(values, null, 2));
  await setSubmitting(false);
  const paymentUrlRow = await Utils.getActivePaymentLink(prices.clone());
  await window.location.replace(paymentUrlRow);
};
