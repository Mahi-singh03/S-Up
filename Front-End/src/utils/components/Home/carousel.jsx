import React, { useRef } from "react";
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const App = () => {
  const slides = [
    {
      image: "https://res.cloudinary.com/dufxj1sau/image/upload/v1739518347/Carousel-images/ashhy8goso3jgw0ze5p7.jpg",
      quote: "Your limitation—it’s only your imagination.",
    },
    {
      image: "https://res.cloudinary.com/dufxj1sau/image/upload/v1739518347/Carousel-images/hlrlppdqd3zwtglhuq4z.jpg",
      quote: "Push yourself, because no one else is going to do it for you.",
    },
    {
      image: "https://res.cloudinary.com/dufxj1sau/image/upload/v1739518346/Carousel-images/oodqvkbfoik0gzfmbsot.jpg",
      quote: "Great things never come from comfort zones.",
    },
  ];

  const carouselRef = useRef(null);

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <h2 style={{ textAlign: "center" }}>🌟 Stay Motivated 🌟</h2>

      {/* Navigation Arrows */}
      <button
        onClick={() => carouselRef.current?.prev()}
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          background: "rgba(0, 0, 0, 0.5)",
          color: "white",
          border: "none",
          padding: "10px",
          borderRadius: "50%",
          cursor: "pointer",
          fontSize: "20px",
          zIndex: 10,
        }}
      >
        <LeftOutlined />
      </button>

      <button
        onClick={() => carouselRef.current?.next()}
        style={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          background: "rgba(0, 0, 0, 0.5)",
          color: "white",
          border: "none",
          padding: "10px",
          borderRadius: "50%",
          cursor: "pointer",
          fontSize: "20px",
          zIndex: 10,
        }}
      >
        <RightOutlined />
      </button>

      {/* Carousel Component */}
      <Carousel autoplay autoplaySpeed={5000} ref={carouselRef}>
        {slides.map((slide, index) => (
          <div key={index} style={{ position: "relative", textAlign: "center" }}>
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(0, 0, 0, 0.6)",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "5px",
                fontSize: "16px",
                fontWeight: "bold",
                width: "80%",
                textAlign: "center",
                wordWrap: "break-word",
                whiteSpace: "normal",
              }}
            >
              {slide.quote}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default App;
