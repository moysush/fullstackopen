import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'

const DetailedCountry = ({ filteredCountries, weather }) => {

  return (
    <div>
      <h1>{filteredCountries[0].name.common}</h1>
      <p>Capital: {filteredCountries[0].capital}</p>
      <p>Area: {filteredCountries[0].area}</p>
      <p>Population: {filteredCountries[0].population}</p>
      <h4>Timezones: </h4>
      <ul>
        {Object.values(filteredCountries[0].timezones).map(zone => <li key={zone}>{zone}</li>)}</ul>
      <h2>Languages:</h2>
      <ul>
        {Object.values(filteredCountries[0].languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={filteredCountries[0].flags.png} style={{ width: '250px', border: 'solid black 1px', borderRadius: '10px' }} />
      {weather.main ?
        <>
          {/*check if weather.main exists yet to avoid throwing error */}
          <h2>Weather in {filteredCountries[0].capital}</h2>
          <p>Temperature: {weather.main.temp} Celsius</p>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
          <p>Wind: {weather.wind.speed} m/s</p>
        </>
        : <p>No weather data available</p>
      }
    </div >
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [weather, setWeather] = useState([])
  // secure api key with vite's environment variable
  const api = import.meta.env.VITE_WEATHER_KEY

  // getting the list
  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountries(response.data)
      })
      .catch(error => {
        console.log(`Couldn't fetch countries ${error}`);
      })
  }, [])

  // filtering for search
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    // to only fetch the info when one country is shown
    if (filteredCountries.length === 1) {
      const location = filteredCountries[0].capital ? `${filteredCountries[0].capital[0]},${filteredCountries[0].cca2}` : filteredCountries[0].cca2
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api}&units=metric`)
        .then(response => {
          setWeather(response.data)
          console.log(response.data);
        })
        .catch(error => {
          console.log(`Coudn't fetch weather ${error}`);
        })
      return
    }
    setWeather([])
    // to only re-render when value changes
  }, [filteredCountries.length])


  return (
    <>
      <span>Search countries: </span>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <div>
        <br />
        { // only check the next condition if the user starts typing
          search.length < 1 ? 'Start typing to search...'
            : // don't show country list if there are more than 10 matches
            filteredCountries.length === 1 ?
              <DetailedCountry filteredCountries={filteredCountries} weather={weather} />
              :
              filteredCountries.length > 10 ?
                'Too many matches, specify another filter'
                : // list the names from the filtered array
                filteredCountries.map(country => (
                  <p key={country.cca3}>{country.name.common} <button onClick={() => setSearch(country.name.common)}>Show</button></p>
                )
                )
        }
      </div>
    </>
  )
}

export default App
