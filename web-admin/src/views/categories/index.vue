<template>
  <div class="categoires-page">
    <div class="categoires-page-header">
      <el-button type="primary" @click="handleAddCate">新增类目</el-button>
      <el-input
        v-model="searchKey"
        placeholder="请输入类目名称"
        prefix-icon="el-icon-search"
        size="meidum"
      />
    </div>
    <el-tree
      v-loading="treeConfig.loading"
      v-bind="treeConfig"
      default-expand-all
      draggable
      @node-drop="handleDrop"
      class="cate-tree"
    >
      <span slot-scope="{ node, data }" class="cate-ops">
        <span>{{ data.name }}</span>
        <span>
          <span :class="{ 'cate-status': true, 'inactive': true }">{{ data.enable ? '已启用' : '未启用' }}</span>

          <el-button type="text" size="mini" @click.stop="addChildCate(data)">添加子类目</el-button>
          <el-button type="text" size="mini" @click.stop="modifyCate(data)">编辑</el-button>
          <el-button class="red" type="text" size="mini" @click.stop="deleteCate(data)">删除</el-button>
        </span>
      </span>
    </el-tree>

    <add-category-dialog
      ref="cateDialog"
      v-bind="categoryDialog"
      :title="categoryDialog.id ? '编辑类目' : '新增类目'"
      :visible.sync="categoryDialog.visible"
      @handleSuccess="getData"
    />
  </div>
</template>

<script>
import {
  getCategoriesTree,
  removeCategory,
  handleCategoriesSort
} from "@/api/categories";

import AddCategoryDialog from "./components/add-category-dialog";

export default {
  components: {
    AddCategoryDialog
  },
  data() {
    return {
      treeConfig: {
        data: [],
        props: {
          label: "name"
        },
        nodeKey: "_id",
        loading: false
      },
      searchKey: "",
      categoryDialog: {
        visible: false,
        id: "",
        parent: ""
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.treeConfig.loading = true;
      getCategoriesTree()
        .then(res => {
          this.treeConfig.data = res.data.payload;
        })
        .finally(() => {
          this.treeConfig.loading = false;
        });
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      this.$nextTick(() => {

        const isInner = dropType === "inner";

        let data = isInner ? dropNode.childNodes : dropNode.parent.childNodes;

        const parent = isInner ? dropNode.data._id : dropNode.parent.key || "";

        data = data.map(({ data }, i) => ({
          sort: i,
          id: data._id,
          parent: parent || null
        }));

        handleCategoriesSort(data).then(res => {
          this.$message.success("排序成功");
          this.getData();
        });
      });
      // console.log("tree drag end: ",dropNode, dropNode && dropNode.label, dropType);
    },
    handleAddCate() {
      this.categoryDialog.visible = true;
      this.categoryDialog.id = "";
      this.categoryDialog.parentId = null;
    },
    addChildCate(data) {
      this.categoryDialog.visible = true;
      this.categoryDialog.id = "";
      this.categoryDialog.parent = data._id;
    },
    modifyCate(data) {
      this.categoryDialog.visible = true;
      this.categoryDialog.id = data._id;
      this.categoryDialog.parent = data.parent;
      this.$nextTick(() => {
        this.$refs.cateDialog.set(data);
      });
    },
    deleteCate({ _id }) {
      this.$confirm("此操作会永久删除分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        removeCategory(_id).then(() => {
          this.$message.success("删除成功");
          this.getData();
        });
      });
    }
  }
};
</script>

<style lang="scss">
.categoires-page {
  padding: 20px;
  .categoires-page-header {
    display: flex;
    justify-content: space-between;
    $head-height: 36px;

    &.hide-left {
      justify-content: flex-end;
    }
    .el-input {
      width: 240px;
      input,
      .el-input__icon {
        height: $head-height;
        line-height: $head-height;
      }
    }
    .el-button {
      padding-top: 0;
      padding-bottom: 0;
      height: $head-height;
      line-height: $head-height;
    }
  }
  .cate-tree {
    margin-top: 24px;
    min-height: 80px;
    .cate-ops {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
      line-height: 22px;
      padding: 9px 0;
      padding-right: 14px;
      font-size: 12px;
      .el-button {
        margin-left: 16px;
        font-weight: normal;
        &.red {
          color: #e06272;
          &:hover {
            opacity: 0.85;
          }
        }
      }
    }
    .cate-label {
      font-size: 14px;
    }
    .cate-status {
      margin-right: 8px;
      &::before {
        content: "";
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #e06272;
        vertical-align: middle;
        margin-right: 5px;
      }
      &.inactive::before {
        background-color: rgba(45, 48, 59, 0.25);
      }
    }
    .el-tree-node__content {
      height: 40px;
    }
    .el-tree-node.is-drop-inner .cate-label {
      background-color: blue;
      color: #fff;
    }
  }
}
</style>
