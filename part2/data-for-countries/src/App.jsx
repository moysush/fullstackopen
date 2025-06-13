import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  // getting the list
  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  // filtering for search
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))

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
                <img src={filteredCountries[0].flags.png} style={{width: '250px'}}/>
              </div>
              :
              filteredCountries.length > 10 ?
                'Too many matches, specify another filter'
                : // list the names from the filtered array
                filteredCountries.map(country => (
                  <p key={country.cca3}>{country.name.common}</p>
                )
                )
        }
      </div>
    </>
  )
}

export default App
