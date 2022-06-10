<template>
  <div class="dl-hl-bar-chart-race" :class="{'dl-hl-bar-chart-race--loaded':loaded}">
    <div class="dl-hl-bar-chart-race__graph" id="DlHlBarChartRace" />
  </div>
</template>

<script>
const d3 = require('d3');
export default {
  name  : 'DlHlBarChartRace',
  props : {
    /** animation duration */
    animationDuration : {
      type    : Number,
      default : 600
    },
    /** items showed */
    itemsShowed : {
      type    : Number,
      default : 5
    }
  },
  /**
   * override
   * @override
   */
  data() {
    return {
      loaded : false,
      height : 300,
      width  : 600,
      margin : {
        top    : 30,
        right  : 0,
        bottom : 10,
        left   : 40
      },
      x      : undefined,
      y      : undefined,
      xAxis  : undefined,
      data   : [],
      index  : 0,
      colors : ['#0093ee', '#40b630', '#ab7df6', '#ff8285',
        '#26c1c9', '#ecef64', '#F228d4', '#AA0836', '#faca00',
        '#A711f7', '#654321', '#564738', '#184623']
    };
  },
  computed : {
    /**
     * bar padding
     * @returns {Number} bar padding
     */
    barPadding() {
      return (this.height - (this.margin.bottom + this.margin.top)) / (this.itemsShowed * 5);
    }
  },
  watch : {
    /**
     * watch over ranking value
     * @param {Obejct} newValue new Value
     */
    '$store.getters.getTeamRanking'(newValue) {
      if (this.loaded) {
        this.initComponent();
        this.processNewData(newValue);
      }
    }
  },
  /**
   * override
   * @override
   */
  mounted() {
    this.data = [];
    this.data.forEach((d, index) => {
      d.lastValue = 0;
      d.value = isNaN(d.value) ? 0 : d.value;
      d.index = index;
      d.colour = d3.rgb(this.getColor(index));
    });
    this.initComponent();
    this.loaded = true;
  },
  methods : {
    /**
     * init
     */
    initComponent() {
      if (document.getElementById('DlHlBarChartRaceSVG')) {
        document.getElementById('DlHlBarChartRaceSVG').remove();
      }
      this.svg = d3.select('#DlHlBarChartRace').append('svg')
        .attr('id', 'DlHlBarChartRaceSVG')
        .attr('width', this.width)
        .attr('height', this.height);
      const dataSorted = this.data.sort((a, b) => b.value - a.value)
        .slice(0, this.itemsShowed);

      dataSorted.forEach((d, i) => d.rank = i);

      this.x = d3.scaleLinear()
        .domain([0, d3.max(dataSorted, d => d.value)])
        .range([this.margin.left, this.width - this.margin.right - 65]);

      this.y = d3.scaleLinear()
        .domain([this.itemsShowed, 0])
        .range([this.height - this.margin.bottom, this.margin.top]);

      this.xAxis = d3.axisTop()
        .scale(this.x)
        .ticks(this.width > 500 ? 5 : 2)
        .tickSize(-(this.height - this.margin.top - this.margin.bottom))
        .tickFormat(d => d3.format(',')(d));

      this.svg.append('g')
        .attr('class', 'axis xAxis')
        .attr('transform', `translate(0, ${this.margin.top})`)
        .call(this.xAxis)
        .selectAll('.tick line')
        .classed('origin', d => d === 0);

      this.svg.selectAll('rect.bar')
        .data(dataSorted, d => d.name)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', this.x(0) + 1)
        // eslint-disable-next-line no-confusing-arrow
        .attr('width', d => (this.x(d.value) - this.x(0) - 1) > 0 ? this.x(d.value) - this.x(0) - 1 : 0)
        .attr('y', d => this.y(d.rank) + 5)
        .attr('height', this.y(1) - this.y(0) - this.barPadding)
        .style('fill', d => d.colour);

      this.svg.selectAll('text.label')
        .data(dataSorted, d => d.name)
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr('x', d => this.x(d.value) - 8 - 24)
        .attr('y', d => this.y(d.rank) + 5 + ((this.y(1) - this.y(0)) / 2) + 1)
        .style('text-anchor', 'end')
        .html(d => d.name);

      this.svg.selectAll('image.flag')
        .data(dataSorted, d => d.name)
        .enter()
        .append('image')
        .attr('class', 'flag')
        .attr('style', 'width:20px; height:20px')
        .attr('x', d => this.x(d.value) - 8 - 16)
        .attr('y', d => this.y(d.rank) + 5 + ((this.y(1) - this.y(0)) / 2) + 1 - 16)
        .attr('xlink:href', d => this.getFlag(d.teamInfo.teamCountry));

      this.svg.selectAll('text.valueLabel')
        .data(dataSorted, d => d.name)
        .enter()
        .append('text')
        .attr('class', 'valueLabel')
        .attr('x', d => this.x(d.value) + 5)
        .attr('y', d => this.y(d.rank) + 5 + ((this.y(1) - this.y(0)) / 2) + 1)
        .text(d => d3.format(',.0f')(d.lastValue));
    },
    /**
     * override
     * @override
     */
    processNewData(newData) {
      newData.forEach(newDataItem => {
        const dataItem = this.data.find(a => a.id === newDataItem.id);
        if (dataItem) {
          dataItem.lastValue = dataItem.value;
          dataItem.value = newDataItem.value;
        }
        else {
          newDataItem.lastValue = 0;
          newDataItem.colour = d3.rgb(this.getColor(this.index));
          this.data.push(newDataItem);
        }
      });
      const dataSorted = this.data
        .sort((a, b) => b.value - a.value)
        .slice(0, this.itemsShowed);

      dataSorted.forEach((d, i) => d.rank = i);

      this.x.domain([0, d3.max(dataSorted, d => d.value)]);

      this.svg.select('.xAxis')
        .transition()
        .duration(this.animationDuration)
        .ease(d3.easeLinear)
        .call(this.xAxis);

      const bars = this.svg.selectAll('.bar').data(dataSorted, d => d.name);
      bars
        .enter()
        .append('rect')
        .attr('class', d => `bar ${d.name.replace(/\s/g, '_')}`)
        .attr('x', this.x(0) + 1)
      // eslint-disable-next-line no-confusing-arrow
        .attr('width', d => (this.x(d.value) - this.x(0) - 1) > 0 ? this.x(d.value) - this.x(0) - 1 : 0)
        .attr('y', () => this.y(this.itemsShowed + 1) + 5)
        .attr('height', this.y(1) - this.y(0) - this.barPadding)
        .style('fill', d => d.colour)
        .transition()
        .duration(this.animationDuration)
        .ease(d3.easeLinear)
        .attr('y', d => this.y(d.rank) + 5);

      bars
        .transition()
        .duration(this.animationDuration)
        .ease(d3.easeLinear)
      // eslint-disable-next-line no-confusing-arrow
        .attr('width', d => (this.x(d.value) - this.x(0) - 1) > 0 ? this.x(d.value) - this.x(0) - 1 : 0)
        .attr('y', d => this.y(d.rank) + 5);

      bars
        .exit()
        .transition()
        .duration(this.animationDuration)
        .ease(d3.easeLinear)
        .attr('width', d => ((this.x(d.value) - this.x(0) - 1) > 0 ? this.x(d.value) - this.x(0) - 1 : 0))
        .attr('y', () => this.y(this.itemsShowed + 1) + 5)
        .remove();

      const labels = this.svg.selectAll('.label')
        .data(dataSorted, d => d.name);

      labels
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr('x', d => this.x(d.value) - 8 - 24)
        .attr('y', () => this.y(this.itemsShowed + 1) + 5 + ((this.y(1) - this.y(0)) / 2))
        .style('text-anchor', 'end')
        .html(d => d.name)
        .transition()
        .duration(this.animationDuration)
        .ease(d3.easeLinear)
        .attr('y', d => this.y(d.rank) + 5 + ((this.y(1) - this.y(0)) / 2) + 1);

      labels
        .transition()
        .duration(this.animationDuration)
        .ease(d3.easeLinear)
        .attr('x', d => this.x(d.value) - 8 - 24)
        .attr('y', d => this.y(d.rank) + 5 + ((this.y(1) - this.y(0)) / 2) + 1);

      labels
        .exit()
        .transition()
        .duration(this.animationDuration)
        .ease(d3.easeLinear)
        .attr('x', d => this.x(d.value) - 8 - 24)
        .attr('y', () => this.y(this.itemsShowed + 1) + 5)
        .remove();

      const flags = this.svg.selectAll('.flag')
        .data(dataSorted, d => d.name);

      flags
        .enter()
        .append('image')
        .attr('style', 'width:20px; height:20px')
        .attr('x', d => this.x(d.value) - 8 - 16)
        .attr('y', d => this.y(d.rank) + 5 + ((this.y(1) - this.y(0)) / 2) + 1 - 16)
        .attr('xlink:href', d => this.getFlag(d.teamInfo.teamCountry))
        .transition()
        .duration(this.animationDuration)
        .ease(d3.easeLinear);

      flags
        .transition()
        .duration(this.animationDuration)
        .ease(d3.easeLinear)
        .attr('x', d => this.x(d.value) - 8 - 16)
        .attr('y', d => this.y(d.rank) + 5 + ((this.y(1) - this.y(0)) / 2) + 1 - 16);

      flags
        .exit()
        .transition()
        .duration(this.animationDuration)
        .ease(d3.easeLinear)
        .attr('x', d => this.x(d.value) - 8 - 16)
        .attr('y', () => this.y(this.itemsShowed + 1) + 5 - 16)
        .remove();

      const valueLabels = this.svg.selectAll('.valueLabel').data(dataSorted, d => d.name);
      valueLabels
        .enter()
        .append('text')
        .attr('class', 'valueLabel')
        .attr('x', d => this.x(d.value) + 5)
        .attr('y', () => this.y(this.itemsShowed + 1) + 5)
        .text(d => d3.format(',.0f')(d.lastValue))
        .transition()
        .duration(this.animationDuration)
        .ease(d3.easeLinear)
        .attr('y', d => this.y(d.rank) + 5 + ((this.y(1) - this.y(0)) / 2) + 1);

      valueLabels
        .transition()
        .duration(this.animationDuration)
        .ease(d3.easeLinear)
        .attr('x', d => this.x(d.value) + 5)
        .attr('y', d => this.y(d.rank) + 5 + ((this.y(1) - this.y(0)) / 2) + 1)
        .tween('text', d => {
          const i = d3.interpolateRound(d.lastValue, d.value);
          return function (t) {
            // eslint-disable-next-line no-invalid-this
            this.textContent = d3.format(',')(i(t));
          };
        });

      valueLabels
        .exit()
        .transition()
        .duration(this.animationDuration)
        .ease(d3.easeLinear)
        .attr('x', d => this.x(d.value) + 5)
        .attr('y', () => this.y(this.itemsShowed + 1) + 5)
        .remove();
    },
    /**
     * getColor
     * @param {Number} index Index
     * @returns {String} color
     */
    getColor(index) {
      return this.colors[index % this.colors.length];
    },
    /**
     * get flag image of country
     * @param {String} country Country
     * @returns {String} path of img
     */
    getFlag(country) {
      const imagesContext = require.context('../../assets/flags/', false, /\.png$/);
      const value = imagesContext(`./${country.toLowerCase()}.png`);
      return value;
    },
    /**
     * override
     * @override
     */
    generateNewData() {
      const newValue1 = this.data[0] ?
        this.data[0].value + Math.floor(Math.random() * (100)) :
        Math.floor(Math.random() * (100));
      const newValue2 = this.data[1] ?
        this.data[1].value + Math.floor(Math.random() * (100)) :
        Math.floor(Math.random() * (100));
      const newValue3 = this.data[2] ?
        this.data[2].value + Math.floor(Math.random() * (100)) :
        Math.floor(Math.random() * (100));
      const newValue4 = this.data[3] ?
        this.data[3].value + Math.floor(Math.random() * (100)) :
        Math.floor(Math.random() * (100));
      const newData = [
        { id : 'Spain', name : 'Spain', value : newValue1 },
        { id : 'France', name : 'France', value : newValue2 },
        { id : 'United Kingdom', name : 'United Kingdom', value : newValue3 },
        { id : 'Portugal', name : 'Portugal', value : newValue4 }
      ];
      this.index += 1;
      return newData;
    },
    /**
     * override
     * @override
     */
    updateSize(size) {
      this.width = size.width;
      this.height = size.height - 26;
      this.initComponent();
    }
  }
};
</script>
<style lang="scss">
.dl-hl-bar-chart-race {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: all 0.5s linear;

  &--loaded {
    opacity: 1;
  }

  &__graph {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;

    > svg {
      height: 100%;
      width: 100%;
    }
  }

  &--small {
    > .dl-hl-bar-chart-race > svg {
      height: 100% !important;
      width: 100% !important;
      max-height: 100% !important;
      max-width: 100% !important;
    }
  }

  &--big {
    > .dl-hl-bar-chart-race > svg {
      height: 70% !important;
      width: 70% !important;
      max-height: 70% !important;
      max-width: 70% !important;
    }
  }

  text {
    font-size: 16px;
    font-family: Open Sans, sans-serif;
  }

  text.title {
    font-size: 24px;
    font-weight: 500;
  }

  text.label {
    font-weight: 600;
    fill: $color-7;
    stroke: $color-2;
    stroke-width: 1px;
    stroke-linecap: butt;
    stroke-linejoin: round;
    stroke-opacity: 0.5;
  }

  text.valueLabel {
    font-weight: 300;
  }

  text.yearText {
    font-size: 64px;
    font-weight: 700;
    opacity: 0.25;
  }

  .tick text {
    fill: $color-3;
  }

  .xAxis .tick:nth-child(2) text {
    text-anchor: start;
  }

  .tick line {
    shape-rendering: crispEdges;
    stroke: $color-3;
  }

  .tick line.origin {
    stroke: $color-3;
  }

  .valueLabel {
    fill: $color-7;
  }

  path.domain {
    display: none;
  }
}
</style>

