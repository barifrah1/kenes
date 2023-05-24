import React from "react";
import moment from "moment";
import { Type } from "react-bootstrap-table2-editor";

const ArrTableColumns = [
  {
    dataField: "id",
    text: "#",
    type: "number",
    sort: true,
  },

  {
    dataField: "register",
    text: "הגיע לכנס",
    type: "number",
    sort: true,
  },
  {
    dataField: "parti_tel",
    text: "טלפון",
    type: "string",
    sort: true,
  },
  {
    dataField: "parti_name",
    text: "שם",
    type: "string",
    sort: true,
  },

];

export default ArrTableColumns;