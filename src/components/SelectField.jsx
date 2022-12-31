import React from 'react'
import informationFillIcon from '../assets/information-fill.svg'

const SelectField = ({ sub }) => {
    return (
        <div className="select-div">
            <p className="select-label">
                {sub.label}
                {sub.validate.required ? <span> * </span> : ""}
                {sub.description !== "" ?
                    <img title={sub.description} src={informationFillIcon}></img>
                    : ""}
            </p>
            <select name="select" id="select" className='select' defaultValue={sub.validate.defaultValue}>
                {
                    sub.validate.options.map((op) => {
                        return <option key={op.label + op.value} value={op.value}>{op.label}</option>
                    })
                }
            </select>
        </div>
    )
}

export default SelectField