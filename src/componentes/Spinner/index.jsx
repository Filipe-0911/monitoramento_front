import styles from "./Loader.module.css";

function Spinner({ $ehDeBotao = false }) {
  return (
    <div className={styles.container}>
      <div
        className={!$ehDeBotao ? styles.loader : styles.loaderLogin}
      >
      </div>
    </div>
  );
}

export default Spinner;