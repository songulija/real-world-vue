<template>
  <form @submit.prevent="submit">
    <!-- @blur event is when user focusing on this element but then
     changes focus to different part of page. when field $dirty + $invalid
     dirty means user touched this field. touch vuelidate method that changes $dirty to true-->
    <input
      type="email"
      placeholder="What's your email"
      v-model="email"
      :class="{ error: $v.email.$error }"
      @blur="$v.email.$touch()"
    />
    <!-- show if email has $error($dirty + $invalid) -->
    <div v-if="$v.email.$error">
      <!-- getting $v validations obj. checking if email field email validation is false -->
      <p v-if="!$v.email.email" class="errorMessage">
        Please enter a valid email
      </p>
      <p v-if="!$v.email.required" class="errorMessage">Email is required</p>
    </div>
    <button :disabled="$v.$invalid" type="submit">Submit</button>
    <p v-if="$v.$anyError" class="errorMessage">
      Please fill out the required fields
    </p>
  </form>
</template>

<script>
// these are validators from vuelidate library
import { required, email } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      email: null,
    }
  },
  //adding validations options
  validations: {
    //email refering to data abote. so adding required,email validators. email validator runs regular expression
    email: {
      required,
      email,
    },
  },
  methods: {
    submit() {
      //setting dirty:true to all fields
      this.$v.$touch()
      // if form is NOT invalid
      if (!this.$v.$invalid) {
        console.log('Form submited:' + this.email)
      }
    },
  },
}
</script>
