import styles from "./Loader.module.css";

function Loader({ $login = false }) {
  return (
    <div className={styles.container}>
      <div
        className={!$login ? styles.loader : styles.loaderLogin}
      >
      </div>
    </div>
  );
}

export default Loader;