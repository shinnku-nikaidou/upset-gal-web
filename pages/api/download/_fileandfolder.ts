import PATH from "path";
import fs from "fs";
import { OauthDrive, DriveItemChildren, FrontItem } from "../../../data/downloadtype";
import query_one from "./_query";

export default async function fileandfolder(
  oauth_drive: OauthDrive,
  childs: DriveItemChildren,
  node: string,
  path: Array<string>
) {
  const child = childs.value.find(({ name }) => name == node);
  if (!child) {
    return undefined;
  }
  if (child.hasOwnProperty("folder")) {
    const child_childs = JSON.parse(
      fs.readFileSync(PATH.join(".config", ...path, node, "child.json"), {
        encoding: "utf8",
      })
    ) as DriveItemChildren;
    return getfolder(child_childs);
  } else if (child.hasOwnProperty("file")) {
    const body = await query_one(oauth_drive, child.id);
    const downloadUrl = (body as any)["@microsoft.graph.downloadUrl"]!;
    return downloadUrl;
  }
}

const sizeUnit = [
  ["B", Math.pow(2, 0)],
  ["KB", Math.pow(2, 10)],
  ["MB", Math.pow(2, 20)],
  ["GB", Math.pow(2, 30)],
  ["TB", Math.pow(2, 40)],
  ["PB", Math.pow(2, 50)],
  ["EB", Math.pow(2, 60)],
  ["ZB", Math.pow(2, 70)],
  ["YB", Math.pow(2, 80)],
];

function num2size(num: number): string {
  let size = num;
  let i = 0;
  for (; i < sizeUnit.length; ++i) {
    const t = num / (sizeUnit[i][1] as number);
    if (t > 1) size = t;
    else break;
  }
  return `${size.toFixed(2)} ${sizeUnit[i - 1][0]}`;
}

export function getfolder(childs: DriveItemChildren) {
  const frontItems: Array<FrontItem> = [];
  childs.value.forEach((child) =>
    frontItems.push({
      "@type": child.hasOwnProperty("folder") ? "folder" : "file",
      date: child.lastModifiedDateTime,
      name: child.name,
      size: num2size(child.size),
    })
  );
  return frontItems;
}