<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="menu-item" v-for="(item,i) in menuList" v-bind:key="i">
              <a href="javascript:;" >{{item.id}}</a>
              <div class="children">
                <ul>
                  <li v-for="(j,z) in item.arr" v-bind:key="z">
                    <a href="javascript:;">{{item.arr[z]}}</a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <swiper v-bind:options="swiperOption">
          <swiper-slide v-for="(item,index) in slideList" v-bind:key="index">
            <a v-bind:href="'/#/product/'+item.id"><img v-bind:src="item.img"></a>
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination"  slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <!-- banner -->
      <!-- <div class="banner"></div> -->
      <div class="ranking-box">
        <div class="container">
          <div class="ranking-title">企业扶贫光荣榜</div>
          <div v-for="(item,index) in rankingList" v-bind:key="index" class="ranking-list">
            <div class="list-box">
              <h3>{{item.rankName}}</h3>
              <div>
                <h5>序号</h5>
                <h5>{{item.id==1?'企业名称':item.id==2?'扶贫商品购买光荣榜':'城市购买光荣榜'}}</h5>
                <h5>{{item.id==1?'消费券金额':'交易金额'}}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="product-box">
      <div class="container">
        <h2>食品专场</h2>
        <div class="wrapper">
          <div class="banner-left">
            <a href="/#/product/35"><img src="https://bixiangfp.oss-cn-shenzhen.aliyuncs.com/image/7070c951b70b40deb7a81cad68d8de01" alt=""></a>
          </div>
          <div class="list-box">
            <div class="list" v-for="(arr,i) in phoneList" v-bind:key="i">
              <div class="item" v-for="(item,j) in arr" v-bind:key="j">
                <span v-bind:class="{'new-pro':j%2==0}">新品</span>
                <div class="item-img">
                  <img v-lazy="item.mainImage" alt="">
                </div>
                <div class="item-info">
                  <h3>{{item.name}}</h3>
                  <p>{{item.subtitle}}</p>
                  <p class="price" @click="addCart(item.id)">{{item.price}}元</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <modal 
      title="提示" 
      sureText="查看购物车" 
      btnType="1" 
      modalType="middle" 
      v-bind:showModal="showModal"
      v-on:submit="goToCart"
      v-on:cancel="showModal=false"
      >
      <template v-slot:body>
        <p>商品添加成功！</p>
      </template>
    </modal>
  </div>
</template>
<script>
  import ServiceBar from './../components/ServiceBar'
  import Modal from './../components/Modal'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'
  export default{
    name:'index',
    components:{
      swiper,
      swiperSlide,
      ServiceBar,
      Modal
    },
    data(){
      return {
        swiperOption:{
          autoplay:true,
          loop:true,
          effect:'slide',
          cubeEffect: {
            shadowOffset: 100,
            shadowScale: 0.6
          },
          pagination: {
            el: '.swiper-pagination',
            clickable:true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }
        },
        slideList:[
          {
            id:'1',
            img:'/img/slide1.jpg'
          }
        ],
        menuList:[
          {
            id:'粮油',
            img:'',
            arr:['调味品','菌菇干活','大米','滋补珍品','面食粉类',],
          },

          {
            id:'休闲零食',
            img:'',
            arr:['冲调饮品','熟食肉脯','膨化食品','传统糕点','坚果炒货',],
          }
          ]
          
        ,
        adsList:[],
        rankingList:[
          {rankName:'消费券充值光荣榜',
          id:1
          },
          {rankName:'扶贫商品购买光荣榜',
          id:2
          },
          {rankName:'地市购买光荣榜',
          id:3
          },
        ],
        phoneList:[],
        showModal:false
      }
    },
    mounted(){
    },
    methods:{
      // addCart(id){
      //   this.axios.post('/carts',{
      //     productId:id,
      //     selected: true
      //   }).then((res)=>{
      //     this.showModal = true;
      //     this.$store.dispatch('saveCartCount',res.cartTotalQuantity);
      //   });
      // },
      goToCart(){
        this.$router.push('/cart');
      }
    }
  }
</script>
<style lang="scss">
  @import './../assets/scss/config.scss';
  @import './../assets/scss/mixin.scss';
  .index{
    .swiper-box{
      .nav-menu{
        position:absolute;
        width:264px;
        height:451px;
        z-index:9;
        padding:26px 0;
        background-color:#55585a7a;
        box-sizing:border-box;
        .menu-wrap{
          .menu-item{
            height:50px;
            line-height:50px;
            a{
              position:relative;
              display:block;
              font-size:16px;
              color:#ffffff;
              padding-left:30px;
              &:after{
                position:absolute;
                right:30px;
                top:17.5px;
                content:' ';
                @include bgImg(10px,15px,'/imgs/icon-arrow.png');
              }
            }
            &:hover{
              background-color:$colorA;
              .children{
                display:block;
              }
            }
            .children{
              display:none;
              width:451px;
              height:451px;
              background-color:$colorG;
              position:absolute;
              top:0;
              left:264px;
              border:1px solid $colorH;
              ul{
                display: flex;
                align-items: center;
                justify-content: space-between;
                overflow: hidden;
                flex-wrap: wrap;
                li{
                  flex: 1;
                  overflow: hidden;
                  display: flex;
                  align-items: center;
                }
                a{
                  text-align: center;
                  padding-left:13px;
                  color:$colorB;
                  font-size:14px;
                }
                a:hover{
                  color: #F69115;
                }
                // img{
                //   width:42px;
                //   height:35px;
                //   vertical-align:middle;
                //   margin-right:15px;
                // }
              }
            }
          }
        }
      }
      .swiper-container {
        height: 451px;
        .swiper-button-prev{
          left:274px;
        }
        img{
          width:100%;
          height:100%;
        }
      }  
    }
    .ads-box{
      @include flex();
      margin-top:14px;
      margin-bottom:31px;
      a{
        width:296px;
        height:167px;
      }
    }
    .banner{
      margin-bottom:50px;
    }
    .ranking-box{
      // @include flex();
      margin-top:14px;
      margin-bottom:31px;
      background-color:$colorJ;
      padding:30px 0 50px;
      .ranking-title{
        font-size:$fontF;
        height:21px;
        line-height:21px;
        color:$colorB;
        margin-bottom:20px;
      };
      .ranking-list{
        width: 33.33%;
      }
      
    }
    .product-box{
      background-color:$colorJ;
      padding:30px 0 50px;
      h2{
        font-size:$fontF;
        height:21px;
        line-height:21px;
        color:$colorB;
        margin-bottom:20px;
      }
      .wrapper{
        display:flex;
        .banner-left{
          margin-right:16px;
          img{
            width:224px;
            height:619px;
          }
        }
        .list-box{
          .list{
            @include flex();
            width:986px;
            margin-bottom:14px;
            &:last-child{
              margin-bottom:0;
            }
            .item{
              width:236px;
              height:302px;
              background-color:$colorG;
              text-align:center;
              span{
                display:inline-block;
                width:67px;
                height:24px;
                font-size:14px;
                line-height:24px;
                color:$colorG;
                &.new-pro{
                  background-color:#7ECF68;
                }
                &.kill-pro{
                  background-color:#E82626;
                }
              }
              .item-img{
                img{
                  width:100%;
                  height:195px;
                }
              }
              .item-info{
                h3{
                  font-size:$fontJ;
                  color:$colorB;
                  line-height:$fontJ;
                  font-weight:bold;
                }
                p{
                  color:$colorD;
                  line-height:13px;
                  margin:6px auto 13px;
                }
                .price{
                  color:#F20A0A;
                  font-size:$fontJ;
                  font-weight:bold;
                  cursor:pointer;
                  &:after{
                    @include bgImg(22px,22px,'/imgs/icon-cart-hover.png');
                    content:' ';
                    margin-left:5px;
                    vertical-align: middle;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>