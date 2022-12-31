import React from 'react'
import informationFillIcon from '../assets/information-fill.svg'

const InputField = ({ inputFieldData }) => {
    return (
        <>
            {
                inputFieldData?.map((data, index) => {
                    return <div key={data.label + index} className="input-field">
                        <label htmlFor={data.label} className="input-label">
                            {data.label}
                            {data.validate.required ? <span> * </span> : ""}
                            {data.description !== "" ?
                                <img title={data.description} src={informationFillIcon}></img>
                                : ""}
                        </label>
                        <input type="text" id={data.label} disabled={data.validate.immutable} placeholder={data.placeholder} />
                    </div>
                })
            }
        </>
    )
}

export default InputField