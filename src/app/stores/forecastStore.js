import { EventEmitter } from 'events';

import forecast from '../../../data/forecast.json';

class ForecastStore extends EventEmitter {
    constructor() {
        super();
        this.condition = {
//            0: 'tornado_day_night',
//            1: 'tropical_storm_day_night',
//            2: 'hurricane_day_night',
//            3: 'severe_thunderstorms_day_night',
//            4: 'thunderstorms_day_night',
//            5: 'mixed_rain_and_snow_day_night',
//            6: 'mixed_rain_and_sleet_day_night',
//            7: 'mixed_snow_and_sleet_day_night',
//            8: 'freezing_drizzle_day_night',
//            9: 'drizzle_day_night',
            10: 'freezing_rain_day_night',
            11: 'rain_day_night',
            12: 'rain_day_night',
            13: 'snow_flurries_day_night',
            14: 'light_snow_showers_day_night',
            15: 'blowing_snow_day_night',
            16: 'snow_day_night',
            17: 'hail_day_night',
            18: 'sleet_day_night',
            19: 'dust_day_night',
            20: 'foggy_day_night',
            21: 'haze_day_night',
            22: 'smoky_day_night',
            23: 'blustery_day_night',
            24: 'windy_day_night',
            25: 'cold_day_night',
            26: 'cloudy_day_night',
//            27: 'mostly_cloudy_day_night',
//            28: 'mostly_cloudy_day_night',
            29: 'partly_cloudy_night',
            30: 'partly_cloudy_day',
            31: 'clear_night',
            32: 'clear_day',
            33: 'fair_night',
            34: 'fair_day',
//            35: 'mixed_rain_and_hail_day_night',
//            36: 'hot_day_night',
//            37: 'isolated_thunderstorms_day_night',
            38: 'scattered_showers_day_night',
            39: 'scattered_showers_day_night',
            40: 'scattered_showers_day_night',
            41: 'heavy_snow_day_night',
            42: 'scattered_snow_showers_day_night',
            43: 'heavy_snow_day_night',
            44: 'partly_cloudy_day',
            45: 'thundershowers_day_night',
            46: 'snow_showers_day_night',
            47: 'scattered_showers_day_night',
            3200: 'not_available'
        };
        this.forecast = [
            {
                date: forecast['query']['results']["channel"]['item']['forecast'][0]['day'],
                Mtemp: forecast['query']['results']["channel"]['item']['forecast'][0]['high'],
                mtemp: forecast['query']['results']["channel"]['item']['forecast'][0]['low'],
                text: 'https://s.yimg.com/os/weather/1.0.1/shadow_icon/60x60/'+this.condition[forecast['query']['results']["channel"]['item']['forecast'][0]['code']]+'@2x.png'
            },
            {
                date: forecast['query']['results']["channel"]['item']['forecast'][1]['day'],
                Mtemp: forecast['query']['results']["channel"]['item']['forecast'][1]['high'],
                mtemp: forecast['query']['results']["channel"]['item']['forecast'][1]['low'],
                text: 'https://s.yimg.com/os/weather/1.0.1/shadow_icon/60x60/'+this.condition[forecast['query']['results']["channel"]['item']['forecast'][1]['code']]+'@2x.png'
            },
            {
                date: forecast['query']['results']["channel"]['item']['forecast'][2]['day'],
                Mtemp: forecast['query']['results']["channel"]['item']['forecast'][2]['high'],
                mtemp: forecast['query']['results']["channel"]['item']['forecast'][2]['low'],
                text: 'https://s.yimg.com/os/weather/1.0.1/shadow_icon/60x60/'+this.condition[forecast['query']['results']["channel"]['item']['forecast'][2]['code']]+'@2x.png'
            }            
        ]
    }

    fetch_forecast() {
        fetch("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22taoyuan%2C%20tw%22)%20and%20u%3D%27c%27&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys")
        .then((Response) => Response.json())
        .then((findresponse) => {   
            this.forecast = [
                    {
                        date: findresponse['query']['results']["channel"]['item']['forecast'][0]['day'].toUpperCase(),
                        Mtemp: findresponse['query']['results']["channel"]['item']['forecast'][0]['high'],
                        mtemp: findresponse['query']['results']["channel"]['item']['forecast'][0]['low'],
                        text: 'https://s.yimg.com/os/weather/1.0.1/shadow_icon/60x60/'+this.condition[findresponse['query']['results']["channel"]['item']['forecast'][0]['code']]+'@2x.png'
                    },
                    {
                        date: findresponse['query']['results']["channel"]['item']['forecast'][1]['day'].toUpperCase(),
                        Mtemp: findresponse['query']['results']["channel"]['item']['forecast'][1]['high'],
                        mtemp: findresponse['query']['results']["channel"]['item']['forecast'][1]['low'],
                        text: 'https://s.yimg.com/os/weather/1.0.1/shadow_icon/60x60/'+this.condition[findresponse['query']['results']["channel"]['item']['forecast'][1]['code']]+'@2x.png'
                    },
                    {
                        date: findresponse['query']['results']["channel"]['item']['forecast'][2]['day'].toUpperCase(),
                        Mtemp: findresponse['query']['results']["channel"]['item']['forecast'][2]['high'],
                        mtemp: findresponse['query']['results']["channel"]['item']['forecast'][2]['low'],
                        text: 'https://s.yimg.com/os/weather/1.0.1/shadow_icon/60x60/'+this.condition[findresponse['query']['results']["channel"]['item']['forecast'][2]['code']]+'@2x.png'
                    }            
            ]
        })
//        console.log('yahoo forecast update')
    }
    
    getAll() {
        this.fetch_forecast();
        return this.forecast;
    }
}

const forecastStore = new ForecastStore;

export default forecastStore;