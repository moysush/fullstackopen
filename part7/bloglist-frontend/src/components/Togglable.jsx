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
    <div className="mt-8 flex justify-center">
      {!visible ? (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
          <button
            className="text-lg bg-violet-600/80 hover:bg-violet-700 text-white font-bold px-8 py-4 rounded-full shadow-2xl shadow-violet-300 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 whitespace-nowrap backdrop-blur-md"
            onClick={toggleVisibility}
          >
            {props.buttonLabel}
          </button>
        </div>
      ) : (
        <div>
          {props.children}
          <button
            className="mx-auto block mt-4 bg-violet-50 border-2 border-slate-200 text-slate-600 hover:border-violet-500 hover:text-violet-500 font-bold py-3 px-4 rounded-full transition-all active:scale-95bg-transparent border-2 border-slate-200 text-slate-500 hover:border-violet-400 hover:text-violet-500 font-bold py-4 px-8 rounded-full transition-all active:scale-95"
            onClick={toggleVisibility}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
});

Togglable.displayName = "Togglable";

export default Togglable;
