import React, { Component } from "react";
import * as Constants from "./Constants";
import Utils from "./Utils";

const AsyncAjax = async (route, data = {}) => {
  const res = await fetch(Utils.resolvePath() + "api/" + route, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(data),
  }).catch(console.error());
  const d = await res.json();
  return d;
};

export default AsyncAjax;
