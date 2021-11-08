<template>
  <div class="list">
    <div class="list-item base">
      <h3>基础配置</h3>
      <div class="flex-cell align-center">
        <span class="label">默认首页: </span>
        <el-radio-group class="value" v-model="settings.index" @change="changeIndex">
          <el-radio label='settings'>配置页</el-radio>
          <el-radio label='markdown'>文档页</el-radio>
        </el-radio-group>
      </div>
      <div class="flex-cell align-center">
        <span class="label">文档首页: </span>
        <div class="value">
          <el-input v-model="settings.indexPath" :disabled="!edits.indexPath" @blur="edit('indexPath')">
            <template #append>
              <el-button type="primary" @click="edit('indexPath')">修改</el-button>
            </template>
          </el-input>
        </div>
      </div>
      <div class="flex-cell align-center">
        <span class="label">文档地址: </span>
        <div class="value">
          <el-input v-model="settings.docsPath" :disabled="!edits.docsPath" @blur="edit('docsPath')">
            <template #append>
              <el-button type="primary" @click="edit('docsPath')">修改</el-button>
            </template>
          </el-input>
        </div>
      </div>
      <div class="flex-cell align-center">
        <span class="label">文档后缀: </span>
        <div class="value">
          <el-input v-model="settings.docsExt" :disabled="!edits.docsExt" @blur="edit('docsExt')">
            <template #append>
              <el-button type="primary" @click="edit('docsExt')">修改</el-button>
            </template>
          </el-input>
        </div>
      </div>
      <div class="flex-cell align-center">
        <span class="label">接口基址: </span>
        <div class="value">
          <el-input v-model="settings.baseUrl" :disabled="!edits.baseUrl" @blur="edit('baseUrl')">
            <template #append>
              <el-button type="primary" @click="edit('baseUrl')">修改</el-button>
            </template>
          </el-input>
        </div>
      </div>
    </div>
    <el-empty v-if="!styles.length && !scripts.length">
      <template #description>
        暂无资源配置, 请先新增
      </template>
      <el-button type="primary" @click="add('styles')">新增样式文件</el-button>
      <el-button type="primary" @click="add('scripts')">新增脚本文件</el-button>
    </el-empty>
    <template v-else>
      <div class="list-item">
        <el-row type="flex" align="middle">
          <el-col :span="16"><h3>styles</h3></el-col>
          <el-col :span="8"></el-col>
        </el-row>
        <template v-if="styles.length">
          <div>
            <template v-for="(vo, index) in styles" :key="vo.name">
              <el-form :ref="ref => styleRefs[index] = ref" :model="vo" label-width="60px">
                <el-row type="flex">
                  <el-col :span="12">
                    <el-form-item prop="title" label="标题">
                      <el-input v-model="vo.title" :disabled="vo.default"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item prop="name" label="标识">
                      <el-input v-model="vo.name" :disabled="vo.default"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item prop="path" label="路径">
                  <el-input v-model="vo.path" :disabled="vo.default"></el-input>
                </el-form-item>
                <el-row type="flex">
                  <el-col :span="12">
                    <el-form-item prop="required" label="默认">
                      <el-radio-group v-model="vo.default" @change="itemDefaultChange(vo)">
                        <el-radio :label="true">是</el-radio>
                        <el-radio :label="false">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" v-if="!vo.default">
                    <el-form-item prop="enable" label="启用">
                      <el-radio-group v-model="vo.enable">
                        <el-radio :label="true">是</el-radio>
                        <el-radio :label="false">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </template>
          </div>
        </template>
        <div class="text-center">
          <el-button type="success" @click="add('styles')">新增</el-button>
          <el-button type="primary" @click="reset('styles')" v-if="styles.length">重置</el-button>
          <el-button type="danger" @click="save('styles')" v-if="styles.length">保存修改</el-button>
        </div>
      </div>
      <div class="list-item">
        <el-row type="flex" align="middle">
          <el-col :span="16"><h3>scripts</h3></el-col>
          <el-col :span="8"></el-col>
        </el-row>
        <template v-if="scripts.length">
          <div>
            <template v-for="(vo, index) in scripts" :key="vo.name">
              <el-form :ref="ref => scriptRefs[index] = ref" :model="vo" label-width="60px">
                <el-row type="flex">
                  <el-col :span="12">
                    <el-form-item prop="title" label="标题">
                      <el-input v-model="vo.title" :disabled="vo.default"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item prop="name" label="标识">
                      <el-input v-model="vo.name" :disabled="vo.default"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item prop="path" label="路径">
                  <el-input v-model="vo.path" :disabled="vo.default"></el-input>
                </el-form-item>
                <el-row type="flex">
                  <el-col :span="12">
                    <el-form-item prop="default" label="默认">
                      <el-radio-group v-model="vo.default" @change="itemDefaultChange(vo)">
                        <el-radio :label="true">是</el-radio>
                        <el-radio :label="false">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" v-if="!vo.default">
                    <el-form-item prop="enable" label="启用">
                      <el-radio-group v-model="vo.enable">
                        <el-radio :label="true">是</el-radio>
                        <el-radio :label="false">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </template>
          </div>
        </template>
        <div class="text-center">
          <el-button type="success" @click="add('scripts')">新增</el-button>
          <el-button type="primary" @click="reset('scripts')" v-if="scripts.length">重置</el-button>
          <el-button type="danger" @click="save('scripts')" v-if="scripts.length">保存修改</el-button>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">

import { defineComponent, reactive, ref, toRefs } from 'vue'
import config from '@/config'
import {
  ElRow,
  ElCol,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadioGroup,
  ElRadio,
  ElButton,
  ElEmpty,
  ElMessage,
  ElMessageBox
} from 'element-plus'
import storage from '@/utils/storage'
export default defineComponent({
  components: {
    ElRow,
    ElCol,
    ElForm,
    ElFormItem,
    ElInput,
    ElRadioGroup,
    ElRadio,
    ElButton,
    ElEmpty
  },
  setup () {
    const edits = ref({
      index: true,
      indexPath: false,
      docsPath: false,
      docsExt: false,
      baseUrl: false
    })
    const storageSettings = storage.get('baseConfig', {})
    const { scripts, styles, ...base } = config
    const state = reactive({
      styles,
      scripts,
      styleRefs: [] as typeof ElForm[],
      scriptRefs: [] as typeof ElForm[]
    })
    const settings = ref(Object.assign({
    }, base, storageSettings))

    const add = (type: 'styles' | 'scripts') => {
      const item = type === 'styles' ? state.styles : state.scripts
      item.push({
        name: '',
        desc: '',
        title: '',
        path: '',
        enable: true,
        default: false
      })
    }
    const save = (type: 'styles' | 'scripts') => {
      const item = type === 'styles' ? state.styles : state.scripts
      const list = item.filter(item => item.name && item.path)
      if (list.length) {
        storage.set(type, list)
        ElMessage({
          type: 'success',
          message: '保存成功!'
        })
      }
      if (item.length !== list.length) {
        ElMessage({
          type: 'warning',
          message: '部分资源信息不完善, 保存时已忽略'
        })
      }
    }
    const reset = (type: 'styles' | 'scripts') => {
      const refs = type === 'styles' ? state.styleRefs : state.scriptRefs
      refs.forEach(ref => {
        ref.resetFields()
      })
      ElMessage({
        type: 'success',
        message: '表单已重置!'
      })
    }
    const changeIndex = () => {
      storage.set('baseConfig', settings.value)
    }
    const itemDefaultChange = (vo: typeof config.scripts[0] | typeof config.styles[0]) => {
      !vo.default && ElMessageBox({
        type: 'warning',
        title: '确认操作',
        message: '当前资源为默认配置, 修改可能造成应用无法正常运行, 请确认是否要进行修改?',
        showCancelButton: true,
        cancelButtonText: '否, 暂不修改',
        confirmButtonText: '是, 我要修改',
        confirmButtonClass: 'el-button--danger',
        center: true
      }).catch(() => {
        vo.default = !vo.default
      })
    }
    const edit = (type: keyof typeof edits.value) => {
      edits.value[type] = !edits.value[type]
      if (!edits.value[type]) {
        storage.set('baseConfig', settings.value)
      }
    }
    if (!settings.value.index || !['settings', 'markdown'].includes(settings.value.index)) {
      Object.assign(settings.value, {
        index: 'settings'
      })
    }
    return {
      ...toRefs(state),
      settings,
      edits,
      add,
      save,
      reset,
      changeIndex,
      itemDefaultChange,
      edit
    }
  }
})
</script>
<style lang="scss" scoped>
.flex-cell {
  display: flex;
  .value{
    flex: 1;
  }
  &.align-center{
    align-items: center;
  }
}
.base {
  margin-top: 20px;
  .value {
    padding-left: 15px;
  }
}
.list {
  width: 50%;
  min-width: 790px;
  margin: 0 auto;
  .handles {
    padding: 50px 0;
  }
  .flex-cell {
    margin-bottom: 10px;
  }
  .list-item {
    padding: 10px 30px;
    margin: 30px 0;
    background: #f9f9f9;
    border-radius:  5px;
  }
  h3 {
    font-size: 24px;
  }
  .el-form {
    margin-top: 10px;
    margin-bottom: 30px;
    padding: 20px 10px;
    border: 1px solid #ddd;
    box-shadow: inset 0px 0px 5px #f1f1f1;
    background: #f8f8f8;
    // &:last-child {
    //   border-bottom: 0;
    // }
    :deep .el-form-item__label {
      padding-left: 6px;
    }
  }
}
</style>
