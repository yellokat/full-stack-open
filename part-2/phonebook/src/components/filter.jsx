import React from 'react'

const Filter = ({ onChange }) => {
    return (
        <>
            <div>filter shown with</div>
            <input onChange={onChange} />
        </>
    )
}

export default Filter