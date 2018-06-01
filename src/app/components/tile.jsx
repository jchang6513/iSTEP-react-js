import React from 'react';
import moment from 'moment';
import Lightbox from 'react-image-lightbox';

Number.prototype.pad = function(size) {
  var s = String(this);
  while (s.length < (size || 2)) {s = "0" + s;}
  return s;
}

function getURL(date) {
    var start = new Date(date._d.getFullYear(), 0, 0);
    var diff = (date._d-start)+((start.getTimezoneOffset()-date._d.getTimezoneOffset())*60000);
    var doy = Math.floor(diff/86400000);

    var url='http://irsl.ss.ncu.edu.tw/media/product/TWRG/';
    url += date._d.getFullYear().toString()+'.'+doy.pad(3)+'/'
    url += 'TWRG'+doy.pad(3)+String.fromCharCode(65+date._d.getHours())+'.'+date._d.getFullYear().toString().substr(2)+'I.'+date._d.getMinutes().pad(2)+'.png';
    return url;
}

export class Tile extends React.Component {
    constructor () {
        super();
        this.state = {
            beginDate: moment("2017010100", "YYYYMMDDHH"),
            currentDate: moment().subtract(5+moment().utcOffset()/60,'hours').startOf('hour'),
            mainSrc: moment().subtract(5+moment().utcOffset()/60,'hours').startOf('hour'),
            nextSrc: moment().subtract(4+moment().utcOffset()/60,'hours').startOf('hour'),
            prevSrc: moment().subtract(6+moment().utcOffset()/60,'hours').startOf('hour'),
            currentHour: 0,
            isOpen: false,
        };
    }

    componentDidMount () {

    }
    
    handleClickImage = () => {
  		if (this.state.currentImage === this.state.urls.length - 1) return;
  		this.gotoNext();
  	}

  	toggleLightbox = () => {
  		this.setState({
          mainSrc: moment().subtract(5+moment().utcOffset()/60,'hours').startOf('hour'),
          nextSrc: moment().subtract(4+moment().utcOffset()/60,'hours').startOf('hour'),
          prevSrc: moment().subtract(6+moment().utcOffset()/60,'hours').startOf('hour'),
          isOpen: !this.state.isOpen,
  		});
  	}

  	gotoPrevious = () => {
        const currentHour = (this.state.prevSrc.isBefore(this.state.beginDate)) ? 0 : this.state.currentHour+1
    		this.setState({
            mainSrc: moment().subtract(5+currentHour+moment().utcOffset()/60,'hours').startOf('hour'),
            nextSrc: moment().subtract(4+currentHour+moment().utcOffset()/60,'hours').startOf('hour'),
            prevSrc: moment().subtract(6+currentHour+moment().utcOffset()/60,'hours').startOf('hour'),
            currentHour: currentHour
    		});
  	}
  	gotoNext = () => {
        const currentHour = (this.state.nextSrc.isAfter(this.state.currentDate)) ? this.state.currentDate.diff(this.state.beginDate,'hours') : this.state.currentHour-1
        this.setState({
          mainSrc: moment().subtract(5+currentHour+moment().utcOffset()/60,'hours').startOf('hour'),
          nextSrc: moment().subtract(4+currentHour+moment().utcOffset()/60,'hours').startOf('hour'),
          prevSrc: moment().subtract(6+currentHour+moment().utcOffset()/60,'hours').startOf('hour'),
          currentHour: currentHour
        });
  	}

    getImg = () => {
        var Images = [];
        var date = moment(this.state.startDate);
        while(this.state.endDate.isAfter(date)) {
            Images.push(this.getURL(date))
            date.add(1,'hour');
        }
        this.setState({
            urls: Images,
            iurl: 0
        })
    }

    render() {
        return (
          <div id="TGIM" className='row'>
              <div className="header jumbotron">
                  <h1 id="title">TGIM</h1>
              </div>
              <div className='col-9 mt-4 float-right mx-auto'>
                  <a onClick={this.toggleLightbox}>
                      <img className="img-fluid" src={getURL(this.state.currentDate)} alt=""></img>
                  </a>
              </div>

              {this.state.isOpen && (
                    <Lightbox
                        mainSrc={getURL(this.state.mainSrc)}
                        nextSrc={getURL(this.state.nextSrc)}
                        prevSrc={getURL(this.state.nextSrc)}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        onMovePrevRequest={this.gotoPrevious}
                        onMoveNextRequest={this.gotoNext}
                        imagePadding={100}
                        imageCaption={<p>For more information, please visit <a href="http://www.ss.ncu.edu.tw/~istep/tgim.html">http://www.ss.ncu.edu.tw/~istep/tgim.html</a></p>}
                    />
              )}

          </div>
        );
    }
}
