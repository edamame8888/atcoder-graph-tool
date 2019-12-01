<template>

  <v-card
    class="mx-auto"
    max-width="70%"
  >
   
     <v-form
      ref="form"
      v-model="valid"
      @submit.prevent
     >
      <v-card-actions>
    <v-text-field 
      v-model="userId" 
      type="text"
      :rules="rules"
      label="AtCoder User ID"
      required
    ></v-text-field>
        <v-btn
          :disabled="!userId || !valid"
          color="success"
          class="ml-10"
          @click="getGraphData"
        >
          Add
        </v-btn>
        </v-card-actions>
     </v-form>
  </v-card>

  
</template>

<script>

function getColor (rating) {
  if (rating < 400) {
    return 'rgb(124, 124, 124)'
  } else if (rating < 800) {
    return 'rgb(123, 61, 0)'
  } else if (rating < 1200) {
    return 'rgb(0, 123, 0)'
  } else if (rating < 1600) {
    return 'rgb(0, 186, 186)'
  } else if (rating < 2000) {
    return 'rgb(0, 0, 247)'
  } else if (rating < 2400) {
    return 'rgb(186, 186, 0)'
  } else if (rating < 2800) {
    return 'rgb(246, 123, 0)'
  } else {
    return 'rgb(246, 0, 0)'
  }
}

function removeUnrated (data) {
  var tmp = []
  for(var i = 0; i < data.length; i++){
    if(data[i].IsRated == true){
      var endTime = new Date(data[i].EndTime)
      var addData = {
        x: endTime,
        y: data[i].NewRating,
        pref: data[i].Performance,
        url: data[i].ContestScreenName,
        contestName: data[i].ContestName,
        diff: data[i].NewRating - data[i].OldRating,
        color: getColor(data[i].NewRating)
      }
      tmp.push(addData)
    }
  }
  return tmp
}

import axios from 'axios'

export default {
  data () {
    return {
      contest_data: null,
      userId: null,
      valid: true
    }
  },
  computed: {
    rules(){
      const rules = []
      const rule_max =
            v => (v || '').length <= 30 ||
              `A maximum of ${30} characters is allowed`

      rules.push(rule_max)

      const rule_sp =
            v => (v || '').indexOf(' ') < 0 ||
              'No spaces are allowed'

      rules.push(rule_sp)

      return rules
    },
  },
  methods: {
    getGraphData (){
      this.$store.commit('setUserID', this.userId)
      axios
        // proxi サーバを経由
        //.get(`https://atcoder.jp/users/${this.userId}/history/json`)
        .get(`https://secure-gorge-19428.herokuapp.com/api/parser/${this.userId}`)
        .then(response => {
          this.$store.commit('setContestsData',removeUnrated(response.data))
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  props: ['userData']
}
</script>

