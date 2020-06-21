<template>
  <div class="iCountUp">
    <ICountUp class="title"
      :delay="delay"
      :endVal="endVal"
      :options="options"
      @ready="onReady"
    />
  </div>
</template>

<script type="text/babel">
  import ICountUp from 'vue-countup-v2';
  export default {
    name: 'demo',
    props: ['endValue'],
    components: {
      ICountUp
    },
    data() {
      return {
        delay: 800,
        endVal: this.endValue,
        options: {
          useEasing: true,
          useGrouping: true,
          separator: ',',
          decimal: '.',
          prefix: '',
          suffix: ''
        }
      };
    },
    methods: {
      onReady: function(instance) {
        const that = this;
        instance.update(that.endVal);
      }
    }
  };
</script>

<style scoped>
  .iCountUp {

    margin: 0;
    color: #4d63bc;
  }
</style>