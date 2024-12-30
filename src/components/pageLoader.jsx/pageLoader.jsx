import style from "./pageLoader.module.css";
import { motion } from "framer-motion";

const PageLoader = ({ option }) => {
  return (
    <motion.div
      initial={{ y: option == "load" ? "0dvh" : "100dvh" }}
      animate={{ y: option == "load" ? "100dvh" : "0dvh" }}
      transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
      className={style.pageLoader}
    >
      <p>zen</p>
    </motion.div>
  );
};

export default PageLoader;
