<template>
    <div v-if="event">
        <h1>{{ event.title }}</h1>
        <div id="nav">
            <router-link :to="{name: 'EventDetails'}">Details</router-link> |
            <router-link :to="{name: 'EventEdit'}">Edit</router-link> |
            <router-link :to="{name: 'EventRegister'}">Register</router-link>
        </div>
        <router-view :event="event"></router-view>
    </div>
</template>

<script>
import EventService from '@/services/EventService.js'
export default {
  data () {
    return {
      event: null
    }
  },
  props: ['id'], // has to set "props: true" for the route, so that params will be passed as props
  created () {
    // can also use this.$route.params.id to get the id
    EventService.getEvent(this.id)
      .then((response) => {
        this.event = response.data
      })
      .catch((error) => {
        console.log(error)
        if (error.response.status === 404) {
          this.$router.replace({ name: '404Resource', params: { resource: 'event' } })
        } else {
          this.$router.replace({ name: 'NetworkError' })
        }
      })
  }
}
</script>

<style lang="scss" scoped>
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
