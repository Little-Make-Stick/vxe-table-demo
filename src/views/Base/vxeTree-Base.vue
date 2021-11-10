<template>
    <div class='contain'>
        <vxe-toolbar ref="XToolbar">
            <template #buttons>
                <!-- <vxe-button @click="getTreeRadioEvent">获取选中</vxe-button>
                <vxe-button @click="getTreeExpansionEvent">获取已展开</vxe-button>
                <vxe-button @click="$refs.xTree.setAllTreeExpand(true)">展开所有</vxe-button>
                <vxe-button @click="$refs.xTree.clearTreeExpand()">关闭所有</vxe-button> -->
            </template>
        </vxe-toolbar>

        <vxe-table  show-overflow highlight-hover-row row-key 
            :show-header="false" :loading="loading" :checkbox-config="{labelField: 'name'}"
            :tree-config="{parentField: 'parentId',transform: true,}"
            :data="tableData">
            <vxe-column type="checkbox" tree-node></vxe-column>
        </vxe-table>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tableData: [],
                loading: true,
            }
        },
        watch: {},
        computed: {},
        created() {
            this.tableData = new Array(20).fill(0).map((e,i)=>{
                return {
                    id: i,
                    name: 'admin'+i,
                    parentId: i<5 ? null : (i<10 ? (Math.random() * 5).toFixed(0) : (Math.random() * 5 + 5).toFixed(0)),
                }
            })
            // {__ob__: Observer}:这种格式不是简单对象，可以用 JSON.parse(JSON.stringfy(obj)) 格式化

            // 根据 parentId 分组，组内根据 id 排序
            let parentIds = [...new Set(this.tableData.map(e=>e=e.parentId))].sort((a,b)=>a-b);

            let groups = parentIds.map(e=>{
                return this.tableData.filter(el=>{
                    return el.parentId == e
                })
            })
            console.log(groups)
            
            this.$nextTick(() => {
                // this.$refs.XTree.connect(this.$refs.XToolbar)
                this.loading = false;
            })
            
        },
        mounted() { },
        methods: {},
    }
</script>
<style>
</style>