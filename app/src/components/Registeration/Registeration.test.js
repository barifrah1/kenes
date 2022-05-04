import React from "react";
import { cleanup, render } from "@testing-library/react";
import {calculateRounds, getSadnaot, rearrangeSadnaotByRound} from './RegisterationHelpers';
import AsyncAjax from '../../AsyncAjax';
import {sadnaotMocks} from "./__mocks__/sadnaot";
import { koaJwtSecret } from "jwks-rsa";
describe("Tests for rearrangeSadnaotByRound",()=>{
  test("simple case",()=>{
    const rounds = [1,2,3]
    const expectedResult = {"f_rang1":"","f_rang2":"","f_rang3":""};
    expect(rearrangeSadnaotByRound(rounds)).toStrictEqual(expectedResult);
  });
  test("simple case2",()=>{
    const rounds = [1,2]
    const expectedResult = {"f_rang1":"","f_rang2":""};
    expect(rearrangeSadnaotByRound(rounds)).toStrictEqual(expectedResult);
  });
  test("simple case3",()=>{
    const rounds = []
    const expectedResult = {};
    expect(rearrangeSadnaotByRound(rounds)).toStrictEqual(expectedResult);
  });

})

describe("Tests for calculate round",()=>{ 
  test("simple case",()=>{
    expect(calculateRounds(sadnaotMocks["case1"])).toStrictEqual([1,2,3])
  })
  test("simple case2",()=>{
    expect(calculateRounds(sadnaotMocks["case2"])).toStrictEqual([1])
  })
  test("simple case3",()=>{
    expect(calculateRounds(sadnaotMocks["case3"])).toStrictEqual([1,2])
  })
})

describe("Testing getSadnaot",()=>{

  beforeEach(()=>  jest.spyOn(AsyncAjax,"get").mockImplementation(()=> Promise.resolve(sadnaotMocks["case1"])));
  afterEach(()=>cleanup());

  const initialValues = {
    Fname: "",
    Lname: "",
    category: "",
    nlplevel: "",
    email: "",
    phone: "",
    city: "",
    vegan: "",
    way: "",
    photos: "1",
    takanon: "0",
    userSadnaot: {},
  }

  test("test case 1",async()=>{
    const expectedNewVal = {
      Fname: "",
      Lname: "",
      category: "",
      nlplevel: "",
      email: "",
      phone: "",
      city: "",
      vegan: "",
      way: "",
      photos: "1",
      takanon: "0",
      userSadnaot: {"f_rang1":"","f_rang2":"","f_rang3":""}
    }
    const expectedSadnaotByRounds = 
    [[{"id":103,"rang":1,"descr":"NEURO-SCAPING- בילהה פלג  - חדר 208 - קומה 2"},{"id":101,"rang":1,"descr":"אורגד מירון - יעוד - הרמה שמעבר לשינוי - חדר 207 - קומה 2"},
    {"id":120,"rang":1,"descr":"לא משתתף - ללא מיקום"},
    {"id":105,"rang":1,"descr":"ד\"ר חנה זידנברג - כעס וכאב במעגל סגור- סדנה לניהול כעסים  - אולם כינוס - קומה 3"}],
    [{"id":109,"rang":2,"descr":"ד\"ר גלית קליגר - הזמנה לרפרם-ממלחמה עצמית לחמלה עצמית  - חדר 207 - קומה 2"},
    {"id":112,"rang":2,"descr":"אפרת מעיין - הזמנה למסיבת תה של השדונים  - חדר 212 - קומה 2"},
    {"id":107,"rang":2,"descr":"אוריה בק- תכנות התת מודע לשליטה מהירה בכאבים וברגשות   - חדר 210 - קומה 2"},
    {"id":121,"rang":2,"descr":"לא משתתף - ללא מיקום"},
    {"id":106,"rang":2,"descr":"מיקי ברקל - להכיר את הטבעות הזהות שמנהלות את חיינו  - אולם כינוס - קומה 3"}],
    [    {"id":119,"rang":3,"descr":"אירה גלאובך -נוירוגרפיקה דרך מודל איסוף מידע SCORE - חדר 208 - קומה 2"},
    {"id":116,"rang":3,"descr":"יעל זרעוני- דיאלוג בין קטבים- הכוחות ההפוכים באדם, בשיטת נלפ-גשטאלט  - חדר 210 - קומה 2"},
    {"id":122,"rang":3,"descr":"לא משתתף - ללא מיקום"},
    {"id":113,"rang":3,"descr":"    גל צחייק-איך ליצור עסק מצליח בתחום נ.ל.פ - אולם כינוס - קומה 3"}]]
    expect(await getSadnaot(initialValues)).toStrictEqual({"newVal":expectedNewVal,"sadnaByrangs":expectedSadnaotByRounds});
  })
})