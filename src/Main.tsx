import { useState, useEffect } from "react";

type Image = {
  images: [];
};

async function getImages(): Promise<Image> {
  const url = "https://slider.ymatuhin.workers.dev/";
  const response = await fetch(url);
  return response.json();
}

export const Main = () => {
  const [images, setImages] = useState([]);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    async function response() {
      const imagesArr = await getImages();
      setImages(imagesArr.images);
    }
    response();
  }, []);

  useEffect(() => {
    const interval = setTimeout(() => {
      setActiveImage(activeImage === numberPhoto - 1 ? 0 : activeImage + 1);
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  });

  const numberPhoto = images.length;

  function nextClick() {
    setActiveImage(activeImage === numberPhoto - 1 ? 0 : activeImage + 1);
  }

  function prevClick() {
    setActiveImage(activeImage === 0 ? numberPhoto - 1 : activeImage - 1);
  }

  const buttonImage = [];

  for (let i = 0; i < numberPhoto; i++) {
    buttonImage.push(i);
  }

  return (
    <div
      className="carousel slide"
      style={{ maxWidth: "1024px", margin: "auto auto" }}
    >
      <div className="carousel-indicators">
        {buttonImage.map((button) => (
          <button
            onClick={() => setActiveImage(button)}
            className={button === activeImage ? "active" : ""}
            key={button}
            type="button"
            disabled={button === activeImage}
            data-bs-target
          ></button>
        ))}
      </div>
      <div className="carousel-inner">
        {images.map((elem, index) => (
          <div
            className={
              index === activeImage ? "carousel-item active" : "carousel-item"
            }
            key={index}
          >
            <img src={elem} className="d-block w-100" alt="..."></img>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        onClick={prevClick}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Предыдущий</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        onClick={nextClick}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Следующий</span>
      </button>
    </div>
  );
};
