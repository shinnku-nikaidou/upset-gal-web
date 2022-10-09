export default async function gatherResponse(response: Response) {
    const { headers } = response;
    const contentType = headers.get("content-type")!;
    if (contentType.includes("application/json")) {
        return await response.json();
    } else if (
        contentType.includes("application/text") ||
        contentType.includes("text/html") ||
        true
    ) {
        return await response.text();
    }
}
