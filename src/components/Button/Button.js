import React from 'react';
import './Button.css';

class Button extends React.PureComponent {

    render() {
        let fontColour = 'black';
        const classes = this.props.display === '0' ? 'button-container wide-button' : 'button-container'

        if (this.props.display === '÷' || this.props.display === '×' || this.props.display === '-' || this.props.display === '+' || this.props.display === '=') {
            fontColour = 'orange';

        } else if (this.props.display === 'AC' || this.props.display === '+/-' || this.props.display === '%') {
            fontColour = 'grey';
        }

        return (
            <div className={classes} onClick={this.props.onClick}>
                <div className='button' style={{color: fontColour}}>
                    {this.props.display}
                </div>
            </div>
        )
    }

}

export default Button;