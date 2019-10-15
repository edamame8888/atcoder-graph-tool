<template>
  <v-app>
    // ツールバーの設定
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>AtCoder</span>
        <span class="font-weight-light">Rating Graph Tool</span>
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
      // グラフ要素
      <v-card
          class="mx-auto"
          max-width="70%"
        >
          <v-card-title class="justify-center">User Name</v-card-title>
          <v-responsive :aspect-ratio="16/9">
            <RatingGraph
              :userData="userData"
            /> 
          </v-responsive>
        </v-card>
    </v-content>
  </v-app>
</template>

<script>
import RatingGraph from './components/RatingGraph.vue';

export default {
  name: 'App',
  components: {
    RatingGraph,
  },
  data: () => ({
    userData: []
  }),
};
</script>
