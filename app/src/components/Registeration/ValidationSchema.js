import * as Yup from "yup";
import { isPhoneInUse } from "./RegisterationHelpers";
import "yup-phone";
import { string } from "yup";
export const ValidationSchema = Yup.object().shape({
  Fname: Yup.string().required("שדה חובה"),
  Lname: Yup.string().required("שדה חובה"),
  // nlplevel: Yup.string().required("לא נבחרה רמת נ.ל.פ"),
  email: Yup.string().email("אימייל לא תקין").required("אימייל לא תקין"),
  phone: Yup.string()
    .phone("IL")
    .required("טלפון לא תקין - שימוש בספרות בלבד")
    .test("primaryKey", "מישהו אחר נרשם כבר עם מספר זה", (value) => {
      if (value) {
        return isPhoneInUse(value).then((result) => !result);
      } else return false;
    }),
  city: Yup.string().required("יישוב לא תקין"),
  userSadnaot: Yup.object().shape({
    f_rang1: Yup.string().required("לא נבחרה סדנה"),
    f_rang2: Yup.string().required("לא נבחרה סדנה"),
    f_rang3: Yup.string().required("לא נבחרה סדנה"),
  }),
  gift: Yup.string().required("לא נבחרה מתנה"),
  vegan: Yup.string().required("שדה חסר"),
  way: Yup.string().required("שדה חסר"),
  photos: Yup.string().required("שדה חסר"),
  takanon: Yup.number()
    .min(1, "לא אישרת את תנאי התקנון")
    .max(1, "לא אישרת את תנאי התקנון")
    .required("לא אישרת את תנאי התקנון"),
});

export const ValidationSchemaEdit = Yup.object().shape({
  Fname: Yup.string().required("שדה חובה"),
  Lname: Yup.string().required("שדה חובה"),
  // nlplevel: Yup.string().required("לא נבחרה רמת נ.ל.פ"),
  category: Yup.string().required("קטגוריה לא תקינה"),
  email: Yup.string().email("אימייל לא תקין").required("אימייל לא תקין"),
  phone: Yup.string().phone("IL").required("טלפון לא תקין - שימוש בספרות בלבד"),
  city: Yup.string().required("יישוב לא תקין"),
  userSadnaot: Yup.object().shape({
    f_rang1: Yup.string().required("לא נבחרה סדנה"),
    f_rang2: Yup.string().required("לא נבחרה סדנה"),
    f_rang3: Yup.string().required("לא נבחרה סדנה"),
  }),
  gift: Yup.string().required("לא נבחרה מתנה"),
  vegan: Yup.string().required("שדה חסר"),
  way: Yup.string().required("שדה חסר"),
  photos: Yup.string().required("שדה חסר"),
  takanon: Yup.number()
    .min(1, "לא אישרת את תנאי התקנון")
    .max(1, "לא אישרת את תנאי התקנון")
    .required("לא אישרת את תנאי התקנון"),
  sum: Yup.string().required("שדה חסר"),
  inv: Yup.string().required("שדה חסר"),
});

//export default ValidationSchema;
