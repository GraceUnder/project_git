<template>
  <div class="dashboard-container">
    <div class="app-container">
      <h2>
        组织架构
      </h2>
      <el-card class="tree-card">
        <!-- 卡片 -->
        <!-- 第一种 -->
        <!-- <template slot="header">我是头</template> -->
        <!-- 第二种 -->
        <!-- <template v-slot:header>123</template> -->
        <!-- 第三种 -->
        <!-- <el-row type="flex" justify="space-between">
          <el-col>传智教育</el-col>
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <el-col>负责人</el-col>
              <el-col>
                <el-dropdown>
                  <span>操作</span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row> -->
        <TreeTools :tree-node="company" :is-root="true" @addDepts="addDepts" />
        <div style="height:20px;" />
        <!-- 放置tree树 -->
        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <template v-slot="{data}">
            <TreeTools :tree-node="data" @delDep="getDepartments" @addDepts="addDepts" />
          </template>
        </el-tree>
      </el-card>
    </div>
    <add-dept :show-dialog.sync="showDialog" :tree-node="node" />
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDepartments } from '@/api/departments.js'
import { tranListToTreeData } from '@/utils/index.js'
import AddDept from './components/add-dept.vue'
export default {
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      company: {},
      departs: [],
      defaultProps: {
        label: 'name'
      },
      showDialog: false,
      node: null
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    // 获得组织架构信息
    async getDepartments() {
      const result = await getDepartments()
      // console.log(result)
      this.company = { name: result.companyName, manager: '负责人', id: '' }
      this.departs = tranListToTreeData(result.depts, '') // 需要将其转化成树形结构
      // console.log(result)
      // console.log(this.departs)
    },
    handleNodeClick(data) {
      console.log(data)
    },
    addDepts(node) {
      this.showDialog = true // 显示弹层
      // console.log('哈哈哈')
      // 因为node是当前的点击的部门， 此时这个部门应该记录下来,
      this.node = node
      console.log(this.node)
    }

  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px  140px;
  font-size:16px;
}
</style>
