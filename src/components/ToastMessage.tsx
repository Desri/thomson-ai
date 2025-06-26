import {  XMarkIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { ToastContentProps } from "react-toastify";

const CheckIcon = () => (
  <svg
    width="32"
    height="33"
    viewBox="0 0 32 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M27.6935 8.45795C27.7906 8.55487 27.8677 8.67 27.9203 8.79676C27.9729 8.92351 28 9.0594 28 9.19663C28 9.33387 27.9729 9.46976 27.9203 9.59651C27.8677 9.72327 27.7906 9.8384 27.6935 9.93532L13.0867 24.5421C12.9898 24.6392 12.8747 24.7163 12.7479 24.7689C12.6212 24.8215 12.4853 24.8486 12.348 24.8486C12.2108 24.8486 12.0749 24.8215 11.9482 24.7689C11.8214 24.7163 11.7063 24.6392 11.6094 24.5421L4.30597 17.2387C4.11006 17.0428 4 16.7771 4 16.5C4 16.223 4.11006 15.9572 4.30597 15.7613C4.50188 15.5654 4.7676 15.4554 5.04466 15.4554C5.32172 15.4554 5.58743 15.5654 5.78334 15.7613L12.348 22.3281L26.2161 8.45795C26.313 8.36079 26.4282 8.2837 26.5549 8.2311C26.6817 8.1785 26.8176 8.15143 26.9548 8.15143C27.092 8.15143 27.2279 8.1785 27.3547 8.2311C27.4814 8.2837 27.5966 8.36079 27.6935 8.45795Z"
      fill="#0A8217"
    />
  </svg>
);

export const ToastMessage = ({
  closeToast,
  data: { message, type },
}: ToastContentProps<{ message: string; type: "success" | "error" }>) => {
  return (
    <div
      className={clsx(
        "pointer-events-auto w-full overflow-hidden rounded ring-1 transition data-[closed]:data-[enter]:translate-y-2 data-[enter]:transform data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:data-[enter]:sm:translate-x-2 data-[closed]:data-[enter]:sm:translate-y-0",
        {
          "bg-green-50 ring-green-500": type === "success",
          "bg-red-50 ring-red-500": type === "error",
        }
      )}
    >
      <div className="py-4 px-6">
        <div className="flex items-center">
          <div className="shrink-0">
            {type === "success" && <CheckIcon />}
            {type === "error" && <XMarkIcon className="size-8 text-red-500" />}
          </div>
          <div className="ml-4 w-0 flex-1 pt-0.5">
            <p className="text-black">{message}</p>
          </div>
          <div className="ml-4 flex shrink-0">
            <button
              type="button"
              onClick={closeToast}
              className="inline-flex text-charcoal-blue hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="sr-only">Close</span>
              <XMarkIcon aria-hidden="true" className="size-8" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
