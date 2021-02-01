<template>
  <div class="fileUpload">
    <h3 class="title">{{title}}</h3>
    <el-form ref="form" :model="form"  :rules="rules">
      <el-form-item label="文件">
        <el-upload
          ref="profile"
          class="avatar-uploader"
          :action="'/local/upload?filename='+filename"
          :style="style"
          :data="form"
          :on-errpr="handleError"
          :on-exceed="handleExceed"
          :on-success="handleSuccess"
          :before-upload="beforeAvatarUpload"
          :on-change="handleChange"
          :limit="1"
          :file-list="file"
          list-type="file"
          :auto-upload="false"
          multiple>
          <div slot="tip" class="el-upload__tip">只能上传docx文件，且不超过20MB&nbsp;&nbsp;<a class="link" :download="filename" :href="'/local/template/'+filename">原报告下载</a></div>
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" :disabled="showUpload" :loading="addLoading" @click="submitUpload">上传到服务器</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        addLoading: false,
        style:"width:300px",
        rules:{},
        showUpload:true,//是否显示上传服务器按钮
        file:[],
        form: {
          filename:"",
        }
      }
    },
    props:{
      filename:{
        type:String,
        required:true,
        default:''
      },
      title:{
        type:String,
        required:true,
        default:'替换模板'
      }
    },
    mounted(){
      this.form.filename=this.filename;//从props中获取filename
    },

    methods:{
      beforeRemove(file,fileList){
        // console.log(file);
        // console.log(fileList);
      },
      //文件超出个数限制
      handleExceed() {
        this.$message({type: "error", message: "只能上传一个文件"});
      },
      handleChange(file,fileList) {
        if(fileList.length>0){
          this.showUpload=false;
        }else{
          this.showUpload=true;
        }
        file.type = file.raw.type;
        const isJPG = (/(.docx)$/.test(file.raw.name));
        const isLt2M = file.size / 1024 / 1024 <= 20;
        if (!isJPG) {
          this.$message.error('上传文件只能是 docx 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传文件大小不能超过 20MB!');
        }
        return isJPG && isLt2M;
      },
      beforeAvatarUpload(file) {
        const isJPG = (/(.docx)$/.test(file.name));
        const isLt2M = file.size / 1024 / 1024 <= 20;

        if (!isJPG) {
          this.$message.error('上传文件只能是 docx 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传文件大小不能超过 20MB!');
        }
        return isJPG && isLt2M;
        // return true;
      },
      //上传失败
      handleError(err) {
        this.addLoading=false;
        this.$message({type: "error", message: err.message});
      },
      //上传成功
      handleSuccess(res) {
        this.addLoading=false;
        if(res&&res.code===200){
          this.$message.success("文件上传成功");
        }else{
          this.$message.error(res.message);
        }
      },
      submitUpload() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.addLoading=true;
            this.$refs.profile.submit();
          }
        })
      },
    },
    watch:{
      id(val){
        this.form.indexTypeId=val;
      }
    }
  }
</script>
<style lang="scss">
  .fileUpload{
    .el-upload__tip{
      padding-left: 40px;
      a{
        color: #409EFF;
      }
    }
  }
</style>
<style lang="scss" scoped>
.fileUpload{
  .title{
    font-size: 20px;
    padding-bottom: 10px;
    margin-bottom: 10px;
  }
}
</style>
