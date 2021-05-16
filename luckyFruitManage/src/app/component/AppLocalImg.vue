<template>
  <img :src="imgSource" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
// const imgSource = import('../../assets/img/default_avatar.jpg');
const requireComponent = require.context(
  '../assets/img',
  true,
  /\w+\.(jpg|png|gif)$/,
);
const resource: {[propName: string]: any } = {};
requireComponent.keys().forEach((fileName: string) => {
  const moduleName = fileName.replace(/^\.\/(.*)\.\w+$/, '$1');
  resource[moduleName] = requireComponent(fileName).default || requireComponent(fileName);
});

@Component({
  props: {
    imgUrl: String,
  },
})
export default class AppLocalImg extends Vue {
  data() {
    return {
      imgSource: '',
    };
  }
  async mounted() {
    const resourceUrl = this.$props.imgUrl;
    this.$data.imgSource = resource[resourceUrl];
  }
}
</script>

<style scoped lang="less">
</style>