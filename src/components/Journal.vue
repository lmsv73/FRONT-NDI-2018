<template>
    <div>
        <navbar></navbar>
        <div class="container">
            <h1 class="m-4">Journal</h1>
            <div v-for="message in messages" :key="message.id">
                <vue-markdown>{{message.msg}}</vue-markdown>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <textarea class="source full-height" v-model="editor" name="editor" id="" cols="30" rows="10"></textarea>
                </div>
                <div class="col-md-6">
                    <h3>Live Preview</h3>
                    <div class="result-html">
                        <vue-markdown :source="editor"></vue-markdown>
                    </div>
                </div>
            </div>
            <b-button class="mt-4" variant="success">Ajouter une entrée au journal</b-button>
        </div>
    </div>
</template>
<script>
const messages = [
   { id: 1 , msg : "# Journal #1" },
   { id: 2 , msg : "# Journal #2" },
   { id: 3 , msg : "# Journal #3" },
   { id: 4 , msg : "# Journal #4" },
]
export default {
    name : 'journal',
    data() {
        return {
            messages : messages,
            editor : "lala",
        }
    }
}
</script>

<style scoped>
.source {
    width: 100%;
    font-family: Menlo,Monaco,Consolas,"Courier New",monospace;
    font-size: 13px;
    padding: 2px;
}
.result-html {
    padding: 2px 10px;
    overflow: auto;
    background-color: #fff;
    border: 1px solid#ccc;
    border-radius: 4px;
}
</style>

