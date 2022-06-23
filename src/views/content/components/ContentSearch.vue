<template>
  <div class="contentSearch-container">
    <el-form ref="form" :model="form" label-width="80px" size='mini'>
      <el-form-item label="状态">
        <el-radio-group v-model="form.status">
          <el-radio :label="null">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
          <el-radio :label="4">已删除</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="频道">
        <el-select v-model="form.channel_id" placeholder="请选择">
          <el-option 
            v-for='channel in channels'
            :key='channel.id'
            :label='channel.name'
            :value='channel.id'
          ></el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="onSubmit" round s>筛选</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {getArticleChannel} from '@/api/article'
export default {
  name: "ContentSearch",
  data() {
    return {
      form: {
        status: null,
        channel_id: null
      },
      channels: []
    };
  },
  methods: {
    onSubmit() {
      this.$bus.$emit("selectData", this.form)
    },
    async loadArticleChannel () {
      const res = await getArticleChannel();
      this.channels = res.data.data.channels
    }
  },
  mounted () {
    this.loadArticleChannel()
  }
};
</script lang='less' scoped>

<style>
</style>