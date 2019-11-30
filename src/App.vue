<template>
  <v-app>
    // ツールバーの設定
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>AtCoder</span>
        <span class="font-weight-light"> Rating Graph Tool</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="https://edamame88portfolio.firebaseapp.com/"
        target="_blank"
      >
        <span class="mr-2">Portfolio</span>
      </v-btn>
    </v-app-bar>

    <v-content> 
      <!-- Form要素 -->
      <v-content>
        <Form
          :contest_data="userData"
        />
      </v-content>

      
        <v-row>
          <!-- グラフ要素 -->
          <v-col :cols=8>
            <v-content>
              <v-card class="mx-auto">
                <v-card-title class="justify-center">{{currentUser}}</v-card-title>
                <v-responsive :aspect-ratio="16/9">
                  <RatingGraph
                    :userData="userData"
                  /> 
                </v-responsive>
              </v-card>
            </v-content>
          </v-col>

          <!-- パラメータフォーム -->
          <v-col>
            <v-content>
              <v-card>
                <ParamForm/>
              </v-card>
            </v-content>
          </v-col>
        </v-row>
      </v-content>
   
  </v-app>
</template>

<script>
import RatingGraph from './components/RatingGraph.vue'
import Form from './components/Form.vue'
import ParamForm from './components/ParametersForm'

export default {
  name: 'App',
  components: {
    RatingGraph,
    Form,
    ParamForm,
  },
  computed: {
    currentUser() {
        return this.$store.state.userID;
      }
  },
  data: () => ({
    userData: []
  }),
};
</script>
