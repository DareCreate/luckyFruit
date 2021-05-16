<template>
  <div class="home">
    创建新时代的视觉冲击
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { inPc } from '@/app/system';
@Component
export default class Home extends Vue {
  mounted() {
    if (inPc) {
      return;
    }
    this.$router.push({ name: 'PhoneScoringSelectSchedule' });
  }
}
</script>
