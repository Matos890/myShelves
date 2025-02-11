import styles from "./Button.module.css";
function Button({ children, type }) {
  return <button className=" inline-block rounded-4xl md:w-[9rem] bg-neutral-800 border-[0.5px] border-neutral-400 stone-50  text-neutral-400 text-[1.5rem] py-2 px-2 hover:bg-neutral-700 hover:border-none  duration-750 ease-out cursor-pointer hover:text-blue-100">{children}</button>;
}

export default Button;
