import React from 'react'

const PersonForm = ({ handleNameFormChange, handleNumberFormChange, handleSubmit }) => {
    return (
        <form>
            <div>
                name: <input id="nameForm" onChange={handleNameFormChange} />
            </div>
            <div>
                number : <input id="numberForm" onChange={handleNumberFormChange} />
            </div>
            <div>
                <button type="submit" id="addButton" onClick={handleSubmit}>add</button>
            </div>
        </form>
    )
}

export default PersonForm