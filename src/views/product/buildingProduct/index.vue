
<template>
  <div class="app-container calendar-list-container">
    
    <product-search-component
      :searchProductStatus="false"
      @searchProduct="getListQuery">
    </product-search-component>

    <product-table-component
      :productList="data"
      :activeUrl="url"
      @searchProduct="getListPageQuery">
    </product-table-component>
    
  </div>
</template>

<script>
  import productSearchComponent from 'components/searchBar/product'
  import productTableComponent from 'components/table/product'
  import { fetchList, getObj, addObj, putObj, delObj } from '@/api/product/product'
  import { fetchProductTypeList } from '@/api/product/productType'
  import { deptRoleList, fetchDeptTree } from '@/api/role'
  import { getFiles, delFiles, uploadFiles } from '@/api/qiniu'
  import { fetchCurrency, getObjList } from '@/api/currency'
  import { getToken } from '@/utils/auth'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { transformText } from '@/utils'
  import { mapGetters } from 'vuex'
  import ElRadioGroup from 'element-ui/packages/radio/src/radio-group'
  import ElOption from "element-ui/packages/select/src/option"
  import { decimals } from '@/utils/validate'
  import Bus from '@/assets/js/bus'

  export default {
    components: {
      ElOption,
      ElRadioGroup,
      productSearchComponent,
      productTableComponent
    },
    name: 'table_user',
    directives: {
      waves
    },
    data() {
      return {
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
          limit: 20,
          // name: '',
          productTypeIds: [],
          productStatus: ['0'],
          annualizedReturns: [],
          orderByField: 'create_time',
          isAsc: false
        },
        role: undefined,
        form: {
          name: undefined,
          password: undefined,
          // delFlag: undefined,
          deptId: undefined
        },
        statusOptions: ['0', '1'],
        rolesOptions: [],
        dialogFormVisible: false,
        dialogDeptVisible: false,
        userAdd: false,
        userUpd: false,
        userDel: false,
        dialogStatus: '',
        textMap: {
          update: '编辑产品',
          create: '新增产品'
        },
        tableKey: 0,
        sex: '',
        edu: '',
        // currencyList: [],
        IDsType: '',
        entryDate: '',
        fileList: [],
        productTypes: [],
        productTypesList: [],
        input2: '',
        // nextToUpdate: false,
        fileList: [],
        fileList1: [],
        fileList2: [],
        fileList3: [],
        indexList1: [],
        indexList2: [],
        indexList3: [],
        productStus: '',
        // radio2: null,
        profitTextarea: '',
        highlight: '',
        uploadData: {
          productId: ''
        },
        headers: {
          Authorization: 'Bearer ' + getToken()
        },
        isDisabled: true,
        form: [],
        isSpread: false,
        productStatusId: '0',
        url: '/product/building',
        data: {}
      }
    },
    computed: {
      ...mapGetters([
        'permissions',
        'productStatus',
        'productRiskLevel',
        'investHorizonUnit'
      ])
    },
    created() {
      // console.log(this.productStatus)
      this.getList()
      this.sys_product_add = this.permissions['sys_product_add']
      this.sys_product_upd = this.permissions['sys_product_upd']
    },
    methods: {
      getListQuery(data) {
        this.listQuery = data
        this.listQuery.productStatus = [0]
        this.getList()
      },
      getListPageQuery(data) { // 页数改变
        this.listQuery.page = data.page
        this.listQuery.limit = data.limit
        this.getList()
      },
      getList() {
        // this.listLoading = true
        
        this.listQuery.isFloat ? this.listQuery.isFloat = 0: this.listQuery.isFloat = null
        fetchList(this.listQuery).then(response => {
          this.data = response.data
          this.list = response.data.records
          this.total = response.data.total
          this.listLoading = false
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "src/styles/mixin.scss";
.el-select,
.el-date-editor {
  width: 100%;
}
.filter-container {
  .query-title {
    white-space: nowrap;
    min-width: 85px;
    padding: 0;
    height: 40px;
    line-height: 40px;
    text-align: center;
    vertical-align: center;
  }
  .el-checkbox-button:hover {
    color: #00C1DF;
  }
  .el-checkbox-button__inner:hover {
    color: #00C1DF;
  }
  .el-checkbox-button__inner:active {
    background-color: #00C1DF;
    color: #fff;
  }
  .el-checkbox-button.is-checked .el-checkbox-button__inner {
    background-color: #00C1DF;
  }
}
.btn-padding {
  @include padding;
}
.query-color {
  @include mainColor;
}
</style>

