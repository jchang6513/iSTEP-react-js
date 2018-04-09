import { EventEmitter } from 'events';

import data from '../../../data/data.json';
import airbox from '../../../data/airbox.json';

class NetatmoStore extends EventEmitter {
    constructor() {
        super();
        this.netatmo = {
            oTemp: data['body']['modules'][0]['dashboard_data']['Temperature'].toFixed(1),
            oMTemp: data['body']['modules'][0]['dashboard_data']['max_temp'].toFixed(1),
            omTemp: data['body']['modules'][0]['dashboard_data']['min_temp'].toFixed(1),
            oHum: data['body']['modules'][0]['dashboard_data']['Humidity'],
            oPM25: airbox["feeds"][0]["AirBox"]['s_d0'],
            iTemp: data['body']['devices'][0]['dashboard_data']['Temperature'].toFixed(1),
            iMTemp: data['body']['devices'][0]['dashboard_data']['max_temp'].toFixed(1),
            imTemp: data['body']['devices'][0]['dashboard_data']['min_temp'].toFixed(1),
            iHum: data['body']['devices'][0]['dashboard_data']['Humidity'],
            iCO2: data['body']['devices'][0]['dashboard_data']['CO2'],
        }
    }

    fetch_Netatmo() {
        fetch("http://www.ss.ncu.edu.tw/~istep/Netatmo_Clock/data/pm25.json").then((Response) => 
            Response.json()
        ).then((findresponse) => {   
            this.netatmo.oPM25 = findresponse["feeds"][0]["AirBox"]['s_d0']
        }).catch(function(exc) {
        });
        fetch("http://www.ss.ncu.edu.tw/~istep/Netatmo_Clock/data/data.json")
        .then((Response) => Response.json())
        .then((findresponse) => {
            this.netatmo.oTemp  = findresponse['body']['modules'][0]['dashboard_data']['Temperature'].toFixed(1);
            this.netatmo.oMTemp = findresponse['body']['modules'][0]['dashboard_data']['max_temp'].toFixed(1);
            this.netatmo.omTemp = findresponse['body']['modules'][0]['dashboard_data']['min_temp'].toFixed(1);
            this.netatmo.oHum   = findresponse['body']['modules'][0]['dashboard_data']['Humidity'];
            this.netatmo.iTemp  = findresponse['body']['devices'][0]['dashboard_data']['Temperature'].toFixed(1);
            this.netatmo.iMTemp = findresponse['body']['devices'][0]['dashboard_data']['max_temp'].toFixed(1);
            this.netatmo.imTemp = findresponse['body']['devices'][0]['dashboard_data']['min_temp'].toFixed(1);
            this.netatmo.iHum   = findresponse['body']['devices'][0]['dashboard_data']['Humidity'];
            this.netatmo.iCO2   = findresponse['body']['devices'][0]['dashboard_data']['CO2'];
        });
        
        fetch("https://api.nasa.gov/planetary/apod?api_key=NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo&hd=true")
        .then((Response) => Response.json())
        .then((findresponse) => {
            this.netatmo.url   = findresponse['url'];
        });
//        console.log('netatmoStore update')
    }    
    
    getAll() {
        var d = new Date()
        if (d.getHours()>=6 && d.getHours()<18) {
            document.body.style.background = "url(http://www.ss.ncu.edu.tw/~istep/Netatmo_Clock/data/day.jpg)";    
        } else {
            document.body.style.background = "url(http://www.ss.ncu.edu.tw/~istep/Netatmo_Clock/data/night.jpg)";
        }
        document.body.style.backgroundSize = "cover";
        this.fetch_Netatmo();
        return this.netatmo;
    }
}

const netatmoStore = new NetatmoStore;

export default netatmoStore;

window.data = data;
window.airbox = airbox;