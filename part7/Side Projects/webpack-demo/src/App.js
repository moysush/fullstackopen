import React, { useState } from "react";
import './index.css'

const App = () => {
    const [counter, setCounter] = useState(0)
    const [value, setValue] = useState([])

    const handleCLick = () => {
        setCounter(counter+10)
        setValue(value.concat(counter))
    }
    return (
        <div className="container">
            hello, webpack {counter} clicks
            <button onClick={handleCLick}>
                press
            </button>
            {value}
        </div>
    )
}

export default App