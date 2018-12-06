<template>
<div>
  <navbar></navbar>
  <h1 class="m-4">Mes Missions</h1>
  <div class="p-4" v-for="item in items" :key="item.id">
    <b-card :title="item.title"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2">
    <p class="card-text">
      {{item.first_name}}
    </p>
    <b-button to="/missions/" href="#" variant="primary">Voir la mission</b-button>
    </b-card>
  </div>
</div>

</template>
<script>
const items = [
  { id:1,isActive: true, age: 40, title: 'Mission 1', last_name: 'Macdonald', test : "lalala" },
  { id:2,isActive: false, age: 21, title: 'Mission 2', last_name: 'Shaw', test : "lalala" },
  { id:3,isActive: false, age: 89, title: 'Mission 3', last_name: 'Wilson', test : "lalala" },
  { id:4,isActive: true, age: 38, title: 'Mission 4', last_name: 'Carney', test : "lalala" }
]
export default {
    name : 'missions',
    data () {
    return {
      items: items
    }
  }
}
</script>
