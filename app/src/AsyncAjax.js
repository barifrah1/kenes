import Utils from "./Utils";
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
};

const AsyncAjax = {
  get: async (route, data = {}, jwt = null) => {
    const customHeaders = { ...headers };
    if (jwt) customHeaders["Authorization"] = `Bearer ${jwt}`;
    const res = await fetch(Utils.resolvePath() + "api/" + route, {
      method: "get",
      headers: customHeaders,
    }).catch(console.error());
    const d = await res.json();
    return d;
  },
  post: async (route, data = {}, jwt = null) => {
    const res = await fetch(Utils.resolvePath() + "api/" + route, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    }).catch((e) => {
      console.error();
      throw e;
    });
    const d = await res.json();
    return d;
  },
  put: async (route, data = {}, jwt = null) => {
    const customHeaders = { ...headers };
    if (jwt) customHeaders["Authorization"] = `Bearer ${jwt}`;
    const res = await fetch(Utils.resolvePath() + "api/" + route, {
      method: "put",
      headers: customHeaders,
      body: JSON.stringify(data),
    }).catch((e) => {
      console.error();
      throw e;
    });
    const d = await res.json();
    return d;
  },
  delete: async (route, jwt = null) => {
    const customHeaders = { ...headers };
    if (jwt) customHeaders["Authorization"] = `Bearer ${jwt}`;
    const res = await fetch(Utils.resolvePath() + "api/" + route, {
      method: "delete",
      headers: customHeaders,
    }).catch(console.error());
    const d = await res.json();
    return d;
  },
};

export default AsyncAjax;
