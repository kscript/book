<template>
  <vue-markdown :md="md" ></vue-markdown>
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
      id: Math.random().toString(36).slice(2),
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
