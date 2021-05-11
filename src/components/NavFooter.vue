<template>
  <div class="footer">
    <div class="footer-logo">
      <img src="/img/logo-1.png" alt="">
      <p>秾玊玊消费扶贫平台</p>
    </div>             
    <div class="footer-link">
      <a href="" target="_blank">同级生</a><span>|</span>
      <a href="" target="_blank">同级生</a><span>|</span>
      <a href="" target="_blank">同级生</a><span>|</span>
      <a href="" target="_blank">同级生</a>
    </div>
    <div class="copyright">Copyright ©2019 <span class="domain">www.proguys.com</span> All Rights Reserved.</div>
  </div>
</template>
<script>
  export default{
    name:'nav-footer'
  }
</script>
<style lang="scss" scoped>
  .footer{
    height:234px;
    border-top:4px solid #047835;
    background-color:#333333;
    color:#999999;
    text-align:center;
    .footer-logo{
      margin-top:46px;
      margin-bottom:31px;
      img{
        width:20%;
        height: auto;
        // width:53px;
        // height:36px;
        margin-bottom:13px;
      }
    }
    .footer-link{
      a{
        color:#999999;
        display:inline-block;
      }
      span{
        margin:0 10px;
      }
      margin-bottom:13px;
    }
    .copyright{
      .domain{
        color:#047835;
      }
    }
  }
</style>