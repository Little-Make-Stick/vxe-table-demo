<template>
    <div class="contain">
        <!-- vxe-grid 得 zoom 可以实现全屏，vxe-table 需要自定义功能 -->
        <div class="base-table-contain">
            <vxe-toolbar ref="xToolbar" custom>
                <template #buttons> </template>
                <template #tools>
                    <vxe-button icon="vxe-icon--zoomin" class="fullscreen-btn" @click="isFullScreen = !isFullScreen"
                        circle></vxe-button>
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
    </div>
</template>
<script>
    export default {
        data() {
            return {
                loading: true,
                tableData: [],
                tableBorder: "false",
                isFullScreen: false,
                tableHeight: 660,
            };
        },
        watch: {
            isFullScreen(newV, oldV) {
                this.$nextTick(() => {
                    let el = document.querySelector(".contain");
                    this.elFullscreen(el,newV)
                });
            },
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
            });
        },
        mounted() { },
        methods: {
            // 全屏
            fullscreen(el) {
                if (el.requestFullscreen) {
                    el.requestFullscreen();
                } else if (el.msRequestFullscreen) {
                    el.msRequestFullscreen();
                } else if (el.mozRequestFullscreen) {
                    el.mozRequestFullscreen();
                } else if (el.webkitRequestFullscreen) {
                    el.webkitRequestFullscreen();
                }
            },
            // 非全屏
            notFullscreen(el) {
                if (el.exitFullscreen) {
                    el.exitFullscreen();
                } else if (el.msExitFullscreen) {
                    el.msExitFullscreen();
                } else if (el.mozCancelFullScreen) {
                    el.mozCancelFullScreen();
                } else if (el.webkitExitFullscreen) {
                    el.webkitExitFullscreen();
                }
            },
            elFullscreen(el, newV) {
                if (newV) {
                    this.fullscreen(el);
                    document
                        .querySelector(".fullscreen-btn i")
                        .setAttribute("class", "vxe-button--icon vxe-icon--zoomout");
                    el.setAttribute(
                        "class",
                        el.getAttribute("class") + " contain-fullscreen"
                    );
                } else {
                    this.notFullscreen(document);
                    document
                        .querySelector(".fullscreen-btn i")
                        .setAttribute("class", "vxe-button--icon vxe-icon--zoomin");
                    el.setAttribute(
                        "class",
                        el.getAttribute("class").split(" ").slice(0, -1).join(" ")
                    );
                }
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