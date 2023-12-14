import './App.css';
import React, { useState, useEffect } from 'react';
import weatherData from "./assets/weatherData.json"
function App() {
  const [hoursData, setHoursData] = useState([]);
  const [searchInputData, setSearchInputData] = useState("");
  const [locationData, setLocationData] = useState("");

  const getCloudNature = weatherData.map((cloud) => (cloud.list.map((a) => a.weather.map(b => b.description))))
  console.log(getCloudNature);
  const getIcon = weatherData.map((cloud) => (cloud.list.map((a) => a.weather.map(b => b.icon))))
  console.log(getIcon);
  const getTepm = weatherData.map((cloud) => (cloud.list.map((a) => a.main)))
  console.log(getTepm);

  var options = { weekday: 'long', hour: '2-digit', minute: '2-digit', hour12: false }
  var day = new Date().toLocaleTimeString('en-us', options);

  const formatTime = (value) => (value < 10 ? `0${value}` : value);
  useEffect(() => {
    const currentTime = new Date();
    const newHoursData = [];
    for (let i = 1; i <= 6; i++) {
      const nextHour = new Date(currentTime);
      nextHour.setHours(currentTime.getHours() + i);
      const formattedTime = `${formatTime(nextHour.getHours())}`;
      newHoursData.push(formattedTime);
    }
    setHoursData(newHoursData);
    const getCity = weatherData.map((city) => { return (city.city.name) })
    setLocationData(getCity[0])
  }, []);
  console.log(hoursData);

  const onSearchClicked = ()=>{
    if (searchInputData.trim() !== '') {
      setLocationData(searchInputData);
      setSearchInputData('');
    }
  }
  return (
    <div className="App">
      <main>
        <aside>
          <section className='cityNameTag'><h1>{locationData}</h1></section>

          <section className='dayTags'>
            <article><h6>{day}</h6></article>
            <article>{getCloudNature.map(x => {
              return (
                <h6>{x[1]}</h6>
              )
            })}</article>
          </section>

          <section className='secThree'>
            <article className='secThreeArtOne'>
              <img src={`https://openweathermap.org/img/wn/${getIcon[1]}@2x.png`} alt='cloudy' />
              <div className='tempContainer'>
                <h2>29.34</h2>
                <div className='degContainer'><p><sup>o</sup>C | </p> <p className='fHeat'> <sup> o</sup>F</p></div>
              </div>
            </article>
            <article className='secThreeArtTwo'>
              <h6>Humidity: 37%</h6>
              <h6>Wind: 1.79 km/h</h6>
            </article>
          </section>

          <section className='secFour'>
            <div className='hoursDataDiv'>
              <h6>{hoursData[0]}:00</h6>
              <h6>{hoursData[1]}:00</h6>
              <h6>{hoursData[2]}:00</h6>
              <h6>{hoursData[3]}:00</h6>
              <h6>{hoursData[4]}:00</h6>
              <h6>{hoursData[5]}:00</h6>
            </div>
            <div className='imagesDiv'>
              <img src={`https://openweathermap.org/img/wn/${getIcon[0][0]}@2x.png`} alt='cloudy' />
              <img src={`https://openweathermap.org/img/wn/${getIcon[0][1]}@2x.png`} alt='cloudy' />
              <img src={`https://openweathermap.org/img/wn/${getIcon[0][2]}@2x.png`} alt='cloudy' />
              <img src={`https://openweathermap.org/img/wn/${getIcon[0][3]}@2x.png`} alt='cloudy' />
              <img src={`https://openweathermap.org/img/wn/${getIcon[0][4]}@2x.png`} alt='cloudy' />
              <img src={`https://openweathermap.org/img/wn/${getIcon[0][5]}@2x.png`} alt='cloudy' />
            </div>
            <div className='tempForImg'>
              {
                getTepm[0].map(y => {
                  return (
                    <h6>{y.temp}<sup>o</sup>C</h6>
                  )
                })
              }
            </div>
          </section>

          <div className="filter">
            <input type='text' placeholder="Type a city.." value={searchInputData} onChange={(e) => setSearchInputData(e.target.value)} />
            <button onClick={()=>onSearchClicked()}>search</button>
          </div>
        </aside>
      </main>
    </div>
  );
}
export default App;