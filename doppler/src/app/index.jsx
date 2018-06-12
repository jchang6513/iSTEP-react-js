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
            beginDate: moment("2017010100", "YYYYMMDDHH"),
            currentDate: moment().subtract(-5+moment().utcOffset()/60,'hours').startOf('hour'),
            thumbnail: 'http://irsl.ss.ncu.edu.tw/media/product/Doppler/real_dop.png',
            mainDate: moment().subtract(-5+moment().utcOffset()/60,'hours').startOf('hour'),
            nextDate: moment().subtract(-6+moment().utcOffset()/60,'hours').startOf('hour'),
            prevDate: moment().subtract(-4+moment().utcOffset()/60,'hours').startOf('hour'),
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

    getDOP = (date) => {
        var start = new Date(date._d.getFullYear(), 0, 0);
        var url='http://irsl.ss.ncu.edu.tw/media/product/Doppler/';
        url += date.format('YYYY/MM/')
        url += 'DOP'+date.format('YYYYMMDD.HH')+'.png';
        return url;
    }

    setSrc = (Hour) => {
        this.setState({
            mainDate: moment().subtract(-5+Hour+moment().utcOffset()/60,'hours').startOf('hour'),
            nextDate: moment().subtract(-6+Hour+moment().utcOffset()/60,'hours').startOf('hour'),
            prevDate: moment().subtract(-4+Hour+moment().utcOffset()/60,'hours').startOf('hour'),
            thumbnail: this.getDOP(moment().subtract(-5+Hour+moment().utcOffset()/60,'hours').startOf('hour')),
            mainHour: Hour
        });
    }

    render () {
        return (
            <div className='container'>
                <div className='row'>
                    <div className="col-lg-7 col-md-12 ml-auto mr-auto mt-1 text-left">
                        <DatePicker
                            customInput={<DatePickerCustom />}
                            selected={this.state.mainDate}
                            onChange={this.handleChange}
                            utcOffset={8}
                            showTimeSelect
                            dateFormat="YYYY-MMM-DD HH:mm UTC+8"
                            timeFormat="HH:mm"
                            timeIntervals={60}
                            timeCaption="UTC+8"
                            mode="time"
                            minDate={moment("2017-01-01T00:00:00+0800")}
                            maxDate={moment().add(1, 'hours')}
                        />
                        <a href='#' onClick={this.toggleLightbox}>
                            <img className="w-100" src={this.state.thumbnail} alt=""/>
                        </a>
                        {this.state.isOpen && (
                              <Lightbox
                                  mainSrc={this.getDOP(this.state.mainDate)}
                                  nextSrc={this.getDOP(this.state.nextDate)}
                                  prevSrc={this.getDOP(this.state.prevDate)}
                                  onCloseRequest={() => this.setState({ isOpen: false })}
                                  onMovePrevRequest={this.gotoPrevious}
                                  onMoveNextRequest={this.gotoNext}
                                  imagePadding={70}
                              />
                        )}
                    </div>
                    <div className="col-lg-5 col-md-12 text-center d-flex align-items-end pt-4">
                        <img className="w-100" src="http://www.ss.ncu.edu.tw/~istep/images/Doppler_loc.png" alt=""/>
                    </div>
                </div>
            </div>
        )
    }
}

class DatePickerCustom extends React.Component {
  render () {
    return (
      <button className="btn btn-outline-primary btn-md ml-3 mb-4" onClick={this.props.onClick}>
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
