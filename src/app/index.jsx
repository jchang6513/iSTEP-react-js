import React from 'react';
import { render } from 'react-dom';
//import { Tile } from './components/til.jsx';

class App extends React.Component {
    render () {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-2 col-md-4 col-6 p-0 m-0">
                        <a href="pre.html">
                            <img className="d-block" src="images/Slide1.PNG" style="width:100%;"/>
                        </a>
                    </div>
                    <div className="col-lg-2 col-md-4 col-6 p-0 m-0">
                        <a href="tgim.html">
                            <img className="d-block" src="images/Slide7.PNG" style="width:100%;"/>
                        </a>
                    </div>
                    <div className="col-lg-2 col-md-4 col-6 p-0 m-0">
                        <a href="trim.html">
                            <img className="d-block" src="images/Slide4.PNG" style="width:100%;"/>
                        </a>
                    </div>
                    <div className="col-lg-2 col-md-4 col-6 p-0 m-0">
                        <a href="dop.html">
                            <img className="d-block" src="images/Slide3.PNG" style="width:100%;"/>
                        </a>
                    </div>
                    <div className="col-lg-2 col-md-4 col-6 p-0 m-0">
                        <a href="qf.html">
                            <img className="d-block" src="images/Slide5.PNG" style="width:100%;"/>
                        </a>
                    </div>
                    <div className="col-lg-2 col-md-4 col-6 p-0 m-0">
                        <a href="inf.html">
                            <img className="d-block" src="images/Slide6.PNG" style="width:100%;"/>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

render(<App/>,window.document.getElementById('app'));
