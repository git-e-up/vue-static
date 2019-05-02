<template>
  <div>
      <ul class="main-nav">
        <li class="main-nav__item" ref="mainnavitem" v-for="(item, index) in items" :key="index" v-html="item.message" :data-postIndex="index+2" v-on:click="bounce(item); thisPost(item);" v-bind:class="{'main-nav__item--bouncing': itemActive[index]}">
        </li>
      </ul>
      <div class="ssl-warning" v-bind:class="{ active: isActive }">
        <p>Sorry, I didn't want to pay godaddy $75 for SSL so you'll need to allow your browser from unauthenticated sources</p>
      </div>
      <div class="col-xs-12 text-center info" :class="{'info--sliding-right': slidingRight, 'info--sliding-left': slidingLeft, 'info--sliding-up': slidingUp}">
        <transition name="slide-fade">

            <h2 v-if="content[this.selectedIndex]"" class="init-header" v-html="items[this.selectedIndex].message"></h2>


            <h2 v-else class="init-header" v-if="show" v-html="introMessage"></h2>

        </transition>
        <span class="info__left-arrow" v-on:click="prevPost"></span>
        <div class="info__content" v-if="content[this.selectedIndex]">

          <p v-html="content[this.selectedIndex][0].contentMain"></p>
          <ul v-if="content[this.selectedIndex][1]" class="info__list">
            <li v-for="(post, postIndex) in content[this.selectedIndex][1].repstuff" :key="postIndex" class="info__list__item" v-on:click="openModal(postIndex)">
              <div v-if="post.featured_image_url" class='info__popup__preview'>
                <div class="thumbnail-container" :style="{backgroundImage:`url(' ${post.featured_image_url} ')` }  " style="background-size: cover; background-position: center top; background-repeat:no-repeat"></div>
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
</template>



<script>
export default {
  name: 'Content',
  data: function () {
    return {
      items: [{message: 'Howdy'}, {message: 'Also'}, {message: 'The 3rd Thing'}, {message: 'And Lastly'}],
      content: [
        [
          {contentMain: 'I\'m Matt. I\'m a web developer living in Austin, TX. I often work on WordPress sites like these. (You can click on the images btw.)'},
          {repstuff:
            [
                {
                  featured_image_url: "//i.imgur.com/FtugXAk.png",
                  post_content: " <img class='info__popup--img' src='//i.imgur.com/FtugXAk.png' alt='behindthechair'/><p>This is <a href='https://behindthechair.com' target='_blank'>where I work</a>. They provide online education and plan events for people in the hair and beauty industry.</p>"
                }
              ,
                {
                  featured_image_url: "//i.imgur.com/3DFKEf5.png",
                  post_content: "<img class='info__popup--img' src='//i.imgur.com/3DFKEf5.png' alt='behindthechair'/><p>They have a <a href='https://oneshot.behindthechair.com' target='_blank'>separate site</a> for an annual awards ceremony</p>"
                }
            ]
          }
        ],
        [
          {contentMain: 'Sometimes I work on sites that are on other platforms, like Shopify. I also dabble in other frameworks, like Laravel.'},
          {repstuff:
            [
              {
                featured_image_url: '',
                post_content: ""
              }
            ]
          }
        ],
        [{contentMain: 'No images here!'}],
        [{contentMain: 'Thanks for stopping by. View this project on <a href="https://github.com/git-e-up/vue-static" target="_blank">github</a>.'}
        ]
      ],
      itemActive: [],
      repeatablesAutocomplete: [],
      isActive: false,
      show: true,
      selectedIndex: '',
      introMessage: 'Hi There',
      modalOpen: [],
      modalBackground: false,
      slidingRight: false,
      slidingLeft: false,
      slidingUp: false
    }
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
    }
  },
  mounted: function(){
    if (this.selectedIndex == false){
      setTimeout(() => {
        this.$refs.mainnavitem[0].click()
      }, 500);
    }
  }
}
</script>
