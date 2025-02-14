import React, { useState, useEffect, useCallback, useRef } from "react";
import "./Gift.css";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.jpg";
import image5 from "../assets/image5.jpg";
import { SiTinyletter } from "react-icons/si";
import { IoImagesOutline } from "react-icons/io5";
import { GiTimeBomb } from "react-icons/gi";
import { useAudio } from "../AudioContext";
const Gift = () => {
  const [selectedGift, setSelectedGift] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [timeTogether, setTimeTogether] = useState({});

  // Danh sách ảnh mẫu - thay thế bằng đường dẫn ảnh của bạn
  const images = [image2, image3, image4, image5];
  const intervalRef = useRef();
  const { play, pause } = useAudio();

  useEffect(() => {
    play(); // Tiếp tục phát nhạc khi vào trang
    return () => pause(); // Tạm dừng khi rời trang
  }, [play, pause]);

  // Tính thời gian yêu nhau
  useEffect(() => {
    const startDate = new Date("2023-06-17"); // Thay đổi ngày bắt đầu
    const timer = setInterval(() => {
      const now = new Date();
      const diff = now - startDate;

      const years = now.getFullYear() - startDate.getFullYear();
      const months = now.getMonth() - startDate.getMonth();
      const days = now.getDate() - startDate.getDate();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      setTimeTogether({
        years,
        months,
        days,
        hours,
        minutes,
        seconds,
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const startAutoSlide = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
  }, [images.length]);

  useEffect(() => {
    if (selectedGift === 2) {
      startAutoSlide();
    }
    return () => stopAutoSlide();
  }, [selectedGift, startAutoSlide]);

  const stopAutoSlide = () => {
    clearInterval(intervalRef.current);
  };

  const renderImages = () => {
    return [0, 1].map((offset) => {
      const index = (startIndex + offset) % images.length;
      return (
        <div
          key={index}
          className="slide-image"
          style={{
            backgroundImage: `url(${images[index]})`,
            animationDelay: `${offset * 0.2}s`,
          }}
        >
          <div className="image-overlay" />
        </div>
      );
    });
  };

  return (
    <div className="gift-container">
      {!selectedGift ? (
        <div className="gift-boxes">
          <div className="gift-box" onClick={() => setSelectedGift(1)}>
            <SiTinyletter /> <span>Lời Chúc</span>
          </div>
          <div className="gift-box" onClick={() => setSelectedGift(2)}>
            <IoImagesOutline /> <span>Ảnh Chúng Mình</span>
          </div>
          <div className="gift-box" onClick={() => setSelectedGift(3)}>
            <GiTimeBomb />
            <span>Thời Gian Yêu Nhau</span>
          </div>
        </div>
      ) : (
        <div className="gift-content">
          {selectedGift === 1 && (
            <div className="wish-modal">
              <h2>Lời Chúc Từ Trái Tim ❤️</h2>
              <p>
                Bé à , hôm nay là Valentine's a chúc bé có một ngày lễ thật vui
                và hạnh phúc , ngày càng xinh đẹp học giỏi và đặc biệt yêu anh
                nhiều hơn ... Anh yêu bé hihi ❤️❤️
              </p>
              <button onClick={() => setSelectedGift(null)}>Quay lại</button>
            </div>
          )}

          {selectedGift === 2 && (
            <div className="image-modal">
              <button className="nav-button prev" onClick={handlePrevImage}>
                ‹
              </button>
              <div style={{ display: "flex", gap: "10px" }}>
                <img src={images[currentImage]} alt="Kỷ niệm" />
                <img
                  src={
                    images[
                      currentImage === images.length - 1 ? 0 : currentImage + 1
                    ]
                  }
                  alt="Kỷ niệm"
                />
              </div>
              <button className="nav-button next" onClick={handleNextImage}>
                ›
              </button>
              <button
                className="close-button"
                onClick={() => setSelectedGift(null)}
              >
                Quay lại
              </button>
            </div>
          )}

          {selectedGift === 3 && (
            <div className="timer-modal">
              <h2>Chúng ta đã yêu nhau được:</h2>
              <div className="timer-display">
                <div>1 NĂM</div>
                <div>7 THÁNG</div>
                <div>4 TUẦN</div>
                <div>0 NGÀY</div>
                <div>{timeTogether.hours} GIỜ</div>
                <div>{timeTogether.minutes} PHÚT</div>
                <div>{timeTogether.seconds} GIÂY</div>

                <div>608 NGÀY ĐANG YÊU</div>
              </div>
              <button onClick={() => setSelectedGift(null)}>Quay lại</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Gift;
