import React from 'react';

function SearchResult({foundCountries}) {
  if (foundCountries.length > 10) {
    return (<div>too many matches, specify another filter</div>)
  } else if (foundCountries.length === 1) {
    const country = foundCountries[0]
    return(
      <>
        <h1>{country.name.common}</h1>
        <span>capital {country.capital}</span><br/>
        <span>area {country.area}</span>
        <h1>Languages</h1>
        <ul>
          {Object.values(country.languages).map((language)=>{
            return <li key={language}>{language}</li>
          })}
        </ul>
        <img src={country.flags.png}/>
      </>
    )
  } else {
    return (
      <div>
        {foundCountries.map((country) => {
          return <span>{country.name.common}<br/></span>
        })}
      </div>
    )
  }
}

export default SearchResult;