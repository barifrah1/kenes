import React from "react";
import moment from "moment";
import { Type } from "react-bootstrap-table2-editor";

const TableColumns = [
  {
    dataField: "id",
    text: "#",
    type: "number",
    sort: true,
  },

  {
    dataField: "name",
    text: "שם",
    type: "string",
    sort: true,
    formatter: (cell, row) => row.Fname + " " + row.Lname,
  },
  {
    dataField: "category",
    text: "קטגוריה",
    type: "string",
    sort: true,
  },
  {
    dataField: "phone",
    text: "טלפון",
    type: "string",
    sort: true,
  },
  {
    dataField: "email",
    text: "מייל",
    type: "string",
    sort: true,
  },
  {
    dataField: "sug",
    text: "סוג כרטיס",
    type: "number",
    sort: true,
  },
  {
    dataField: "reg_date",
    text: "תאריך הרשמה",
    type: "date",
    sort: true,
    formatter: (cell, row) => moment(cell).format("DD/MM/yyyy"),
  },
  {
    dataField: "payment",
    text: "תשלום",
    type: "number",
    sort: true,
    editable: true,
    editor: {
      type: Type.CHECKBOX,
      value: "1:0",
    },
  },
  {
    dataField: "city",
    text: "יישוב",
    type: "string",
    sort: true,
    hidden: true,
  },
  {
    dataField: "vegan",
    text: "מסלול",
    type: "bool",
    sort: true,
    hidden: true,
    formatter: (cell, row) => (row.vegan === 1 ? "פרונטלי" : "זום"),
  },
  {
    dataField: "photos",
    text: "מעוניין להצטלם",
    type: "bool",
    sort: true,
    hidden: true,
    formatter: (cell, row) => (row.photos === 1 ? "כן" : "לא"),
  },
  {
    dataField: "way",
    text: "דרך הגעה",
    type: "string",
    sort: true,
    hidden: true,
  },
  {
    dataField: "inv",
    text: "חשבונית",
    type: "number",
    sort: true,
    hidden: true,
  },
  {
    dataField: "cardcom_inv",
    text: "קארדקום - חשבונית",
    type: "number",
    sort: true,
    hidden: true,
  },
  {
    dataField: "sum",
    text: "סכום ששולם",
    type: "number",
    sort: true,
    hidden: true,
  },
  {
    dataField: "cardcom_payment",
    text: "קארדקום - תשלום",
    type: "number",
    sort: true,
    hidden: true,
  },
];

export default TableColumns;
