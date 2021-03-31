import React from 'react'
import { useDispatch } from 'react-redux'
import { filterSearch } from '../reducers/filterReducer'


const Filter = () => {

  const dispatch = useDispatch()

  const handleChange = (event) => {

    dispatch(filterSearch(event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter