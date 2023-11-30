<template>
    <section class="filter">
        <input
        @input="onSaveFilterBy"
        v-model="filterBy.txt"
        placeholder="Search"
        type="text"
        name="text" >
    </section>
</template>

<script>
    export default {
        data(){
            return{
                filterBy:{
                    txt:''
                }
            }
        },
        methods:{
            onSaveFilterBy(){
                this.$emit('filter',this.filterBy)
            }
        }
    }
</script>

<style lang="scss">
.filter {
    padding: 10px;
    background-color: lightgray;
    margin-block: 10px;
}
</style>