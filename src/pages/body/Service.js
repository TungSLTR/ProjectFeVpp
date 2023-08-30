import React from "react";


export default function Service() {
  return (
    <section class="shopify-section spaced-section">
      <div class="service">
        <div class="container">
          <h2 class="section-header"></h2>
          <p class="section-text"></p>

          <div class="row">
            <div class="col-lg-3 col-sm-6 list-icon">
              <div class="service-content icon-left">
                <div class="service-icon">
                  <div class="service-icon-svg">
                   <img src="./img/home/online-order.png" width={35} height={29}></img>
                  </div>
                </div>
                <div class="service-decoration">
                  <h3 class="service-title">Đặt hàng Online</h3>
                  {/* <p class="service-text">Đơn hàng trên 500.000đ</p> */}
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-sm-6 list-icon">
              <div class="service-content icon-left">
                <div class="service-icon">
                  <div class="service-icon-svg">
                  <img src="./img/home/delivery.png" width={35} height={29}></img>
                  </div>
                </div>

                <div class="service-decoration">
                  <h3 class="service-title">Giao hàng siêu tốc</h3>
                  {/* <p class="service-text service-text-1">Đảm bảo 100%</p> */}
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-sm-6 list-icon">
              <div class="service-content icon-left">
                <div class="service-icon">
                  <div class="service-icon-svg">
                  <img src="./img/home/free-delivery.png" width={35} height={29}></img>
                  </div>
                </div>

                <div class="service-decoration">
                  <h3 class="service-title">Miễn phí giao hàng</h3>
                  {/* <p class="service-text">Tận hưởng khuyến mãi lớn</p> */}
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-sm-6 list-icon">
              <div class="service-content icon-left">
                <div class="service-icon">
                  <div class="service-icon-svg">
                  <img src="./img/home/return-box.png" width={35} height={29}></img>
                  </div>
                </div>

                <div class="service-decoration">
                  <h3 class="service-title">Cho đổi trả hàng</h3>
                  {/* <p class="service-text">Hỗ trợ tận tình 24/7</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
