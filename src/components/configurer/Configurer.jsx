import React, { useState } from 'react';
import config from './config.json';

const LogGenerator = () => {
  const [state, setState] = useState(config.fields[0]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name], value: value },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(state);
  };

  return (
    <form onSubmit={handleSubmit}>
      {config.fields.map((field, index) => (
        <div key={index}>
          <label>{field.desc}</label>
          {field.type === 'string' ? (
            <input
              type="text"
              name={Object.keys(field)[0]}
              defaultValue={field[Object.keys(field)[0]].value}
              onChange={handleChange}
            />
          ) : (
            <select
              name={Object.keys(field)[0]}
              defaultValue={field[Object.keys(field)[0]].value}
              onChange={handleChange}
            >
              {field[Object.keys(field)[0]].options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default LogGenerator;
