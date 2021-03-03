class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurant_name: "Restaurant",
            price_range: "$",
            cuisine: "American",
            image: "https://www.ashton-design.com/case-study/readco/img/projects/JohnsHopkins/0511_FreshFoodCafe/0511_editedExterior.jpg"
        };
    }

    render() {
        return (
            <div class="card-body">
                <div class="restaurant-image"></div>
                <h1>{this.state.restaurant_name}</h1>
                <h2>{this.state.price_range}</h2>
                <h2>{this.state.cuisine}</h2>
            </div>
        );
    }
}

ReactDOM.render(
    <Card></Card>,
    document.getElementById('root')
);

