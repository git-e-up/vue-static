<template>
  <div id="app">
    <div class="main-content">

      <ul class="main-nav">
        <li class="main-nav__item" ref="mainnavitem" v-for="(item, index) in items" :key="index" v-html="item.message" :data-postIndex="index+2" v-on:click="bounce(item); thisPost(item);" v-bind:class="{'main-nav__item--bouncing': itemActive[index]}">
        </li>
      </ul>
      <div class="ssl-warning" v-bind:class="{ active: isActive }">
        <p>Sorry, I didn't want to pay godaddy $75 for SSL so you'll need to allow your browser from unauthenticated sources</p>
      </div>
      <div class="col-xs-12 text-center info" :class="{'info--sliding-right': slidingRight, 'info--sliding-left': slidingLeft, 'info--sliding-up': slidingUp}">
        <transition name="slide-fade">
          <span v-if="content[this.selectedIndex]">
            <h1 class="init-header" v-html="items[this.selectedIndex].message"></h1>
          </span>
          <span v-else>
            <h1 class="init-header" v-if="show" v-html="introMessage"></h1>
          </span>
        </transition>
        <span class="info__left-arrow" v-on:click="prevPost"></span>
        <div class="info__content" v-if="content[this.selectedIndex]">

          <div v-html="content[this.selectedIndex][0].contentMain"></div>
          <ul v-if="content[this.selectedIndex][1]" class="info__list">
            <li v-for="(post, postIndex) in content[this.selectedIndex][1].repstuff" :key="postIndex" class="info__list__item" v-on:click="openModal(postIndex)">
              <div class='info__popup__preview'>
                <div class="thumbnail-container" :style="{backgroundImage:`url(' ${post.featured_image_url} ')` }  " style="background-size: cover; background-position: center center; background-repeat:no-repeat"></div>
                <h4 v-html="post.post_title"></h4>
              </div>
              <section class='info__popup' :class="{'info--show-popup':modalOpen[postIndex]}" :ref="'popup-'+postIndex"><span class='x-close'></span><div v-html="post.post_content"></div></section>
            </li>
          </ul>

        </div>
          <span class="info__right-arrow" v-on:click="nextPost"></span>
      </div>

      <div class="modal-background" :class="{'modal-background--open': modalBackground }" v-on:click="closeModal"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function () {
    return {
      items: [{message: 'yomessage'}, {message: 'yomessage2'}, {message: 'stuff'}, {message: 'heyy'}],
      content: ['what', 'cont'],
      itemActive: [],
      repeatablesAutocomplete: ['so many', 'things'],
      isActive: false,
      show: true,
      selectedIndex: '',
      introMessage: 'Hi There',
      modalOpen: true,
      modalBackground: false,
      slidingRight: false,
      slidingLeft: false,
      slidingUp: false
      // myName: '',
      // myFace: '',
      // myPhoto: ''
    }
  },
  mounted: function () {
    // let dt= Date.now();
    // vm.$http.get( 'wp-api-menus/v2/menu-locations/primary-menu' )
    // this.$http.get(`wp/v2/hot_sauces?filter[orderby]=date&order=asc&datenow=${dt}`).then(response => {
    //   let x = this;
    //   // console.log(response)
    //   response.data.forEach(function(val){
    //     x.items.push({message: val.title.rendered})
    //     x.itemActive.push(false)
    //     let repeatables = JSON.parse( val.repeatable_autocomplete );
    //     if (repeatables){
    //       x.content.push([{contentMain: val.content.rendered},{repstuff: repeatables}])
    //     }
    //     else {
    //       x.content.push( [{contentMain: val.content.rendered}])
    //     }
    //   })
    //   // console.log(x.content)
    //   if (this.selectedIndex == false){
    //     setTimeout(() => {
    //       this.$refs.mainnavitem[0].click()
    //     }, 500);
    //   }
    // }, () => {
    //   console.log('sorry about that');
    //   this.isActive = true;
    //   // error callback
    // });
  },
  methods: {
    dontBounce: function () {
      let i = 0
      // reset all itemActive properties back to false
      while (i < this.items.length) {
        this.itemActive[i] = false
        i++
      }
    },
    bounce: function (item) {
      let itemInd = this.items.indexOf(item)
      this.dontBounce()
      this.itemActive[itemInd] = true
    },
    thisPost: function (item) {
      // this.introMessage = item.message;
      // this.selectedIndex = this.items.indexOf(item);
      this.slidingUp = true
      let i = item.message
      let s = this.items.indexOf(item)

      let x = this
      setTimeout(function () {
        console.log('hi')
        x.introMessage = i
        x.selectedIndex = s
      }, 1500)
      setTimeout(function () {
        x.slidingUp = false
      }, 2500)
    },
    nextPost: function () {
      let thisNext = this
      thisNext.slidingRight = true
      setTimeout(function () {
        let count = thisNext.items.length
        thisNext.selectedIndex++
        if (thisNext.selectedIndex > (count - 1)) {
          thisNext.selectedIndex = 0
        }
        thisNext.dontBounce()
        thisNext.itemActive[thisNext.selectedIndex] = true
      }, 1500)
      setTimeout(function () {
        thisNext.slidingRight = false
      }, 3000)
    },
    prevPost: function () {
      let thisPrev = this
      thisPrev.slidingLeft = true
      setTimeout(function () {
        let count = thisPrev.items.length
        thisPrev.selectedIndex--
        if (thisPrev.selectedIndex < 0) {
          thisPrev.selectedIndex = count - 1
        }
        thisPrev.dontBounce()
        thisPrev.itemActive[thisPrev.selectedIndex] = true
      }, 1500)
      setTimeout(function () {
        thisPrev.slidingLeft = false
      }, 3000)
    },
    openModal: function (postIndex) {
      this.modalBackground = true
      this.modalOpen[postIndex] = true
      console.log(this.modalOpen)
    },
    closeModal: function () {
      this.modalOpen = []
      this.modalBackground = false
      console.log(this.modalOpen)
    },
    initClick: function () {
      setTimeout(() => {
        this.$refs.mainnavitem[0].click()
        // this.bounce(this.items[0])
        // this.thisPost(this.items[0])
      }, 1000)
    }
  }
}
</script>

<style lang="scss">
#app {
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  $off-white: rgb(243, 242, 237);
  $blue-steel: #607d8b;
  $screen-sm-min: 768px;
  $screen-md-min: 992px;
  $screen-lg-min: 1200px;
  * {
    font-family: 'futura-pt', 'Libre Franklin', sans-serif;
    font-weight: 700;
  }
  body {
    background: #f3f2ed;
  }
  .hide {
    display: none;
  }
  .main-content {
   margin: 20px auto;
    text-align: center;
    width: 90%;
  }
  .ssl-warning {
    display: none;
  }
  .ssl-warning.active {
    display: block;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,0.5);
    p {
      position: absolute;
      top: 50%;
      left: 50%;
      background-color: #fff;
      width: 280px;
      transform: translate(-50%, -50%);
      padding: 20px;
    }
  }
  a {
    color: #000;
    padding: 3px;
    display: inline-block;
    background: linear-gradient(
       $off-white 50%, $blue-steel 50%
    );
    background-size: 100% 200%;
    transition: all 0.2s ease;
    &:hover {
      background-position: 100% 100%;
      color: $off-white;
    }
  }
  .svgs {
    position: relative;
    text-align: left;
    @media(min-width: $screen-sm-min){
        text-align: center;
    }
  }
  .info {
    border: 2px solid #000;
    box-shadow: 3px 3px 5px #888888;
    background-color: $blue-steel;
    color: $off-white;
    margin-bottom: 100px;
    position: relative;
  }
  .info__content{
   padding: 10px;
  }
  .info__list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0;
  }
  .info__list__item {
    width: 45%;
    display: block;
    @media(min-width: $screen-sm-min) {
      width: 30%;
    }
    @media(min-width: $screen-md-min) {
      width: 22.5%;
    }
    @media(min-width: $screen-lg-min) {
      width: 18%;
    }
    .thumbnail-container{
      height: 0;
      padding-bottom: 100%;
    }
  }
  .info__popup__preview {
    padding: 5px;
    cursor: pointer;
    transition: padding 200ms linear;
    &:hover{
      padding: 0;
      transition: padding 200ms linear;
    }
   h4 {
  	font-size: 18px;
  		@media(max-width: $screen-sm-min) {
  			font-size: 14px;
  		}
  	}
  }
  .init-header {
  	line-height: 45px;
  }
  .info__right-arrow {
    position: absolute;
    right: 5px;
    top: 0px;
    cursor: pointer;
    overflow: hidden;
    height: 45px;
    width: 45px;
    &:before{
    top: 50%;
    border: solid transparent;
    border-radius: 15px;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(194, 225, 245, 0);
  	border-left-color: $off-white;
    border-right-color: $blue-steel;
  	border-width: 20px;
  	margin-top: -20px;
    opacity: 1;
    }
    &:after {
    top: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(136, 183, 213, 0);
  	border-left-color: $blue-steel;
    border-right-color: transparent;
  	border-width: 15px;
  	margin-top: -15px;
    }

  }

  .info__left-arrow {
    @extend .info__right-arrow;
    position: absolute;
    left: 5px;
    top: 0px;
    transform: rotate(180deg);

    &:before{
      border-right-color: $blue-steel;
      border-left-color: $off-white;
    }
    &:after{
      border-left-color: $blue-steel;
      border-right-color: transparent;
    }
  }

  .info__popup {
    height: 0;
    width: 0;
    overflow: hidden;
    &:before, &:after {
      content: '';
      height: 0;
      width: 0;
      position: absolute;
      top: 100px;
      border: 2px solid transparent;
    }
  }

  .info--show-popup {
    display: block;
    position: fixed;
    top: 100px;
    width: 80%;
    height: auto;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 2;
    background-color: $blue-steel;
    color: $off-white;
    padding: 20px;
    transition: color 0.25s;

    @media(min-width: $screen-sm-min) {
      width: 60%;
    }

    &:before, &:after {
     box-sizing: border-box;
     content: '';
     position: absolute;
     z-index: -1;
     border: 2px solid transparent;
    }
    &:before {
      top: 0;
      left: 0;
    }
    &:after {
      bottom: 0;
      right: 0;
      top: auto;
    }

    &:before,
    &:after {
      width: 100%;
      height: 100%;
    }
    &:before {
      border-top-color: $off-white;
      border-right-color: $off-white;
      transition:
        width 0.25s ease-out,
        height 0.25s ease-out 0.25s;
    }
    &:after {
      border-bottom-color: $off-white;
      border-left-color: $off-white;
      transition:
        border-color 0s ease-out 0.5s,
        width 0.25s ease-out 0.5s,
        height 0.25s ease-out 0.75s;
    }
  }


  .modal-background--open{
    top: 0;
    left:0;
    right:0;
    height: 100vh;
    width: 100vw;
    position: fixed;
    background-color: rgba(0,0,0,0.8);
  }


  .main-nav{
    margin: 25px 0 0 0;
    padding-left: 0;
    @media(min-width: $screen-sm-min){
      margin-top: 50px;
    }
  }
  .main-nav__item {
    border: 2px solid #000;
    height: 50px;
    max-height: 50px;
    display: block;
    position: relative;
    text-align: center;
    line-height: 48px;
    margin-bottom: 10px;
    cursor: pointer;
  }


  .main-nav__item--bouncing {
    animation: bounce 1.2s;
    animation-delay: 0.6s;
    background-color: $blue-steel;
    color: white;
  }

  @keyframes bounce {

    15% {
      transform:translateY(-20%);
    }
    25% {
      transform:translateY(0%);
    }
    50% {
      transform:translateY(-15%);
    }
    70% {
        transform:translateY(0%);
    }
    80% {
      transform:translateY(-15%);
    }
    90% {
      transform:translateY(0%);
    }
    95% {
      transform:translateY(-7%);
    }

    100% {
      transform:translateY(0);
      opacity: 1;
    }
  }


  .info--sliding-right {
    animation: slidein-right 1s 2;
    animation-delay: 0.6s;
    animation-direction: alternate;
  }
  @keyframes slidein-right {
    from {
      margin-left: 0%;
      width: 100%;
      opacity: 1;
    }

    to {
      margin-left: 100%;
      width: 100%;
      opacity: 0;
      background-color: #f3f2ed;

    }
  }



  .info--sliding-left {
    animation: slidein-left 1s 2;
    animation-delay: 0.6s;
    animation-direction: alternate;
  }
  @keyframes slidein-left {
    from {
      margin-left: 0%;
      width: 100%;
      opacity: 1;
    }

    to {
      margin-left: -100%;
      width: 100%;
      opacity: 0;
      // max-height: 50px;
      background-color: #f3f2ed;
    }
  }



  .info--sliding-up {
    animation: slidein-up 2s;
    animation-delay: 0.6s;
    animation-direction: alternate;

  }
  @keyframes slidein-up {
    0% {
      margin-top: 0;
      height: 100%;
      opacity: 1;
    }
    10% {
      opacity: 0.2;
      background-color: #f3f2ed;
    }

    50% {
      margin-top:100vh;
      height: 100%;
      opacity: 0;
      background-color: #f3f2ed;
    }
    90% {
      opacity: 0.2;
      background-color: white;
    }
    100% {
      margin-top: 0;
      height: 100%;
      opacity: 1;
    }
  }

  .arrow--sliding {
    &:before, &:after {
      border-color: transparent;
    }
  }


  #matt-img {
    position: absolute;
    top: 0;
    right: 0;
    display: inline-block;
    height: 100%;
    max-width: 30%;
    @media(min-width: $screen-sm-min){
        max-width: 15%;
    }
    cursor: pointer;
    path {
      stroke: $blue-steel;
      stroke-width: 20;
      stroke-dasharray: 8000;
      stroke-dashoffset: 8000;
      animation: drawMatt 4s 1 linear;
      animation-fill-mode: forwards;
    }
    &:active {

      path {
        animation: drawMatt2 4s 1 ease;
        animation-fill-mode: forwards;
      }
    }
  }

  @keyframes drawMatt {
    to {
      stroke-dashoffset: 0;
      fill: $blue-steel;
      fill-opacity: 1;
    }
  }
  @keyframes drawMatt2 {
    to {
      stroke-dashoffset: 0;
      fill: $blue-steel;
      fill-opacity: 1;
    }
  }





  #matthew-svg {
    max-width: 60%;
    max-height: 95%;
    position: relative;
    display: inline-block;
    cursor: pointer;
    @media(min-width: $screen-sm-min) {
        max-width: 40%;
    }
    path {
      fill-opacity: 0;
      stroke: $blue-steel;
      stroke-width: 2;
      stroke-dasharray: 870;
      stroke-dashoffset: 870;
      animation: drawSVG 4s 1 linear;
      animation-fill-mode: forwards;
    }
    &:active {

      path {
        animation: drawSVG2 4s 1 ease;
        animation-fill-mode: forwards;
      }
    }
  }

  @keyframes drawSVG {

    to {
      stroke-dashoffset: 0;
      fill: $blue-steel;
      fill-opacity: 1;
    }
  }
  @keyframes drawSVG2 {
    to {
      stroke-dashoffset: 0;
      fill: $blue-steel;
      fill-opacity: 1;
    }
  }
}

</style>
