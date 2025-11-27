import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const url = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

  useEffect(() => {
    if (!name) {
      setCountry(null)
      return
    }

    axios(`${url}${name}`)
      .then(res => setCountry({ found: true, data: res.data }))
      .catch(err => setCountry({ found: false, data: err }))
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>Capital: {country.data.capital} </div>
      <div>Population: {country.data.population}</div>
      <img src={country.data.flags?.png || country.data.flags?.svg } height='100' alt={country.data.flags.alt} style={{border: 'solid 1px #000', borderRadius: '8px'}} />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)
  // console.log(country);
  

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App