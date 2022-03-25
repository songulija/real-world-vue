<template>
  <!-- link to dynamic route. site/event/:id. sending $route.params 'id' as prop
    for component to access it easier -->
  <router-link
    class="event-link"
    v-bind:to="{ name: 'event-show', params: { id: 1 } }"
  >
    <!-- -shadwo style is global one -->
    <div class="event-card -shadow">
      <span class="eyebrow">@{{ event.time }} on {{ event.date }}</span>
      <h4 class="title">{{ event.title }}</h4>
      <BaseIcon name="users">
        <span slot="slotDescription"
          >{{ event.attendees ? event.attendees.length : 0 }} attending</span
        >
      </BaseIcon>
    </div>
  </router-link>
</template>
<script>
// allows to export this component as Js module. so i can import it
export default {
  name: 'event-card',
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
}
</script>
<style scoped>
.event-card {
  padding: 20px;
  margin-bottom: 24px;
  transition: all 0.2s linear;
  cursor: pointer;
}
.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.event-card > .title {
  margin: 0;
}

.event-link {
  color: black;
  text-decoration: none;
  font-weight: 100;
}
</style>
