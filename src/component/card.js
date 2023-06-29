import { useEffect, useState } from 'react';
import axios from 'axios';
import {Card, Container, Row, Col, Image} from 'react-bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../App.css'
import sunny from '../image/sunny.png'
import clouds from '../image/clouds.png'
import rainy from '../image/rainy.png'
import thunderstorm from '../image/thunderstorm.png'
import snow from '../image/snowfall.png'
import mist from '../image/mist.png'
import smoke from '../image/smoke.png'
import dust from '../image/dust.png'
import sand from '../image/sand.png'
import ash from '../image/ash.png'
import squall from '../image/squall.png'
import tornado from '../image/tornado.png'
import imgHumidity from '../image/humidity.png'
import imgWind from '../image/wind.png'
import imgError from '../image/error.png'

function CardWeather() {

  const [searched, setSearched] = useState("roma");
  const [temperature,setTemperature] = useState(null);
  const [humidity,setHumidity] = useState(null);
  const [wind,setWind] = useState(null);
  const [weather,setWeather] = useState(null);
  const [city,setCity] = useState(null)
  const [cityError,setCityError] = useState(false)
  const apiKey = process.env.REACT_APP_APIKEY

  const imgWeather={
    Clear:sunny,
    Clouds:clouds,
    Rain:rainy,
    Drizzle:rainy,
    Thunderstorm:thunderstorm,
    Snow:snow,
    Mist:mist,
    Fog:mist,
    Haze:mist,
    Smoke:smoke,
    Dust:dust,
    Sand:sand,
    Ash:ash,
    Squall:squall,
    Tornado:tornado
  }


  useEffect(() => {
    fetchData(searched)
    // eslint-disable-next-line
  },[])

  const fetchData = (searchedValue) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchedValue}&appid=${apiKey}&units=metric`)
      .then(response => {
        const data = response.data
        setCityError(false)
          // Elabora i dati della risposta
          setTemperature(data.main.temp)
          setHumidity(data.main.humidity)
          setWind(data.wind.speed)
          setWeather(data.weather[0].main)
          setCity(data.name)
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          // Gestisci l'errore 404 qui
          setCityError(true)
        } else {
          // Gestisci altri tipi di errori qui
          console.error('Errore durante la chiamata API:', error);
        }
      });
  };

  const handleSearch = (e) => {
      e.preventDefault(); // Prevents the form from submitting and refreshing the page
      fetchData(searched)
  }



  return (
    <Card style={{ width: '25rem', height: '30rem', background: 'rgb(69, 165, 250)', borderRadius: '50px' }}>
      <Card.Header className='header'>
        <form onSubmit={handleSearch}>
          <div className='search-box'>
            <i className="bi bi-geo-alt-fill" />
            <input type="text" placeholder="Enter your location" value={searched} onChange={e => setSearched(e.target.value)} />
            <button className="bi bi-search search-icon" type='submit' />
          </div>
        </form>
      </Card.Header>

      {cityError ? (
        <Card.Body className='text-center'>
        <Card.Img src={imgError} className='weatherImg' />
        <h1 style={{ paddingTop: '30px' }}>City not Found</h1>
        <h2 style={{ paddingTop: '15px' }}>Try again</h2>
      </Card.Body>
      ):(
        <Card.Body className='text-center'>
        <Card.Img src={imgWeather[weather]} className='weatherImg' />
        <h1 style={{ paddingTop: '30px' }}>{temperature}°c</h1>
        <h2 style={{ paddingTop: '15px' }}>{city}</h2>
        <Container style={{ paddingTop: '40px' }}>
          <Row>
            <Col>
              <Image src={imgHumidity} style={{ maxHeight: '30px', maxWidth: '30px' }} title='humidity'/>
              <span className="h4" style={{paddingLeft:'15px'}}>{humidity}%</span>
            </Col>
            <Col>
              <Image src={imgWind} style={{ maxHeight: '30px', maxWidth: '30px' }} title='wind'/>
              <span className="h4" style={{paddingLeft:'15px'}}>{wind} km/h</span>
            </Col>
          </Row>
        </Container>
      </Card.Body>
      )}
    </Card>
    
  );
}

export default CardWeather;
