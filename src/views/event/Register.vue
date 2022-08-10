<template>
<h3>Register Event</h3>
<button @click="register">Register me</button>
</template>

<script>
export default {
  inject: ['GStore'],
  props: ['event'],
  methods: {
    register () {
      this.GStore.flashMessage = 'You\'re successfully registered for ' + this.event.title
      setTimeout(() => {
        this.GStore.flashMessage = ''
      }, 3000)
      this.$router.push({
        name: 'EventDetails'
      })
    }
  }
}
</script>
