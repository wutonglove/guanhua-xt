<template>
  <div id="chart-pane" :data="data" ref="chart"></div>
</template>
<script>
  import HighCharts from 'highcharts';
  import HighCharts3D from 'highcharts/highcharts-3d';
  HighCharts3D(HighCharts);

  export default {
    props: {
      data: {
        type: Array
      }
    },
    data() {
      return {
        options: {},
        chart: {}
      };
    },
    mounted() {
      this.initOptions();
      this.$nextTick(() => {
        this.chart = HighCharts.chart('chart-pane', this.options);
      });
    },
    methods: {
      initOptions() {
        this.options = {
          title: {
            text: '学生答题情况',
            style: {
              color: '#D5DADD',
              fontSize: 22,
              fontWeight: 800
            },
            y: 30
          },
          chart: {
            type: 'pie',
            options3d: {
              enabled: true,
              alpha: 45,
              beta: 0
            },
            backgroundColor: {
              radialGradient: [0, 0, 20],
              stops: [
                [0, '#626F74'],
                [1, '#24292B']
              ]
            },
            spacingBottom: 60
          },
          legend: {
            itemStyle: {
              color: '#E0E5E8',
              fontSize: 14
            },
            align: 'right',
            verticalAlign: 'bottom',
            layout: 'vertical',
            floating: true,
            y: 30
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              depth: 35,
              dataLabels: {
                enabled: false
              },
              slicedOffset: 20,
              showInLegend: true
            }
          },
          series: [{
            type: 'pie',
            name: '学生答题结果占比',
            data: this.data
          }]
        };
      },
      update(value) {
        if (this.chart.series) {
          this.chart.series[0].update({
            data: value
          });
        }
      }
    },
    watch: {
      data: {
        deep: true,
        handler(val) {
          this.update(val);
        }
      }
    }
  };
</script>
