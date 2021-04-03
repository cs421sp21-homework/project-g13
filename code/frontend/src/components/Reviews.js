import { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

class Reviews extends Component {
    render() {
        const {reviews} = this.props;

        return (
            <Carousel>
                <Carousel.Item>
                    <Carousel.Item>
                        <img
                            style={{ textAlign: "justify", width: 400 }}
                            alt={reviews[0]["text"]}
                        />
                    </Carousel.Item>
                </Carousel.Item>
                <Carousel.Item>
                    <Carousel.Caption>
                        <p style={{ color: "black", display: "block" }}>
                            {reviews[1]["text"]}
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Carousel.Caption>
                        <p style={{ color: "black", display: "block" }}>
                            {reviews[2]["text"]}
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        );
    }
}

export default Reviews;
