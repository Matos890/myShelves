import styles from "./Button.module.css";
function Button({ children, type }) {
  return <button className={`${styles.button}`}>{children}</button>;
}

export default Button;
