<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <!-- listen to input event(user types) -->
    <!-- binding input value to prop 'value', i also passed atributes for input
    i need to pinpoint which element inherits passed attributes type="..." and placeholder=".."
    :selected attribute. component receives value, i'm checking if that value matches option. means such 
    option exist. and it will be displayed as default. v-on="$listeners" is to hear events from parent
    but now it inherits @input event listener on parent so there is conflict. so now use computer prop -->
    <select
      :value="value"
      @change="updateValue"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <option
        v-for="option in options"
        :value="option"
        :key="option.id"
        :selected="option === value"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
import { formFieldMixin } from '@/mixins/FormFieldMixin'
export default {
  // import mixin that contains props and methods that share both BaseInput
  //& BaseSelect components
  mixins: [formFieldMixin],
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style></style>
