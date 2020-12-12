import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY.slice(1, -2) //removing  ' '

const App = () => {
    const [countries, setCountries] = useState([]);
    const [myFilter, setMyFilter] = useState([]);
    const [capital, setCapital] = useState('');
    const [temp, setTemp] = useState('')
    const [icon, setIcon] = useState('')
    const [wind, setWind] = useState('')

    const hook = () => {

        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }

    const getWeather = () => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&APPID=${api_key}&units=metric`)
            .then(responseData => {
                setTemp(responseData.data.main.temp)
                setIcon(`http://openweathermap.org/img/wn/${responseData.data.weather[0].icon}@2x.png`)
                setWind(responseData.data.wind.speed)
            })

    }

    useEffect(hook, []);
    useEffect(getWeather, [capital]);

    const handleSearch = (event) => {
        const mySearch = countries.filter(p => p.name.toLowerCase().includes(event.target.value.toLowerCase()))
        if (mySearch.length !== 0) {
            setCapital(mySearch[0].capital)
        }
        setMyFilter(mySearch)
    }

    const handleClick = (countryName) => {

        const pickCountry = myFilter.filter(p => p.name.includes(countryName))
        setCapital(pickCountry[0].capital)
        setMyFilter(pickCountry)
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
                        <h2>Spoken languages </h2>
                        <ul>
                            {
                                myFilter[0].languages.map(e =>
                                    <li key={e.name} > {e.name} </li>
                                )
                            }
                        </ul>
                        <p><img alt="" width="200" src={myFilter[0].flag} /></p>
                        <h2>Weather in {capital} </h2>
                        <div><b>temperature:</b> {temp} Celcius</div>
                        <p><img alt="" src={icon} /></p>
                        <div><b>wind:</b> {wind} mph</div>

                    </div>
                        : myFilter.length <= 10 ? <div> {
                            myFilter.map(e =>
                                <div key={e.name} > {e.name} <button onClick={() => handleClick(e.name)}> show</button></div>
                            )
                        }</div>
                            : <div>Too many matches, please specify another filter</div>
                }
            </div>
        </div>
    )
}

export default App

