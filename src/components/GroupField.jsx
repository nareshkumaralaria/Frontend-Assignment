import React, { useEffect, useState } from 'react'
import informationFillIcon from '../assets/information-fill.svg'
import SelectField from './SelectField';
import SwitchField from './SwitchField';


const GroupField = ({ data }) => {
    // console.log("data :", data);
    const [checkedValue, setCheckedValue] = useState("");

    // console.log("checkedValue :", checkedValue);

    return (
        <>
            {
                data.subParameters?.map((sub, index) => {
                    if (sub.uiType === "Radio") {
                        return <div key={sub.label + index} className="radio-field">
                            <p className='radio-heading'>
                                {sub.label}
                                {sub.validate.required ? <span> * </span> : ""}
                            </p>
                            <div className='radio-div'>
                                {
                                    sub.validate.options.map((option, index) => {
                                        return <div key={option.value + index} className="radio-main-div">
                                            <input
                                                type="radio"
                                                name="radio"
                                                id={option.value}
                                                // defaultChecked={sub.validate.defaultValue === option.value}
                                                value={option.value}
                                                checked={checkedValue === option.value}
                                                onChange={e => setCheckedValue(e.target.value)}
                                            />
                                            <label htmlFor={option.value}>{option.label}
                                            </label>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    }
                    else if (sub.uiType === "Ignore") {
                        // console.log("sub: ", sub);
                        if (sub.conditions[0].value === checkedValue) {
                            return sub.subParameters.map((subData, indx) => {
                                if (subData.uiType === "Select" && subData.disable != true) {
                                    return <SelectField key={subData.label + indx} sub={subData} />
                                }
                                else if (subData.uiType === "Input" && subData.disable != true) {
                                    return <div key={subData.label + indx} className="select-div">
                                        <p className="select-label">
                                            {subData.label}
                                            {subData.validate.required ? <span> * </span> : ""}
                                            {subData.description !== "" ?
                                                <img title={subData.description} src={informationFillIcon}></img>
                                                : ""}
                                        </p>
                                        <input type="text" id={data.label} disabled={data.validate.immutable} placeholder={data.placeholder} />
                                    </div>
                                }
                                else if (subData.uiType === "Switch" && subData.disable != true) {
                                    return <SwitchField key={subData.label + indx} sub={subData} />
                                }
                            })

                        }
                    }
                    else if (sub.uiType === "Select") {
                        return <SelectField key={sub.label + index} sub={sub} />
                    }
                    else if (sub.uiType === "Switch") {
                        return <SwitchField key={sub.label + index} sub={sub} />
                    }
                })
            }
        </>
    )
}

export default GroupField