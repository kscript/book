<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  setup () {
    return () => (
      <div class="home">
        <router-view></router-view>
      </div>
    )
  }
})
</script>
