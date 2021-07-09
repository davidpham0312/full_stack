import axios from 'axios'
import React, { useState, useEffect } from 'react'

const api_key = process.env.REACT_APP_API_KEY

const CountryData = ({name}) => {
  const [country, setCountry] = useState([])
  const [show, setShow] = useState(false)
  const [weather, setWeather] = useState([])
  useEffect(() => {
    axios
    .get(`https://restcountries.eu/rest/v2/name/${name}`)
    .then(response => {
      setCountry(response.data[0])
    })
  }, [name])

  useEffect(() => {
    axios
    .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
    .then(response => {
      setWeather(response.data.current)
    })
  }, [country.capital])
  return show
  ? (<div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      <ul>
        {country.languages && country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src= {country.flag} alt="new" height="150"/>
      <h2>Weather in {country.capital}</h2>
      <b>temperature:</b> {weather.temperature} Celcius<br></br>
      <img src={weather.weather_icons} alt="new" height="50"/><br></br>
      <b>wind: </b>{weather.wind_speed} mph direction {weather.wind_dir}
    </div>)
  : (<div key={country.name}>{country.name}<button onClick={() => setShow(true)}>show</button></div>)
}

const ResultCount = ({searchResult, newSearch}) => {
  const results = searchResult.filter(country => country.name.toLowerCase().includes(newSearch.toLowerCase()))

  if (results.length > 10) {
    return (
      <div>
        Too many matches specify another filter
      </div>
    )
  }

  return (
    results.map(country =><CountryData key={country.name} show={false} name={country.name}/>)
  )
}

const App = () => {
  const [ newSearch, setNewSearch] = useState('')
  const [ searchResult, setSearchResult] = useState([])

  useEffect(() => {
  axios
  .get('https://restcountries.eu/rest/v2/all')
  .then(response => {
    setSearchResult(response.data)
  })
}, [])

  const handleSearchChange = (event) =>{
    setNewSearch(event.target.value)
  }

  return (
    <div>
      find countries <input type='text' onChange={handleSearchChange}/>
      <ResultCount searchResult={searchResult} newSearch={newSearch}/>
    </div>
  )
}

export default App;
