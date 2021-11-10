<template>
    <div class="contain">
        <!-- vxe-grid 得 zoom 可以实现全屏，vxe-table 需要自定义功能 -->
        <div class="base-table-contain">
            <vxe-toolbar ref="xToolbar" custom>
                <template #buttons>
                </template>
                <template #tools>
                </template>
            </vxe-toolbar>
            <vxe-table ref="mytable" stripe :border="tableBorder" align="center" :loading="loading"
                :height="tableHeight" highlight-current-row highlight-hover-row :data="tableData"
                :tooltip-config="{showAll: true,enterable: true,contentMethod: showTooltipMethod,}" >
                <vxe-column type="seq" width="60" fixed="left"></vxe-column>
                <vxe-column field="account" title="account" width="140" ></vxe-column>
                <vxe-column field="product" title="product" width="240" ></vxe-column>
                <vxe-column field="SKU" title="SKU" width="180" ></vxe-column>
                <vxe-column field="ASIN" title="ASIN" width="140" ></vxe-column>
                <vxe-column field="seller" title="seller" width="220" ></vxe-column>
                <vxe-column field="developer" title="developer" width="200" >
                </vxe-column>
                <vxe-colgroup field="all_sum" title="all_sum">
                    <vxe-column field="sale_amount" title="sale_amount" width="240" sortable ></vxe-column>
                    <vxe-column field="order_amount" title="order_amount" width="240" sortable ></vxe-column>
                </vxe-colgroup>
                <vxe-column field="edit" title="edit" width="260" fixed="right">
                    <template custom>
                        <vxe-button icon="vxe-icon--minus" size="mini" content="删除" type="text"></vxe-button>
                        <vxe-button icon="el-icon-check" size="mini" content="修改" type="text"></vxe-button>
                    </template>
                </vxe-column>
            </vxe-table>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                loading: true,
                tableData: [],
                tableBorder: "false",
                tableHeight: 660,
                formData: {
                    id: 0,
                    account: "",
                    product: "",
                    SKU: "",
                    ASIN: "",
                    seller: "",
                    developer: "",
                    sale_amount: 0,
                    order_amount: 0,
                },
            };
        },
        watch: {},
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
            this.$nextTick(()=> {
                this.$refs.mytable.connect(this.$refs.xToolbar);
            });
        },
        mounted() {},
        methods: {
            // 自定义单元格提示内容
            showTooltipMethod({ type, column, row, items, _columnIndex }) {
                const { property } = column;
                // 重写默认的提示内容
                if (type === "header") {
                    return column.title ? "自定义标题提示内容：" + column.title : "";
                } else if (type === "footer") {
                    return items[_columnIndex]
                        ? "自定义表尾提示内容，\n并且自定义换行：\n" + items[_columnIndex]
                        : "";
                }
                return row[property] ? "自定义提示内容：" + row[property] : "";
                // 其余的单元格使用默认行为
                return null;
            },
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