<template>
  <v-card>
    <g-chart
      v-if="CountryList.length > 0"
      ref="chart"
      :settings="{ packages: ['geochart'], mapsApiKey: 'AIzaSyDNVFsOm10W4HzqhWT3BIMYXMcwV5dhByY' }"
      type="GeoChart"
      :data="CountryList"
      :options="{ dataMode: 'regions'}"
      :events="chartEvents"
      :resize-debounce="300"
    />
    <v-alert
      v-else
      text
      prominent
      type="error"
      icon="mdi-cloud-alert"
    >
      There are no countries in the account list.
    </v-alert>
  </v-card>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import { GChart } from 'vue-google-charts'

  export default {
    components: {
      GChart,
    },
    data () {
      return {
        chartEvents: {
          'select': () => {
            if (this.$refs.chart.chartObject.getSelection()[0]) {
              this.SelectCountryByIndex(this.$refs.chart.chartObject.getSelection()[0].row + 1)
            }
          },
        },
      }
    },
    computed: {
      ...mapGetters('map', ['CountryList']),
    },
    methods: {
      ...mapMutations('map', ['SelectCountryByIndex']),
    },
  }
</script>
