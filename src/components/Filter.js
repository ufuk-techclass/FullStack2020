import React from 'react'

const Filter = ({ handleSearch }) => {

    return (
        <div>
            filter shown with: <input onChange={handleSearch} />
        </div>

    )
}

export default Filter