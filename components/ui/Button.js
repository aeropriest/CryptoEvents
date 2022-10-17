import Link from "next/link";
import classes from "./Button.module.css";

export default function Button(props) {
  console.log("button ", props);
  if (props.link) {
    return (
      <Link href={props.link}>
        <a className={classes.btn}>{props.children}</a>
      </Link>
    );
  }
  return (
    <button className={classes.btn} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
