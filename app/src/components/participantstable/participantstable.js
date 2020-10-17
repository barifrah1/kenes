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
import Modal from "react-awesome-modal";
import ExpandedDetails from "../expandeddetails/expandeddetails";
import EditForm from "../edit_form/edit_form";

const { SearchBar } = Search;

function ParticipantsTable() {
  const [editingModalInfo, setEditModalInfo] = useState({
    visible: false,
    row: [],
    rowIndex: -1,
  });
  let editModal_initialState = {
    visible: false,
    row: [],
    rowIndex: -1,
  };
  const [data, setData] = useState([{ id: 1, name: "yosi", price: 10 }]);
  const [cols, setCols] = useState([
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
      type: "bool",
      sort: true,
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
      text: "צמחוני",
      type: "string",
      sort: true,
      hidden: true,
      formatter: (cell, row) => (row.vegan === 1 ? "כן" : "לא"),
    },
    {
      dataField: "photos",
      text: "מעוניין להצטלם",
      type: "string",
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
  ]);

  const handleEdit = (newRow) => {
    let index = data.findIndex((el) => el.phone === newRow.phone);
    let newData = data;
    setData([]);
    newData[index] = newRow;
    //newData.push(newRow);
    //delete newData[index];
    //newData.push(newRow);
    /* Object.keys(newData[index]).map(
      (attr) => (newData[index][attr] = newRow[attr])
    );*/
    setData(newData);
  };

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

  const selectRow = {
    mode: "radio",
    selectColumnPosition: "left",
    clickToExpand: true,
    clickToSelect: false,
    onSelect: (row, isSelect, rowIndex, e) =>
      setEditModalInfo({ visible: true, row: row, rowIndex: rowIndex }),
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
              cellEdit={true}
              headerClasses="headerRow"
              rowClasses="rows"
              pagination={paginationFactory()}
              expandRow={expandRow}
              selectRow={selectRow}
              striped
              bordered
              hover
            />
          </div>
        )}
      </ToolkitProvider>
      <Modal
        visible={editingModalInfo.visible}
        width="700"
        height="700"
        effect="fadeInUp"
        onClickAway={() =>
          setEditModalInfo({ visible: false, row: [], rowIndex: -1 })
        }
      >
        <div>
          <EditForm
            rowData={editingModalInfo.row}
            closeModal={() => {
              setEditModalInfo(editModal_initialState);
              setData(data);
            }}
            handleEdit={handleEdit}
          />
        </div>
      </Modal>
    </div>
  );
}
export default ParticipantsTable;
