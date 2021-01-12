import React, { useEffect, useState } from "react";
import axios from "axios";
import { isValidURL, isNumeric, getErrorMessage } from "./utils";

const emptyParam = { key: "", value: "" };

export default function App() {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [inputError, setInputError] = useState(false);
  const [output, setOutput] = useState(null);
  const [bodyParams, setBodyParams] = useState([emptyParam]);
  useEffect(() => {
    if (
      bodyParams.every(({ key, value }) => {
        const _key = key.trim();
        const _value = value.trim();
        return _key.length > 0 && _value.length > 0;
      })
    ) {
      setBodyParams([...bodyParams, emptyParam]);
    }
  }, [bodyParams]);
  function handleURLChange({ target: { value } }) {
    setUrl(value);
    setInputError(!isValidURL(value));
  }
  async function send() {
    if (url.length === 0) return setInputError(true);
    setLoading(true);
    try {
      const params = {};
      bodyParams.forEach(({ key, value }) => {
        const _key = key.trim();
        const _value = value.trim();
        if (_key.length < 1 || _value.length < 1) return;
        params[_key] = !isNumeric(_value) ? _value : Number(_value);
      });
      const { data } = await axios.post(url, params);
      setOutput(JSON.stringify(data, undefined, 2));
      setErrorMessage(null);
      setLoading(false);
    } catch (error) {
      setOutput(JSON.stringify(getErrorMessage(error), undefined, 2));
      setErrorMessage(
        "Uh oh. Bummer. There was an error with your POST request. Please review the error displayed below."
      );
      setLoading(false);
    }
  }
  function handleChange({ target }) {
    const [type, index] = target.name.split("-");
    const _params = JSON.parse(JSON.stringify(bodyParams));
    _params[index][type] = target.value;
    setBodyParams(_params);
  }
  if (loading) return <h2>Loading...</h2>;
  return (
    <>
      <div id="form">
        <label>
          URL
          <input
            type="text"
            placeholder="https://some-api-server.com/endpoint"
            value={url}
            onChange={handleURLChange}
            className={inputError ? "error" : ""}
          />
        </label>
        <p>Body parameters</p>
        <div id="params">
          {bodyParams.map(({ key, value }, i) => (
            <div className="param-item" key={`param-${i}`}>
              <input
                type="text"
                placeholder="key"
                className="param-key"
                name={`key-${i}`}
                onChange={handleChange}
                value={key}
              />
              <p className="colon">:</p>
              <input
                type="text"
                placeholder="value"
                className="param-value"
                name={`value-${i}`}
                onChange={handleChange}
                value={value}
              />
            </div>
          ))}
        </div>
        <button onClick={send} disabled={inputError}>
          Send POST
        </button>
      </div>
      {output && (
        <div>
          <hr />
          {errorMessage && <p className="error-msg">{errorMessage}</p>}
          <pre>{output}</pre>
        </div>
      )}
    </>
  );
}
