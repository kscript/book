import { defineComponent, compile, h } from 'vue'

export default defineComponent({
  props: {
    id: {
      type: String,
      default: ''
    },
    md: {
      type: Object,
      default: () => ({})
    },
    html: {
      type: String,
      default: ''
    },
    yaml: {
      type: Object,
      default: () => ({})
    }
  },
  render: (props: { html: string | HTMLElement }) => {
    return h('div', {
      className: 'markdown-container markdown-body'
    }, [
      h(compile(props.html, {
        // 为了不让markdown文本中的{{}}被编译解析
        // 如果需要用到, 使用<||>
        delimiters: ['<|', '|>']
      }))
    ])
  }
})
