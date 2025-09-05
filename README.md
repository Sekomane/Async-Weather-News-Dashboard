#  Async Weather & News Dashboard

This project demonstrates **asynchronous programming** in Node.js + TypeScript by fetching **weather data** (from [Open-Meteo](https://open-meteo.com/)) and **news headlines** (from [DummyJSON](https://dummyjson.com/)).  

It showcases three different asynchronous styles:
-  **Callbacks**  
-  **Promises** (with `Promise.all` & `Promise.race`)  
-  **Async/Await** (with `try...catch`)  

---

##  Features
- Fetches **city coordinates** (latitude, longitude) from Open-Meteo Geocoding API  
- Fetches **current weather** (temperature °C) from Open-Meteo Forecast API  
- Fetches **sample news headlines** from DummyJSON Posts API  
- Implements the same app using:
  - Callbacks (`callbackVersion.ts`)
  - Promises (`promiseVersion.ts`)
  - Async/Await (`asyncAwaitVersion.ts`)
- Demonstrates:
  - `Promise.all()` → run weather + news at the same time  
  - `Promise.race()` → see which API responds first  
- Consistent error handling  

---

##  Setup & Installation

1. Clone this repo:
   ```bash
   git clone https://github.com/Sekomane/Async-Weather-News-Dashboard.git
   cd Async-Weather-News-Dashboard
   ```
2. Install dependencies:
   npm install

# How to Run
Run the Callback version:
- npm run callback
  
Run the Promise version:
- npm run promise
  
Run the Async/Await version:
- npm run async

