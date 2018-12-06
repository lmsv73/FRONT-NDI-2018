<template>
  <div class="home h-100">
    <navbar></navbar>
    <b-container fluid class="home-container">
      <b-row class="h-100">
        <b-col class="pt-3 home-left-side" md="3">
          <div>
            <div class="weather-header">Météo</div>
            <div class="mt-3 weather-body d-flex justify-content-around">
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
            </div>
          </div>
        </b-col>
        <b-col md="6"></b-col>
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
      lat: null,
      lng: null,
      temperature: [],
      pressure: [],
      humidity: []
    }
  },
  methods: {
    getWeather() {
      this.$http.get(this.prod + '/meteo/' + this.lat + '/' + this.lng).then(res => {
        this.temperature.push((res.body.temp - 273.15).toFixed(1));
        this.pressure.push(res.body.pressure);
        this.humidity.push(res.body.humidity);
      })
    }
  },
  created() {
    this.$watchLocation().then(coordinates => {
      this.lat = coordinates.lat;
      this.lng = coordinates.lng;

      this.getWeather();

      setInterval(this.getWeather, 10000)
    })
  }
}
</script>

<style scoped>

</style>
