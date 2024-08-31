import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { waypoints } = req.body;

  const apiKey = process.env.GOOGLE_API_KEY;

  const origin = waypoints[0];
  const destination = waypoints[waypoints.length - 1];
  const waypointsString = waypoints.slice(1, -1).join('|');

  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&waypoints=optimize:true|${waypointsString}&key=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();
  res.status(200).json(data);
}