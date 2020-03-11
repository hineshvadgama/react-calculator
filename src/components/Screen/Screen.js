import React from 'react'
import './Screen.css'

class Screen extends React.Component {

    render() {

        return (
            <div className='screen-container'>
                <span>{this.props.display}</span>
            </div>
        )
    }

}

export default Screen