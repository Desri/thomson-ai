
import { toast } from "react-toastify";
import { ToastMessage } from "../components/ToastMessage";

export const showErrorToast = (message) => {
  toast(ToastMessage, {
    data: {
      message: message ?? "Something went wrong",
      type: "error",
    },
  });
};

export const showSuccessToast = (message) => {
  toast(ToastMessage, {
    data: {
      message,
      type: "success",
    },
  });
};
