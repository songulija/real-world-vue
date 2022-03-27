<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <!-- listen to input event(user types) -->
    <!-- binding input value to prop 'value', i also passed atributes for input
    i need to pinpoint which element inherits passed attributes type="..." and placeholder=".."
    :selected attribute. component receives value, i'm checking if that value matches option. means such 
    option exist. and it will be displayed as default-->
    <select v-bind:value="value" @input="updateValue" v-bind="$attrs">
      <option
        v-for="option in options"
        :selected="option === value"
        :key="option"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  // setting inherit attributes to false. becouse i pased attributes and by
  // default parent element in component inherits them (div) but i want input to
  // inherit them. <input type="text" placeholder="Title"
  inheritAttrs: false,
  props: {
    options: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    // if in Event create defined BaseInput v-model="event.title" has initial value
    // it will be sending that here as props 'value' so we need to define it as prop
    // it can be String or Number [String,Number]
    value: [String, Number],
  },
  methods: {
    updateValue(event) {
      //  component can emit custom events, calling it input and passing value
      // The parent can then listen to it using v-on:
      this.$emit('input', event.target.value)
    },
  },
}
</script>

<style></style>
