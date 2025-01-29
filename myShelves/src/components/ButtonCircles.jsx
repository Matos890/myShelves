import styles from './ButtonCircles.module.css'
function ButtonCircles({onClick,color, children}) {
  return <>
  
        <button onClick={onClick}  className={`${styles.buttonPlusAdd} ${styles[color]}`}>
            <span>{children}</span>
        </button>
  </>;
}

export default ButtonCircles;
