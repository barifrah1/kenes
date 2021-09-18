import React, { Component } from "react";
import { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "./bootstrap.min.css";
import "./react-bootstrap-table2.css";
import "./react-bootstrap-table2-paginator.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import "./Participantstable.css";
import moment from "moment";
import Expanded from "./expanded/expanded";
import Modal from "react-awesome-modal";
//import ExpandedDetails from "./expanded/expandeddetails/expandeddetails";
import EditForm from "../../Registeration/EditForm/EditForm";
import Swal from "sweetalert2";
import Utils from "../../../Utils";
import LogoutButton from "../../LogoutButton/LogoutButton";
import TableColumns from "./TableColumns";
const { SearchBar } = Search;

function ParticipantsTable() {
  /*a use state hook that tells us if we are in edit mode or not and gives the data to edit form*/
  const [editingModalInfo, setEditModalInfo] = useState({
    visible: false,
    row: {},
    rowIndex: -1,
  });
  const editModal_initialState = {
    visible: false,
    row: {},
    rowIndex: -1,
  };
  const [data, setData] = useState([]);

  /*table's columns definition*/
  const [cols, setCols] = useState(TableColumns);

  const handleEdit = (newRow) => {
    let index = data.findIndex((el) => el.phone === newRow.phone);
    let newData = data;
    setData([]);
    newData[index] = newRow;
    setData(newData);
  };

  useEffect(() => {
    setCols(TableColumns);
    fetch(Utils.resolvePath() + "api/participants/", {
      method: "get",
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

  /* updat payment function is called every time the user uses the option to update payment culomn from the table itself*/
  const updatePayment = async (cellValue, cellName, row) => {
    await Swal.fire({
      title: "האם את/ה בטוח/ה?",
      text: "האם את/ה בטוח/ה שברצונך לעדכן את פרטי התשלום?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "כן",
      cancelButtonText: "לא",
    }).then((result) => {
      console.log(4);
      if (result.isConfirmed) {
        fetch(Utils.resolvePath() + "api/UpdatePayment", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: row["phone"],
            payment: row["payment"],
          }),
        })
          .then(
            (result) => {
              Swal.fire({
                title: "תשלום עודכן בהצלחה!",
                text: "העדכון הושלם בהצלחה",
                icon: "success",
                customClass: {
                  container: "my-swal",
                },
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              console.log("error when updating payment");
              throw error;
            }
          )
          .catch((error) => error);
        Swal.fire("העדכון הושלם בהצלחה!", "success");
      } else {
        let index = data.findIndex((el) => el.phone === row.phone);
        let d = [...data];
        d[index]["payment"] = cellValue;
        const newData = d;
        setData([]);
        setData(newData);
        Swal.fire({
          title: "השינוי בוטל בהצלחה",
          text: "השינוי בוטל בהצלחה!",
          icon: "success",
          customClass: {
            container: "my-swal",
          },
        });
      }
    });
  };

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
            <LogoutButton />
            <hr />
            <BootstrapTable
              {...props.baseProps}
              keyField="id"
              data={data}
              columns={cols}
              bootstrap4={true}
              cellEdit={cellEditFactory({
                mode: "dbclick",
                blurToSave: true,
                afterSaveCell: (cellValue, cellName, row) =>
                  updatePayment(cellValue, cellName, row),
              })}
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
          setEditModalInfo({ visible: false, row: {}, rowIndex: -1 })
        }
      >
        <div>
          {Object.keys(editingModalInfo.row) && (
            <EditForm
              rowData={editingModalInfo.row}
              closeModal={() => {
                setEditModalInfo(editModal_initialState);
                setData(data);
              }}
              handleEdit={handleEdit}
            />
          )}
        </div>
      </Modal>
    </div>
  );
}
export default ParticipantsTable;
