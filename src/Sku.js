// import vue from "vue"
import "../plugin/vue"
import "../index.less"

export default function Sku(props){
  let self = this;
  this.el = "#app";
  this.data = {
    options:[
      {
        title:"颜色分类",
        name:"color",
        items:[
          {
            label:"军绿色",
            name:"green",
          },
          {
            label:"花色",
            name:"flower",
          },
          {
            label:"蓝色",
            name:"blue",
          },
          {
            label:"黄色",
            name:"yellow",
          },
        ]
      },
      {
        title:"尺寸",
        name:"size",
        items:[
          {
            label:"41",
            name:"41"
          },
          {
            label:"31",
            name:"31"
          },
          {
            label:"42",
            name:"42"
          },
        ]
      },
      {
        title:"其他",
        name:"other",
        items:[
          {
            label:"选项1",
            name:"o1"
          },
          {
            label:"选项2",
            name:"o2"
          },
          {
            label:"选项3",
            name:"o3"
          },
        ]
      },
      {
        title:"其他2",
        name:"other",
        items:[
          {
            label:"选项1",
            name:"o1"
          },
          {
            label:"选项2",
            name:"o2"
          },
          {
            label:"选项3",
            name:"o3"
          },
        ]
      }
    ]
  };
  this.vm = new Vue({
    el:self.el,
    data:{
      ...self.data,
      // 已选中的数据
      selected:[],
      // 选中后格式化的数据列
      dataColumn:[],
      table:{
        tr:[
          [{label:"红色",name:"red"},{label:"绿色",name:"green"}],
          [{label:"32",name:"32"},{label:"41",name:"41"}]
        ]
      },
      tbody:[]
    },
    mounted(){
    },
    watch:{

    },
    computed:{
      thead(){
        let o = this.options;
        let temp = [];
        o.forEach((item,index)=>{
          temp[index] = {title:item.title,name:item.name};
        });
        return temp;
      },

    },
    methods:{
      checkChange(e,{index,title,name,item}){
        let checked = e.target.checked;
        this.countData(checked,index,title,name,item);
        if (this.selected[name]) {
          this.selected[name][item.name] = checked;
        }else{
          this.selected[name] = {};
          this.selected[name][item.name] = checked;
        }
      },
      countData(checked,index,title,name,item){
        if (checked) {
          if (!this.dataColumn[index]) this.$set(this.dataColumn,index,[]);
          // this.$set(this.dataColumn[index],item.index,{title:item.label,name:item.name})
          console.log(this.dataColumn[index]);
          this.dataColumn[index].push({title:item.label,name:item.name});
        }else {
          this.dataColumn[index].splice(item.index,1);
        }
        this.countBody();
      },
      countBody(){
        // 列表body中的数据
          let columns = this.dataColumn;
          let temp = [];
          let len = columns.length;
          let count = 1;
          let tb = this.tbody;
          columns.forEach(item=>{
            let len = 0;
            item.forEach(_i=>{
              if (_i) {
                len ++;
              }
            }) ;
            count *= len;
          });
          /**
           * @Author: Training
           * @desc 组合数据
           * @params arr  需要组合的数据
           *    example:  arr = [[1,2,3],[4,5,6],[7,8,9]]  总共有 27种组合
           *    如:  [1,4,7],[1,4,8],[1,4,9],[1,5,7],[1,5,8]......
           */
          let comb = arr =>{
            if (arr.length === 1){
              return arr[0].map(item => {
                return [item]
              });
            }
            let combMap = [];
            for (let i = 0, ilen = arr[0].length; i < ilen; i++)
              for (let j = 0,jlen = arr[1].length;j<jlen;j++){
                if (arr[0][i] && arr[1][j]) {
                  let a ;
                  // console.log(arr[0][i],"___",arr[1][j],arr,jlen);
                  if (arr[0][i].concat) {
                    a = arr[0][i].concat(arr[1][j]);
                  }else{
                    a = [arr[0][i],arr[1][j]];
                  }
                  combMap.push(a);
                }
              }
            arr.splice(0,2,combMap);
            if (arr.length <= 1)  return combMap; else return comb(arr);
          };
          let compare = (a1,a2)=>{
            a1.forEach(a1_item=>{
              a2.forEach(a2_item=>{
                for (let i = 0, len1 = a1_item.length; i < len1; i++) {
                  let t = a1_item[i];
                  for (let j = 0, len2 = a2_item.length; j < len2; j++) {
                    if (t === a2_item[j]) {
                      a2_item[j] = t;
                    }
                  }
                }
              })

            });
            return a2;
          };
          let res = [];
          if (columns.length > 0) res = comb(Object.assign([],columns));

          if (tb.length <= 0) this.tbody = res;
          else this.tbody = compare(tb,res);

      }
    }
  });
  Object.assign(this,props);
  return this;
}
Sku.prototype.getData = function () {
  let d = this.vm.$data.selected;
  let temp = [];
  for (let i in d) {
    temp[i] =  [];
    for (let j in d[i]){
      if (d[i][j]) {
        temp[i].push(j)
      }
    }
  }
  console.log(temp);
  return temp;
};
