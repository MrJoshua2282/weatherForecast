import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Spinner from './Spinner';

import clearDay from './assets/img/day_clear.svg';
import partialCloudyDay from './assets/img/day_partial_cloud.svg';
import dayThunder from './assets/img/day_rain_thunder.svg';
import dayRain from './assets/img/day_rain.svg';
import mist from './assets/img/mist.svg';
import clearNight from './assets/img/night_half_moon_clear.svg';
import partialCloudyNight from './assets/img/night_half_moon_partial_cloud.svg';
import nightThunder from './assets/img/night_half_moon_rain_thunder.svg';
import nightRain from './assets/img/night_half_moon_rain.svg';
import overcast from './assets/img/overcast.svg';
import snow from './assets/img/snow.svg';

const icons = {
  '01d': clearDay,
  '01n': clearNight,
  '02d': partialCloudyDay,
  '02n': partialCloudyNight,
  '03d': overcast,
  '03n': overcast,
  '04d': partialCloudyDay,
  '04n': partialCloudyNight,
  '09d': dayRain,
  '09n': nightRain,
  '10d': dayRain,
  '10n': nightRain,
  '11d': dayThunder,
  '11n': nightThunder,
  '13d': snow,
  '13n': snow,
  '50d': mist,
  '50n': mist
}

class App extends Component {
  state = {
    weatherArr: [],
    currentDayArr: [],
    zip: '07701',
    city: '',
    degrees: 'imperial',
    isF: true,
    isLoading: false
  }

  getData = () => {
    this.setState({ isLoading: true });
    //5 day forecast
    //`http://api.openweathermap.org/data/2.5/forecast?zip={zip code},{country code}&appid={your api key}`

    let key = '39ff9355af7fb6c4e1f585a76ac2282d';

    axios.get(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?zip=${this.state.zip}&appid=${key}&units=${this.state.degrees}`)
      .then(result => {
        let weather7Days = [];
        let city = result.data.city.name;
        let location = city;
        let favicon = document.querySelector('#forecast');
        console.log(result.data.list[0].weather[0].icon);
        switch (result.data.list[0].weather[0].icon) {
          case '01d':
            favicon.href = '../public/clear.svg';
            break;
          case '01n':
            favicon.href = '../public/night_clear.svg';
            break;
          case '02d':
            favicon.href = '../public/day_partial_cloud.svg';
            break;
          case '02n':
            favicon.href = '../public/night_partial_cloud.svg';
            break;
          case '03d':
            favicon.href = '../public/overcast.svg';
            break;
          case '03n':
            favicon.href = '../public/overcast.svg';
            break;
          case '04d':
            favicon.href = '../public/day_partial_cloud.svg';
            break;
          case '04n':
            favicon.href = '../public/night_partial_cloud.svg';
            break;
          case '09d':
            favicon.href = '../public/day_rain.svg';
            break;
          case '09n':
            favicon.href = '../public/night_rain.svg';
            break;
          case '10d':
            favicon.href = '../public/day_rain.svg';
            break;
          case '10n':
            favicon.href = '../public/night_rain.svg';
            break;
          case '11d':
            favicon.href = '../public/day_rain_thunder.svg';
            break;
          case '11n':
            favicon.href = '../public/night_thunder.svg';
            break;
          case '13d':
            favicon.href = '../public/snow.svg';
            break;
          case '13n':
            favicon.href = '../public/snow.svg';
            break;
          case '50d':
            favicon.href = '../public/mist.svg';
            break;
          case '50n':
            favicon.href = '../public/mist.svg';
            break;
          default:
            favicon.href = '../public/clear.svg';
        }
        result.data.list.map((cur, i) => {
          if (i % 8 === 0) {
            //current!!! weather time of each day
            weather7Days.push(cur);
            // console.log(result);

          }
        });
        this.setState({ weatherArr: weather7Days, city: location, isLoading: false });
      }).catch(error => {
        // console.log(error);
        this.setState({ isLoading: false });
      })
  }

  componentDidMount() {
    this.getData();
  }

  zipHandler = (event) => {
    this.setState({ zip: event.target.value });
  }

  submitZip = () => {
    this.getData();
  }

  degConverter = (event) => {
    event.target.value === 'Fahrenheit' ? this.setState({ isF: true }) : this.setState({ isF: false });
  }

  convert = (degrees) => {
    //if this.state.isF is false return Celsius
    if (!this.state.isF) {
      return (degrees - 32) * (5 / 9);
    } else {
      // else return Fahrenheit
      return degrees;
    }
  }

  render() {
    let today = this.state.weatherArr.map((cur, i) => {
      let d = new Date(cur.dt_txt);
      let day = d.getDay();
      let arrDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      day = arrDays[day];
      let date = d.getDate();
      let month = d.getMonth();
      let arrMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      month = arrMonths[month];
      let year = d.getFullYear();
      let currentDay = `${day}, ${month} ${date} ${year}`
      if (i === 0) {
        return (
          <div key={`today`} className='today' id='today'>
            <span className='topBoxOne'>
              <div className='date'>{currentDay}</div>
              <div className='topLeft'>Today's forecast in {this.state.city}: <br></br>{cur.weather[0].description}</div>
              <section className='inputBlock'>
                <div onChange={(event) => this.degConverter(event)}>
                  <input type='radio' id='Fahrenheit' value="Fahrenheit" name="degrees" className='degr' defaultChecked></input>
                  <label htmlFor="Fahrenheit" className='degr'>&#176;F</label>
                  <input type="radio" id="Celsius" name="degrees" value="Celsius" className='degr'></input>
                  <label htmlFor="Celsius" className='degr'>&#176;C</label>
                </div>
                <input className='zip' type='text' placeholder='Enter Zip Code' onChange={(e) => this.zipHandler(e)} ></input>
                <button className='button' onClick={this.submitZip}>Submit</button>
              </section>
            </span>
            <span className='icon-block'>
              <img className='icon-today' src={icons[cur.weather[0].icon]} alt='weather display'></img>
            </span>
            <span className='topBoxThree'>
              <div className='textToday'>Current Temperature: {Math.round(this.convert(cur.main.temp))}&#176;</div>
              <div className='textToday'>Feels like: {Math.round(this.convert(cur.main.feels_like))}&#176;</div>
              <div className='textToday'>Temp-max: {Math.round(this.convert(cur.main.temp_max))}&#176;</div>
              <div className='textToday'>Temp-min: {Math.round(this.convert(cur.main.temp_min))}&#176;</div>
              <div className='textToday'>Humidity: {Math.round(cur.main.humidity)}&#37;</div>
            </span>
          </div>
        );
      }
    });
    let nextDays = this.state.weatherArr.map((cur, i) => {
      let d = new Date(cur.dt_txt);
      let day = d.getDay();
      let arrDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      day = arrDays[day];
      if (i > 0) {
        return (
          <div key={i} className='weather' id={`weather${i + 1}`}>
            <img className='icon' src={icons[cur.weather[0].icon]} alt='weather display'></img>
            <span className='textWeather'>Forecast for {day}: {cur.weather[0].description}</span>
            <span className='textWeather'>Temp-max: {Math.round(this.convert(cur.main.temp_max))}&#176;</span>
            <span className='textWeather'>Temp-min: {Math.round(this.convert(cur.main.temp_min))}&#176;</span>
            <span className='textWeather'>Humidity:  {Math.round(cur.main.humidity)}&#37;</span>
          </div>
        );
      };
    });

    let loader = <Spinner />;

    if (!this.state.isLoading) {
      loader = (
        <div className="App">
          {today}
          <section className='bottom'>
            {nextDays}
          </section>
        </div>
      );
    }
    return (
      <div >
        {loader}
      </div>
    );
  }
}

export default App;
