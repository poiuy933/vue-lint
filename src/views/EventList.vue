<template>
  <div class="event">
    <EventCard
      v-for="event in events"
      :class="event"
      :key="event.id"
      :event="event"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from "@/components/EventCard.vue";
import EventService from "@/services/EventService.js";
export default {
  name: "EventList",
  components: {
    EventCard, // register it as a child component
  },
  data() {
    return {
      events: null,
    };
  },
  created() {
    EventService.getEvents()
      // .get(
      //   'https://my-json-server.typicode.com/Code-Pop/Real-World_Vue-3/events'
      // )
      .then((response) => {
        this.events = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<style scoped>
.event {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
