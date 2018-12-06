<template>
  <div class="home h-100">
    <navbar></navbar>
    <b-container fluid class="home-container">
      <b-row class="h-100">
        <b-col class="pt-3 home-left-side" md="3">
          <div>
            <div class="weather-header">Weather</div>
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
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<style scoped>

</style>
