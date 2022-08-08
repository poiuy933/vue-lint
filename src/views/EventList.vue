<template>
  <div class="event">
    <EventCard
      v-for="event in events"
      :class="event"
      :key="event.id"
      :event="event"
      @click="showDetails(event.id)"
    />
    <router-link :to="{ name: 'EventList', query: { page: 1 } }"
      >&lt;&lt;</router-link
    >
    <router-link
      :to="{ name: 'EventList', query: { page: page + 1 } }"
      v-if="Math.ceil(totalCount / perPage) > page"
      >{{ page + 1 }}</router-link
    >
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
      totalCount: 0,
    };
  },
  props: ["page", "perPage"],
  watch: {
    page: {
      immediate: true,
      handler: function (n, o) {
        EventService.getEvents(this.page, this.perPage)
          .then((response) => {
            this.events = response.data;
            this.totalCount = response.headers["x-total-count"];
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
  },
  created() {
    // console.log(this.page, this.perPage);
    // EventService.getEvents(this.page, this.perPage)
    //   .then((response) => {
    //     this.events = response.data;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
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
