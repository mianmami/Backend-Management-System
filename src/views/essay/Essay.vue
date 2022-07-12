<template>
  <div class="essay-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <BreadCrumb
          :name="$route.query.id ? '编辑文章' : '发布文章'"
        ></BreadCrumb>
      </div>
      <el-form :rules="rules" ref="form" :model="form" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-tiptap
            :extensions="extensions"
            v-model="form.content"
            style="height: 300px"
            placeholder="请输入文章内容..."
          />
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="form.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <template v-if='form.cover.type > 0'>
            <div style='display: flex'>
              <ImageCover
                v-for='(item,idx) in form.cover.type'
                :key='idx'
                style='margin-right: 10px'
                @upload-image='onUploadImage(idx, $event)'
                :imgUrl="form.cover.images[idx]"
              ></ImageCover>
            </div>
          </template>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
          <el-select v-model="form.channel_id" placeholder="请选择">
            <el-option
              :label="val.name"
              :value="val.id"
              v-for="val in channelList"
              :key="val.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            ref="editPublish"
            @click="$route.query.id ? onUpdate() : onPublish()"
            :loading="isLoading"
            >{{ $route.query.id ? "修改" : "发表" }}</el-button
          >
          <el-button
            type="primary"
            @click="saveDraft"
            :loading="isSaving"
            v-if="!$route.query.id"
            >{{ isSaving ? "存入中" : "存为草稿" }}</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb.vue";
import ImageCover from './components/ImageCover.vue'
import {
  getArticleChannel,
  addArticle,
  getArticleContent,
  updateArticle,
} from "@/api/article";
import { rules } from "@/utils/rules";
import {
  // necessary extensions
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  Image
} from "element-tiptap";
export default {
  name: "Essay",
  components: { BreadCrumb, ImageCover},
  data() {
    return {
      form: {
        title: "",
        content: "",
        cover: { type: "", images: [] },
        channel_id: "",
      },
      channelList: [],
      isLoading: false, // 点击发布的loading
      isSaving: false, // 点击存为草稿的loading
      rules,
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // render command-button in bubble menu.
        new Underline({ bubble: true, menubar: false }), // render command-button in bubble menu but not in menubar.
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new Image({ 
          // 新版本的已经不需要配置，可以直接进行上传操作
        })
      ],
    };
  },
  methods: {
    async loadArticleChannel() {
      const res = await getArticleChannel();
      this.channelList = res.data.data.channels;
    },
    onPublish() {
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          this.isLoading = true;
          this.$refs.editPublish.$el.innerText = "发布中...."; // $el:获取vue实例关联的dom对象
          const res = await addArticle(this.form);
          if (res.data.message === "OK") {
            this.$message.success("文章发布成功");
            this.$router.push("/content");
          } else {
            this.$message.error("发布失败，请稍后再试");
          }
          this.isLoading = false;
        } else {
          return false;
        }
      });
    },
    async onUpdate() {
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          this.isLoading = true;
          this.$refs.editPublish.$el.innerText = "修改中...."; // $el:获取vue实例关联的dom对象
          const id = this.$route.query.id.toString();
          const res = await updateArticle(id, this.form);
          if (res.data.message === "OK") {
            this.$message.success("更新成功");
            this.$router.push("/content");
          } else {
            this.$message.error("更新失败");
          }
          this.isLoading = false;
        } else {
          return false;
        }
      });
    },
    async saveDraft() {
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          this.isSaving = true;
          const res = await addArticle(this.form, true);
          if (res.data.message === "OK") {
            this.$message.success("存入草稿成功");
            this.$router.push("/content");
          } else {
            this.$message.error("存入草稿失败，请稍后再试");
          }
          this.isSaving = false;
        } else {
          return false;
        }
      });
    },
    onUploadImage (index, url) {
      this.form.cover.images[index] = url;
    }
  },
  async created() {
    if (this.$route.query.id) {
      const id = this.$route.query.id;
      const res = await getArticleContent(id.toString());
      this.form = res.data.data;
    } else {
      this.loadArticleChannel();
    }
  },
};
</script>

<style lang='less' scoped>
</style>