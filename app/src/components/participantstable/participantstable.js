import React, { Component } from "react";
import { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "./bootstrap.min.css";
import "./react-bootstrap-table2.css";
import "./participantstable.css";
import moment from "moment";

function ParticipantsTable() {
  const [data, setData] = useState([{ id: 1, name: "yosi", price: 10 }]);
  const [cols, setCols] = useState([
    {
      dataField: "id",
      text: "#",
      sortable: true,
    },

    {
      dataField: "name",
      text: "שם",
      formatter: (cell, row) => row.Fname + " " + row.Lname,
    },
    {
      dataField: "category",
      text: "קטגוריה",
    },
    {
      dataField: "phone",
      text: "טלפון",
    },
    {
      dataField: "mail",
      text: "מייל",
    },
    {
      dataField: "sug",
      text: "סוג כרטיס",
    },
    {
      dataField: "reg_date",
      text: "תאריך הרשמה",
      formatter: (cell, row) => moment(cell).format("DD/MM/yyyy"),
    },
    {
      dataField: "payment",
      text: "תשלום",
    },
  ]);
  useEffect(() => {
    fetch("http://localhost:3000/api/getdata")
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

  return (
    <div className="tab">
      <BootstrapTable
        keyField="id"
        data={data}
        columns={cols}
        bootstrap4={true}
        headerClasses="headerRow"
        rowClasses="rows"
        striped
        bordered
        hover
      />
    </div>
  );
}
export default ParticipantsTable;
