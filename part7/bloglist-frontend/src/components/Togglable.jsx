import { useState, useImperativeHandle, forwardRef } from "react";

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      {!visible ? (
        <div>
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>
      ) : (
        <div>
          {props.children}
          <button onClick={toggleVisibility}>Cancel</button>
        </div>
      )}
    </div>
  );
});

Togglable.displayName = "Togglable";

export default Togglable;
