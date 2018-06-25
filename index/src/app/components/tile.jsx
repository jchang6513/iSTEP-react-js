import React from 'react';
import moment from 'moment';
import Lightbox from 'react-image-lightbox';

Number.prototype.pad = function(size) {
  var s = String(this);
  while (s.length < (size || 2)) {s = "0" + s;}
  return s;
}

export class Tile extends React.Component {
    constructor () {
        super();
        this.state = {
            beginDate: moment("2017010100", "YYYYMMDDHH"),
            currentDate: moment().subtract(moment().utcOffset()/60,'hours').startOf('hour'),
            mainDate: moment().subtract(moment().utcOffset()/60,'hours').startOf('hour'),
            nextDate: moment().subtract(moment().utcOffset()/60,'hours').startOf('hour'),
            prevDate: moment().subtract(moment().utcOffset()/60,'hours').startOf('hour'),
            DateFormat: "dddd, MMM-DD-YYYY",
            diffTime: 0,
            isOpen: false,
        };
    }

    componentDidMount () {
        this.setDate(0)
        this.setState({
            beginDate: this.props.beginDate,
            currentDate: moment().subtract(this.props.delay+moment().utcOffset()/60,'hours').startOf('hour'),
            DateFormat: (this.props.diffType=='hours') ? "dddd, MMM-DD-YYYY, hh:00 a" : "dddd, MMM-DD-YYYY",
        });
    }

    toggleLightbox = () => {
        this.setDate(0)
    		this.setState({
            isOpen: !this.state.isOpen,
    		});
  	}

    handleClickImage = () => {
    		if (this.state.currentImage === this.state.urls.length - 1) return;
    		this.gotoNext();
  	}

  	gotoPrevious = () => {
        const diffTime = (this.state.prevDate.isBefore(this.state.beginDate)) ? 0 : this.state.diffTime+1
    		this.setDate(diffTime)
  	}

  	gotoNext = () => {
        const diffTime = (this.state.nextDate.isAfter(this.state.currentDate)) ? this.state.currentDate.diff(this.state.beginDate,this.props.diffType) : this.state.diffTime-1
    		this.setDate(diffTime)
  	}

    setDate = (diffTime) => {
        this.setState({
            mainDate: moment().subtract(this.props.delay+moment().utcOffset()/60,'hours').subtract(diffTime,this.props.diffType).startOf('hour'),
            nextDate: moment().subtract(this.props.delay+moment().utcOffset()/60,'hours').subtract(diffTime-1,this.props.diffType).startOf('hour'),
            prevDate: moment().subtract(this.props.delay+moment().utcOffset()/60,'hours').subtract(diffTime+1,this.props.diffType).startOf('hour'),
            diffTime: diffTime
        });
    }
    render() {
        return (
          <div className="col-lg-2 col-md-4 col-6 p-0 m-0">
              <a href='#' onClick={this.toggleLightbox}>
                  <img className="d-block" src={this.props.img}/>
              </a>
              {this.state.isOpen && (
                    <Lightbox
                        mainSrc={this.props.getURL(this.state.mainDate)}
                        nextSrc={this.props.getURL(this.state.nextDate)}
                        prevSrc={this.props.getURL(this.state.nextDate)}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        animationDisabled={true}
                        onMovePrevRequest={this.gotoPrevious}
                        onMoveNextRequest={this.gotoNext}
                        imagePadding={this.props.imagePadding}
                        imageCaption={this.props.imageCaption}
                        imageTitle={this.state.mainDate.format(this.state.DateFormat)}
                    />
              )}
          </div>
        );
    }
}
