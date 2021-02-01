<template>
  <div class="fileUpload">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="文件">
        <el-upload
          ref="profile"
          class="avatar-uploader"
          action="/manager/uploadFile"
          :size="size"
          :style="style"
          :data="form"
          :on-errpr="handleError"
          :on-exceed="handleExceed"
          :on-success="handleSuccess"
          :before-upload="beforeAvatarUpload"
          :on-change="handleChange"
          :limit="5"
          :file-list="files"
          list-type="file"
          :auto-upload="false"
          multiple>
          <div slot="tip" class="el-upload__tip">只能上传json文件,且不超过20MB&nbsp;&nbsp;
            <a
              href="/static/cstad.json"
              download="样例文件.json">下载样例文件</a></div>
          <el-button
            slot="trigger"
            size="small"
            type="primary">选取文件</el-button>
          <el-button
            style="margin-left: 10px;"
            size="small"
            type="success"
            :disabled="showUpload"
            :loading="addLoading"
            @click="submitUpload">上传到服务器
          </el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {resourceGetIndexTypeList} from "../../../../../api/settlement";
  import {mapGetters} from 'vuex'
  import {logout} from "../../../../../tools/utils";

  export default {
    name: "index",
    data() {
      return {
        addLoading: false,
        size: this.$store.getters.getAppSize,
        style: "width:100%",
        rules: {},
        resourceList: [],
        showUpload: true,//是否显示上传服务器按钮
        files: [],
        form: {
          userId: '',
          userName: '',
          indexTypeId: '',
          index_id:''
        }
      }
    },
    props: {
      'indexTypeId':{
        required:true,
      },
      'index_id':{
        required:true,
      }
    },
    mounted() {
      this.initData();
    },

    methods: {
      logout,
      ...mapGetters(['getUsersInfo']),
      initData() {
        let info = this.getUsersInfo();
        let id = info.id;
        this.form.userId = id;
        if (!id) {
          this.$message.error('用户信息获取失败，请重新登录');
          this.logout();
          return false;
        }
        resourceGetIndexTypeList({
          field: 'id,chn_name'
        }).then((res) => {
          if (res && res.code === 200 && res.data && res.data.length > 0) {
            this.resourceList = res.data || [];
          }
        });
      },
      beforeRemove(file, fileList) {
        // console.log(file);
        // console.log(fileList);
      },
      //文件超出个数限制
      handleExceed() {
        this.$message({type: "error", message: "只能上传一个文件"});
      },
      handleChange(file, fileList) {
        if(file&&file.response&&file.response!==200){
          this.files=[];
          return false;
        }

        if (fileList.length > 0) {
          this.showUpload = false;
        } else {
          this.showUpload = true;
        }
        file.type = file.raw.type;
        // const isJPG = (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/gif');
        // const isJPG = (file.type === 'text/plain');
        const isJPG = (file.type === 'application/json');
        const isLt2M = file.size / 1024 / 1024 <= 20;
        if (!isJPG) {
          this.$message.error('上传文件只能是 json 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传文件大小不能超过 20MB!');
        }
        return isJPG && isLt2M;
      },
      beforeAvatarUpload(file) {
        // const isJPG = (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/gif');
        // const isJPG = (file.type === 'text/plain');
        const isJPG = (file.type === 'application/json');
        const isLt2M = file.size / 1024 / 1024 <= 20;

        if (!isJPG) {
          this.$message.error('上传文件只能是 json 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传文件大小不能超过 20MB!');
        }
        return isJPG && isLt2M;
        // return true;
      },
      //上传失败
      handleError(err) {
        this.addLoading = false;
        this.$message({type: "error", message: err.message});
      },
      //上传成功
      handleSuccess(res) {
        this.addLoading = false;
        if (res && res.code === 200) {
          this.$message.success("文件上传成功");
          this.$emit('close')
          // this.$router.go(0);
          // this.$router.push('/settlement/myUpload/file');
        } else {
          this.$message.error(res.message);
        }
        // this.fileList[0].url = res.data;
        // this.$message({type: "success", message: res.code});
        // window.location.reload();
      },
      submitUpload() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            let info = this.getUsersInfo();
            let id = info.id;
            let username = info.username || "";
            if (!id || !username) {
              this.$message.error('用户信息获取失败，请重新登录');
              this.logout();
              return false;
            }
            this.form.userId = id;
            this.form.userName = username;
            // this.addLoading=true;
            this.$refs.profile.submit();
          }
        })
      },
    },
    watch: {
      indexTypeId:{
        immediate:true,//首次加载的时候执行函数
        // deep:true,//深入观察，监听数值，对象属性值的变化
        handler(val) {
          this.form.indexTypeId=val;
        }
      },
      index_id:{
        immediate: true,
        handler(val){
          this.form.index_id=val;
        }
      }
    }
  }
</script>
<style lang="scss">
  .fileUpload {
    .el-upload__tip {
      padding-left: 40px;

      a {
        color: #409EFF;
      }
    }
  }
</style>
<style scoped>

</style>
