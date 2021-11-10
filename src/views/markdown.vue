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
import { defineComponent, getCurrentInstance, nextTick, onMounted, reactive, toRefs, watch } from 'vue'
import VueMarkdown from '@/components/markdown'
import { getMarkdown, transform, extract, extractResult } from '@/utils/markdown'
import config from '@/config'
import { emitHook, getContext, emitCB } from '@/utils/hooks'
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
    const instance = getCurrentInstance()
    const result = reactive({
      id: (props.name || props.path),
      html: '',
      yaml: {},
      md: {}
    })
    const white = (html: string, yaml: typeof result.yaml = {}) => {
      Object.assign(result, {
        html,
        yaml
      })
    }
    const formatMarkdown = (content: string) => {
      return markdown({
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
    }
    const showMarkdown = () => {
      try {
        const ext = config.docsExt
        const name = ext && props.name.slice(-ext.length) === ext ? props.name.slice(0, -ext.length) : props.name
        document.title = name || document.title
        emitCB(emitHook('onGetMarkdown')(getContext(instance), {
          ext, name, white, formatMarkdown
        }), () => getMarkdown(`${config.docsPath}${props.path}${props.name ? '/' + name : ''}${ext}`).then(res => res.text()).then(data => {
          const { markdown: content, yaml } = extract(data) as extractResult
          const html = formatMarkdown(content)
          Object.assign(result, { html, yaml })
          return {
            html,
            yaml
          }
        }))
      } catch (err) {
        console.log(err)
      }
    }
    watch(() => route.path, () => {
      nextTick(() => showMarkdown())
    })
    onMounted(() => {
      emitHook('onMounted')(getContext(instance))
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
