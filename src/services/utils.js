import { toast } from "react-toastify";

export function notify(message, type) {
  return toast(message, { type: type });
}
