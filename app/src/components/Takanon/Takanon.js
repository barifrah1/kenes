import React, { Component, useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-awesome-modal";
import useWindow from "../useWindow/useWindow";
import Utils from "../../Utils";
import "./Takanon.css";

const Takanon = (props) => {
  const [prices, setPrices] = useState({
    early: "",
    regular: "",
    cancel: "",
  });
  const { height, width } = useWindow();
  const open = props.open;
  const setOpen = props.setOpen;

  useEffect(() => {
    fecthingPrices();
    console.log(prices);
  }, []);

  const fecthingPrices = async () => {
    const data = {};
    await fetch(Utils.resolvePath() + "api/getPaymentOptions", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        res.map((row) => (data[row.name] = row.price));
        setPrices(data);
      });
  };

  return (
    <Modal
      visible={open}
      width={width <= 768 ? "100%" : "700"}
      height={width <= 768 ? "100%" : "700"}
      effect="fadeInUp"
      onClickAway={() => setOpen(false)}
    >
      <div className="takanon">
        <div className="box">
          <a href="#" onClick={(e) => setOpen(false)}>
            X
          </a>
        </div>
        <ul className="bolded">
          <li>
            {" "}
            לנרשמים עבור אדם אחד בלבד , בסיום מילוי הפרטים ובחירת הסדנאות והמתנה
            יש ללחוץ על כפתור הרשמה ומעבר לתשלום ולבצע את התשלום.{" "}
          </li>
          <br />
          <li>
            {" "}
            לנרשמים עבור יותר מאדם אחד יש לבצע את התשלום רק לאחר ההרשמה ובחירת
            סדנאות עבור כלל המשתתפים. בהרשמה האחרונה בהעברה לעמוד התשלום יש לבצע
            תשלום
          </li>
          <li>
            במידה וביצעתם הרשמה אך לא הועברתם לעמוד התשלום הרשמתכם לא נקלטה
            במערכת - יש ליצור קשר עם מירי 0544710112
          </li>
          <li>
            עלולים להיות שינויים בתכנית הכנס שאינם תלויים בצוות ההפקה של הכנס
          </li>
          <li>עלות הכנס הרשמה מוקדמת : {prices.early} ש"ח</li>
          <li>עלות הכנס לאחר סיום ההרשמה המוקדמת : {prices.regular} ש"ח</li>
          <li>
            עלות ביטול הרשמה לאדם במידה והתבצע תשלום : {prices.cancel} ש"ח{" "}
          </li>
          <li>
            <b>
              לא יוחזר תשלום על ביטולים שיחולו בטווח של פחות מ 7 ימים לפני הכנס
            </b>
          </li>
          <li>
            התשלום יוחזר דרך אמצעי התשלום איתו שילמתם(פייפאל/כרטיס אשראי){" "}
          </li>
          <li>
            <u> אישורי הרשמה יש לבדוק גם בתיבת הספאם</u>{" "}
          </li>
        </ul>
        <div className="button_wrapper">
          <Button
            className="gotit"
            variant="secondary"
            size="lg"
            onClick={() => setOpen(false)}
          >
            הבנתי
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Takanon;
