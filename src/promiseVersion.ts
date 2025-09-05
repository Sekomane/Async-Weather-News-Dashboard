import https from "https";

// Turn our old "get" function into a Promise version
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

// ----------------
// Main logic
// ----------------
const city = "Johannesburg";
const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;

get(geoUrl)
  .then((geoData) => {
    const location = geoData.results[0];
    const { latitude, longitude } = location;

    const weather = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`;
    const news =`https://dummyjson.com/posts?limit=3`; 

    return Promise.all([get(weather), get(news)]).then(([weatherInfo, newsInfo]) =>({
      location,
      weatherInfo,
      newsInfo,
    }));
  })

  //Chain Promise
  .then(({ location, weatherInfo, newsInfo }) => {
    console.log(`City: ${location.name}, ${location.country}`);
    console.log("Temperature:", weatherInfo.current.temperature_2m);
    console.log("Headlines:");
    newsInfo.posts.forEach((post: any, i: number) => {
      console.log(`${i + 1}. ${post.title}`);
    });
    //Promise race
    const PromiseRaceWeather = get(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m`)
     .then(() => "it was not bad");
    const raceNews = get("https://dummyjson.com/posts?limit=1").then(() => "News was okay");

    return Promise.race([PromiseRaceWeather, raceNews]);
  })
  .then((winner) =>{
    console.log("Quacker:", winner);
  })
  .catch((err) => {
    console.error("Something went wrong:", err.message);
  });
