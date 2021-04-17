import { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
//import "bootstrap/dist/css/bootstrap.min.css";

class Slideshow extends Component {
  render() {
    const { photos, reviews, isImg } = this.props;
    const next = <i class="fas fa-chevron-right"></i>;
    const prev = <i class="fas fa-chevron-left"></i>;
    //console.log("is img: " + isImg);

        if (isImg) {
            return (
                <Carousel className="carousel" nextIcon={next} prevIcon={prev}>
                    <Carousel.Item>
                        <div className="carouselImg">
                        <img
                            src={photos[0]}
                            //alt={reviews[0]["text"]}
                        />
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="carouselImg">
                        <img
                            src={photos[1]}
                            //alt={reviews[1]["text"]}
                        />
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="carouselImg">
                        <img
                            src={photos[2]}
                            //alt={reviews[2]["text"]}
                        />
                        </div>
                    </Carousel.Item>
                </Carousel>
            );
    } else {
      return (
        <Carousel nextIcon={next} prevIcon={prev}>
          <Carousel.Item>
            <p style={{ textAlign: "center" }}>
              {" "}
              {reviews[0]["text"]}{" "}
              <a href={reviews[0]["url"]} target="_blank">
                Read More
              </a>
            </p>
          </Carousel.Item>
          <Carousel.Item>
            <p style={{ textAlign: "center" }}>
              {" "}
              {reviews[1]["text"]}{" "}
              <a href={reviews[1]["url"]} target="_blank">
                Read More
              </a>
            </p>
          </Carousel.Item>
          <Carousel.Item>
            <p style={{ textAlign: "center" }}>
              {" "}
              {reviews[2]["text"]}{" "}
              <a href={reviews[2]["url"]} target="_blank">
                Read More
              </a>
            </p>
          </Carousel.Item>
        </Carousel>
      );
    }
  }
}

export default Slideshow;
