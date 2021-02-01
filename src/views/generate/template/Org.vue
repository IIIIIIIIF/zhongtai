<template>
  <div class="generateOrg">
    <Upload title="替换机构报告模板" filename="org.docx"/>
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="机构名称" prop="org">
        <el-input v-model="form.org"></el-input>
      </el-form-item>
      <el-form-item label="auIds">
        <el-input v-model="form.auIds"></el-input>
      </el-form-item>
      <el-form-item label="ckeys">
        <el-input v-model="form.ckeys"></el-input>
      </el-form-item>
      <el-form-item label="type">
        <el-input v-model="form.type"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="addLoading"
          type="primary"
          @click="handleSubmit('form')">try it out
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {Upload} from "../components";
  import {generateOrg} from "../../../api/local";

  export default {
    name: "org",
    components: {
      Upload
    },
    props: {},
    data() {
      return {
        addLoading: false,
        form: {
          org: "",
          auIds: "",
          ckeys: "",
          type: ""
        },
        rules: {
          org: [
            {required: true, message: "请输入机构名称", trigger: ['blur', 'change']}
          ]
        }
      }
    },
    methods: {
      handleSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addLoading = true;
            let forms = {};
            //请求
            for (let item in this.form) {
              forms[item] = encodeURI(encodeURI(this.form[item]));
            }
            generateOrg({...forms}).then(res => {
              this.addLoading=false;
              if (res && res.code === 200) {
                let url = "/local" + res.data;
                //下载成功

                /**
                 * 获取页面文件名
                 * @param url 文件url
                 */

                url = url.replace(/\\/g, '/');
                const xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.responseType = 'blob';
                //xhr.setRequestHeader('Authorization', 'Basic a2VybWl0Omtlcm1pdA==');
                xhr.onload = () => {
                  if (xhr.status === 200) {
                    // 获取文件blob数据并保存
                    let fileName = this.getFileName(url);
                    this.saveAs(xhr.response, fileName);
                  }
                };
                xhr.send();
              } else {
                this.$message.error(res.message);
              }
            });
          }
        })
      },
      /**
       * URL方式保存文件到本地
       * @param data 文件的blob数据
       * @param name 文件名
       */
      saveAs(data, name) {
        let urlObject = window.URL || window.webkitURL || window;
        let export_blob = new Blob([data]);
        let save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
        save_link.href = urlObject.createObjectURL(export_blob);
        save_link.download = name;
        save_link.click();
      },
      /**
       * 根据文件url获取文件名
       * @param url 文件url
       */
      getFileName(url) {
        let num = url.lastIndexOf('/') + 1;
        let fileName = url.substring(num);
        //把参数和文件名分割开
        fileName = decodeURI(fileName.split("?")[0]);
        return fileName;
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
