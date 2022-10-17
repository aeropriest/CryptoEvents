import Link from "next/link";
import Image from "next/image";
import classes from "./EventItem.module.css";
import Button from "../ui/button";
import DateIcon from "../icons/date-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
import AddressIcon from "../icons/address-icon";

export default function EventItem(props) {
  const { title, image, date, location, id } = props;
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedAddress = location.replace(", ", "\n");
  const exporeLink = `/events/${id}`;
  console.log(image);

  function handleClick() {
    console.log("handle bnutton click");
  }
  return (
    <li className={classes.item}>
      <Image src={"/" + image} alt={title} width={340} height={260} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exporeLink} onClick={handleClick}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}
