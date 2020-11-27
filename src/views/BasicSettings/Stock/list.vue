<template>
    <div>
        <Toptitle title='存货分类'></Toptitle>
        <div class="content">
            <div>
                <Tree :data="treeData" :render="renderContent" @on-contextmenu="handleContextMenu" class="demo-tree-render">
                    <template slot="contextMenu">
                        <DropdownItem @click.native="handleContextMenuEdit">编辑</DropdownItem>
                        <!-- <DropdownItem @click.native="handleContextMenuDelete" style="color: #ed4014">删除</DropdownItem> -->
                    </template>
                </Tree>
            </div>
            <div>
                 <FullPage 
                @init='init'
                :list='list'
                @searchData='init'
                title='计量单位列表'
                @changePage='changePage'
                @changeSize='changeSize'
                :pageIndex='pageIndex'
                :showTopTitle='false'
                :total='total'
                :loading='loading'
                :tableColums='tableColums'
                :tableData='tableData'
                >
                    <div slot='titleButton'>
                        <Button  type="primary" @click="addItems(null)">新增计量单位</Button>
                    </div>
                    <template slot='set' slot-scope='{row}'>
                        <div class="table-set">
                            <Button size='small' type='primary' class="map-margin" @click="addItems(row)">编辑</Button>
                            <Button size='small' type='error' class="map-margin" @click="delItems(row)">删除</Button>
                        </div>
                    </template>
                </FullPage>
            </div>
        </div>
        

    </div>

    
</template>
<script>
    export default {
        data () {
            return {
                contextData:'',
                treeData: [
                    {
                        title: '存货分类',
                        expand: 1,
                        contextmenu: 1,
                        children: [
                            {
                                title: 'parent 1-1',
                                id:1,
                                expand: 1,
                                contextmenu: 1,
                                children: [
                                    {
                                        title: 'leaf 1-1-1',
                                        contextmenu: 1
                                    },
                                    {
                                        title: 'leaf 1-1-2',
                                        contextmenu: 1
                                    }
                                ]
                            },
                            {
                                title: 'parent 1-2',
                                expand: 1,
                                contextmenu: 1,
                                children: [
                                    {
                                        title: 'leaf 1-2-1',
                                        contextmenu: 1
                                    },
                                    {
                                        title: 'leaf 1-2-1',
                                        contextmenu: 1
                                    }
                                ]
                            }
                        ],
                        render: (h, { root, node, data }) => {
                            return h('span', {
                                style: {
                                    display: 'inline-block',
                                    width: '100%'
                                }
                            }, [
                                h('span', [
                                    h('Icon', {
                                        props: {
                                            type: 'ios-folder-outline'
                                        },
                                        style: {
                                            marginRight: '8px'
                                        }
                                    }),
                                    h('span', data.title)
                                ]),
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        float: 'right',
                                        marginRight: '32px'
                                    }
                                }, [
                                    h('Button', {
                                        props: Object.assign({}, this.buttonProps, {
                                            icon: 'ios-add',
                                            type: 'primary'
                                        }),
                                        style: {
                                            width: '64px'
                                        },
                                        on: {
                                            click: () => { this.append(data) }
                                        }
                                    })
                                ])
                            ]);
                        },
                    }
                ],
                buttonProps: {
                    type: 'default',
                    size: 'small',
                },
                list:[
                    {name:'Input',title:'计量单位名称',value:'',serverName:'title',placeholder:'请输入权限名称'},
                ],
                tableColums:[
                    {title:'计量单位编码',align:'center',key:'unit_code',width:200,fixed:'left'},
                    {title:'计量单位名称',align:'center',key:'title',minWidth:100},
                    {title:'操作',align:'center',slot:'set',width:'180',fixed:'right'},
                ],
                tableData:[
                    {
                        title:'单位',unit_code:'001',id:1,
                    }
                ],
                loading:false,
                pageIndex:1,
                pageSize:10,
                total:10,
                proxyObj:{},
                show:false,
            }
        },
        methods: {
            renderContent (h, { root, node, data }) {
                return h('span', {
                    style: {
                        display: 'inline-block',
                        width: '100%'
                    }
                }, [
                    h('span', [
                        h('Icon', {
                            props: {
                                type: 'ios-paper-outline'
                            },
                            style: {
                                marginRight: '8px'
                            }
                        }),
                        h('span', data.title)
                    ]),
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '32px'
                        }
                    }, [
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-add'
                            }),
                            style: {
                                marginRight: '8px'
                            },
                            on: {
                                click: () => { this.append(data) }
                            }
                        }),
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-remove'
                            }),
                            on: {
                                click: () => { this.remove(root, node, data) }
                            }
                        })
                    ])
                ]);
            },
            append (data) {
                const children = data.children || [];
                this.confirmEdit({
                    title:'新增',
                    info:'',
                    placeholder:'请输入分类名称',
                    then:(val)=>{
                        children.push({
                            title: val,
                            expand: 1,
                            contextmenu: 1,
                        });
                    },
                    cancel:()=>{
                        console.log(2)
                    }
                })
                this.$set(data, 'children', children);
            },
            remove (root, node, data) {
                const parentKey = root.find(el => el === node).parent;
                const parent = root.find(el => el.nodeKey === parentKey).node;
                const index = parent.children.indexOf(data);
                parent.children.splice(index, 1);
            },
            handleContextMenu (data) {
                this.contextData = data;
            },
            handleContextMenuEdit (e) {
                this.confirmEdit({
                    title:'编辑',
                    info:'',
                    placeholder:'请输入分类名称',
                    then:(val)=>{
                        this.contextData.title = val
                    },
                    cancel:()=>{
                        console.log(2)
                    }
                })
            },
        }
    }
</script>
<style>
.demo-tree-render .ivu-tree-title{width: 100%;}
.content{width:100%;display: flex;}
</style>