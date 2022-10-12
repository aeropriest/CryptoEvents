import Link from "next/link";
import classes from "./Button.module.css";

export default function Button(props) {
  if (props.link) {
    <Link href={props.link}>
      <a className={classes.btn}>{props.children}</a>
    </Link>;
  }
  return (
    <button onClick={props.onClick} className={classes.btn}>
      {props.children}
    </button>
  );
}
