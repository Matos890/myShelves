import styles from './ButtonCircles.module.css'
function ButtonCircles({onClick,color, children}) {
  return <>
  
        <button onClick={onClick}  className={`w-[3rem] h-[3rem] bg-neutral-800 border-[0.5px] rounded-4xl text-neutral-400 border-neutral-400 ${styles[color]}`}>
            <span className='hover:text-blue-100 text-neutral-400 text-[1.5rem]'>{children}</span>
        </button>
  </>;
}

export default ButtonCircles;
