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
                        <div className="carouselReview">
                        <p> {reviews[0]["text"]}</p>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="carouselReview">
                        <p> {reviews[1]["text"]}</p>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="carouselReview">
                        <p> {reviews[2]["text"]}</p>
                        </div>
                    </Carousel.Item>
                </Carousel>
            );
        }
    }
}

export default Slideshow;