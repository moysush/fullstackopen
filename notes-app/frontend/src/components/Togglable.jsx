import { useState } from "react";

const Togglable = (props) => {
    const [visible, setVisible] = useState(false)

    return (
        <div>
            {visible ? (
                <div>
                    {props.children}
                    <button onClick={() => setVisible(!visible)}>Cancel</button>
                </div>
            ) : (
                <button onClick={() => setVisible(!visible)}>{props.buttonLabel}</button>
            )}
        </div>
    )
}

export default Togglable