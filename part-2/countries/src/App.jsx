import {useEffect, useState} from "react";
import countryService from "./services/countryService.js";
import SearchResult from "./components/SearchResult.jsx";

function App() {
  // ===========================================================================
  // init countries data via GET request
  // ===========================================================================

  const [countries, setCountries] = useState([])
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    countryService
      .getAll()
      .then(data => setCountries(data))
  }, [])

  const handleChange = (event) => {
    const query = event.target.value.toLowerCase()
    const filteredCountries = [...countries].filter((country) => {
      return country.name.common.toLowerCase().includes(query)
    })
    console.log(`${filteredCountries.length} countries found.`)
    setSearchResults(filteredCountries)
  }

  return (
    <div>
      find countries
      <input onChange={handleChange}></input>
      <SearchResult foundCountries={searchResults}/>
    </div>
  )
}

export default App
