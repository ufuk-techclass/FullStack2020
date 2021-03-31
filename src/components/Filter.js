import React from 'react'
import { connect } from 'react-redux'
//import { useDispatch } from 'react-redux'
import { filterSearch } from '../reducers/filterReducer'


const Filter = (props) => {

  //  const dispatch = useDispatch()

  const handleChange = (event) => {

    props.filterSearch(event.target.value)
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

export default connect(null, { filterSearch })(Filter)