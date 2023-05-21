import leaf from './img/leaf 1.png';
import sun from './img/brightness.png';
import can from './img/watering-can.png';
import './App.css';
import React,{ useState, useRef, useEffect} from 'react';

import { initializeApp } from 'firebase/app';
import { useObjectVal } from 'react-firebase-hooks/database';
import { getDatabase, ref, set } from 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyAQg815KBuHMIlC4zFU8MP9RrF9QUUDORo",
  authDomain: "embedded-4affd.firebaseapp.com",
  databaseURL: "https://embedded-4affd-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "embedded-4affd",
  storageBucket: "embedded-4affd.appspot.com",
  messagingSenderId: "43755627940",
  appId: "1:43755627940:web:8c7930a34dab98c26c8d31",
  measurementId: "G-5LWT4CDGZ1"
};

const firebaseApp = initializeApp(firebaseConfig);
export const database = getDatabase(firebaseApp);

function useSensorData() {
  const [temperatureSensor, load_1] = useObjectVal(ref(database, 'temperature'));
  const [moistureSensor, load_2] = useObjectVal(ref(database, 'moisture'));
  const [lightSensor, load_3] = useObjectVal(ref(database, 'light'));
  const [watering, load_4] = useObjectVal(ref(database, 'isWatering'));
  const [lighting, load_5] = useObjectVal(ref(database, 'isLighting'));
  console.log("Get Data from Firebase " + Date().toString());
  var temperatureData = temperatureSensor;
  var moistureData = moistureSensor;
  var lightData = lightSensor;
  return {
    temperature: temperatureData,
    moisture: moistureData,
    light: lightData,
    watering: watering,
    lighting: lighting
  };
}

function App() {  
  const {temperature,moisture,light,watering,lighting} = useSensorData();
  function Watering(){
    set(ref(database, 'isWatering'),!watering);
  }
  function Lighting(){
    set(ref(database, 'isLighting'),!lighting);
  }

  return (
    <div className="App">
      <div class = "Name-title">
          <div style={{padding : "0 0 0 20px"}}>SMART <img src={leaf}  alt="leaf" /></div>
          <div>GREEN HOUSE</div>
      </div>
      <div class="flex-wrapper">
          <div class="single-chart">
            <svg viewBox="0 0 36 36" class="circular-chart orange">
              <path class="circle-bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path class="circle"
                stroke-dasharray={temperature+",100"}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x="18" y="15" class="sensorName">Temperature</text>
              <text x="18.5" y="23.35" class="percentage">{temperature}%</text>
            </svg>
          </div>
          

          <div class="single-chart">
            <svg viewBox="0 0 36 36" class="circular-chart blue">
              <path class="circle-bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path class="circle"
                stroke-dasharray={moisture+",100"} //change this value to change the percentage
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x="18" y="15" class="sensorName">Soil Moisture</text>
              //chage text percentage
              <text x="18.5" y="23.35" class="percentage">{moisture}%</text> 
            </svg>
          </div>
          <div class="single-chart">
            <svg viewBox="0 0 36 36" class="circular-chart yellow">
              <path class="circle-bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path class="circle"
                stroke-dasharray={light+", 100"}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x="18" y="15" class="sensorName">Light</text>
              <text x="18.5" y="23.35" class="percentage">{light}%</text>
            </svg>
          </div>
        </div>
        <div class="flex-wrapper">
          <button class="waterButton" style={{border: watering?"5px solid aquamarine":"none"}} onClick={Watering}>
            <img src = {can} style={{width:"100%",backgroundColor : "white"}}alt='can'/>
          </button>
          <button class="waterButton" style={{border: lighting?"5px solid aquamarine":"none"}} onClick={Lighting}>
            <img src = {sun} style={{width:"100%",backgroundColor : "white"}}alt='can'/>
          </button>
        </div>
        {/* <p>
          Edit and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
    </div>
    
  );
}

export default App;
