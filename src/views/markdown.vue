<template>
  <div class="article-container">
    <h1>{{id}}</h1>
    <vue-markdown :md="md" :html="html" :id="id"></vue-markdown>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from 'vue'
import VueMarkdown from '@/components/markdown'
import { getMarkdown, transform } from '@/utils/markdown'
const markdown = require('markdown-it')
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
    const result = reactive({
      id: (props.name || props.path).replace(/\.md$/, ''),
      html: '',
      md: {}
    })
    try {
      getMarkdown('docs/' + props.path + (props.name ? '/' + props.name : '')).then(res => res.text()).then(data => {
        return markdown({
          html: true,
          linkify: true,
          typographer: true
        }).render(transform(data))
      }).then(html => {
        Object.assign(result, {
          html
        })
      })
    } catch (err) {
      console.log(err)
    }
    return {
      ...toRefs(result)
    }
  }
})
</script>
<style>
.article-container{
  width: 1100px;
  margin: 30px auto;
}
</style>
