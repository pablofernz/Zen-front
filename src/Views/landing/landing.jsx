import PageLoader from "../../components/pageLoader.jsx/pageLoader";
import style from "./landing.module.css";

const Landing = () => {
  return (
    <div className={style.landingPage}>
      <PageLoader option="load" />
      <div className={style.icon}><p>zen</p></div>
    </div>
  );
};

export default Landing;
