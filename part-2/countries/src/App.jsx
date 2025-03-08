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
    setSearchResults(filteredCountries)
  }

  const handleShowButton = ({ targetCountryName }) => {
    // update input element
    const inputElement = document.getElementById("searchQueryInput")
    inputElement.value = targetCountryName

    // update search result state
    const foundCountry = [...countries].find((country)=>country.name.common === targetCountryName)
    setSearchResults([ foundCountry ])
  }

  return (
    <div>
      find countries
      <input id="searchQueryInput" onChange={handleChange}></input>
      <SearchResult foundCountries={searchResults} handleShowButton={handleShowButton}/>
    </div>
  )
}

export default App
