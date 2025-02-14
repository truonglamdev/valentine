import { useEffect, useRef } from "react";
import "./Home.css"; // Tạo file CSS riêng
import { CiGift } from "react-icons/ci";
import music from "../assets/music.mp3";
import { useAudio } from "../AudioContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const audioRef = useRef(null);
  const transitionRef = useRef(null);

  // Tạo hiệu ứng trái tim bay
  useEffect(() => {
    const createHearts = () => {
      const heartsContainer = document.getElementById("hearts");
      if (!heartsContainer) return;

      for (let i = 0; i < 10; i++) {
        const heart = document.createElement("div");
        heart.innerHTML = "❤";
        heart.className = "heart";
        heart.style.left = Math.random() * 100 + "%";
        heart.style.animationDelay = Math.random() * 2 + "s";
        heartsContainer.appendChild(heart);
      }
    };
    createHearts();
  }, []);

  const navigate = useNavigate();
  const { play, pause } = useAudio();
  // Xử lý click button
  const handleGiftClick = () => {
    if (transitionRef.current) {
      transitionRef.current.classList.add("fade-out");
    }

    // Chuyển trang sau 500ms
    setTimeout(() => {
      pause();
      navigate("/valentine");
    }, 500);
  };

  useEffect(() => {
    play(); // Tiếp tục phát nhạc khi vào trang
    return () => pause(); // Tạm dừng khi rời trang
  }, [play, pause]);

  return (
    <div className="container">
      <div className="hearts" id="hearts" />

      <button
        className="gift-button"
        onClick={handleGiftClick}
        aria-label="Open gift"
      >
        <CiGift style={{ fontSize: "130px" }} />
        <span style={{ fontSize: "20px", fontWeight: "bold" }}>Click!!</span>
      </button>

      <div className="text">Nhận Quà Nào ❤️</div>

      {/* Hiệu ứng chuyển trang */}
      <div className="page-transition" ref={transitionRef} />

      {/* Nhạc nền */}
    </div>
  );
};

export default Home;
