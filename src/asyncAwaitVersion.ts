import https from "https";

function get(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        try {
          const json = JSON.parse(body);
          resolve(json);
        } catch (e: any) {
          reject(new Error("Invalid JSON: " + e.message));
        }
      });
    }).on("error", (err) => reject(err));
  });
}

const city = "Johannesburg";

async function main() {
  try {
    // 1. Get city coordinates
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
    const geoInfo = await get(geoUrl);
    const location = geoInfo.results[0];

    // 2. Fetch weather and news at the same time with Promise.all
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m`;
    const newsUrl = `https://dummyjson.com/posts?limit=3`;

    const [weatherData, newsData] = await Promise.all([get(weatherUrl), get(newsUrl)]);

    // 3. Print results
    console.log("=== Async/Await Result ===");
    console.log(`City: ${location.name}, ${location.country}`);
    console.log("Temperature:", weatherData.current.temperature_2m);
    console.log("Headlines:");
    newsData.posts.forEach((post: any, i: number) => {
      console.log(`${i + 1}. ${post.title}`);
    });

    // 4. Demonstrate Promise.race
    const raceWeather = get(weatherUrl).then(() => "Weather was faster");
    const raceNews = get(`${newsUrl}&limit=1`).then(() => "News was faster");
    const winner = await Promise.race([raceWeather, raceNews]);
    console.log("Fastest response:", winner);

  } catch (err: any) {
    console.error("Something went wrong:", err.message);
  }
}

main();