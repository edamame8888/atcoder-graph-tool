<template>
 <v-form
        ref="form"
        v-model="valid"
        @submit.prevent
  > 
    <v-row align="center">
        <v-col align="center">
          <v-radio-group required v-model="radio" :mandatory="true" row>

            <v-radio label="Rating" value="Rating" class="ml-12"></v-radio>
            <v-radio label="Pref" value="Pref" class="ml-12"></v-radio>
          </v-radio-group>

          <v-text-field 
            v-model="inputNum" 
            type="number" 
            slot="content" 
            :min = 0
            :max = 6000
            :rules="numRules"
            :step="100"
            label="Rating or Pref"
            class="mx-12"
            required
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-9"
            @click="pushBack"
          >
            Push This Score
          </v-btn>

          <v-btn
            color="error"
            class="ml-7"
            @click="popBack"
          >
            Pop Back
          </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      radio: "Rating",
      inputNum: 2000,
      numRules: [
        v => !!v || 'Numbers is required',
        v => (v>=0 && v<=6000) || 'NumberNumber must be valid',
      ],
    }),

    methods: {
      pushBack () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },
      popBack () {
        this.$refs.form.reset()
      },
    },
  }
</script>
