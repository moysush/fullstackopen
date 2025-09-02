import { useState, useImperativeHandle, forwardRef } from "react";

const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {toggleVisibility}
    })

    return (
        <div>
            {visible ? (
                <div>
                    {props.children}
                    <button onClick={toggleVisibility}>Cancel</button>
                </div>
            ) : (
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            )}
        </div>
    )
})

Togglable.displayName = 'Togglable'

export default Togglable