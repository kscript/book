import { defineComponent, h } from 'vue'

export default defineComponent({
  props: {
    id: {
      type: String,
      default: ''
    },
    md: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props) {
    return () =>
      h('div', {
        key: props.id,
        class: 'markdown-container'
      },
      props.md.render?.() || []
      )
  }
})
