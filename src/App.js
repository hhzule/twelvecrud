import React, { useState, useEffect } from 'react';
import './App.css';
import Header from "./Header"

function App() {
  const [mydata, setData] = useState([]);
  const [todo, setTodo] = useState()
  const [input, setInput] = useState()
  const [isloading, setIsloading] = useState(true)
  useEffect(() => {
    ; (async () => {
      setIsloading(true);
      console.log("fetch called")
      await fetch("/.netlify/functions/data")
        .then(res => res.json())
        .then(data => {
          setData(data)
        })
      setIsloading(false)

    })()
  }, [todo])

  console.log(mydata, "save")
  const handleadd = (val) => {
    fetch(`/.netlify/functions/add`, {
      method: 'POST',
      body: JSON.stringify(val)
    }).then(response => response.json())
      .then(data => {

        // console.log("Data: " + JSON.stringify(data.ref['@ref'].id));
        console.log(data.ref['@ref'].id, "from add call")
        setTodo(data);
      });
  }
  const handledelete = (id) => {
    console.log(id, "from del")
    fetch(`/.netlify/functions/deltask`, {
      method: 'POST',
      body: JSON.stringify(id)
    }).then(response => response.json())
      .then(data => {

        // console.log("Data: " + JSON.stringify(data.ref['@ref'].id));
        console.log(data.ref['@ref'].id, "from add call")
        setTodo(data);
      });
  }

  const handleupdate = (id, task) => {
    console.log(id + task, "from update")
    const updata = {
      id,
      task
    }
    fetch(`/.netlify/functions/update`, {
      method: 'POST',
      body: JSON.stringify(updata)
    }).then(response => response.json())
      .then(data => {

        // console.log("Data: " + JSON.stringify(data.ref['@ref'].id));
        console.log(data.ref['@ref'].id, "from add updata")
        setTodo(data);
      });
  }
if (isloading)
    return <h1>loading . . . </h1>

  return (

    <div className="App">
      <Header />
      <div className="primary"> <form>
        <input value={input} onChange={(e) => setInput(e.target.value)}></input>
        <button onClick={() => handleadd(input)}>add</button>
      </form>
        {
          mydata?.map((d) => <div className="single-data"
            key={d.ref['@ref'].id}>
            <div className="heading">
              <h2>
                {JSON.stringify(d.data.task)}

              </h2>
            </div>

            <div className="btns">
              <button onClick={() => handledelete(d.ref['@ref'].id)}>delete</button>
              <button onClick={() => handleupdate(d.ref['@ref'].id, "now")}>update</button>
            </div>

          </div>
          )}
      </div>





    </div >
  );
}

export default App;
