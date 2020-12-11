import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {

    const [selected, setSelected] = useState(0)
    const [vote, setVote] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 })
    const [max, setMax] = useState({ key: 0, value: 0 })

    const handleVote = (selected) => {

        const newVote = { ...vote };
        newVote[selected] += 1;
        setVote(newVote);

        //find max value, then find the key of the max value
        const maxValue = Math.max(...Object.values(newVote));
        const keyOfMax = Object.keys(newVote).find(key => newVote[key] === maxValue);
        setMax({ key: keyOfMax, value: maxValue });
    }

    const handleNext = () => {
        setSelected(Math.floor(Math.random() * 6));
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{props.anecdotes[selected]}</p>
            <p>has {vote[selected]} votes</p>
            <button onClick={() => handleVote(selected)} >vote</button>
            <button onClick={handleNext} >next anecdote</button>
            <h1>Anecdote with most vote</h1>
            <p>{props.anecdotes[max.key]}</p>
            <p>has {max.value} votes</p>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)