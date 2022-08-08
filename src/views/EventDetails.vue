<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>
<script>
import EventService from "@/services/EventService.js";
export default {
  data() {
    return {
      event: null,
    };
  },
  props: ["id"], //has to set "props: true" for the route, so that params will be passed as props
  created() {
    // can also use this.$route.params.id to get the id
    EventService.getEvent(this.id)
      .then((response) => {
        this.event = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
