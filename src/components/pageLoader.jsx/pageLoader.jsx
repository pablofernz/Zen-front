import useViewportWidth from "../../Hooks/useViewportWidth";
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
      {useViewportWidth() > 900 ? (
        <p>zen</p>
      ) : (
        <div>
          <p>Z</p>
          <p>E</p>
          <p>N</p>
        </div>
      )}
    </motion.div>
  );
};

export default PageLoader;
