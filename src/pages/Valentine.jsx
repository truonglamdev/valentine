import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/image1.jpg";
import "./Valentine.css";
import { Fireworks } from "fireworks-js";
import Animation from "./Animation";
import { useAudio } from "../AudioContext";
const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
  color: white;
  font-family: "Arial", sans-serif;
`;

const Title = styled(motion.h1)`
  font-size: 30px;
  margin-bottom: 20px;
  font-weight: bold;
  color: #ee5d87;
`;

const Image = styled(motion.img)`
  width: 300px;
  height: auto;
  object-fit: cover;
  image-rendering: -webkit-optimize-contrast; /* For Webkit (Chrome, Safari) */
  image-rendering: crisp-edges; /* For Firefox */
  image-rendering: pixelated;
`;

const PasscodeInput = styled(motion.input)`
  padding: 10px;
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  outline: none;
  margin-bottom: 20px;
  background-color: #ff9a9e;
  width: 380px;
  color: #fff;

  &::placeholder {
    color: #fff; /* Màu placeholder */
    opacity: 1;
  }
`;

const Keyboard = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const Key = styled(motion.button)`
  padding: 12px;
  font-size: 1.5rem;
  border: none;
  border-radius: 10px;
  background: #ff9a9e;
  color: #fff;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 1);
  }
`;

const Valentine = () => {
  const [isCorrect, setIsCorrect] = useState(false);
  const [passcode, setPasscode] = useState("");
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const fireworksRef = useRef(null);
  const { play, pause } = useAudio();

  useEffect(() => {
    play(); // Tiếp tục phát nhạc khi vào trang
    return () => pause(); // Tạm dừng khi rời trang
  }, [play, pause]);

  const startFireworks = () => {
    if (fireworksRef.current) {
      fireworksRef.current.stop();
    }

    fireworksRef.current = new Fireworks(containerRef.current, {
      autoresize: true,
      rocketsPoint: { min: 0, max: 100 },
      hue: { min: 0, max: 360 },
      delay: { min: 15, max: 30 },
      speed: 2,
      acceleration: 1.05,
      friction: 0.98,
      gravity: 1,
      explosion: 8,
      intensity: 50,
      traceLength: 3,
      traceSpeed: 2,
      lineWidth: { explosion: { min: 1, max: 3 }, trace: { min: 1, max: 2 } },
      flickering: 50,
      opacity: 0.5,
      colors: ["#ff0000", "#00ff00", "#0000ff", "#ff00ff", "#ffff00"],
      zIndex: 1000,
    });

    fireworksRef.current.start();

    // setTimeout(() => {
    //   fireworksRef.current.stop();
    // }, 5000);
  };

  const handleKeyClick = (value) => {
    if (passcode.length < 4) {
      setPasscode((prev) => prev + value);
    }
  };

  const handleBackspace = () => {
    setPasscode((prev) => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    if (passcode.length === 4 && passcode === "2510") {
      setIsCorrect(true);
      setTimeout(() => {
        setIsCorrect(false);
        navigate("/gift");
      }, 5000);
      // startFireworks();
      // navigate("/gift");
    } else {
      alert("Đây không phải là người yêu Lâm Trường!");
      setPasscode("");
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        // zIndex: 9999, // Đảm bảo Fireworks hiển thị trên cùng
        background: "transparent",
      }}
    >
      <Container
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div
          className="image-bg"
          style={{
            backgroundColor: "#fad0c4",
            width: "60%",
            border: "4px solid #fff",
            padding: "40px",
            borderRadius: "16px",
          }}
        >
          <Title
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Happy Valentine's Day
          </Title>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "100px",
            }}
          >
            <Image
              src={image1} // Thay thế bằng URL hình ảnh của bạn
              alt="Valentine's Day"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, delay: 1 }}
            />
            <div style={{ width: "400px" }}>
              <PasscodeInput
                type="text"
                placeholder="Nhập mật khẩu ..."
                maxLength="4"
                value={passcode}
                readOnly // Ngăn người dùng nhập từ bàn phím vật lý
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
              />
              <Keyboard
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2 }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                  <Key
                    key={number}
                    onClick={() => handleKeyClick(number.toString())}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {number}
                  </Key>
                ))}
                <Key
                  onClick={handleBackspace}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ⌫
                </Key>
                <Key
                  onClick={() => handleKeyClick("0")}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  0
                </Key>
                <Key
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    gridColumn: "span 3",
                    background: "#ff6f61",
                    color: "white",
                  }}
                >
                  {isCorrect ? "ĐÚNG RỒI .." : "Xác nhận người yêu"}
                </Key>
              </Keyboard>
            </div>
          </div>
        </div>
      </Container>
      {isCorrect && <Animation />}
    </div>
  );
};

export default Valentine;
