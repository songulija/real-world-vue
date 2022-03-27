// mixin - this will be object that contains the options that
// weere repeated in baseinput & baseselect component to not repeat
// same methods and props again
export const formFieldMixin = {
  // setting inherit attributes to false. becouse i pased attributes and by
  // default parent element in component inherits them (div) but i want input to
  // inherit them. <input type="text" placeholder="Title"
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: '',
    },
    // if in Event create defined BaseInput v-model="event.title" has initial value
    // it will be sending that here as props 'value' so we need to define it as prop
    // it can be String or Number [String,Number]
    // passed value from Parent component with help of v-model
    value: [String, Number],
  },
  methods: {
    updateValue(event) {
      // emiting this event to parent. v-model auto listens to
      //'@input' so it will make change based on passed value.
      this.$emit('input', event.target.value)
    },
  },
}
