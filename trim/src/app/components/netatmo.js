import React from 'react';

import NetatmoStore from '../stores/netatmoStore.js';
import ForecastStore from '../stores/forecastStore.js';

export class Netatmo extends React.Component {
    constructor() {
        super();
        this.state = {
            nStore: NetatmoStore.getAll(),
            fStore: ForecastStore.getAll(),
        }
        setInterval(()=>{
            this.setState({
                nStore: NetatmoStore.getAll(),
                fStore: ForecastStore.getAll()
            })
        },1000)        
    }
        
    render() {

        const { nStore } = this.state;
        const { fStore } = this.state;
        return(
            <div className='col-12 m-0 p-0 d-flex justify-content-between'>
                <div className='col-6 m-0 ml-2 pl-4 py-4 p-0'>
                    <div className='col-11 mr-4 align-center'>
                        <img id='today_icon' className='d-block mx-auto' src={fStore[0].text}></img>
                    </div>
                    <div className='row m-0 p-0 d-flex flex-row'>                                                
                        <div className='col-8 m-0 p-0'>
                            <h1 id='temp'>{nStore.oTemp}</h1>
                        </div>
                        <div className='col-3 m-0 p-0 pt-1'>
                            <p id='mMtemp' className='text-right'>{nStore.oMTemp}</p>
                            <p id='mMtemp' className='text-right'>{nStore.omTemp}</p>
                        </div>
                    </div>
                    <div className='col-11 m-0 p-0 pt-4'>
                        <h1 id='inform'>Humidity</h1>
                        <h1 id='inform' className='text-right'>
                            {nStore.oHum}<small><small>%</small></small></h1>
                        <h1 id='inform'>PM<sub>2.5</sub></h1>
                        <h1 id='inform' className='text-right'>
                            {nStore.oPM25}<small><small><small>&mu;g/m<sup>3</sup></small></small></small></h1>                        
                    </div>                    
                </div>
                <div className='col-6 m-0 p-0 pl-4 py-4'>
                    <div className='col-11 align-center m-0'>
                        <img id='today_icon' className='d-block mx-auto' src='http://www.ss.ncu.edu.tw/~istep/Netatmo_Clock/data/indoor.png'></img>
                    </div>                    
                    <div className='row m-0 p-0 d-flex flex-row'>
                        <div className='col-8 m-0 p-0'>
                            <h1 id='temp'>{nStore.iTemp}</h1>
                        </div>
                        <div className='col-3 m-0 p-0 pt-1'>
                            <p id='mMtemp' className='text-right'>{nStore.iMTemp}</p>
                            <p id='mMtemp' className='text-right'>{nStore.imTemp}</p>
                        </div>
                    </div>
                    <div className='col-11 m-0 p-0 pt-4'>
                        <h1 id='inform'>Humidity</h1>
                        <h1 id='inform' className='text-right'>
                            {nStore.iHum}<small><small>%</small></small></h1>
                        <h1 id='inform'>CO<sub>2</sub></h1>
                        <h1 id='inform' className='text-right'>
                            {nStore.iCO2}<small><small><small>ppm</small></small></small></h1>
                    </div>
                </div>
            </div>
        )
    }
}