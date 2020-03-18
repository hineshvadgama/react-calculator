import React from 'react'
import './Screen.css'

class Screen extends React.Component {

    testFunction() {
        console.log('I am a screen');
    }

    render() {

        this.testFunction();

        return (
            <div className='screen-container'>
                <span>{this.props.display}</span>
            </div>
        )
    }

}

export default Screen