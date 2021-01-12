import React, { useState } from "react";
import axios from "axios";
import { getErrorMessage } from "./utils";

const url = "";
const params = {
  //
};

export default function DoThing() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [output, setOutput] = useState(null);
  async function doThing() {
    setLoading(true);
    try {
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
  if (loading) return <h2>Loading...</h2>;
  if (output) {
    return (
      <div>
        <hr />
        {errorMessage && <p className="error-msg">{errorMessage}</p>}
        <pre>{output}</pre>
      </div>
    );
  }
  return (
    <div>
      <button onClick={doThing}>Do Thing</button>
    </div>
  );
}
