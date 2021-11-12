<template>
    <div class='contain'>
        <vxe-toolbar ref="XToolbar">
            <template #buttons>
                <vxe-button @click="getTreeCheckboxEvent">获取选中</vxe-button>
                <vxe-button @click="getTreeExpansionEvent">获取已展开</vxe-button>
                <vxe-button @click="$refs.XTree.setAllTreeExpand(true)">展开所有</vxe-button>
                <vxe-button @click="$refs.XTree.clearTreeExpand()">关闭所有</vxe-button> 
            </template>
        </vxe-toolbar>

        <vxe-table  show-overflow highlight-hover-row row-key  ref="XTree"
            :show-header="false" :loading="loading" :checkbox-config="{labelField: 'name'}"
            :tree-config="{parentField: 'parentId',transform: true,}"
            :data="tableData" @checkbox-change="selectChangeEvent">
            <vxe-column type="checkbox" tree-node></vxe-column>
        </vxe-table>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tableData: [
                    {id: 0 ,name: 'admin0', parentId: null},
                    {id: 5 ,name: 'admin5', parentId: 0},
                    {id: 7 ,name: 'admin7', parentId: 5},
                    {id: 8 ,name: 'admin8', parentId: 5},
                    {id: 6 ,name: 'admin6', parentId: 0},
                    {id: 1 ,name: 'admin1', parentId: null},
                    {id: 9 ,name: 'admin9', parentId: 1},
                    {id: 2 ,name: 'admin2', parentId: null},
                    {id: 10 ,name: 'admin10', parentId: 2},
                    {id: 13 ,name: 'admin13', parentId: 10},
                    {id: 14 ,name: 'admin14', parentId: 10},
                    {id: 11 ,name: 'admin11', parentId: 2},
                    {id: 15 ,name: 'admin15', parentId: 11},
                    {id: 16 ,name: 'admin16', parentId: 15},
                    {id: 17 ,name: 'admin17', parentId: 16},
                    {id: 12 ,name: 'admin12', parentId: 2},
                    {id: 3 ,name: 'admin3', parentId: null},
                    {id: 18 ,name: 'admin18', parentId: 3},
                    {id: 19 ,name: 'admin19', parentId: 3},
                    {id: 4 ,name: 'admin4', parentId: null},
                ],
                loading: true,
                select_elements: []
            }
        },
        watch: {},
        computed: {},
        created() {
            // {__ob__: Observer}:这种格式不是简单对象，可以用 JSON.parse(JSON.stringfy(obj)) 格式化
            // 根据 parentId 分组，组内根据 id 排序
            
            this.$nextTick(() => {
                this.$refs.XTree.connect(this.$refs.XToolbar)
                this.loading = false;
            })
            
        },
        mounted() { },
        methods: {
            getTreeCheckboxEvent(){
                this.$message({
                    message: JSON.stringify(this.select_elements.map(e=>{return e.name}))
                })
            },
            selectChangeEvent({records}){
                this.select_elements = records
            },
            getTreeExpansionEvent(){
                this.$message({
                    message: JSON.stringify(this.$refs.XTree.getTreeExpandRecords().map(e=>{return e.name}))
                })
            }
        },
    }
</script>
<style>
</style>