<template>
  <div id="app">
    <div class="opration">
      <el-date-picker
        v-model="value1"
        size="mini"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
      <el-select class="month" size="mini" v-model="value" placeholder="请选择月份">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.value"
          :value="item.label">
        </el-option>
      </el-select>
    </div>
    <section class="charts">
      <div class="draw" ref="draw"></div>
    </section>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
  data() {
    return {
      value: '',
      value1: '',
      options: [
        {
          value: '一月',
          label: '1'
        },
        {
          value: '二月',
          label: '2'
        },
        {
          value: '三月',
          label: '3'
        },
        {
          value: '四月',
          label: '4'
        },
        {
          value: '五月',
          label: '5'
        },
        {
          value: '六月',
          label: '6'
        },
        {
          value: '七月',
          label: '7'
        },
        {
          value: '八月',
          label: '8'
        },
        {
          value: '九月',
          label: '9'
        },
        {
          value: '十月',
          label: '10'
        },
        {
          value: '十一月',
          label: '11'
        },
        {
          value: '十二月',
          label: '12'
        },
      ]
    }
  },
  methods: {
    drawCharts() {
      const that = this
      const paohui = this.$refs.draw
      const fangyihui = this.$echarts.init(paohui)
      this.$axios.get('https://echarts.apache.org/examples/data/asset/data/obama_budget_proposal_2012.list.json').then(rs => {
        const obama_budget_2012 = rs.data
        const option = {
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'shadow',
                  label: {
                      show: true
                  }
              }
          },
          toolbox: {
              show: true,
              feature: {
                  mark: {show: true},
                  dataView: {show: true, readOnly: false},
                  magicType: {show: true, type: ['line', 'bar']},
                  restore: {show: true},
                  saveAsImage: {show: true}
              }
          },
          calculable: true,
          legend: {
              data: ['Growth', 'Budget 2011', 'Budget 2012'],
              itemGap: 5
          },
          grid: {
              top: '12%',
              left: '1%',
              right: '10%',
              containLabel: true
          },
          xAxis: [
              {
                  type: 'category',
                  data: obama_budget_2012.names
              }
          ],
          yAxis: [
              {
                  type: 'value',
                  name: 'Budget (million USD)',
                  axisLabel: {
                      formatter: function (a) {
                          a = +a;
                          return isFinite(a)
                              ? that.$echarts.format.addCommas(+a / 1000)
                              : '';
                      }
                  }
              }
          ],
          dataZoom: [
              {
                  show: true,
                  start: 94,
                  end: 100
              },
              {
                  type: 'inside',
                  start: 94,
                  end: 100
              },
              {
                  show: true,
                  yAxisIndex: 0,
                  filterMode: 'empty',
                  width: 30,
                  height: '80%',
                  showDataShadow: false,
                  left: '93%'
              }
          ],
          series: [
              {
                  name: 'Budget 2011',
                  type: 'bar',
                  data: obama_budget_2012.budget2011List
              },
              {
                  name: 'Budget 2012',
                  type: 'bar',
                  data: obama_budget_2012.budget2012List
              }
          ]
        };
        fangyihui.setOption(option)
      })
    }
  },
  mounted() {
    this.drawCharts()
  }
}
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
<style lang="stylus" scoped>
.opration
  width 100%
  padding-top 30px
  padding-left 30px
  .month
    margin-left 20px
.charts
  width 100%
  padding-left 30px
  margin-top 30px
  text-align center
  .draw
    width 60%
    height calc(100vh - 100px)
</style>
