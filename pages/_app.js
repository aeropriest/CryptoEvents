import "../styles/globals.css";
import Layout from "../components/layout/layout";
import { NotificationContextProvide } from "../store/notification-context";
import Head from "next/head";
function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvide>
      <Layout>
        <Head>
          <title>Crypto Events Directory</title>
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvide>
  );
}

export default MyApp;
