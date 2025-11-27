import { useState } from "react"

// customHooks

export const useField = (name) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const clear = () => {
        setValue('')
    }

    return {
        name, value, onChange, clear
    }

}