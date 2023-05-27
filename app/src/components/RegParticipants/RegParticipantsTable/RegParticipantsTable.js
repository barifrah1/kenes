//import React from "react";
import React, { useRef } from "react";
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
import { error } from "winston";
import { Button, Tooltip } from "antd";

const { SearchBar } = Search;

function regParticipantsTable() {
  
  
  // Enable updates in registeration state  
  const [enUpdate, setenUpdate] = useState({});
   // Set the initial value of enUpdate
  useState(() => {
    setenUpdate({ en: true });
  }, []);
  
// Use this state to filter warrning notification when closing a row expand
  const [WarnningOn, setWarnningOn] = useState({});
  useState(() => {
    setWarnningOn({ en: false });
  }, []);
// Use this state to get indication that we handled participant regist..
  const [handleRegOn, sethandleRegOn] = useState({});
  useState(() => {
    sethandleRegOn({ en: false });
  }, []);

  useEffect(() => {
    fetchRowColors();
  }, []);

  // used for coloring registered users 
  const [rowColors, setRowColors] = useState({});

  useEffect(() => {
    fetchRowColors();
  }, []);
  
  // used for checking if user was register in the expand section 
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [clickedRowId, setClickedRowId] = useState(null);
  const handleButtonPress = (rowId) => {
    setClickedRowId(row.id);
    // Perform any additional actions related to the button press
  };


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
       // const slicedData = res.slice(0, 5); // Show only the first 10 rows
       // setData(slicedData);
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


  const registerParticipant = async (row,eid,set) => {
    // This function handle register participant or unregister it according to set input
    const id = row.id; 
    if (set&&enUpdate.en) {
          await Swal.fire({
            title: "האם אתה בטוח שאתה רוצה לקלוט את המשתתף לכנס?",
            showDenyButton: true,
            confirmButtonText: "כן",
            denyButtonText: "לא",
            customClass: {
              container: "my-swal",
            },
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              const objectToServer = {
                id: row.id,
                parti_tel: row.phone, 
                parti_name: row.Fname + " " + row.Lname,
              };
              sethandleRegOn(prevState => ({ ...prevState, en: true }));
              setWarnningOn(prevState => ({ ...prevState, en: false }));
              const token = await getAccessTokenSilently();
              const res = await AsyncAjax.post(`participant/registerP`,objectToServer, token)
              .then (async (res) => {
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
              })
            }
          })
          .catch((error) => {
            console.log("error when updating registeration");
            throw error;
          });
    }else if(!set&&enUpdate.en) {
      await Swal.fire({
        title: "האם אתה בטוח שאתה רוצה לבטל את רישום המשתתף בכנס?",
        showDenyButton: true,
        confirmButtonText: "כן",
        denyButtonText: "לא",
        customClass: {
          container: "my-swal",
        },
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const objectToServer = {
            id: row.id,
            parti_tel: row.phone, 
            parti_name: row.Fname + " " + row.Lname,
          };
          sethandleRegOn(prevState => ({ ...prevState, en: true }));
          setWarnningOn(prevState => ({ ...prevState, en: false }));
          const token = await getAccessTokenSilently();
          await AsyncAjax.put(`participant/${id}/UregisterP`,objectToServer, token)
          .then (async (res) => {
            if (res) {
              await Swal.fire({
                title: "ביטול הרשום למשתתף בוצע!",
                text: "אחל לו המשך יום טוב ופורה",
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
          })
        }
      })
      .catch((error) => {
        console.log("error when updating registeration");
        throw error;
      });
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

  // Fetch the row colors in advance and store them in a separate data structure


async function fetchRowColors() {
  try {
    let intValue = 0;
    getAccessTokenSilently()
    .then(async (token) => {
      const res = await AsyncAjax.get(`participant/registerS`, {}, token);
      if (res) {
        res.forEach(item => {
          const { id, register } = item;
          intValue = parseInt(register); // Convert the response to an integer
          // Store the color in the rowColors object using the 'id' as the key
          if (intValue==1){
            rowColors[id] ="green";
          } else {
            rowColors[id] ="white";
          }
        })
      }
    });
    setRowColors(rowColors);
  } catch (error) {
    console.error('Error fetching row colors:', error);
  }
}



// Define the rowStyle function
function determineRowColor(row) {
  const color = rowColors[row.id] || 'white'; // Get the color from the rowColors object
  return color;
}


 

  const expandRow = {
    renderer: (row) => <Expanded row={row} cols={cols} checkinUser={(id,set) => registerParticipant(row,id,set)} />,
  };

  const selectRow = {
    mode: "radio",
    selectColumnPosition: "left",
    clickToExpand: true,
    clickToSelect: false,
    onSelect: (row, isSelect, rowIndex, e) =>
      setEditModalInfo({ visible: true, row: row, rowIndex: rowIndex }),
  };

  
  const expandedRef = useRef(null);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    const handleCloseRow = (event) => {
      const isRowClick = event.target.tagName === "TD";
      if (isRowClick&&WarnningOn.en&&!handleRegOn.en){
        Swal.fire({
          title: "תזכורת האם רשמת את המשתתף?",
          text: "זה רק תזכורת אפשר להתעלם",
          icon: "warning",
          showCancelButton: false,
          confirmButtonText: "כן",
          cancelButtonText: "לא",
        }).then((result) => {
          if (result.isConfirmed) {
            // Handle closing the row here
            setWarnningOn(prevState => ({ ...prevState, en: false }));
          }
        });
      }
      if (isRowClick) {
        if (!handleRegOn.en)
        setWarnningOn(prevState => ({ ...prevState, en: true }));
        sethandleRegOn(prevState => ({ ...prevState, en: false }));
        console.log("Warning en:"+WarnningOn.en);      
      }
    };
    

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("click", handleCloseRow);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("click", handleCloseRow);
    };
  }, [WarnningOn,handleRegOn]);
  
  useEffect(() => {
    setIsButtonPressed(false);
  }, [editingModalInfo.visible]);

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
            <h1 className="title"> דף הרשמה ביום הכנס: רשימת הרשומים לכנס</h1>
            <div className="top_frame">
              <SearchBar
                {...props.searchProps}
                placeholder="חיפוש"
                className="searching_box"
              />
              <LogoutButton className="logout_button" />
            </div>
            <hr />
            <div ref={expandedRef} className="bottom_frame" >
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
                rowStyle={(row, rowIndex) => ({
                  backgroundColor: determineRowColor(row),
                })}
                onClick={(e, row) => {
                  // Handle button clicks inside the table row
                  if (e.target.tagName === "BUTTON") {
                    handleButtonPress(row.id);
                  }
                }}

              />
              </div>
            <div className="registered_frame">
               <GetRegCount  className="regCount_button" />
              <h2 className="btitle">רשימת הרשומים שהגיעו לכנס:</h2>
            </div>
            <div className="en_button">
              <Button
                  type="ghost"
                  shape="round"
                  className="E"
                  onClick={() => {                     
                          Swal.fire({
                            title: " מנע עידכונים ",
                            text: "",
                            icon: "info",
                            confirmButtonText: "OK",
                          });
                          setenUpdate({ en: false });
                  }}
              >
              Disable updates
              </Button>
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
export default regParticipantsTable;
