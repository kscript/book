<template>
  <div class="article-container">
    <h1 v-if="yaml.title">{{yaml.title}}</h1>
    <vue-markdown :md="md" :html="html" :yaml="yaml" :id="id"></vue-markdown>
  </div>
</template>
<script lang="ts">
import hljs from 'highlight.js'
import markdown from 'markdown-it'
import { useRoute } from 'vue-router'
import { defineComponent, nextTick, onMounted, reactive, toRefs, watch } from 'vue'
import VueMarkdown from '@/components/markdown'
import { getMarkdown, transform, extract, extractResult } from '@/utils/markdown'
import config from '@/config'
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
    const route = useRoute()
    const result = reactive({
      id: (props.name || props.path),
      html: '',
      yaml: {},
      md: {}
    })
    const showMarkdown = () => {
      try {
        const ext = config.docsExt
        const name = ext && props.name.slice(-ext.length) === ext ? props.name.slice(0, -ext.length) : props.name
        document.title = name
        getMarkdown(`${config.docsPath}${props.path}${props.name ? '/' + name : ''}${ext}`).then(res => res.text()).then(data => {
          const { markdown: content, yaml } = extract(data) as extractResult
          const html = markdown({
            html: true,
            linkify: true,
            typographer: true,
            langPrefix: 'hljs language-',
            highlight (str, lang) {
              if (lang && hljs.getLanguage(lang)) {
                try {
                  return hljs.highlight(lang, str).value
                } catch (__) {}
              }
              return ''
            }
          }).render(transform(content))
          Object.assign(result, { html, yaml })
          return {
            html,
            yaml
          }
        })
      } catch (err) {
        console.log(err)
      }
    }
    watch(() => route.path, () => {
      nextTick(() => showMarkdown())
    })
    onMounted(() => {
      showMarkdown()
    })
    return {
      ...toRefs(result)
    }
  }
})
</script>
<style lang="scss">
.article-container{
  width: 1100px;
  margin: 0px auto;
  padding: 20px 50px;
  background: #fff;
  box-sizing: border-box;
}
</style>
