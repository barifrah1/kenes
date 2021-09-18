import React, { Component } from "react";
import * as Constants from "./Constants";
import Utils from "./Utils";
const AsyncAjax = {
  get: async (route, data = {}) => {
    const res = await fetch(Utils.resolvePath() + "api/" + route, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
    }).catch(console.error());
    const d = await res.json();
    return d;
  },
  post: async (route, data = {}) => {
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
  },
  put: async (route, data = {}) => {
    const res = await fetch(Utils.resolvePath() + "api/" + route, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    }).catch(console.error());
    const d = await res.json();
    return d;
  },
  delete: async (route, data = {}) => {
    const res = await fetch(Utils.resolvePath() + "api/" + route, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
    }).catch(console.error());
    const d = await res.json();
    return d;
  },
};

export default AsyncAjax;
