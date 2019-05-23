import jquery from "jquery";
import "../index.less"
window.$ = jquery;
// let LinkChoose = function(){

// }
// LinkChoose.prototype.init=function(){
//     console.log(this,13131);
// }
class LinkChoose{
    constructor(options){
        this.options = options;
        this.val = [];
        this._init();
    }
    /**
     * @Author: Training
     * @desc 初始化功能
     * @props
     */
    _init(){
        let defaultOprion = {
            title:"标题",
            autoHide:true,
        };
        let self = this;

        this.options = $.extend(defaultOprion,this.options);
        const link = `
        <div class="link-mask">
            <div class="link-box">
                <div class="link-title">
                    ${this.options.title}
                    <button class="link-ok">确定</button>
                </div>
                <div class="link-tabs">
                    ${
                    this.options.children.map((item,index)=>{
                        return `<span class="span-active">${item.title}</span>`
                    })            
        }
                </div>
                <div class="link-list-box">
                   ${this._addRenderList(this.options.children)}
                </div>
            </div>
        </div>`;
        $('body').append($(link));
        $(".link-box").click(function (e) {
            e.stopPropagation();
        });
        $('.link-list-box').on('click','.link-list .link-item',function (e) {
            self._itemClick($(this))
        });
        $('.link-mask').click(function () {
            self.hide();
        });
        $('.link-tabs').on('click','span',function () {
            self._tabsClick($(this));
        });
        $(".link-ok").click(function () {
            self._okClick();
            self.okClick();
        })
        this.show()
    }
    /**
     * @Author: Training
     * @desc 内部函数  当点击对应的值
     * @props
     */
    _itemClick(self){
        let $this = self;
        let index = $this.parent().index();
        let checkBox = $this.parent().attr('checkbox');
        let key = $this.attr('key');
        this.parentIndex = index;
        $(".link-tabs span").eq(index).addClass('span-active').siblings().removeClass('span-active');
        if (this.val[index] !== undefined) {
            if (checkBox == 1){
                let haskey = false;
                this.val.splice(index+1,this.val.length-1);
                this.val[index].forEach((_item,_index)=>{
                    if (_item.key === key)
                    {

                        this.val[index].splice(_index,1);
                        haskey = true;
                        return ;
                    }
                })
                if (haskey === false) {
                    this.val[index].push ({key:$this.attr('key'),html:$this.html()});
                }
            }else this.val[index] = {key:$this.attr('key'),html:$this.html()};
        }else{
            if (checkBox == 1)this.val[index] = [{key:$this.attr('key'),html:$this.html()}]
            else    this.val[index] = {key:$this.attr('key'),html:$this.html()};
        }
        if (checkBox == 1) {
                if ($this.hasClass("link-item-active")) {
                    $this.removeClass('link-item-active');
                }else{
                    $this.addClass('link-item-active');
                }
            }else{
                $this.addClass('link-item-active').siblings().removeClass('link-item-active');
            }
        $('.link-list-box').css({
            transform:`translateX(calc(-${index}*50vw))`
        });
        this.itemClick(self,{parentIndex:index});
    }
    /**
     * @Author: Training
     * @desc 对外开放函数 点击事件
     * @props
     */
    async itemClick(self){

    }
    /**
     * @Author: Training
     * @desc 选择框的tabs的点击事件
     * @props self  当前的元素
     */
    _tabsClick(self){
        $('.link-list-box').css({
            transform:`translateX(calc(-${self.index()}*50vw))`
        })
        self.addClass('span-active').siblings().removeClass('span-active');
    }
    /**
     * @Author: Training
     * @desc 显示组件
     * @props
     */
    show(){
        $('.link-mask').show();
        $('.link-mask').css({'background-color':"rgba(0,0,0,0.5)"});
        $('.link-box').css({transform:"translateY(0)"});
        return 1;
    }
    /**
     * @Author: Training
     * @desc 隐藏组件
     * @props
     */
    hide(){
        $('.link-mask').css({'background-color':"rgba(0,0,0,0)"});
        $('.link-box').css({transform:"translateY(50vh)"});
        setTimeout(()=>{
            $('.link-mask').hide();
        },300)
    }
    /**
     * @Author: Training
     * @desc 获取组件的当前选中的val值(显示出来的内容,不是key)
     * @props
     */
    getValHtml(){
        let val = [];
        this.val.forEach((item,index)=>{
            val.push(item.html);
        });
        return val.join(' ');
    }
    /**
     * @Author: Training
     * @desc 添加列表渲染
     * @props children  需要渲染的参数
     *  childre  Array   每次添加只能有一个数组对象
     *  例如:
     *      [
                {
                    checkbox:true,//多选
                    title:"省市",//标题
                    item:[      //下面的列表元素  Array
                        {
                            title:"选项3", //列表的标题
                            key:'1'         //列表的key
                        },
                        {
                            title:"选项4",
                            key:'2'
                        },
                        {
                            title:"选项5",
                            key:'3'
                        },
                    ]
                }
             ];
     */
    _addRenderList(children){
        let linkList = children.map((item,index)=>{
            let linkItem = '';
            item.item.forEach((it,ind)=>{
                linkItem += `<li class="link-item" data-parentIndex=${ind} key=${it.key}>${it.title}</li>`
            })
            return `<ul class="link-list" checkbox="${item.checkbox?1:0}" >
                                    ${linkItem}
                                </ul>`
        });
        return linkList;
    }
    /**
     * @Author: Training
     * @desc 更新列表元素
     * @props children Array
     *  注意: 这里因为是更新,所以不需要父元素信息
     *  例如:
     *      [
                {
                    title:"选项1", //列表的标题
                    key:'1'         //列表的key
                },
                {
                    title:"选项2",
                    key:'2'
                },
                {
                    title:"选项3",
                    key:'3'
                },
                {
                    title:"选项4",
                    key:'4'
                },
                {
                    title:"选项5",
                    key:'5'
                },
                {
                    title:"选项6",
                    key:'6'
                },
            ]
     */
    _updateRenderList(children){
        let list = "";
        children.forEach((item,index)=>{
            let isactive = false;
            if(this.val[this.parentIndex+1]){
                this.val[this.parentIndex+1].forEach((_item,_index)=>{
                    if (item.key === _item.key) {
                        list += `<li class="link-item link-item-active" key=${item.key}>${item.title}</li>`
                        isactive = true;
                        return ;
                    }
                });
            }
            if (!isactive) {
                list += `<li class="link-item" key=${item.key}>${item.title}</li>`
            }
        });
        return list;
    }
    /**
     * @Author: Training
     * @desc 对外开放函数  更新...
     *      更新的是当前列表的下一个列表的数据,
     *      并不能更新当前列表的数据(一般不会有此需求),
     *      若要更新当前元素,修改_updateRenderList
     * @props children  array  需要更新的子元素内容
     *          isUpdate   0 == 添加 1 == 更新  其他值 == 什么也不做
     */
    updateChildren(children,isUpdate){
            if (children !== undefined && isUpdate == 0) {
                let renderlist = this._addRenderList(children);
                console.log(renderlist);
                $('.link-list-box').append(renderlist);
                $(".link-tabs").append(`<span >${children[0].title}</span>`)
            }else if(children !== undefined && isUpdate == 1){
                $('.link-list-box .link-list').eq(this.parentIndex+1).html(this._updateRenderList(children))
            }
    }
    /**
     * @Author: Training
     * @desc 内部函数  确定按钮点击事件
     * @props
     */
    _okClick(){
        this.hide();
    }
    /**
     * @Author: Training
     * @desc 对外事件  确定按钮点击回调
     * @props
     */
    okClick(){

    }
}
/**
 * @Author: Training
 * @desc 添加到Jquery
 * @props
 */
$.fn.LinkChoose =  function(options){
    return new LinkChoose(options);
};
/**
 * @Author: Training
 * @desc 测试代码
 * @props none
 */
let link = $(this).LinkChoose({
    title:"请选择",
    children:[
        {
            checkbox:true,//多选
            title:"国家",
            item:[
                {
                    title:"选项1",
                    key:'1'
                },
                {
                    title:"选项2",
                    key:'2'
                },
                {
                    title:"选项3",
                    key:'3'
                },
            ]
        }
    ]
});
let ins = 1;
link.itemClick=async function(self){
    console.log(self);
    $('.select').html(link.getValHtml());
    if (ins <= 3){
       let  child = [
            {
                checkbox:false,//多选
                title:"省市"+link.parentIndex,
                item:[
                    {
                        title:"选项3",
                        key:'1'
                    },
                    {
                        title:"选项4",
                        key:'2'
                    },
                    {
                        title:"选项5",
                        key:'3'
                    },
                ]
            }
        ];
        link.updateChildren(child,0);
    }else{
        let  child =
                [
                    {
                        title:"选项1",
                        key:'1'
                    },
                    {
                        title:"选项2",
                        key:'2'
                    },
                    {
                        title:"选项3",
                        key:'3'
                    },
                    {
                        title:"选项4",
                        key:'4'
                    },
                    {
                        title:"选项5",
                        key:'5'
                    },
                    {
                        title:"选项6",
                        key:'6'
                    },
                ]
        link.updateChildren(child,1);
    }
    ins++;
}
$('.select').click(function(){
    link.show();
    console.log($(this));
})






