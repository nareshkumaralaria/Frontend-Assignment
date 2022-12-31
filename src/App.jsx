import { useEffect, useState } from 'react'
import './App.css'
import GroupField from './components/GroupField';
import InputField from './components/InputField';
import SelectField from './components/SelectField';
import pizza from './data/pizza.json';

function App() {

  const [jsonInput, setJsonInput] = useState(JSON.stringify(pizza));
  const [isValid, setIsValid] = useState(true);
  const [inputFieldData, setInputFieldData] = useState([]);
  const [groupFieldData, setGroupFieldData] = useState([]);
  const [selectFieldData, setSelectFieldData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const changeJsonInput = (e) => {
    setJsonInput(e.target.value);
  }

  useEffect(() => {
    try {
      let jsonFormat = JSON.parse(jsonInput);
      setIsValid(true);
      setInputFieldData(jsonFormat.filter(data => data.uiType === "Input"));
      setGroupFieldData(jsonFormat.filter(data => data.uiType === "Group"));
      setSelectFieldData(jsonFormat.filter(data => data.uiType === "Select"));
    } catch (error) {
      setIsValid(false);
      setErrorMessage(error.message);
      setInputFieldData([]);
      setGroupFieldData([]);
      setSelectFieldData([]);
    }

  }, [jsonInput])

  console.log("selectFieldData :", selectFieldData);

  const submitForm = (e) => {
    e.preventDefault();
    alert("from Submitted");
  }

  return (
    <>
      <div className="container">
        <textarea className="left-side area" value={jsonInput} onChange={e => changeJsonInput(e)} placeholder="Enter your JSON here...">
        </textarea>

        <div className="right-side area">
          {
            !isValid ?
              <div className='error'>
                <p className='error-message'>Entered content is not yet a valid JSON Form object.</p>
                <p className='error-message error-message2'>{errorMessage}</p>
              </div>
              :
              <form onSubmit={submitForm}>
                <p className='heading'>New form</p>

                <div className='input-section'>
                  <InputField inputFieldData={inputFieldData} />
                </div>

                <div className='section'>
                  {
                    groupFieldData.map((data, index) => {
                      return <div key={data.label + index} className="group-field">
                        <p className='group-heading'>
                          {data.label}
                          {data.validate.required ? <span> * </span> : ""}
                        </p>
                        <GroupField data={data} />
                      </div>
                    })
                  }
                </div>

                <div className='input-section'>
                  {
                    selectFieldData?.map((sub, index) => {
                      return <SelectField key={sub.label + index} sub={sub} />
                    })
                  }
                </div>

                <div className='form-footer'>
                  <button type="submit">Submit</button>
                </div>

              </form>
          }
        </div>

      </div>
    </>
  )
}

export default App