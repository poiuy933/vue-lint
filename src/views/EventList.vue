<template>
  <div class="event">
    <EventCard
      v-for="event in events"
      :class="event"
      :key="event.id"
      :event="event"
      @click="showDetails(event.id)"
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
  props: ["page", "perPage"],
  created() {
    console.log(this.page, this.perPage);
    EventService.getEvents(this.page, this.perPage)
      .then((response) => {
        this.events = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    showDetails: function (eventId) {
      this.$router.replace({ name: "EventDetails", params: { id: eventId } });
    },
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
