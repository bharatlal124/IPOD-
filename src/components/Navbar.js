import React from 'react';
import "../css/Navbar.css"
import BatImg from "../static/images/battery.png"

// Renders navbar
class Navbar extends React.Component {
    constructor() {
        super();
        this.state = {
            time: this.getCurrentTime(),
        }
        this.stateId = "";
    }

    // if there is no notification then iPod logo, time and battery icon
    // If there is a notification show it for 1 second and clear it
    componentDidMount() {
        const { noty } = this.props;
        if (noty === true) {
            return;
        }
        // set an interval of 60 seconds to update time
        this.stateId = setInterval(() => {
            this.setState({ time: this.getCurrentTime() });
        }, 60000);
    }

    componentDidUpdate() {
        const { setNoty, noty } = this.props;
        if (noty === true) {
            setTimeout(function () {
                setNoty();
            }, 1000)
        }
    }

    // Clear the update time interval
    componentWillUnmount() {
        const { noty } = this.props;
        if (noty !== true)
            clearInterval(this.stateId);
    }

    // fir getting current time in string
    getCurrentTime() {
        const today = new Date();
        let hours = today.getHours();
        const minutes = today.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";

        hours = hours % 12; // Convert 13-23 to 1-11
        hours = hours ? hours : 12; // Convert 0 to 12 (midnight)

        const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

        return `${hours}:${formattedMinutes} ${ampm}`;
    }

    // Render navbar to show either ipod logo, time or Notification
    render() {
        const { time } = this.state;
        const { playing, noty, notifyText } = this.props;
        return (
            <div className="bar">
                {<h5 className="heading">iPod <i className="fas fa-wifi"></i></h5>}
                {noty === true && <h5 className="notification">{notifyText}</h5>}
                {noty === false && <h3 className="time">{time}</h3>}
                {<div className="right-container-nav">
                    <img className="battery" src={BatImg} alt="Battery" />
                </div>}
            </div>
        )
    }
}


export default Navbar;