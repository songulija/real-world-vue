<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <!-- listen to input event(user types) -->
    <!-- binding input value to prop 'value', i also passed atributes for input
    i need to pinpoint which element inherits passed attributes type="..." and placeholder=".."
    v-on="$listeners" is to hear events from parent. but now it inherits @input event listener on
     parent so there is conflict. so now use computer prop
    -->
    <input
      v-bind:value="value"
      @input="updateValue"
      v-bind="$attrs"
      v-on="listeners"
    />
  </div>
</template>

<script>
import { formFieldMixin } from '@/mixins/FormFieldMixin'
export default {
  // import mixin that contains props and methods that share both BaseInput
  //& BaseSelect components
  mixins: [formFieldMixin],
  computed: {
    listeners() {
      // it will return what is already in listeners but seting @input listener to updateValue method
      return {
        ...this.$listeners,
        input: this.updateValue,
      }
    },
  },
}
</script>

<style></style>
