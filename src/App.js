import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
// import './App.css';
import DT from "./dataTable";

require("es6-promise").polyfill();
require("isomorphic-fetch");


function App() {
  const [data, setData] = useState([])
  const [bar, setBar] = useState("")
  const [searchCol, setSearchCol] = useState(["firstName", "lastName"]);

  useEffect(() => {
    fetch("https://devmentor.live/api/examples/contacts.json?api_key=054fa47a")
      .then(response => response.json())
      .then((json) => setData(json))

  }, [])

  function search(rows) {
    return rows.filter((row) =>
      searchCol.some((column) => row[column].toString().toLowerCase().indexOf(bar.toLowerCase()) > -1)
      // row.firstName.toLowerCase().indexOf(bar) > -1 ||
      // row.lastName.toLowerCase().indexOf(bar) > - 1 ||
      // row.emailAddress.toLowerCase().indexOf(bar) > - 1 ||
      // row.phoneNumber.toLowerCase().indexOf(bar) > - 1
    );
  }

  const columns = data[0] && Object.keys(data[0])
  return (
    <div className="App">
      <div>
        <input type="text" value={bar} onChange={(e) => setBar(e.target.value)} placeholder="search for..." />
        {columns &&
          columns.map((column) => (
            <label>
              <input
                type="checkbox"
                checked={searchCol.includes(column)}
                onChange={(e) => {
                  const checked = searchCol.includes(column);
                  setSearchCol((prev) =>
                    checked
                      ? prev.filter((sc) => sc !== column)
                      : [...prev, column]
                  );
                }}
              />
              {column}
            </label>
          ))}
      </div>
      <div><DT data={search(data)} /></div>
    </div >
  );
}

export default App;
