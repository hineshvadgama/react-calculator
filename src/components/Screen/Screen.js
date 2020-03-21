import React from 'react'
import './Screen.css'

class Screen extends React.Component {

    render() {

        let className = '';

        if (this.props.display.toString().length <= 8) {
            className = 'standard';
        } else if (this.props.display.toString().length >8 && this.props.display.toString().length <= 12) {
            className = 'small';
        } else if (this.props.display.toString().length >12 && this.props.display.toString().length <= 23) {
            className = 'tiny';
        } else {
            className = 'super-tiny';
        }

        return (
            <div className='screen-container'>
                <span className={className} >{this.props.display}</span>
            </div>
        )
    }

}

export default Screen