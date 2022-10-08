import { AccessToken } from "../../../data/downloadtype";
import gatherResponse from "../../../utils/gatherResponse";
import fetch from "isomorphic-fetch";

export default async function fetchFormData(
  url: RequestInfo,
  data: AccessToken
) {
  const FormData = require("form-data");
  const formdata = new FormData();
  Object.entries(data)
    .filter(([k, _]) => data.hasOwnProperty(k))
    .forEach(([k, v]) => formdata.append(k, v));
  const requestOptions = {
    method: "POST",
    body: formdata,
  };
  const response = await fetch(url, requestOptions);
  return await gatherResponse(response);
}
