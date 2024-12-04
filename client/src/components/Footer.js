import React from "react";
import { FaFacebook } from "react-icons/fa";
import { TbBrandTiktok } from "react-icons/tb";
import { SiZalo } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Col 1 */}
          <div>
            <img
              src="/images/logo-shopdunk.png"
              alt="ShopDunk Logo"
              className="w-32 mb-4"
            />
            <p className="text-sm text-color-footer">
              Năm 2020, ShopDunk trở thành đại lý ủy quyền của Apple. Chúng tôi
              phát triển chuỗi cửa hàng tiêu chuẩn và Apple Mono Store nhằm mang
              đến trải nghiệm tốt nhất về sản phẩm và dịch vụ của Apple cho
              người dùng Việt Nam.
            </p>
            <div className="mt-4">
              <div className="flex items-center mb-2 text-color-footer">
                <FaFacebook className="mr-2" />
                <span>Facebook</span>
              </div>
              <div className="flex items-center mb-2 text-color-footer">
                <TbBrandTiktok className="mr-2" />
                <span>TikTok</span>
              </div>
              <div className="flex items-center text-color-footer">
                <SiZalo className="mr-2" />
                <span>Zalo</span>
              </div>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h3 className="text-15 text-color-title-footer font-semibold mb-4">Thông tin</h3>
            <ul>
              <li>
                <a href="#" className="text-color-footer hover:underline">
                  Tin Tức
                </a>
              </li>
              <li>
                <a href="#" className="text-color-footer hover:underline">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href="#" className="text-color-footer hover:underline">
                  Check IMEI
                </a>
              </li>
              <li>
                <a href="#" className="text-color-footer hover:underline">
                  Phương thức thanh toán
                </a>
              </li>
              <li>
                <a href="#" className="text-color-footer hover:underline">
                  Thuê điểm bán lẻ
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h3 className="text-15 text-color-title-footer font-semibold mb-4">Chính sách</h3>
            <ul>
              <li>
                <a href="#" className="text-color-footer hover:underline">
                  Thu cũ đổi mới
                </a>
              </li>
              <li>
                <a href="#" className="text-color-footer hover:underline">
                  Giao hàng
                </a>
              </li>
              <li>
                <a href="#" className="text-color-footer hover:underline">
                  Giao hàng (ZaloPay)
                </a>
              </li>
              <li>
                <a href="#" className="text-color-footer hover:underline">
                  Hủy giao dịch
                </a>
              </li>
              <li>
                <a href="#" className="text-color-footer hover:underline">
                  Đổi trả
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h3 className="text-15 text-color-title-footer font-semibold mb-4">Địa chỉ & Liên hệ</h3>
            <ul>
              <li>
                <a href="#" className="text-color-footer hover:underline">
                  Tài khoản của tôi
                </a>
              </li>
              <li>
                <a href="#" className="text-color-footer hover:underline">
                  Đơn đặt hàng
                </a>
              </li>
              <li>
                <a href="#" className="text-color-footer hover:underline">
                  Hệ thống cửa hàng
                </a>
              </li>
              <li>
                <a href="#" className="text-color-footer hover:underline">
                  Tìm Store trên Google Map
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-600 pt-4 text-center text-sm text-color-footer">
          <p>
            &copy; 2016 Công ty Cổ Phần HESMAN Việt Nam - All Rights Reserved.
          </p>
          <p>
            Địa chỉ: Số 76 Thái Hà, phường Trung Liệt, quận Đống Đa, thành phố
            Hà Nội, Việt Nam.
          </p>
          <p>Email: lienhe@shopdunk.com</p>
        </div>

        <div className="flex justify-center space-x-4 mt-4">
          <button className="bg-orange-500 text-white py-2 px-6 rounded-full text-sm">
            Mua hàng: 1900.6626
          </button>
          <button className="bg-black-800 text-white py-2 px-6 rounded-full text-sm">
            Bảo hành: 1900.8036
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
