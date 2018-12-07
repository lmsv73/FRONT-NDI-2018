<template>
<div>
    <navbar></navbar>
    <h1 class="m-4">Stock</h1>
    <div>
        <b-table striped hover :items="items" :fields="fields">
            <template slot="icon" slot-scope="row">
                <img :src="'images/'+ row.item._icon + '.png' ">
            </template>
            <template slot="quantity" slot-scope="row">
                <input type="number" v-model="row.item._quantity">
            </template>
            <template slot="actions" slot-scope="row">
                 <b-button variant="primary" @click="updateStock(row.item)" >Modifier</b-button>
            </template>
        </b-table>
    </div>
</div>
</template>
<script>
/* eslint-disable */
export default {
    name: 'stock',
    data() {
        return {
            items : [
                { name: 'Eau', _icon : 'water', _quantity : 42},
                { name: 'Aliments', _icon : 'food', _quantity : 42}
            ],
            fields : ['name','icon','quantity','actions']
        }
    },
    created : function (){
        this.$http.get(this.prod + '/resources').then( (data) => {
            console.log(data);
        });
    },
    methods : {
        updateStock(item) {
            console.log(item);
            this.$http.post(this.prod + '/resources/modify', {name : item.name, number: item._quantity}).then( res => {
                console.log("all good");
            });
        }
    }
}
</script>
