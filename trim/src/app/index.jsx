import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types'

import moment from 'moment';
import DatePicker from 'react-datepicker';

Number.prototype.pad = function(size) {
  var s = String(this);
  while (s.length < (size || 2)) {s = "0" + s;}
  return s;
}

class App extends React.Component {
    constructor () {
        super();
        this.state = {
            startDate: moment().subtract(3+moment().utcOffset()/60,'hours').startOf('hour'),
            endDate: moment().subtract(2+moment().utcOffset()/60,'hours').startOf('hour'),
            urls: [this.getURL(moment().subtract(3+moment().utcOffset()/60,'hours').startOf('hour'))],
            iurl: 0,
            frames: 'Single',
            update: moment().subtract(3,'hours').startOf('hour').toISOString().replace('T',' ').substr(0,16)
        };
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.getURL = this.getURL.bind(this);
        this.getImg = this.getImg.bind(this);
        this.change = this.change.bind(this);
        setInterval(()=>{
            this.setState({
                iurl: (this.state.iurl+1) % this.state.urls.length
            })
        },500)
    }

    handleChangeStart(date) {
        if (date.isAfter(this.state.endDate)) {
            date = this.state.endDate
        }
        this.setState({
            startDate: date,
        });
        this.getImg(date,this.state.endDate,this.state.frames)
    }

    handleChangeEnd(date) {
        if (date.isBefore(this.state.startDate)) {
            date = this.state.startDate
        }
        this.setState({
            endDate: date,
        });
        this.getImg(this.state.startDate,date,this.state.frames)
    }

    change(event) {
        this.setState({
            frames: event.target.value
        });
        this.getImg(this.state.startDate,this.state.endDate,event.target.value)
    }

    getURL(date) {
        var start = new Date(date._d.getFullYear(), 0, 0);
        var diff = (date._d-start)+((start.getTimezoneOffset()-date._d.getTimezoneOffset())*60000);
        var doy = Math.floor(diff/86400000);

        var url='http://irsl.ss.ncu.edu.tw/media/product/TWRR/';
        url += date._d.getFullYear().toString()+'.'+doy.pad(3)+'/'
        url += 'TWRR'+doy.pad(3)+String.fromCharCode(65+date._d.getHours())+'.'+date._d.getFullYear().toString().substr(2)+'I.'+date._d.getMinutes().pad(2)+'.png';
        return url
    }

    getImg(date,edate,frames) {
        var Images = [];
        var date = moment(date)
        if (frames=='Animate') {
            while(edate.isAfter(date)) {
                Images.push(this.getURL(date))
                date.add(1,'hour');
            }
        } else {
            Images.push(this.getURL(date))
        }

        this.setState({
            urls: Images,
            iurl: 0
        })
    }

    render () {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-1 col-md-12 col-sm-12'></div>
                    <div className='col-lg-4 col-md-6 col-sm-12 mb-4 ml-4'>
                        <select className="form-control col-10 mb-4" onChange={this.change} value={this.state.frames}>
                            <option value='Single'>Single</option>
                            <option value='Animate'>Animate</option>
                        </select>
                        <h4>FROM:</h4>
                        <DatePicker
                            customInput={<DatePickerCustom />}
                            selected={this.state.startDate}
                            selectsStart
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onChange={this.handleChangeStart}
                            showTimeSelect
                            dateFormat="YYYY-MM-DD HH:mm UT"
                            timeFormat="HH:mm"
                            timeIntervals={60}
                            timeCaption="UT"
                            mode="time"
                            minDate={moment("2017-07-27T00:00:00+0800")}
                            maxDate={moment().add(1, 'hours')}
                        />
                        <h4 >TO:</h4>
                        <DatePicker
                            customInput={<DatePickerCustom />}
                            selected={this.state.endDate}
                            selectsEnd
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onChange={this.handleChangeEnd}
                            showTimeSelect
                            dateFormat="YYYY-MM-DD HH:mm UT"
                            timeFormat="HH:mm"
                            timeIntervals={60}
                            timeCaption="UT"
                            mode="time"
                            minDate={moment("2017-07-27T00:00:00+0800")}
                            maxDate={moment().add(1, 'hours')}
                        />
                    </div>
                    <div id="trim-div" className='col-lg-6 col-md-5 col-sm-12 ml-md-3 text-right'>
                        <img id="trim-img" src={this.state.urls[this.state.iurl]} alt=""></img>
                        <p className="mt-3 mr-4">Updated {this.state.update}</p>
                    </div>
                </div>
            </div>
        )
    }
}

class DatePickerCustom extends React.Component {
  render () {
    return (
      <button className="btn btn-outline-primary btn-md mb-2" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    )
  }
}
DatePickerCustom.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string
};

window.moment = moment;
render(<App/>,window.document.getElementById('app'));
