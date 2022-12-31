import React from 'react'

const SwitchField = ({ sub }) => {
    return (
        <div className="radio-field">
            <label className="switch">
                <input type="checkbox" defaultChecked={sub.validate.defaultValue} />
                <span className="slider round"></span>
                <span className='slider-label'>{sub.label}</span>
            </label>
        </div>
    )
}

export default SwitchField