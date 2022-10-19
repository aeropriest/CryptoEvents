import { Fragment } from "react";
import MainHeader from "./MainHeader";

export default function Layout(props) {
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      <Notification title="Test" message="This is a test" status="error" />
    </Fragment>
  );
}
