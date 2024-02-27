class DataWeather {
    constructor(data) {
        this.EventType = data.EventType.toLowerCase();
        this.Longitude = data.Longitude;
        this.Latitude = data.Latitude;
    }
}


module.exports = DataWeather;
