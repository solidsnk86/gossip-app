export default async function GetLocation() {
  try {
    const api = {
      url: "https://geolocation.microlink.io",
    };
    const res = await fetch(api.url);
    const dataLocation = await res.json();

    if (!res.ok) {
      throw new Error("Failed to get data", res.statusText);
    }

    return dataLocation;
  } catch (err) {
    console.error("API limit", err);
  }
}
