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
            :disabled="btnRules"
            color="success"
            class="mr-9"
            @click="pushBack"
          >
            Push This Score
          </v-btn>

          <v-btn
            color="error"
            class="ml-7"
            :disabled="popRules"
            @click="popBack"
          >
            Pop Back
          </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>

  // Rating 計算に用いる関数

  function bigf(n) {
    var num = 1.0;
    var den = 1.0;
    for (var i = 0; i < n; ++i) {
      num *= 0.81;
      den *= 0.9;
    }
    num = (1 - num) * 0.81 / 0.19;
    den = (1 - den) * 0.9 / 0.1;
    return Math.sqrt(num) / den;
  }

  function f(n) {
      var finf = bigf(400);
      return (bigf(n) - finf) / (bigf(1) - finf) * 1200.0;
  }

  // Returns unpositivized ratings.
  function calc_rating(arr) {
    var n = arr.length;
    var num = 0.0;
    var den = 0.0;
    for (var i = n - 1; i >= 0; --i) {
      num *= 0.9;
      num += 0.9 * Math.pow(2, arr[i] / 800.0);
      den *= 0.9;
      den += 0.9;
    }
    var rating = Math.log2(num / den) * 800.0;
    rating -= f(n);
    return rating;
  }

  // In arr, recent performances come forward.
  function calc(arr, goal_rating) {
    // binary search
    goal_rating = unpositivize_rating(goal_rating)
    var lo = -10000.0;
    var hi = 10000.0;
    for (var i = 0; i < 100; ++i) {
      var mid = (hi + lo) / 2;
      var r = calc_rating([mid].concat(arr));
      if (r >= goal_rating) {
        hi = mid;
      } else {
        lo = mid;
      }
    }
    return hi;
  }

  // (0, inf) -> (-inf, inf)
  function unpositivize_rating(r) {
    if (r >= 400.0) {
      return r;
    }
    return 400.0 + 400.0 * Math.log(r / 400.0);
  }

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

  function getPrefArr (arr) {
    if (!arr) return [];
        
      var values = [];
      for(var i = arr.length-1; i >=0; i--) {
        values.push(arr[i].pref);
      }
      return values;
  }

  export default {
    data: () => ({
      valid: true,
      radio: "Rating",
      inputNum: 2000,
      numRules: [
        v => !!v || 'Numbers is required',
        v => (v>=0 && v<=6000) || 'Number must be valid',
      ],
      pushCnt: 1,
    }),
    computed:{
      btnRules(){
        return !this.valid || this.$store.state.contestsData  <= 0
      },
      popRules(){
        return this.$store.state.contestsData  <= 0
      }
    },
    methods: {
      pushBack () {
        var newY, newRating,newPref, contestCnt, date, addData
        if (this.radio == "Rating") {
          newY = Number(this.inputNum)
          prefArr = getPrefArr(this.$store.state.contestsData)
          newPref = calc(prefArr, newY)
          contestCnt = this.$store.state.contestsData.length
          date = new Date(this.$store.state.contestsData[contestCnt-1].x)
          date.setDate(date.getDate() + 7);
          
          // Prefの計算
          addData = {
            x: date,
            y: newY,
            pref: newPref,
            url: "",
            contestName: `${this.pushCnt} times later Contest`,
            diff: newY - this.$store.state.contestsData[contestCnt-1].y,
            color: getColor(this.inputNum)
          }
          
        } else { // Pref
          // TODO: create function
          newPref = Number(this.inputNum)
          var prefArr = getPrefArr(this.$store.state.contestsData)
          var newArr  = [newPref].concat(prefArr)
          newRating = calc_rating(newArr)
          contestCnt = this.$store.state.contestsData.length
          date = new Date(this.$store.state.contestsData[contestCnt-1].x)
          date.setDate(date.getDate() + 7);

          addData = {
            x: date,
            y: parseInt(newRating),
            pref: newPref,
            url: "",
            contestName: `${this.pushCnt} times later Contest`,
            diff: newRating - this.$store.state.contestsData[contestCnt-1].y,
            color: getColor(newRating)
          }
          
        }
        this.$store.state.contestsData.push(addData)
        this.pushCnt++
      },
      popBack () {
        this.$store.state.contestsData.pop()
      },
    },
  }
</script>
