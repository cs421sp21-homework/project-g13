import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

class Slideshow extends Component {
  render() {
    const { photos, reviews } = this.props;

    return (
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            width="10"
            height="500"
            src={photos[0]}
            alt="First slide"
          />
          <Carousel.Caption>
            <p>{reviews[0]["text"]}</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            width="10"
            height="500"
            src={photos[1]}
            alt="Second slide"
          />

          <Carousel.Caption>
            <p>{reviews[1]["text"]}</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            width="10"
            height="500"
            src={photos[2]}
            alt="Third slide"
          />

          <Carousel.Caption>
            <p>{reviews[2]["text"]}</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}

export default Slideshow;
