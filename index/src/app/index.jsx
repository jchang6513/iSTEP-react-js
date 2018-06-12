import React from 'react';
import { render } from 'react-dom';

import moment from 'moment';
import { Tile } from './components/tile.jsx';

class App extends React.Component {
    constructor () {
        super();
        this.state = {
          Slide1: 'http://www2.ss.ncu.edu.tw/~istep/images/Slide1.PNG',
          Slide2: 'http://www2.ss.ncu.edu.tw/~istep/images/Slide2.PNG',
          Slide3: 'http://www2.ss.ncu.edu.tw/~istep/images/Slide3.PNG',
          Slide4: 'http://www2.ss.ncu.edu.tw/~istep/images/Slide4.PNG',
          Slide5: 'http://www2.ss.ncu.edu.tw/~istep/images/Slide5.PNG',
          Slide6: 'http://www2.ss.ncu.edu.tw/~istep/images/Slide6.PNG',
        };
    }

    getPRE = (date) => {
        var start = new Date(date._d.getFullYear(), 0, 0);
        var diff = (date._d-start)+((start.getTimezoneOffset()-date._d.getTimezoneOffset())*60000);
        var doy = Math.floor(diff/86400000);

        var url='http://irsl.ss.ncu.edu.tw/media/product/Precursor/';
        url += date.format('YYYY/MM/')
        url += 'SIO'+date.format('YYYYMMDD.HH')+'.png';
        return url;
    }

    getTWRG = (date) => {
        var start = new Date(date._d.getFullYear(), 0, 0);
        var diff = (date._d-start)+((start.getTimezoneOffset()-date._d.getTimezoneOffset())*60000);
        var doy = Math.floor(diff/86400000);

        var url='http://irsl.ss.ncu.edu.tw/media/product/TWRG/';
        url += date._d.getFullYear().toString()+'.'+doy.pad(3)+'/'
        url += 'TWRG'+doy.pad(3)+String.fromCharCode(65+date._d.getHours())+'.'+date._d.getFullYear().toString().substr(2)+'I.'+date._d.getMinutes().pad(2)+'.png';
        return url;
    }

    getTWRR = (date) => {
        var start = new Date(date._d.getFullYear(), 0, 0);
        var diff = (date._d-start)+((start.getTimezoneOffset()-date._d.getTimezoneOffset())*60000);
        var doy = Math.floor(diff/86400000);

        var url='http://irsl.ss.ncu.edu.tw/media/product/TWRR/';
        url += date._d.getFullYear().toString()+'.'+doy.pad(3)+'/'
        url += 'TWRR'+doy.pad(3)+String.fromCharCode(65+date._d.getHours())+'.'+date._d.getFullYear().toString().substr(2)+'I.'+date._d.getMinutes().pad(2)+'.png';
        return url;
    }

    getDOP = (date) => {
        var start = new Date(date._d.getFullYear(), 0, 0);

        var url='http://irsl.ss.ncu.edu.tw/media/product/Doppler/';
        url += date.format('YYYY/MM/')
        url += 'DOP'+date.format('YYYYMMDD')+'.png';
        return url;
    }

    render () {
        return (
            <div className="container-fluid">
                <div className="row">
                    <Tile
                        img={this.state.Slide1}
                        beginDate={moment("2018010100", "YYYYMMDDHH")}
                        delay={5.5}
                        diffType={'hours'}
                        getURL={this.getPRE}
                        imagePadding={70}
                        imageCaption={<p>For more detail, please visit <a href='http://www2.ss.ncu.edu.tw/~istep/pre.html'>http://www2.ss.ncu.edu.tw/~istep/pre.html</a></p>}
                    />
                    <Tile
                        img={this.state.Slide2}
                        beginDate={moment("2018010100", "YYYYMMDDHH")}
                        delay={5.5}
                        diffType={'hours'}
                        getURL={this.getTWRG}
                        imagePadding={70}
                        imageCaption={<p>For more detail, please visit <a href='http://www2.ss.ncu.edu.tw/~istep/tgim.html'>http://www2.ss.ncu.edu.tw/~istep/tgim.html</a></p>}
                    />
                    <Tile
                        img={this.state.Slide3}
                        beginDate={moment("2018010100", "YYYYMMDDHH")}
                        delay={2}
                        diffType={'hours'}
                        getURL={this.getTWRR}
                        imagePadding={70}
                        imageCaption={<p>For more detail, please visit <a href='http://www2.ss.ncu.edu.tw/~istep/trim.html'>http://www2.ss.ncu.edu.tw/~istep/trim.html</a></p>}
                    />
                    <Tile
                        img={this.state.Slide4}
                        beginDate={moment("20170101", "YYYYMMDD")}
                        delay={-4.5}
                        diffType={'days'}
                        getURL={this.getDOP}
                        imagePadding={70}
                        imageCaption={<p>For more detail, please visit <a href='http://www2.ss.ncu.edu.tw/~istep/dop.html'>http://www2.ss.ncu.edu.tw/~istep/dop.html</a></p>}
                    />
                    <div className="col-lg-2 col-md-4 col-6 p-0 m-0">
                        <a href="http://www2.ss.ncu.edu.tw/~istep/qf.html">
                            <img className="d-block" src={this.state.Slide5}/>
                        </a>
                    </div>
                    <div className="col-lg-2 col-md-4 col-6 p-0 m-0">
                        <a href="http://www2.ss.ncu.edu.tw/~istep/inf.html">
                            <img className="d-block" src={this.state.Slide6}/>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

render(<App/>,window.document.getElementById('app'));
