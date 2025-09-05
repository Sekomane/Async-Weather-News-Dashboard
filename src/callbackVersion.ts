import https from "https"; //to make https request

//it fetch data from the internet
function get(url: string, callback: (err: Error | null, data?: any) => void) {
    https.get(url, (res) => { //this will call the website
        let body = "";
        res.on("data", (chunk) => (body += chunk)); //when the website sends back pieces of information we collect them
        res.on("end", () => { //when the webiste finishes to send, we try to turn it to JSON 
            try {
                const json = JSON.parse(body);
                callback(null, json);
            } catch (e: any) {
                callback(new Error("Invalid JSON: " + e.message));
            }
        });
    }).on("error", (err) => callback(err));
}

//finding the city's coordinates
//the Pc does not understander 'JHB' so they use latitude and longitube so we uses the API to translate city to numbers
const city = "Johannesburg";
const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;

get(geoUrl, (geoErr, geoData) => {
    if (geoErr)
        return console.error("Geo error", geoErr.message);
    const location = geoData.results[0];
    const { latitude, longitude } = location;

    //finding the weather
    //we use latitude and logitude to ask the API about the temperature
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`;
    get(weatherUrl, (weatherErr, weatherData) => {
        if (weatherErr)
            return console.error("weather error:", weatherErr.message);

        const newsUrl = `https://dummyjson.com/posts?limit=3`;
        get(newsUrl, (newsErr, newsData) => {
            if (newsErr)
                return console.error("News error:", newsErr.message);

            //showing the feedback to the user
            console.log(`City: ${location.name}, ${location.country}`);
            console.log("Temperature:", weatherData.current.temperature_2m);
            console.log("Headlines:");
            newsData.posts.forEach((post: any, i: number) => {
                console.log(`${i + 1}. ${post.title}`);
            });
        });
    });
});

