<template>
  <div>
    <h1>Shopping event #{{ id }}</h1>
  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
}
</script>
<style scoped></style>
