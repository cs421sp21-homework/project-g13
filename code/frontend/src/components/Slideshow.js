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
                <Carousel nextIcon={next} prevIcon={prev}>
                    <Carousel.Item>
                        <img
                            style={{ textAlign: "justify", width: "93%" }}
                            src={photos[0]}
                            //alt={reviews[0]["text"]}
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            style={{ textAlign: "justify", width: "93%" }}
                            src={photos[1]}
                            //alt={reviews[1]["text"]}
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            style={{ textAlign: "justify", width: "93%" }}
                            src={photos[2]}
                            //alt={reviews[2]["text"]}
                        />
                    </Carousel.Item>
                </Carousel>
            );
        } else {
            return (
                <Carousel nextIcon={next} prevIcon={prev}>
                    <Carousel.Item>
                        <p style={{ textAlign: "center" }}> {reviews[0]["text"]}</p>
                    </Carousel.Item>
                    <Carousel.Item>
                        <p style={{ textAlign: "center" }}> {reviews[1]["text"]}</p>
                    </Carousel.Item>
                    <Carousel.Item>
                        <p style={{ textAlign: "center" }}> {reviews[2]["text"]}</p>
                    </Carousel.Item>
                </Carousel>
            );
        }
    }
}

export default Slideshow;