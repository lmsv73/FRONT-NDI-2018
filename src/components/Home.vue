<template>
  <div class="home h-100">
    <navbar></navbar>
    <b-container fluid class="home-container">
      <b-row class="h-100">
        <b-col class="pt-3 home-left-side mb-3" md="3">
          <div>
            <div class="weather-header">Météo</div>
            <div class="mt-3 mb-3 weather-body d-flex justify-content-around">
              <div class="text-center" @click="selected_graph=1">
                <img v-if="selected_graph == 1" class="d-block pb-2 m-auto" src="images/temperature-orange.png">
                <img v-else class="d-block pb-2 m-auto" src="images/temperature.png">
                <span v-if="temp_data.length">{{ temp_data[temp_data.length - 1][1] }}°C</span>
              </div>
              <div class="text-center" @click="selected_graph=2">
                <img v-if="selected_graph == 2" class="d-block pb-2 m-auto" src="images/humidite-orange.png">
                <img v-else class="d-block pb-2 m-auto" src="images/humidite.png">
                <span v-if="humidity_data.length">{{ humidity_data[humidity_data.length - 1][1] }} %</span>
              </div>
              <div class="text-center" @click="selected_graph=3">
                <img v-if="selected_graph == 3" class="d-block pb-2 m-auto" src="images/pression-orange.png">
                <img v-else class="d-block pb-2 m-auto" src="images/pression.png">
                <span v-if="pressure_data.length">{{ pressure_data[pressure_data.length - 1][1] }} hPa</span>
              </div>
            </div>
            <div class="mt-3 mb-3 weather-body d-flex justify-content-around">
              <div class="text-center" @click="selected_graph=4">
                <img v-if="selected_graph == 4" class="d-block pb-2 m-auto" src="images/soleil-orange.png">
                <img v-else class="d-block pb-2 m-auto" src="images/soleil.png">
                <span v-if="luminosity_data.length">{{ luminosity_data[luminosity_data.length - 1][1] }} lux</span>
              </div>
              <div class="text-center" @click="selected_graph=5">
                <img v-if="selected_graph == 5" class="d-block pb-2 m-auto" src="images/vent-orange.png">
                <img v-else class="d-block pb-2 m-auto" src="images/vent.png">
                <span v-if="wind_data.length">{{ wind_data[wind_data.length - 1][1] }} m/s</span>
              </div>
              <div class="text-center" @click="selected_graph=6">
                <img v-if="selected_graph == 6" class="d-block pb-2 m-auto" src="images/montagne-orange.png">
                <img v-else class="d-block pb-2 m-auto" src="images/montagne.png">
                <span v-if="altitude_data.length">{{ altitude_data[altitude_data.length - 1][1] }} m</span>
              </div>
            </div>
            <div>
              <b-alert variant="danger" :show="temp_data.length && temp_data[temp_data.length - 1][1] <= 0">Température trop basse</b-alert>
              <b-alert variant="danger" :show="temp_data.length && temp_data[temp_data.length - 1][1] >= 40">Température trop haute</b-alert>

              <b-alert variant="danger" :show="humidity_data.length && humidity_data[humidity_data.length - 1][1] >= 80">Humidité trop haute</b-alert>

              <b-alert variant="danger" :show="pressure_data.length && pressure_data[pressure_data.length - 1][1] <= 700">Pression trop basse</b-alert>
              <b-alert variant="danger" :show="pressure_data.length && pressure_data[pressure_data.length - 1][1] >= 1100">Pression trop haute</b-alert>

              <b-alert variant="danger" :show="luminosity_data.length && luminosity_data[luminosity_data.length - 1][1] <= 20">Luminosité trop basse</b-alert>
              <b-alert variant="danger" :show="luminosity_data.length && luminosity_data[luminosity_data.length - 1][1] >= 25000">Luminosité trop haute</b-alert>

              <b-alert variant="danger" :show="wind_data.length && wind_data[wind_data.length - 1][1] >= 35">Vent trop fort</b-alert>
            </div>
          </div>
        </b-col>
        <b-col md="6">
          <div v-if="selected_graph == 1">
            <h2>Variations des températures</h2>
            <GChart
              type="LineChart"
              :data="temp_data"
              :options="{hAxis: {textPosition: 'none'}, vAxis: {gridLines: {color: 'transparent'}}}"
            />
          </div>
          <div v-if="selected_graph == 2">
            <h2>Variations de l'humidité</h2>
            <GChart
              type="LineChart"
              :data="humidity_data"
              :options="{hAxis: {textPosition: 'none'}, vAxis: {gridLines: {color: 'transparent'}}}"
            />
          </div>
          <div v-if="selected_graph == 3">
            <h2>Variations de la pression atmosphérique</h2>
            <GChart
              type="LineChart"
              :data="pressure_data"
              :options="{hAxis: {textPosition: 'none'}, vAxis: {gridLines: {color: 'transparent'}}}"
            />
          </div>
          <div v-if="selected_graph == 4">
            <h2>Variations de la luminosité</h2>
            <GChart
              type="LineChart"
              :data="luminosity_data"
              :options="{hAxis: {textPosition: 'none'}, vAxis: {gridLines: {color: 'transparent'}}}"
            />
          </div>
          <div v-if="selected_graph == 5">
            <h2>Variations de la vitesse du vent</h2>
            <GChart
              type="LineChart"
              :data="wind_data"
              :options="{hAxis: {textPosition: 'none'}, vAxis: {gridLines: {color: 'transparent'}}}"
            />
          </div>
          <div v-if="selected_graph == 6">
            <h2>Variations de l'altitude</h2>
            <GChart
              type="LineChart"
              :data="altitude_data"
              :options="{hAxis: {textPosition: 'none'}, vAxis: {gridLines: {color: 'transparent'}}}"
            />
          </div>

          <b-button v-if="!active_heartbeat" @click="startHeartbeat">Start Heartbeat</b-button>
          <b-button v-else @click="stopHeartbeat">Stop Heartbeat</b-button>

          <div class="mt-3"  v-if="heartbeats_data.length > 1">
            <h2>Variations cardiaques</h2>
            <GChart
              type="LineChart"
              :data="heartbeats_data"
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
      temp: [],
      pressure: [],
      humidity: [],
      wind: [],
      luminosity: [],
      altitude: [],
      temp_header: ['Date', 'Température'],
      temp_data: [],
      pressure_header: ['Date', 'Pression'],
      pressure_data: [],
      humidity_header: ['Date', 'Humidité'],
      humidity_data: [],
      wind_header: ['Date', 'Vent'],
      wind_data: [],
      luminosity_header: ['Date', 'Luminosité'],
      luminosity_data: [],
      altitude_header: ['Date', 'Altitude'],
      altitude_data: [],
      active_heartbeat: false,
      heartbeats_header: ['Date', 'Heartbeat'],
      heartbeats_data: [],
      interval: null,
      selected_graph: 1
    }
  },
  methods: {
    async getWeather(nb) {

      if(nb != undefined) {
        let res = await this.$http.get(this.prod + '/meteo/temp/' + nb);
        res.body.reverse();
        this.setAllData('temp', res.body);
      } else {
        let res = await this.$http.get(this.prod + '/meteo/temp/');
        this.setOneData('temp', res.body[0]);
      }

      if(nb != undefined) {
        let res = await this.$http.get(this.prod + '/meteo/wind/' + nb);
        res.body.reverse();
        this.setAllData('wind', res.body);
      } else {
        let res = await this.$http.get(this.prod + '/meteo/wind/');
        this.setOneData('wind', res.body[0]);
      }

      if(nb != undefined) {
        let res = await this.$http.get(this.prod + '/meteo/pressure/' + nb);
        res.body.reverse();
        this.setAllData('pressure', res.body);
      } else {
        let res = await this.$http.get(this.prod + '/meteo/pressure/');
        this.setOneData('pressure', res.body[0]);
      }
      
      if(nb != undefined) {
        let res = await this.$http.get(this.prod + '/meteo/humidity/' + nb);
        res.body.reverse();
        this.setAllData('humidity', res.body);
      } else {
        let res = await this.$http.get(this.prod + '/meteo/humidity/')
        this.setOneData('humidity', res.body[0]);
      }

      if(nb != undefined) {
        let res = await this.$http.get(this.prod + '/meteo/luminosity/' + nb);
        res.body.reverse();
        this.setAllData('luminosity', res.body);
      } else {
        let res = await this.$http.get(this.prod + '/meteo/luminosity/');
        this.setOneData('luminosity', res.body[0]);
      }


      if(nb != undefined) {
        let res = await this.$http.get(this.prod + '/meteo/altitude/' + nb);
        res.body.reverse();
        this.setAllData('altitude', res.body);
      } else {
        let res = await this.$http.get(this.prod + '/meteo/altitude/');
        this.setOneData('altitude', res.body[0]);
      }
    },
    setAllData(type, data){
      this[type].push(data[0][type]);
      data.forEach((d) => {
        if(type === "temp"){
          this[type + "_data"].push([d.date, parseFloat((d[type]- 273.15).toFixed(1))]);
        }else{
         this[type + "_data"].push([d.date, d[type]]); 
        }
      })
    },
    setOneData(type, data){
      let lastdata = this[type + "_data"][this[type + "_data"].length - 1];
      if(data.date !== lastdata[0]){
        if(type === "temp"){
          this[type + "_data"].push([data.date, parseFloat((data[type]- 273.15).toFixed(1))]);
        }else{
          this[type + "_data"].push([data.date, data[type]]);
        }
        this[type + "_data"].splice(2, 1);
      }
    },
    startHeartbeat() {
      this.heartbeats_data = [];
      this.heartbeats_data.push(this.heartbeats_header);

      this.$http.get(this.prod + '/cardiac/activate').then(res => {
        if(res.body.ok != null) {
          this.active_heartbeat = true;
          this.interval = setInterval(() => {
            this.$http.get(this.prod + '/cardiac').then(res => {
              this.heartbeats_data.push([Date.now(), res.body]);
            })
          }, 1000);
        } else {
          this.$http.get(this.prod + '/cardiac/stop').then(() => {
            this.startHeartbeat();
          })
        }
      })
    },
    stopHeartbeat() {
      this.$http.get(this.prod + '/cardiac/stop').then(() => {
        this.active_heartbeat = false;
        clearInterval(this.interval);
      })
    }
  },
  mounted() {
    this.temp_data.push(this.temp_header);
    this.humidity_data.push(this.humidity_header);
    this.pressure_data.push(this.pressure_header);
    this.wind_data.push(this.wind_header);
    this.luminosity_data.push(this.luminosity_header);
    this.altitude_data.push(this.altitude_header);
    this.heartbeats_data.push(this.heartbeats_header);

    this.getWeather(10);

    setInterval(this.getWeather, 1000)
  }
}
</script>

<style scoped>
h2 {
  font-size: 20px;
}
.weather-body div {
  flex: 3;
}

.weather-body img.activated {
  color: #dca019;
}
</style>
