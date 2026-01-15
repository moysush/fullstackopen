import { useSelector } from "react-redux";

export const Notification = () => {
  const notification = useSelector((state) => state.notification);

  const isSuccess = notification?.includes("successfully");

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 pointer-events-none transition-all duration-500 ease-out translate-y-0 opacity-100">
      {notification && (
        <div
          className={`flex items-center p-4 rounded-xl shadow-2xl border transition-all animate-bounce-subtle pointer-events-auto
            ${
              isSuccess
                ? "bg-white border-emerald-100 text-emerald-800 shadow-emerald-100/50"
                : "bg-white border-rose-100 text-rose-800 shadow-rose-100/50"
            }
          `}
        >
          <div
            className={`mr-3 p-2 rounded-full ${isSuccess}? "bg-emerald-50" : "bg-rose-50"}`}
          >
            {isSuccess ? (
              <svg
                className="w-5 h-5 text-emerald-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-rose-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </div>
          <span className="text-sm font-bold tracking-tight">
            {notification}
          </span>
        </div>
      )}
    </div>
  );
};
