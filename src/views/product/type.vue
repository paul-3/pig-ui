<template>
  <div class="app-container calendar-list-container">
    <el-row  class="filter-container row-bg" type="flex" justify="space-between">
      <!-- <el-input ="handleFilter" style="width: 200px;" class="filter-item" placeholder="用户名"
                v-model="listQuery.name">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button> -->
     <!--  <el-tabs v-model="tabcard" type="card">
        <el-tab-pane label="产品收益类型" name="first"></el-tab-pane>
        <el-tab-pane label="产品结构类型" name="second"></el-tab-pane>
      </el-tabs> -->

      <el-radio-group v-model="tabcard">
        <el-radio-button label="first">产品收益类型</el-radio-button>
        <el-radio-button label="second">产品结构类型</el-radio-button>
      </el-radio-group>

      <el-button v-if="sys_prd_type_add" class="filter-item add_btn" style="margin-bottom: 0;text-align: right" @click="handleCreate" type="primary" icon="edit">
        <svg-icon icon-class="add"></svg-icon> 新增</el-button>
    </el-row>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
              highlight-current-row style="width: 100%">

      <el-table-column align="center" label="序号" >
        <template slot-scope="scope">
          <span v-if="tabcard === 'first'">{{scope.row.productTypeId}}</span>
          <span v-else>{{scope.row.productMixTypeId}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="tabcard === 'first' ? '产品收益类型名称' : '产品结构类型名称'" prop="name">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <a v-if="sys_prd_type_upd" size="small" class="common_btn"
                     @click="handleUpdate(scope.row)">编辑
          </a>
          <!-- <el-button v-if="sys_prd_type_del" size="small" type="danger"
                     @click="deletes(scope.row)">删除
          </el-button> -->
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="150px">

        <el-form-item :label="tabcard === 'first' ? '产品收益类型名称' : '产品结构类型名称'" prop="name">
          <el-input v-model="form.name" :maxlength="20"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="search_btn" @click="cancel('form')">取 消</el-button>
        <el-button class="add_btn" v-if="dialogStatus=='create'" @click="create('form')">确 定</el-button>
        <el-button class="add_btn" v-else @click="update('form')">修 改</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {
    getProductTypeList,
    addObj,
    putObj,
    getProductMixList,
    getProductMixById,
    postProductMix,
    getObj } from '@/api/product/productType'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  // import { parseTime } from '@/utils'
  import { mapGetters } from 'vuex'
  import ElRadioGroup from 'element-ui/packages/radio/src/radio-group'
  import ElOption from "element-ui/packages/select/src/option"

  export default {
    components: {
      ElOption,
      ElRadioGroup },
    name: 'table_user',
    directives: {
      waves
    },
    data() {
      return {
        tabcard: 'first', // tabcardName
        treeDeptData: [],
        checkedKeys: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20
        },
        form: {
          name: undefined,
          currencyId: undefined
        },
        statusOptions: ['0', '1'],
        dialogFormVisible: false,
        dialogDeptVisible: false,
        userAdd: false,
        userUpd: false,
        userDel: false,
        dialogStatus: '',
        isDisabled: {
          0: false,
          1: true
        },
        textMap: {
          update: '编辑',
          create: '新增'
        },
        tableKey: 0,
        rules: {
          name: [
            { required: true, trigger: 'blur', message: '请输入产品类型' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      ...mapGetters([
        'permissions'
      ])
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          0: '有效',
          1: '无效',
          9: '锁定'
        }
        return statusMap[status]
      }
    },
    watch: {
      'tabcard': function(n, o) {
        this.getList()
      }
    },
    created() {
      this.getList()
      this.sys_prd_type_add = this.permissions['sys_prd_type_add']
      this.sys_prd_type_upd = this.permissions['sys_prd_type_upd']
      this.sys_prd_type_del = this.permissions['sys_prd_type_del']
    },
    methods: {
      getList() {
        this.listLoading = true
        // this.listQuery.orderByField = '`user`.create_time'
        // this.listQuery.isAsc = false
        if (this.tabcard === 'first') {
          getProductTypeList(this.listQuery).then(response => {
            this.list = response.data.records
            this.total = response.data.total
            this.listLoading = false
          })
        } else if (this.tabcard === 'second') {
          getProductMixList(this.listQuery).then(response => {
            this.list = response.data.records
            this.total = response.data.total
            this.listLoading = false
          })
        }
      },
      // getNodeData(data) {
      //   this.dialogDeptVisible = false
      //   this.form.deptId = data.id
      //   this.form.deptName = data.name
      // },
      // handleDept() {
      //   fetchDeptTree()
      //     .then(response => {
      //       this.treeDeptData = response.data
      //       this.dialogDeptVisible = true
      //     })
      // },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
      },
      handleUpdate(row) {
        if (this.tabcard === 'first') {
          getObj(row.productTypeId)
            .then(response => {
              this.form = response.data
              this.dialogFormVisible = true
              this.dialogStatus = 'update'
            })
        } else if (this.tabcard === 'second') {
          getProductMixById(row.productMixTypeId).then(res => {
            this.form = res.data
            this.dialogFormVisible = true
            this.dialogStatus = 'update'
          })
        }
      },
      create(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            if (this.tabcard === 'first') {
              addObj(this.form)
                .then((res) => {
                  if(!res || res.status !== 200) return
                  this.dialogFormVisible = false
                  this.getList()
                  this.$refs[formName].resetFields()
                  if (res.status === 200) {
                    this.$notify({
                      title: '成功',
                      message: '修改成功',
                      type: 'success',
                      duration: 2000
                    })
                  }
                })
            } else if (this.tabcard === 'second') {
              postProductMix(this.form).then(res => {
                if(!res || res.status !== 200) return
                this.dialogFormVisible = false
                this.getList()
                this.$refs[formName].resetFields()
                if (res.status === 200) {
                  this.$notify({
                    title: '成功',
                    message: '修改成功',
                    type: 'success',
                    duration: 2000
                  })
                }
              })
            }
          } else {
            return false
          }
        })
      },
      cancel(formName) {
        this.dialogFormVisible = false
        this.$refs[formName].resetFields()
      },
      update(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            this.dialogFormVisible = false
            if (this.tabcard === 'first') {
              putObj(this.form).then(res => {
                this.dialogFormVisible = false
                this.getList()
                this.$refs[formName].resetFields()
                if (res.status === 200) {
                  this.$notify({
                    title: '成功',
                    message: '修改成功',
                    type: 'success',
                    duration: 2000
                  })
                }
              })
            } else if (this.tabcard === 'second') {
              postProductMix(this.form).then(res => {
                this.dialogFormVisible = false
                this.getList()
                this.$refs[formName].resetFields()
                if (res.status === 200) {
                  this.$notify({
                    title: '成功',
                    message: '修改成功',
                    type: 'success',
                    duration: 2000
                  })
                }
              })
            }
          } else {
            return false
          }
        })
      },
      deletes(row) {
        this.$confirm('此操作将永久删除该用户(用户名:' + row.name + '), 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // delObj(row.currencyId).then(() => {
          //   this.getList()
          //   this.$notify({
          //     title: '成功',
          //     message: '删除成功',
          //     type: 'success',
          //     duration: 2000
          //   })
          // }).cache(() => {
          //   this.$notify({
          //     title: '失败',
          //     message: '删除失败',
          //     type: 'error',
          //     duration: 2000
          //   })
          // })
        })
      },
      resetTemp() {
        this.form = {
          id: undefined,
          name: ''
        }
      }
    }
  }
</script>
