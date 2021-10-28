<template>
  <div class="article-container">
    <h1>{{id}}</h1>
    <vue-markdown :md="md" :id="id"></vue-markdown>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import VueMarkdown from '@/components/markdown'
export default defineComponent({
  components: {
    VueMarkdown
  },
  props: {
    path: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const result = {
      id: (props.name || props.path).replace(/\.md$/, ''),
      md: {}
    }
    try {
      const mdDefault = props.path ? require('@/docs/' + props.path + (props.name ? '/' + props.name : '')) : {}
      const md = (mdDefault || {}).default || {}
      Object.assign(result, {
        md
      })
    } catch (err) {
      console.log(err)
    }
    return result
  }
})
</script>
<style>
.article-container{
  width: 1100px;
  margin: 30px auto;
}
</style>
