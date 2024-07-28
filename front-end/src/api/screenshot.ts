import { NextApiRequest, NextApiResponse } from "next";
const takeScreenshot = require("../../../../screenshot");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await takeScreenshot();
    res.status(200).json({ message: "Screenshot taken successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to take screenshot" });
  }
}
