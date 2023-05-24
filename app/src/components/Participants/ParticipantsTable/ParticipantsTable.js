import React from "react";
import { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "./bootstrap.min.css";
import "./react-bootstrap-table2.css";
import "./react-bootstrap-table2-paginator.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import cellEditFactory from "react-bootstrap-table2-editor";
import "./Participantstable.less";
import Expanded from "./Expanded/Expanded";
import Swal from "sweetalert2";
import LogoutButton from "../../Login/LogoutButton/LogoutButton";
import TableColumns from "./TableColumns";
import ArrTableColumns from "./ArrTableColumns";
import { useAuth0 } from "@auth0/auth0-react";
import AsyncAjax from "../../../AsyncAjax";
import Registeration from "../../Registeration/Registeration";
import GetRegCount from "./GetRegCount";

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
  const [Arrdata, setArrData] = useState([]);

  /*table's columns definition*/
  const [cols, setCols] = useState(TableColumns);
  const { getAccessTokenSilently } = useAuth0();
  const handleEdit = (newRow) => {
    const index = data.findIndex((el) => el.id === newRow.id);
    const newData = data.splice(index, 1, newRow);
    setData(newData);
  };

  useEffect(() => {
    setCols(TableColumns);
    getAccessTokenSilently()
      .then(async (token) => {
        const res = await AsyncAjax.get("participant/", {}, token);
        setData(res);
      })
      .catch((error) => console.log(error));
  }, []);

  /*Adding new arrival table for people that arrived in kenes day */
  /*table's columns definition*/
  const [Arrcols, setArrCols] = useState(ArrTableColumns);
  //const { ArrgetAccessTokenSilently } = useAuth0();

  useEffect(() => {
    setArrCols(ArrTableColumns);
    getAccessTokenSilently()
      .then(async (token) => {
     /*   const res = await AsyncAjax.get("register/", {}, token);*/
        const res = await AsyncAjax.get("participant/register", {}, token);

        setArrData(res);
      })
      .catch((error) => console.log(error));
  }, []);


  /* updat payment function is called every time the user uses the option to update payment culomn from the table itself*/
  const updatePayment = async (_cellValue, _cellName, row) => {
    await Swal.fire({
      title: "האם את/ה בטוח/ה?",
      text: "האם את/ה בטוח/ה שברצונך לעדכן את פרטי התשלום?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "כן",
      cancelButtonText: "לא",
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          const token = await getAccessTokenSilently();
          const res = await AsyncAjax.put(
            `participant/${row["id"]}/payment`,
            { payment: row["payment"] },
            token
          );
          if (res)
            await Swal.fire({
              title: "תשלום עודכן בהצלחה!",
              text: "העדכון הושלם בהצלחה",
              icon: "success",
              customClass: {
                container: "my-swal",
              },
            });
        }
      })
      .catch((error) => {
        console.log("error when updating payment");
        throw error;
      });
  };


  const registerParticipant = async (row) => {
    const id = row.id; 
    const swalResult = await Swal.fire({
      title: "האם אתה בטוח שאתה רוצה לקלוט את המשתתף לכנס?",
      showDenyButton: true,
      confirmButtonText: "כן",
      denyButtonText: "לא",
      customClass: {
        container: "my-swal",
      },
    });
    if (swalResult.isConfirmed) {
      const token = await getAccessTokenSilently();
      const tokenString = JSON.stringify(token);
      const objectToServer = {
        id: row.id,
        parti_tel: row.phone, 
        parti_name: row.Fname + " " + row.Lname,
      };
      const res = await AsyncAjax.post(`participant/${id}/register`,objectToServer, tokenString);
      if (res) {
        await Swal.fire({
          title: "המשתתף נרשם  בהצלחה!",
          text: "אחל לו יום טוב ופורה",
          icon: "success",
          customClass: {
            container: "my-swal",
          },
        });
      } else {
          await Swal.fire({
            title: "משתתף לא נרשם ",
            text: "",
            icon: "error",
            customClass: {
            container: "my-swal",
          },
        });
      }
    }
  };

  const deleteParticipant = async (id) => {
    const swalResult = await Swal.fire({
      title: "האם אתה בטוח שאתה רוצה למחוק את המשתתף?",
      showDenyButton: true,
      confirmButtonText: "כן",
      denyButtonText: "לא",
      customClass: {
        container: "my-swal",
      },
    });
    if (swalResult.isConfirmed) {
      const token = await getAccessTokenSilently();
      const res = await AsyncAjax.delete(`participant/${id}`, token);
      if (res) {
        await Swal.fire({
          title: "המשתתף נמחק בהצלחה!",
          text: "רענן על מנת לצפות בשינויים",
          icon: "success",
          customClass: {
            container: "my-swal",
          },
        });
        const updatedData = data.filter((row) => row.id != id);
        setData(updatedData);
      } else {
        await Swal.fire({
          title: "מחיקת המשתתף נכשלה",
          text: "",
          icon: "error",
          customClass: {
            container: "my-swal",
          },
        });
      }
    }
  };



  const expandRow = {
    renderer: (row) => <Expanded row={row} cols={cols} deleteUser={deleteParticipant} checkinUser={() => registerParticipant(row)} />,
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
    <div className="participants_table">
      <ToolkitProvider
        keyField="id"
        data={data}
        columns={cols}
        search={{ searchFormatted: true }}
      >
        {(props) => (
          <div className="table_frame">
            <h1 className="title">רשימת הרשומים לכנס</h1>
            <div className="top_frame">
              <SearchBar
                {...props.searchProps}
                placeholder="חיפוש"
                className="searching_box"
              />
              <LogoutButton className="logout_button" />
            </div>
            <hr />
            <div className="bottom_frame">
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
                headerClasses="header_row"
                rowClasses="rows"
                pagination={paginationFactory()}
                expandRow={expandRow}
                selectRow={selectRow}
                striped
                bordered
                hover
              />
              </div>
            <div className="registered_frame">
               <GetRegCount  className="regCount_button" />
              <h2 className="btitle">רשימת הרשומים שהגיעו לכנס:</h2>
            </div>
            <div className="bottom_frame">
              <BootstrapTable
                {...props.baseProps}
                keyField="id"
                data={Arrdata}
                columns={Arrcols}
                bootstrap4={true}
                cellEdit={cellEditFactory({
                  mode: "dbclick",
                  blurToSave: true,
                  afterSaveCell: (cellValue, cellName, row) =>
                    updatePayment(cellValue, cellName, row),
                })}
                headerClasses="header_row"
                rowClasses="rows"
                pagination={paginationFactory()}
                striped
                bordered
                hover
              />
              </div>
          </div>
        )}
      </ToolkitProvider>
      <div>
        {editingModalInfo.visible && (
          <Registeration
            rowData={editingModalInfo.row}
            onClose={() => {
              setEditModalInfo({ ...editModal_initialState });
              setData(data);
            }}
            handleEdit={handleEdit}
          />
        )}
      </div>
    </div>
  );
}
export default ParticipantsTable;
