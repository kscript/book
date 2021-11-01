import { defineComponent } from 'vue'

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
  setup (props) {
    return () => {
      return <div class="markdown-container markdown-body" v-html={props.html}></div>
    }
  }
})
