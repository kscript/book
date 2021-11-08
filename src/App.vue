<script lang="tsx">
import { ElHeader, ElMenu, ElMenuItem } from 'element-plus'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import config from '@/config'
export default defineComponent({
  name: 'App',
  components: {
    ElHeader, ElMenu, ElMenuItem
  },
  setup () {
    const Router = useRouter()
    const selectMenu = (index: string) => {
      if (index === 'index') {
        Router.push({
          name: 'Home'
        })
      } else if (index === 'settings') {
        Router.push({
          name: 'settings'
        })
      } else if (index === 'reset') {
        location.href = `${config.publicPath}reset.html`
      } else if (index === 'repositorie') {
        location.href = config.repositorie
      }
    }
    return () => (
      <>
        <el-header>
        <el-menu mode="horizontal" onSelect={selectMenu}>
          <el-menu-item index="index">首页</el-menu-item>
          <el-menu-item index="settings">设置</el-menu-item>
          <el-menu-item index="reset">重置</el-menu-item>
          <el-menu-item class="right" index="repositorie">仓库</el-menu-item>
        </el-menu>
        </el-header>
        <router-view></router-view>
      </>
    )
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .el-menu-item.right {
    float: right;
  }
}
</style>
