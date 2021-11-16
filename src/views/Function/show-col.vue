<template>
    <div class="contain">
        <div class="base-table-contain">
            <vxe-toolbar ref="xToolbar" custom>
                <template #buttons> </template>
                <template #tools>
                    <vxe-button @click="isAdjustColsDialog = true" class="btn-adjust-cols" icon="el-icon-menu" circle>
                    </vxe-button>
                </template>
            </vxe-toolbar>
            <vxe-table ref="mytable" stripe :border="tableBorder" align="center" :loading="loading"
                :height="tableHeight" highlight-current-row highlight-hover-row :data="tableData">
                <vxe-column type="seq" width="60" fixed="left"></vxe-column>
                <vxe-column field="account" title="account" width="140"></vxe-column>
                <vxe-column field="product" title="product" width="240"></vxe-column>
                <vxe-column field="SKU" title="SKU" width="180"></vxe-column>
                <vxe-column field="ASIN" title="ASIN" width="140"></vxe-column>
                <vxe-column field="seller" title="seller" width="220"></vxe-column>
                <vxe-column field="developer" title="developer" width="200">
                </vxe-column>
                <vxe-colgroup field="all_sum" title="all_sum">
                    <vxe-column field="sale_amount" title="sale_amount" width="240" sortable></vxe-column>
                    <vxe-column field="order_amount" title="order_amount" width="240" sortable></vxe-column>
                </vxe-colgroup>
                <vxe-column field="edit" title="edit" width="260" fixed="right">
                    <template custom>
                        <vxe-button icon="vxe-icon--minus" size="mini" content="删除" type="text"></vxe-button>
                        <vxe-button icon="el-icon-check" size="mini" content="修改" type="text"></vxe-button>
                    </template>
                </vxe-column>
            </vxe-table>
        </div>
        <div class="adjust-cols-dialog">
            <el-dialog title="提示" :visible.sync="isAdjustColsDialog" width="30%" center>
                <span>需要注意的是内容是默认不居中的</span>
                <el-form :model="colsForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="字段" prop="cols">
                        <el-checkbox-group v-model="colsForm.cols" >
                            <div v-for="(item,i) in tableColumns" :key="i">
                                <el-checkbox v-if="item.title" :label="item.title" name="cols" v-model="item.visible" :checked="item.visible"></el-checkbox>
                            </div>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="adjustColsEvent">确定</el-button>
                        <el-button @click="resetColsEvent">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import XEUtils from 'xe-utils';
    export default {
        data() {
            return {
                loading: true,
                tableData: [],
                tableBorder: "false",
                tableHeight: 660,
                isAdjustColsDialog: false,
                tableColumns: null,
                colsForm:{
                    cols:[]
                }
            };
        },
        watch: {
        },
        computed: {},
        created() {
            this.tableData = new Array(30).fill(0).map((e, i) => {
                return {
                    id: 1000 + i,
                    account: "admin" + i,
                    product: "product" + i,
                    SKU: "SKU" + i,
                    ASIN: "ASIN" + i,
                    seller: "seller" + i,
                    developer: "developer" + i,
                    sale_amount: (Math.random() * 1000).toFixed(2),
                    order_amount: (Math.random() * 100).toFixed(0),
                };
            });
            this.loading = false;
            this.$nextTick(() => {
                this.$refs.mytable.connect(this.$refs.xToolbar);
                let cols = this.$refs.mytable.getTableColumn()
                XEUtils.each(cols,(item,key)=>{
                    if(key == 'fullColumn'){
                        this.tableColumns = item
                    }
                })
            });
        },
        mounted() { 
        },
        methods: {
            adjustColsEvent(){
                XEUtils.each(this.tableColumns,(item,key)=>{
                    if(item.title && this.colsForm.cols.indexOf(item.title) == -1)
                        // item.visible = false;
                        this.$refs.mytable.hideColumn(item)
                    else
                        this.$refs.mytable.showColumn(item)
                });
                this.isAdjustColsDialog = false;
                // this.$refs.mytable.reloadColumn(this.tableColumns);
            },
            resetColsEvent(){
                XEUtils.each(this.tableColumns,(item,key)=>{
                    this.$refs.mytable.showColumn(item)
                });
                // this.$refs.mytable.reloadColumn(this.tableColumns);
            }
        },
    };
</script>
<style>
    .contain {
        background-color: #fff;
    }

    .contain-fullscreen {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .vxe-buttons--wrapper {
        text-align: left;
    }

    table,
    table.vxe-table--header tr th {
        border: 1px solid #e8eaec;
        background: #fff;
    }

    table.vxe-table--body-wrapper {
        transition: all 1s ease;
    }

    table.vxe-table--body tr td:first-child {
        border: 1px solid #e8eaec;
    }

    table.vxe-table--body tr:nth-child(10n) td {
        border-bottom: 1px solid #000;
    }

    .vxe-cell button {
        height: 18px;
    }
</style>