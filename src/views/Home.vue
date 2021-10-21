<template>
  <div class="home">
    <vue-markdown :md="md"></vue-markdown>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VueMarkdown from '@/components/markdown'
import md from '@/docs/index.md'

export default defineComponent({
  name: 'Home',
  components: {
    VueMarkdown
  },
  setup () {
    return {
      md
    }
  }
})
</script>
