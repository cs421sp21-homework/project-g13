import { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

class Slideshow extends Component {
    render() {
        const { photos, reviews, isImg } = this.props;

        if (isImg) {
            return (
                <Carousel>
                    <Carousel.Item>
                        <img
                            style={{ textAlign: "justify", width: 400 }}
                            src={photos[0]}
                            //alt={reviews[0]["text"]}
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            style={{ textAlign: "justify", width: 400 }}
                            src={photos[1]}
                            //alt={reviews[1]["text"]}
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            style={{ textAlign: "justify", width: 400 }}
                            src={photos[2]}
                            //alt={reviews[2]["text"]}
                        />
                    </Carousel.Item>
                </Carousel>
            );
        } else {
            return (
                <Carousel>
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