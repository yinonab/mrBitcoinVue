<template>
    <article class="contact-preview">
        <img class="photo" v-bind:src="imgUrl()" alt="user-img">
        <h2>{{ contact.name }}</h2>
       
    </article>
</template>

<script>
export default {
    props: {
        contact: {
            type: Object,
            required: true,
        }
    },
    methods:{
        imgUrl() {
            return `https://robohash.org/${this.contact._id}?set=set5`
        }
    }
}
</script>

<style lang="scss">
.photo{
    width: 80px;
    height: 80px;
}
</style>