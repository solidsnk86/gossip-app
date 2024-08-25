import { supabase } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, message, ip, city, url, country, flag } = req.body;

    const { data, error } = await supabase
      .from("gossip")
      .insert([{ title, message, ip, city, url, country, flag }]);

    if (error) {
      return res.status(500).json({
        error: "Error sending data to database",
        details: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Data sent correctly to database",
      data,
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
