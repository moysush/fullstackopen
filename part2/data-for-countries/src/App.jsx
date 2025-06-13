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
      <span>Find countries: </span>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <div>
        <br />
        { // only check the next condition if the user starts typing
        search.length < 1 ? 'Start typing to search...'
          : // don't show country list if there are more than 10 matches
          filteredCountries.length > 10 ?
            'Too many matches, specify another filter'
            : // list the names from the filtered array
            filteredCountries.map(country => (
              <p key={country.name.common}>{country.name.common}</p>
            )
            )
        }
      </div>
    </>
  )
}

export default App
