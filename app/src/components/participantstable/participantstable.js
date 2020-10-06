import React, { Component } from "react";
import { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "./bootstrap.min.css";
import "./react-bootstrap-table2.css";
import "./react-bootstrap-table2-paginator.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import "./participantstable.css";
import moment from "moment";
import Expanded from "../expanded/expanded";

const { SearchBar } = Search;

function ParticipantsTable() {
  const [data, setData] = useState([{ id: 1, name: "yosi", price: 10 }]);
  const [cols, setCols] = useState([
    {
      dataField: "id",
      text: "#",
      type: "number",
      sort: true,
      style: { "white-space": "nowrap" },
    },

    {
      dataField: "name",
      text: "שם",
      type: "string",
      sort: true,
      formatter: (cell, row) => row.Fname + " " + row.Lname,
      style: { "white-space": "nowrap" },
    },
    {
      dataField: "category",
      text: "קטגוריה",
      type: "string",
      sort: true,
      style: { "white-space": "nowrap" },
    },
    {
      dataField: "phone",
      text: "טלפון",
      type: "string",
      sort: true,
      style: { "white-space": "nowrap" },
    },
    {
      dataField: "mail",
      text: "מייל",
      type: "string",
      sort: true,
      style: { "white-space": "nowrap" },
    },
    {
      dataField: "sug",
      text: "סוג כרטיס",
      type: "number",
      sort: true,
      style: { "white-space": "nowrap" },
    },
    {
      dataField: "reg_date",
      text: "תאריך הרשמה",
      type: "date",
      sort: true,
      formatter: (cell, row) => moment(cell).format("DD/MM/yyyy"),
      style: { "white-space": "nowrap" },
    },
    {
      dataField: "payment",
      text: "תשלום",
      type: "bool",
      sort: true,
      style: { "white-space": "nowrap" },
    },
    {
      dataField: "city",
      text: "יישוב",
      type: "string",
      sort: true,
      hidden: true,
      style: { "white-space": "nowrap" },
    },
    {
      dataField: "vegan",
      text: "צמחוני",
      type: "string",
      sort: true,
      hidden: true,
      style: { "white-space": "nowrap" },
    },
    {
      dataField: "way",
      text: "דרך הגעה",
      type: "string",
      sort: true,
      hidden: true,
      style: { "white-space": "nowrap" },
    },
    {
      dataField: "inv",
      text: "חשבונית",
      type: "number",
      sort: true,
      hidden: true,
      style: { "white-space": "nowrap" },
    },
  ]);
  useEffect(() => {
    fetch("http://localhost:3000/api/getdata", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setData(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log("error when fetching");
        }
      );
  }, []);

  const expandRow = {
    renderer: (row) => <Expanded row={row} cols={cols} />,
  };

  return (
    <div className="tab">
      <ToolkitProvider
        keyField="id"
        data={data}
        columns={cols}
        search={{ searchFormatted: true }}
      >
        {(props) => (
          <div>
            <SearchBar
              {...props.searchProps}
              placeholder="חיפוש"
              className="searching"
            />
            <hr />
            <BootstrapTable
              {...props.baseProps}
              keyField="id"
              data={data}
              columns={cols}
              bootstrap4={true}
              headerClasses="headerRow"
              rowClasses="rows"
              pagination={paginationFactory()}
              expandRow={expandRow}
              striped
              bordered
              hover
            />
          </div>
        )}
      </ToolkitProvider>
    </div>
  );
}
export default ParticipantsTable;
