
import '../css/account.css'
import '../css/AdLayout.css'
import '../css/addmenu.css'
import '../css/blog.css'
import '../css/blogall.css'
import '../css/cart.css'
import '../css/category.css'
import '../css/contact.css'
import '../css/detail.css'
import '../css/footer.css'
import '../css/header.css'
import '../css/login.css'
import '../css/menulist.css'
import '../css/notfound.css'
import '../css/pagmui.css'
import '../css/partner.css'
import '../css/payment.css'
import '../css/policyBody.css'
import '../css/product.css'
import '../css/productlist.css'
import '../css/productslide.css'
import '../css/quantities.css'
import '../css/service.css'
import '../css/loading.css'
import '../css/slideheader.css'
import React from 'react';

import '../css/SlideshowGallery.css'
import '../css/stationery.css'
import '../css/stationerycompany.css'
import '../css/subscribe.css'
import '../css/selectsection.css'
import dynamic from 'next/dynamic'
import "../css/global.css"
import { Provider } from "react-redux";
import { persistor, store } from "../redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
const Footer = dynamic(
  () => import('./Footer'),
  { ssr: false }
)
const Header = dynamic(
  () => import('./Header'),
  { ssr: false }
)
import { useRouter } from "next/router";
import 'bootstrap/dist/css/bootstrap.css';

import '../css/global.css';
import '../css/account.css';
import Head from "next/head"
// Import các file css khác


// const RootStyleRegistry = ({ children }: PropsWithChildren) => {
//   const [cache] = useState(() => createCache())

//   useServerInsertedHTML(() => {
//     return (
//       <script
//         dangerouslySetInnerHTML={{
//           __html: `</script>${extractStyle(cache)}<script>`,
//         }}
//       />
//     )
//   })

//   return <StyleProvider cache={cache}>{children}</StyleProvider>
// }
// function RootLayout({ children }: PropsWithChildren) {
//   return (
//     <html lang="es">
//       <head />
//       <body>
//         <RootStyleRegistry>{children}</RootStyleRegistry>
//       </body>
//     </html>
//   )
// };
function Layout({ children }) {
  return (

    <div>

      <Header />

      {children}
      <Footer />
    </div>

  );
}

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  console.log("pageProps", pageProps);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
    };
    const end = () => {
      console.log("findished");
      setLoading(false);
    };
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, []);
  const { openGraphData = [] } = pageProps;
  const isAdLayout = router.pathname.startsWith("/admin");

  const isBrowser = typeof window !== 'undefined';
  let title = pageProps.title ? pageProps.title : "Văn Phòng Phẩm Vũ Phong";
  let description = pageProps.description ? pageProps.description : "Văn Phòng Phẩm Vũ Phong - Cung cấp đồ dùng văn phòng phẩm, học tập - Website : http://vppphucuong.vn/ - Hotline : 0901878886.";
  let image = pageProps.image ? pageProps.image : `./img/home/logovpp.png`;
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <title>{title}</title>
        <meta
          property="og:title"
          content={title}
          key="title"
        />
        <meta property="og:description" content={description} />
        <meta name="description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:image:width" content="436" />
        <meta property="og:image:height" content="228" />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/img/home/logovpp.png" />
        <link rel="icon" href="/img/home/logovpp.png" />
      </Head>

      {isBrowser ? (
        isAdLayout ? (
          <div>
            {loading ? (
              <div className="loadpage">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            ) : (
              <Component {...pageProps} />
            )}
          </div>
        ) : (
          <>
            {loading ? (
              <div className="loadpage">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            ) : (
              <Layout>

                <Component {...pageProps} />


              </Layout>

            )}
          </>
        )
      ) : (
        <PersistGate persistor={persistor} loading={null}>
          {() => (
            <>
              {loading ? (
                <div className="loadpage">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              ) : (<Layout>

                <Component {...pageProps} />

              </Layout>
              )}
            </>)
          }

        </PersistGate>
      )}
      {/* </PersistGate> */}
    </Provider>
  );
}