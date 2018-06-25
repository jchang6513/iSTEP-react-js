import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types'

import moment from 'moment';
import DatePicker from 'react-datepicker';
import Lightbox from 'react-image-lightbox';

Number.prototype.pad = function(size) {
  var s = String(this);
  while (s.length < (size || 2)) {s = "0" + s;}
  return s;
}

class App extends React.Component {
    constructor () {
        super();
        this.state = {
            beginDate: moment("2018010100", "YYYYMMDDHH"),
            currentDate: moment().subtract(5+moment().utcOffset()/60,'hours').startOf('hour'),
            thumbnail: 'http://irsl.ss.ncu.edu.tw/media/product/Precursor/real_sio.png',
            mainDate: moment().subtract(5+moment().utcOffset()/60,'hours').startOf('hour'),
            nextDate: moment().subtract(4+moment().utcOffset()/60,'hours').startOf('hour'),
            prevDate: moment().subtract(6+moment().utcOffset()/60,'hours').startOf('hour'),
            mainHour: 0,
            isOpen: false,
        };
    }

    toggleLightbox = () => {
    		this.setState({
            isOpen: !this.state.isOpen,
    		});
  	}

    handleChange = (date) => {
        const Hour = this.state.currentDate.diff(date,'hours')
        this.setSrc(Hour)
    }

    gotoPrevious = () => {
        const Hour = (this.state.prevDate.isBefore(this.state.beginDate)) ? 0 : this.state.mainHour+1
    		this.setSrc(Hour)
  	}

  	gotoNext = () => {
        const Hour = (this.state.nextDate.isAfter(this.state.currentDate)) ? this.state.currentDate.diff(this.state.beginDate,'hours') : this.state.mainHour-1
    		this.setSrc(Hour)
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

    setSrc = (Hour) => {
        this.setState({
            mainDate: moment().subtract(5+Hour+moment().utcOffset()/60,'hours').startOf('hour'),
            nextDate: moment().subtract(5-1+Hour+moment().utcOffset()/60,'hours').startOf('hour'),
            prevDate: moment().subtract(5+1+Hour+moment().utcOffset()/60,'hours').startOf('hour'),
            thumbnail: this.getPRE(moment().subtract(5+Hour+moment().utcOffset()/60,'hours').startOf('hour')),
            mainHour: Hour
        });
    }

    render () {
        return (
            <div className='container'>
                <div className='row'>
                    <div className="col-12 ml-auto mr-auto mt-1 text-left">
                        <DatePicker
                            customInput={<DatePickerCustom />}
                            selected={this.state.mainDate}
                            onChange={this.handleChange}
                            utcOffset={8}
                            showTimeSelect
                            dateFormat="YYYY-MMM-DD HH:mm UT"
                            timeFormat="HH:mm"
                            timeIntervals={60}
                            timeCaption="UTC+8"
                            mode="time"
                            minDate={moment("2018-01-01T00:00:00+0800")}
                            maxDate={moment().add(1, 'hours')}
                        />
                        <a href='#' onClick={this.toggleLightbox}>
                            <img className="w-100" src={this.getPRE(this.state.mainDate)} alt=""/>
                        </a>
                        {this.state.isOpen && (
                              <Lightbox
                                  mainSrc={this.getPRE(this.state.mainDate)}
                                  nextSrc={this.getPRE(this.state.nextDate)}
                                  prevSrc={this.getPRE(this.state.prevDate)}
                                  onCloseRequest={() => this.setState({ isOpen: false })}
                                  animationDisabled={true}
                                  onMovePrevRequest={this.gotoPrevious}
                                  onMoveNextRequest={this.gotoNext}
                                  imagePadding={70}
                                  imageTitle={this.state.mainDate.format("dddd, MMM-DD-YYYY, HH:00 a")}
                              />
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

class DatePickerCustom extends React.Component {
  render () {
    return (
      <button className="btn btn-outline-primary btn-md ml-4 mb-4" onClick={this.props.onClick}>
          {this.props.value}
      </button>
    )
  }
}
DatePickerCustom.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string
};

render(<App/>,window.document.getElementById('app'));
