import styles from "./Login.module.css";
import cartpng from "../assets/R.png"

function Login() {
  return (
    <>
      <span className={styles.spanContainer}>
        <div className={styles.textContainer}>
        <b className={styles.loginHeader}>Login</b>
        <br></br>
        <p className={styles.loginText}>
        Get access to your <br></br>Orders,Cart and more
        </p>
        </div>
        <img src={cartpng} className={styles.cartImage}></img>
      </span>
      <span  className={styles.spanContainer2}>
          
      </span>
    </>
  );
}

export default Login;