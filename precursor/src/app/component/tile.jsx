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
            mainSrc: moment().subtract(moment().utcOffset()/60,'hours').startOf('hour'),
            nextSrc: moment().subtract(moment().utcOffset()/60,'hours').startOf('hour'),
            prevSrc: moment().subtract(moment().utcOffset()/60,'hours').startOf('hour'),
            currentHour: 0,
            isOpen: false,
        };
    }

    componentDidMount () {
        this.setSrc(0)
        this.setState({
            beginDate: this.props.beginDate,
            currentDate: moment().subtract(this.props.delay+moment().utcOffset()/60,'hours').startOf('hour'),
        });
    }

    toggleLightbox = () => {
        this.setSrc(0)
    		this.setState({
            isOpen: !this.state.isOpen,
    		});
  	}

    handleClickImage = () => {
    		if (this.state.currentImage === this.state.urls.length - 1) return;
    		this.gotoNext();
  	}

  	gotoPrevious = () => {
        const currentHour = (this.state.prevSrc.isBefore(this.state.beginDate)) ? 0 : this.state.currentHour+1
    		this.setSrc(currentHour)
  	}

  	gotoNext = () => {
        const currentHour = (this.state.nextSrc.isAfter(this.state.currentDate)) ? this.state.currentDate.diff(this.state.beginDate,'hours') : this.state.currentHour-1
    		this.setSrc(currentHour)
  	}

    setSrc = (currentHour) => {
        this.setState({
            mainSrc: moment().subtract(this.props.delay+currentHour+moment().utcOffset()/60,'hours').startOf('hour'),
            nextSrc: moment().subtract(this.props.delay-1+currentHour+moment().utcOffset()/60,'hours').startOf('hour'),
            prevSrc: moment().subtract(this.props.delay+1+currentHour+moment().utcOffset()/60,'hours').startOf('hour'),
            currentHour: currentHour
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
                        mainSrc={this.props.getURL(this.state.mainSrc)}
                        nextSrc={this.props.getURL(this.state.nextSrc)}
                        prevSrc={this.props.getURL(this.state.nextSrc)}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        onMovePrevRequest={this.gotoPrevious}
                        onMoveNextRequest={this.gotoNext}
                        imagePadding={this.props.imagePadding}
                        imageCaption={this.props.imageCaption}
                    />
              )}
          </div>
        );
    }
}