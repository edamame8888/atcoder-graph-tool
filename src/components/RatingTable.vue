<template>

  <v-card
    class="mx-auto"
    max-width="90%"
  >
     <v-card-title>
      コンテスト成績表
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="contest_data"
      :custom-sort="customSort"
      :search="search"
    >
        <template v-slot:item.x="{ item }">
            <td>{{ item.x.toLocaleString() }}</td>
        </template>
        
        <template v-slot:item.contestName="{ item }">
            <td v-if='item.url != ""'> <a :href='"https://"+item.url'>{{ item.contestName }}</a></td>
            <td v-else> {{ item.contestName }} </td>
        </template>

        <template v-slot:item.y="{ item }">
            <td :style='getRatingColor(item.y)'>{{item.y}}</td>
        </template>

        <template v-slot:item.pref="{ item }">
            <td :style="getRatingColor(item.pref)">{{item.pref}}</td>
        </template>

        <template v-slot:item.diff="{ item }">
            <td v-if="item.diff >= 0" :style="getNumColor(item.diff)">+{{item.diff}}</td>
            <td v-else :style="getNumColor(item.diff)">{{item.diff}}</td>
        </template>

    </v-data-table>
  </v-card>
</template>

<script>

export default {
  data () {
    return {
      contest_data: [],
      search: '',
      headers: [
        { text: 'date', sortable: true, value: 'x'},
        { text: 'ContestName', sortable: true, value: 'contestName' },
        { text: 'Rating', sortable: true, value: 'y' },
        { text: 'Performance', sortable: true, value: 'pref' },
        { text: 'diff', sortable: true, value: 'diff' },
      ],
    }
  },
  computed: {
    contestsData: function () {
      return this.$store.state.contestsData
    },
  },
  watch: {
    contestsData() {
      this.contest_data = this.contestsData;
    }
  },
  methods: {
    getRatingColor (rating) {
        if (rating < 400) {
            return 'color:#757575'
        } else if (rating < 800) {
            return 'color:#7b3d00'
        } else if (rating < 1200) {
            return 'color:#007b00'
        } else if (rating < 1600) {
            return 'color:#00baba'
        } else if (rating < 2000) {
            return 'color:#0000f7'
        } else if (rating < 2400) {
            return 'color:#baba00'
        } else if (rating < 2800) {
            return 'color:#f67b00'
        } else {
            return 'color:#f60000'
        }
    },
    getNumColor (num) {
        if (num >= 0) {
            return 'color:#E53935'
        } else  {
            return 'color:#536DFE'
        }
    },
    customSort(items, index, isDescending) {
        items.sort((a, b) => {
            if (index[0] === "x") {
                if (isDescending[0]) {
                    return b[index].getTime() > a[index].getTime() ? -1 : 1
                } else {
                    return a[index].getTime() > b[index].getTime() ? -1 : 1
                }
            } else {
                if (!isDescending[0]) {
                    return b[index] > a[index] ? -1 : 1
                } else {
                    return a[index] > b[index] ? -1 : 1
                }
            }
        });
        return items;
    },
  },
}
</script>

