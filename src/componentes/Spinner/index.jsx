import styles from "./Loader.module.css";

function Spinner({ $login = false }) {
  return (
    <div className={styles.container}>
      <div
        className={!$login ? styles.loader : styles.loaderLogin}
      >
      </div>
    </div>
  );
}

export default Spinner;