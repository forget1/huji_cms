<template>
  <div>
    <!-- 头部部分 -->
    <head-top></head-top>
    <!-- 表格部分 -->
    <div class="table_container">
      <el-table :data="tableData" style="width: 100%;">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="户主：">
                <span>{{props.row.name}}</span>
              </el-form-item>
              <el-form-item label="住户ID：">
                <span>{{props.row.id}}</span>
              </el-form-item>
              <el-form-item label="性别：">
                <span>{{props.row.sex}}</span>
              </el-form-item>
              <el-form-item label="户口类型：">
                <span>{{props.row.type}}</span>
              </el-form-item>
              <el-form-item label="其他人员：">
                <span>{{props.row.otherPeople}}</span>
              </el-form-item>
              <el-form-item label="房屋地址：">
                <span>{{props.row.address}}</span>
              </el-form-item>
              <el-form-item label="房屋照片：">
                <div>
                  <img :src="props.row.imgURL">
                </div>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="住户ID" prop="id"></el-table-column>
        <el-table-column label="户主" prop="name"></el-table-column>
        <el-table-column label="性别" prop="sex"></el-table-column>
        <el-table-column
          label="户口类型"
          prop="type"
          :filters="[{text:'城镇户口', value:'城镇户口'},{text:'农村户口', value:'农村户口'}]"
          :filter-method="filterHandler"
          filter-placement="bottom"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 模态框部分 -->
    <el-dialog title="修改户籍信息" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="户主" label-width="100px">
          <el-input v-model="name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" label-width="100px">
          <el-input v-model="address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="100px">
          <el-select v-model="sex" placeholder="请选择">
            <el-option
              v-for="item in sexOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="其他人员" label-width="100px">
          <el-input v-model="otherPeople"></el-input>
        </el-form-item>
        <el-form-item label="户口类型" label-width="100px">
          <el-select v-model="type" placeholder="请选择">
            <el-option
              v-for="item in typeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商铺图片" label-width="100px">
          <el-upload
            class="avatar-uploader"
            :action="'//elm.cangdu.org' + '/v1/addimg/shop'"
            :show-file-list="false"
            :on-success="handleServiceAvatarScucess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imgURL" :src="imgURL" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateShop">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// splice(1,1)
import headTop from '@/components/headTop'
export default {
  data () {
    return {
      // 表格数据
      tableData: [{
        id: '12987122',
        name: 'test1',
        type: '城镇户口',
        address: '上海市普陀区真北路',
        imgURL: 'http://www.qbcgzfzd.com/cms/images/2019030409514259523828121994686560.jpg',
        otherPeople: '其他，其他，其他',
        sex: '男'
      }, {
        id: '12987123',
        name: 'test2',
        type: '农村户口',
        address: '上海市普陀区真北路',
        imgURL: 'http://www.qbcgzfzd.com/cms/images/2019030409514259523828121994686560.jpg',
        otherPeople: '其他，其他，其他',
        sex: '男'
      }, {
        id: '12987125',
        name: 'test3',
        type: '城镇户口',
        address: '上海市普陀区真北路',
        imgURL: 'http://www.qbcgzfzd.com/cms/images/2019030409514259523828121994686560.jpg',
        otherPeople: '其他，其他，其他',
        sex: '男'
      }, {
        id: '12987126',
        name: 'test4',
        type: '农村户口',
        address: '上海市普陀区真北路',
        imgURL: 'http://www.qbcgzfzd.com/cms/images/2019030409514259523828121994686560.jpg',
        otherPeople: '其他，其他，其他',
        sex: '女'
      }],
      // 模态框显示控制
      dialogFormVisible: false,
      id: '',
      name: '',
      type: '',
      address: '',
      otherPeople: '',
      sex: '',
      imgURL: '',
      index: '',
      typeOption: [{
        value: '城镇户口',
        lable: '城镇户口'
      }, {
        value: '农村户口',
        label: '农村户口'
      }],
      sexOption: [{
        value: '男',
        label: '男'
      }, {
        value: '女',
        label: '女'
      }]
    }
  },
  components: {
    headTop
  },
  methods: {
    filterHandler (value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    handleEdit (index, row) {
      this.dialogFormVisible = true
      this.id = row.id
      this.name = row.name
      this.type = row.type
      this.address = row.address
      this.otherPeople = row.otherPeople
      this.sex = row.sex
      this.imgURL = row.imgURL
      this.index = index
    },
    handleDelete (index, row) {
      console.log(index)
      console.log(row.id)
      this.tableData.splice(index, 1)
    },
    handleServiceAvatarScucess (res, file) {
      if (res.status === 1) {
        this.imgURL = '//elm.cangdu.org/img/' + res.image_path
      } else {
        this.$message.error('上传图片失败！')
      }
    },
    beforeAvatarUpload (file) {
      const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png')
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isRightType) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isRightType && isLt2M
    },
    updateShop () {
      this.$message.success('更新信息成功')
      this.tableData[this.index].name = this.name
      this.tableData[this.index].address = this.address
      this.tableData[this.index].sex = this.sex
      this.tableData[this.index].type = this.type
      this.tableData[this.index].imgURL = this.imgURL
      this.tableData[this.index].otherPeople = this.otherPeople
      this.dialogFormVisible = false
    }
  }
}
</script>

<style scoped>
  .table_container {
    padding: 20px;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .el-form-item__content div {
    width: 50%;
  }
  .el-form-item__content div img {
    width: 100%;
    object-fit: cover;
  }
</style>
