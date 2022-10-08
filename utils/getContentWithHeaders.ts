import gatherResponse from "./gatherResponse";

export default async function getContentWithHeaders(
  url: RequestInfo,
  headers: Headers
) {
  const response = await fetch(url, { headers });
  return await gatherResponse(response);
}
