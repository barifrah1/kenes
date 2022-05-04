import React, { useState } from "react";
import { Statistic, Typography } from "antd";
import moment from "moment";
import "./CounterDown.less";
const CounterDown = () => {
  const { Countdown } = Statistic;
  const { Text } = Typography;
  //moment("27/10/2021 08:00:00").milliseconds;
  const [target, __] = useState(moment("27/10/2022", "DD/MM/YYYY"));

  return (
    <>
      <Countdown
        className="countdown"
        //title="נותרו"
        value={target}
        format=" ss  mm   HH   DD"
        //format="DD ימים HH שעות mm דקות"
      />
      <Text className="units">ימים שעות דקות שניות</Text>
    </>
  );
};
export default CounterDown;
