import React from 'react';

export class Clock extends React.Component {
    constructor() {
        super();
        this.state = {
            timeString: Date().toString().substring(16,21),
            dateString: Date().toString().substring(0,10).toUpperCase()
        }
        setInterval(()=>{
            this.setState({
                timeString: Date().toString().substring(16,21),
                dateString: Date().toString().substring(0,10).toUpperCase()
            })
        },1000)        
    }
    
    updateClock() {
        this.setState({
            timeString: Date().toString().substring(16,21),
            dateString: Date().toString().substring(0,10).toUpperCase()
        })
    }
    render() {

        return (
            <div className='col-12 m-0 p-0 py-5 d-inline-block text-center'>
                <h1 id='clock'>{this.state.timeString}</h1>
                <h1 id='date'>{this.state.dateString}</h1>
            </div>
        );
    }
}