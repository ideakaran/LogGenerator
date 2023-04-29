import React, { useState } from 'react';
import config from './config.json';
import './Configurer.css';

const LogGenerator = () => {
  const [state, setState] = useState(config.fields);
  const fields = config.fields;

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

  const capitalize = (param) => {
    if (param == undefined) {
      console.error('The field does not have name provided.');
    }
    const firstChar = param.charAt(0);
    if (firstChar >= 'a' && firstChar <= 'z') {
      return firstChar.toUpperCase() + param.substring(1);
    }

    return param;
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((item, index) => {
        console.log('Item type is..' + JSON.stringify(item));
        switch (item.type) {
          case 'text':
            return (
              <div key={index} className="lg__config-field">
                <label className='lg__config-fieldLabel'>{capitalize(item.name)}</label>
                <input type="text" value={item.value} onChange={handleChange} />
              </div>
            );
          case 'number':
            return (
              <div key={index} className="lg__config-field">
                <label className='lg__config-fieldLabel'>{capitalize(item.name)}</label>
                <input
                  type="number"
                  name={index}
                  value={state[index].value}
                  onChange={handleChange}
                />
              </div>
            );
          case 'dropdown':
            return (
              <div key={index} className="lg__config-field">
                <label  className='lg__config-fieldLabel' htmlFor={capitalize(item.name)}>{item.name}</label>
                <input
                  type={item.type}
                  name={item.name}
                  id={item.name}
                  onChange={handleChange}
                  defaultValue={item.value}
                />
              </div>
            );
          case 'array':
            return (
              <div key={index} className="lg__config-field">
                <label  className='lg__config-fieldLabel' htmlFor={item.name}>{capitalize(item.name)}</label>
                {item.value.map((value, valueIndex) => (
                  <input
                    key={valueIndex}
                    type="text"
                    name={`${item.name}[${valueIndex}]`}
                    id={`${item.name}[${valueIndex}]`}
                    onChange={handleChange}
                    defaultValue={value}
                  />
                ))}
              </div>
            );
          default:
            return null;
        }
      })}
      <button type="submit">Submit</button>
    </form>
  );
};

export default LogGenerator;
