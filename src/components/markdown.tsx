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
    },
    html: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    return () => {
      return <div class="markdown-container" v-html={props.html}></div>
    }
  }
})
