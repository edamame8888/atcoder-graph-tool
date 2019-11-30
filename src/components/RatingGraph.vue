<template>
  <highcharts
    :options="chartOptions"
    class="graph"/>
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

export default {
  name: 'GraphMaker',
  data () {
    return {
      title: '',
      points: [[Date.UTC(2016, 10, 25), 200], [Date.UTC(2017, 4, 25), 900], [Date.UTC(2017, 5, 25), 900], [Date.UTC(2017, 10, 25), 1000], [Date.UTC(2017, 11, 25), 1000], [Date.UTC(2018, 10, 25), 2150]],
      chartType: 'line',
      plotShadow: true,
      config: {
            chart: {
                type: 'line'
            },
            series: [{}]
      },
      chartOptions: {
        chart: {
          type: 'line',
          plotBorderColor: 'rgb(165, 165, 165)',
          borderRadius: 20,
          plotBorderWidth: 3,
          height: (9 / 16 * 100) + '%' // 16:9 ratio
        },
        title: {
          text: ''// タイトルはCard側でつける
        },
        xAxis: {
          tickWidth: 0,
          minPadding: 0.001,
          minRange: 30 * 24 * 3600 * 1000, // この値間隔を調整
          gridLineWidth: 1,
          type: 'datetime',
          dateTimeLabelFormats: {month: '%b <br>%Y'},
          // pointStart = arry min - 10 とかやりたい
          plotOptions: {
            series: {
              lineWidth: 10,
              borderColor: 'white',
              borderWidth: 15.2
            }
          }
        },
        yAxis: {
          // 横軸の幅
          tickInterval: 400,
          tickWidth: 0,
          gridLineWidth: 1,

          plotBands: [ {
            from: 0,
            to: 399,
            color: 'rgb(214, 214, 214)'
          }, {
            from: 400,
            to: 799,
            color: 'rgb(214, 195, 178)'
          }, {
            from: 800,
            to: 1199,
            color: 'rgb(178, 214, 178)'
          }, {
            from: 1200,
            to: 1599,
            color: 'rgb(178, 234, 234)'
          }, {
            from: 1600,
            to: 1999,
            color: 'rgb(178, 181, 255)'
          }, {
            from: 2000,
            to: 2399,
            color: 'rgb(234, 233, 179)'
          }, {
            from: 2400,
            to: 2799,
            color: 'rgb(255, 213, 178)'
          }, {
            from: 2800,
            to: 10000,
            color: 'rgb(255, 178, 178)'
          } ]
        },
        tooltip: {
          // shared: true,
          followPointer: true,
          useHTML: true,
          headerFormat: '<p>{point.contestName}</p><table>',
          pointFormat: 
            '<tr><td style="color:{point.color}">Rating: </td>' + '<td style="text-align: right"><b>{point.y}</b></td></tr>' +
            '<tr><td>Pref: </td>' + '<td style="text-align: right"><b>{point.pref}</b></td></tr>' +
            '<tr><td>Diff: </td>' + '<td style="text-align: right"><b>{point.diff} </b></td></tr>' +
            '<tr><td>Day: </td>' + '<td style="text-align: right"><b>{point.x} </b></td></tr>' ,
          footerFormat: '</table>',
        },
        plotOptions: {
          series: {
            color: '#dcdcdc',
            lineWidth: 2,
            borderWidth: 2,
            borderColor: 'black',
            shadow: true,
            marker: {
              enabled: true,
              symbol: 'circle', // プロット点を円で描画する
              radius: 4, // 円の大きさ
              lineWidth: 0.6,
              enabledThreshold: 100,
              lineColor: '#FFFFFF' // inherit from series
            }
          }
        },
        series: [{
          data: [ 
            {
              x: Date.UTC(2017, 4, 25),
              y: 200,
              color: getColor(200)
            },
            {
              x: Date.UTC(2017, 5, 25),
              y: 500,
              color: getColor(500)
            },
            {
              x: Date.UTC(2017, 6, 25),
              y: 600,
              color: getColor(600)
            },
            {
              x: Date.UTC(2018, 4, 25),
              y: 800,
              color: getColor(800)
            },
            {
              x: Date.UTC(2018, 10, 25),
              y: 1200,
              color: getColor(1200)
            },
            {
              x: Date.UTC(2019, 7, 25),
              y: 1800,
              color: getColor(1800)
            },
            {
              x: Date.UTC(2019, 8, 25),
              y: 2000,
              color: getColor(2000)
            },
            {
              x: Date.UTC(2019, 9, 25),
              y: 2200,
              color: getColor(2200)
            },
            {
              x: Date.UTC(2019, 10, 25),
              y: 2300,
              color: getColor(2300)
            },
            {
              x: Date.UTC(2019, 11, 1),
              y: 2600,
              color: getColor(2600)
            },
            {
              x: Date.UTC(2019, 11, 25),
              y: 2900,
              color: getColor(2900)
            }  
          ]
        } ]
      }
    }
  },
  computed: {
    contestsData: function () {
      return this.$store.state.contestsData
    }
  },
  watch: {
    contestsData() {
      console.log("changed!!")
      this.chartOptions.series[0].data = this.contestsData
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
