import React from 'react';

class SubmitButton extends React.Component {

    render() {
        const btnStyle = {
            backgroundColor: "black",
            width: "100%",
            border: "none",
            color: "white",
            padding: "16px 32px",
            textDecoration: "none",
            margin: "4px 2px",
            cursor: "pointer",
        };

        return (
            <div className="submitButton">

                <button style={btnStyle}
                        className='btn'
                        disabled={this.props.disabled}
                        onClick={ () => this.props.onClick() }
                >
                    {this.props.text}
                </button>

            </div>
        );
    }
}

export default SubmitButton;