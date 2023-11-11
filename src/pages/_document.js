import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* <link rel="icon" href="/gamezone.png" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" /> 
          <title>GameZone</title>
          <meta name="description" content="Trang linh kiện máy tính" />
          <meta property="og:title" content="Gaming Zone" />
          <meta
            property="og:image"
            content="https://firebasestorage.googleapis.com/v0/b/vpppc-e2bf0.appspot.com/o/product%2Fadmin.png?alt=media&token=418f424c-c2d4-4dc0-9fc8-f0385991282d"
          />
          <meta name="og:description" content="Trang linh kiện máy tính" />
          <meta property="og:image:width" content="436" />
          <meta property="og:image:height" content="228" /> */}
          {/* Thêm các thẻ script
          <script
            src="https://kit.fontawesome.com/cec61f0ed0.js"
            crossOrigin="anonymous"
            async
          />
          {/* Thêm các thẻ link */}

          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.0/css/bootstrap.min.css"
            async
          />

          <script
          rel="stylesheet"
            src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.0/js/bootstrap.bundle.min.js"
            async
          ></script>

          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"
            async
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css"
            async
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"
            async
          />
          {/* Thêm các thẻ script */}
          <script
          rel="stylesheet"
            type="text/javascript"
            src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"
            async
          />
          <script src="https://code.jquery.com/jquery-3.5.1.min.js" async />
          <script
          rel="stylesheet"
            src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js"
            async
          />
        </Head>
        <body>
          <div id="fb-root"></div>

          <div id="fb-customer-chat" class="fb-customerchat"></div>

          <Script
            id="messenger-tag"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `      var chatbox = document.getElementById('fb-customer-chat');
            chatbox.setAttribute("page_id", "107543292366543");
            chatbox.setAttribute("attribution", "biz_inbox");`,
            }}
          ></Script>

          <Script
            id="messenger-sdk"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: ` window.fbAsyncInit = function() {
              FB.init({
                xfbml            : true,
                version          : 'v17.0'
              });
            };
      
            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));`,
            }}
          ></Script>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
