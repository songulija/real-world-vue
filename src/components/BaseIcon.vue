<template>
  <!-- using v-html refering to svg computed propert y that i just created
allowing to render icon within template-->
  <div class="icon-wrapper">
    <!-- <svg class="icon" :width="width" :height="height">
      <use v-bind="{ 'xlink:href': '/feather-sprite.svg#' + name }" />
    </svg> -->
    <div v-html="svg"></div>
    <!-- Basically i could paste whatever i want into this
     component<BaseIcon>yeyeye</BaseIcon> -->
    <slot name="slotDescription"></slot>
  </div>
</template>
<script>
import feather from 'feather-icons'
export default {
  // defining props that can by passed, types and default values
  props: {
    name: String,
    // width can be number or string
    width: {
      type: [Number, String],
      default: 24,
    },
    height: {
      type: [Number, String],
      default: 24,
    },
  },
  //   creating computed property called svg. that basically will be calculated
  // based on passed values
  computed: {
    svg() {
      // using [name] props to select icon from that library. feather.iconsBell
      // convert to svg, customizing svg
      return feather.icons[this.name].toSvg({
        class: 'icon',
        width: this.width,
        height: this.height,
      })
    },
  },
}
</script>
<style scoped>
.icon-wrapper {
  display: inline-flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.4);
  font-size: 1rem;
  font-weight: 600;
  margin-right: 6px;
}
.icon {
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}
</style>
