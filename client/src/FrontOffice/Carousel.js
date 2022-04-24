import { useState } from "react";
import Carousel from 'react-bootstrap/Carousel'
export default function CarouselFront() {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    return (
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img width="100%"
            className="d-block w-100"
            src="frontassets/images/banner.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
           
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="frontassets/images/Esb.jpg"
            alt="Second slide"
          />
  
          <Carousel.Caption>
            <h3>Second slide label</h3>
           
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="frontassets/images/logo.jpg"
            alt="Third slide"
          />
  
          <Carousel.Caption>
            <h3>Third slide label</h3>
           
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
