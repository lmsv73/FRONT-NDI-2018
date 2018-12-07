<template>
  <div class="home h-100">
    <navbar></navbar>
    <b-container fluid class="home-container">
      <b-row class="h-100">
        <b-col class="pt-3 home-left-side" md="3">
          <div>
            <div class="weather-header">Météo</div>
            <div class="mt-3 mb-3 weather-body d-flex justify-content-around">
              <div class="text-center">
                <img class="d-block pb-2 m-auto" src="images/temperature.png">
                <span v-if="temperature.length">{{ temperature[temperature.length - 1] }}°C</span>
              </div>
              <div class="text-center">
                <img class="d-block pb-2 m-auto" src="images/humidite.png">
                <span v-if="humidity.length">{{ humidity[humidity.length - 1] }} g/m³</span>
              </div>
              <div class="text-center">
                <img class="d-block pb-2 m-auto" src="images/pression.png">
                <span v-if="pressure.length">{{ pressure[pressure.length - 1] }} hPa</span>
              </div>
              <div class="text-center">
                <img class="d-block pb-2 m-auto" src="images/soleil.png">
                <span v-if="luminosity.length">{{ luminosity[luminosity.length - 1] }} lux</span>
              </div>
              <div class="text-center">
                <img class="d-block pb-2 m-auto" src="images/vent.png">
                <span v-if="wind.length">{{ wind[wind.length - 1] }} m/h</span>
              </div>
            </div>
          </div>
        </b-col>
        <b-col md="6">
          <div class="mt-3">
            <h2>Variations des températures</h2>
            <GChart
              type="LineChart"
              :data="temperature_data"
              :options="{hAxis: {textPosition: 'none'}, vAxis: {gridLines: {color: 'transparent'}}}"
            />
          </div>
          <div>
            <h2>Variations de l'humidité</h2>
            <GChart
              type="LineChart"
              :data="humidity_data"
              :options="{hAxis: {textPosition: 'none'}, vAxis: {gridLines: {color: 'transparent'}}}"
            />
          </div>
          <div>
            <h2>Variations de la pression atmosphérique</h2>
            <GChart
              type="LineChart"
              :data="pressure_data"
              :options="{hAxis: {textPosition: 'none'}, vAxis: {gridLines: {color: 'transparent'}}}"
            />
          </div>
          <div>
            <h2>Variations de la luminosité</h2>
            <GChart
              type="LineChart"
              :data="luminosity_data"
              :options="{hAxis: {textPosition: 'none'}, vAxis: {gridLines: {color: 'transparent'}}}"
            />
          </div>
          <div>
            <h2>Variations de la vitesse du vent</h2>
            <GChart
              type="LineChart"
              :data="wind_data"
              :options="{hAxis: {textPosition: 'none'}, vAxis: {gridLines: {color: 'transparent'}}}"
            />
          </div>
        </b-col>
        <b-col md="3"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      temperature: [],
      pressure: [],
      humidity: [],
      wind: [],
      luminosity: [],
      temperature_header: ['Date', 'Température'],
      temperature_data: [],
      pressure_header: ['Date', 'Pression'],
      pressure_data: [],
      humidity_header: ['Date', 'Humidité'],
      humidity_data: [],
      wind_header: ['Date', 'Vent'],
      wind_data: [],
      luminosity_header: ['Date', 'Luminosité'],
      luminosity_data: [],
      timestamps_temp: [],
      timestamps_wind: [],
      timestamps_pressure: [],
      timestamps_luminosity: [],
      timestamps_humidity: []
    }
  },
  methods: {
    getWeather() {
      this.$http.get(this.prod + '/meteo/temp').then(res => {
        if(this.timestamps_temp.length == 0) {
          this.temperature.push((res.body[0].temp - 273.15).toFixed(1));
          this.temperature_data.push([res.body[0].date , parseFloat((res.body[0].temp - 273.15).toFixed(1))]);
        }
        
        this.timestamps_temp.push(res.body[0].date);

        if(this.timestamps_temp[this.timestamps_temp.length - 1] != this.timestamps_temp[this.timestamps_temp.length - 2]) {
          this.temperature.push((res.body[0].temp - 273.15).toFixed(1));
          this.temperature_data.push([res.body[0].date, parseFloat((res.body[0].temp - 273.15).toFixed(1))]);
        }
      })

      this.$http.get(this.prod + '/meteo/wind').then(res => {
        if(this.timestamps_wind.length == 0) {
          this.wind.push(res.body[0].wind);
          this.wind_data.push([res.body[0].date, res.body[0].wind]);
        }
        
        this.timestamps_wind.push(res.body[0].date);

        if(this.timestamps_wind[this.timestamps_wind.length - 1] != this.timestamps_wind[this.timestamps_wind.length - 2]) {
          this.wind.push(res.body[0].wind);
          this.wind_data.push([res.body[0].date, res.body[0].wind]);
        }
      })

      this.$http.get(this.prod + '/meteo/pressure').then(res => {
        if(this.timestamps_pressure.length == 0) {
          this.pressure.push(res.body[0].pressure);
          this.pressure_data.push([res.body[0].date, res.body[0].pressure]);
        }
        
        this.timestamps_pressure.push(res.body[0].date);

        if(this.timestamps_pressure[this.timestamps_pressure.length - 1] != this.timestamps_pressure[this.timestamps_pressure.length - 2]) {
          this.pressure.push(res.body[0].pressure);
          this.pressure_data.push([res.body[0].date, res.body[0].pressure]);
        }
      })

      this.$http.get(this.prod + '/meteo/humidity').then(res => {
        if(this.timestamps_humidity.length == 0) {
          this.humidity.push(res.body[0].humidity);
          this.humidity_data.push([res.body[0].date, res.body[0].humidity]);
        }
        
        this.timestamps_humidity.push(res.body[0].date);

        if(this.timestamps_humidity[this.timestamps_humidity.length - 1] != this.timestamps_humidity[this.timestamps_humidity.length - 2]) {
          this.humidity.push(res.body[0].humidity);
          this.humidity_data.push([res.body[0].date, res.body[0].humidity]);
        }
      })

      this.$http.get(this.prod + '/meteo/luminosity').then(res => {
        if(this.timestamps_luminosity.length == 0) {
          this.luminosity.push(res.body[0].luminosity);
          this.luminosity_data.push([res.body[0].date, res.body[0].luminosity]);
        }
        
        this.timestamps_luminosity.push(res.body[0].date);

        if(this.timestamps_luminosity[this.timestamps_luminosity.length - 1] != this.timestamps_luminosity[this.timestamps_luminosity.length - 2]) {
          this.luminosity.push(res.body[0].luminosity);
          this.luminosity_data.push([res.body[0].date, res.body[0].luminosity]);
        }
      })
    }
  },
  mounted() {
    this.temperature_data.push(this.temperature_header);
    this.humidity_data.push(this.humidity_header);
    this.pressure_data.push(this.pressure_header);
    this.wind_data.push(this.wind_header);
    this.luminosity_data.push(this.luminosity_header);

    this.getWeather();

    setInterval(this.getWeather, 1000)
  }
}
</script>

<style scoped>
h2 {
  font-size: 20px;
}
</style>
