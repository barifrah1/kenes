import React from "react";
import { Button } from "antd";
import { Modal } from "antd";
import useWindow from "../../../hooks/useWindow";
import Utils from "../../../Utils";
import "./Takanon.less";

const Takanon = (props) => {
  const { width } = useWindow();
  const open = props.open;
  const setOpen = props.setOpen;
  const prices = props.prices;

  return (
    <Modal
      visible={open}
      width={width <= 768 ? "100%" : "700px"}
      height={width <= 768 ? "100%" : "700px"}
      effect="fadeInUp"
      footer={null}
      onCancel={() => setOpen(false)}
      onClickAway={() => setOpen(false)}
    >
      <div className="takanon">
        {/* <div className="box">
          <a href="#" onClick={(e) => setOpen(false)}>
            X
          </a>
        </div> */}
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
          <li>עלות הכנס הרשמה מוקדמת : {prices.early["price"]} ש"ח</li>
          <li>
            עלות הכנס הרשמה מוקדמת במסלול זום: {prices.earlyzoom["price"]} ש"ח
          </li>
          <li>
            עלות הכנס לאחר סיום ההרשמה המוקדמת : {prices.regular["price"]} ש"ח
          </li>
          <li>
            עלות הכנס לאחר סיום ההרשמה המוקדמת במסלול זום:{" "}
            {prices.regularzoom["price"]} ש"ח
          </li>
          <li>
            עלות ביטול הרשמה לאדם במידה והתבצע תשלום : {prices.cancel["price"]}{" "}
            ש"ח{" "}
          </li>
          <li>
            <b>
              לא יוחזר תשלום על ביטולים שיחולו בטווח של פחות מ 7 ימים לפני הכנס
            </b>
          </li>
          <li>התשלום יוחזר דרך אמצעי התשלום איתו שילמתם </li>
          <li>
            <u> אישורי הרשמה יש לבדוק גם בתיבת הספאם</u>{" "}
          </li>
        </ul>
        <div className="button_wrapper">
          <Button className="gotit" size="large" onClick={() => setOpen(false)}>
            הבנתי
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Takanon;
