import { easeInOut } from "framer-motion";

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 2, ease: "easeInOut" } },
  exit: { opacity: 0, transition: { duration: 2, ease: "easeInOut" } },
};
