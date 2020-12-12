import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
    const [countries, setCountries] = useState([]);
    const [myFilter, setMyFilter] = useState([]);

    const hook = () => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }

    useEffect(hook, []);

    const handleSearch = (event) => {
        const mySearch = countries.filter(p => p.name.toLowerCase().includes(event.target.value.toLowerCase()))
        setMyFilter(mySearch)
    }

    return (
        <div>
            <div>
                find countries: <input onChange={handleSearch} />
            </div>
            <div>
                {myFilter.length < 1 ? <div>no match</div>
                    : myFilter.length < 2 ? <div>
                        <h1>{myFilter[0].name}</h1>
                        <div>Capital: {myFilter[0].capital}</div>
                        <div>Population: {myFilter[0].population}</div>
                        <h2>languages </h2>
                        <ul>
                            {
                                myFilter[0].languages.map(e =>
                                    <li key={e.name} > {e.name} </li>
                                )
                            }
                        </ul>
                        <div><img src={myFilter[0].flag} /></div>
                    </div>
                        : myFilter.length <= 10 ? <div> {
                            myFilter.map(e =>
                                <div key={e.name} > {e.name} </div>
                            )
                        }</div>
                            : <div>Too many matches, please specify another filter</div>
                }
            </div>
        </div>
    )
}

export default App

