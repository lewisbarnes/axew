import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <div className="bg-[#313131] min-h-screen"><Component {...pageProps} /></div>;
};

export default MyApp;
