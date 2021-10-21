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
        class: props.id.replace(/[A-Z]/g, (s, i) => {
          return (i === 0 ? '' : '-') + s.toLowerCase()
        }) + '-md demo-container'
      },
      props.md.render?.() || []
      )
  }
})
