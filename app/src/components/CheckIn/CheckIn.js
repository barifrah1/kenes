import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";
import AsyncAjax from "../../AsyncAjax";
import { Empty, Card, Pagination, Avatar, Skeleton, Input } from "antd";

import {
  CheckCircleOutlined,
  EllipsisOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
const { Meta } = Card;
const { Search } = Input;
import "./CheckIn.less";
const CheckIn = () => {
  const NUM_OF_CARDS_IN_PAGE = 8;
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchedValue, setSearchedValue] = useState("");
  const { getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    getAccessTokenSilently()
      .then(async (token) => {
        const res = await AsyncAjax.get("participant/", {}, token);
        setData(res);
      })
      .catch((error) => Swal.fire("שגיאה בטעינת המידע"));
  }, []);
  const onChange = (page) => {
    console.log("Dsds");
    setPage(page);
  };

  const cardStyle = {
    // padding: "1rem 2rem",
    border: "10px solid",
    "border-image-slice": "1",
    "border-width": "5px",
    "border-image-source":
      "linear-gradient(to right, #ee8425 0%, #f9488b 100%)",
    "text-align": "right",
    "border-radius": "5px",
    "box-shadow": "0 10px 20px rgb(255 254 254 / 10%)",
    width: "15vw",
    marginTop: 16,
  };
  const headStyle = { height: "40%", width: "100%" };

  return (
    <div className="page">
      <div className="search_container">
        {" "}
        <Search
          placeholder="input search text"
          allowClear
          onChange={(val) => setSearchedValue(val)}
          style={{ width: 200 }}
        />
      </div>
      <div className="all_cards">
        {data
          .filter((elem) => {
            const fullName = elem.Fname + " " + elem.Lname;
            return fullName.includes(searchedValue);
          })
          .map(
            (elem, index) =>
              index <= page * NUM_OF_CARDS_IN_PAGE &&
              index > (page - 1) * NUM_OF_CARDS_IN_PAGE && (
                <Card
                  key={index}
                  style={cardStyle}
                  actions={[
                    <CheckCircleOutlined key="checkin" />,
                    <InfoCircleOutlined key="setting" />,
                  ]}
                >
                  <Skeleton loading={data.length == 0} avatar active>
                    <Meta
                      avatar={
                        <Avatar src="https://joeschmoe.io/api/v1/random" />
                      }
                      title={elem.Fname + " " + elem.Lname}
                      description={
                        <>
                          <div className="category_part">{elem.category}</div>
                          <div className="id_part">{elem.id}</div>
                          <div className="payment_part">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 576 512"
                            >
                              <path d="M512 32C547.3 32 576 60.65 576 96V128H0V96C0 60.65 28.65 32 64 32H512zM576 416C576 451.3 547.3 480 512 480H64C28.65 480 0 451.3 0 416V224H576V416zM112 352C103.2 352 96 359.2 96 368C96 376.8 103.2 384 112 384H176C184.8 384 192 376.8 192 368C192 359.2 184.8 352 176 352H112zM240 384H368C376.8 384 384 376.8 384 368C384 359.2 376.8 352 368 352H240C231.2 352 224 359.2 224 368C224 376.8 231.2 384 240 384z" />
                            </svg>
                          </div>
                        </>
                      }
                    />
                  </Skeleton>
                </Card>
              )
          )}
      </div>
      <div className="pagination_container">
        <Pagination
          current={page}
          defaultPageSize={NUM_OF_CARDS_IN_PAGE}
          total={data.length}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default CheckIn;
