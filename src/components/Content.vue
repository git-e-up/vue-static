<template>
  <section class="tabbed-content">
    <ul class="main-nav">
      <li class="main-nav__item" ref="mainnavitem" v-for="(item, index) in content" :key="index" v-html="item.contentTitle" :data-postIndex="index" v-on:click="bounce(item); thisPost(item);" v-bind:class="{'main-nav__item--bouncing': itemActive[index]}">
      </li>
    </ul>

    <div class="ssl-warning" v-bind:class="{ active: isActive }">
      <p>Sorry, I didn't want to pay godaddy $75 for SSL so you'll need to allow your browser from unauthenticated sources</p>
    </div>

    <div class="col-xs-12 text-center info" :class="{'info--sliding-right': slidingRight, 'info--sliding-left': slidingLeft, 'info--sliding-up': slidingUp}">
      <transition name="slide-fade">

          <h2 v-if="content[this.selectedIndex]" class="init-header" v-html="content[this.selectedIndex].contentTitle"></h2>

          <h2 v-else class="init-header" v-html="introMessage"></h2>

      </transition>
      <span class="info__left-arrow" v-on:click="nextPrevPost(goToPrev)"></span>
      <div class="info__content" v-if="content[this.selectedIndex]">
        <p v-html="content[this.selectedIndex].contentMain"></p>
        <ul v-if="content[this.selectedIndex].repeaterContent" class="info__list">
          <li v-for="(post, postIndex) in content[this.selectedIndex].repeaterContent" :key="postIndex" class="info__list__item" v-on:click="openModal(postIndex)">
            <div v-if="post.featuredImageURL" class='info__popup__preview'>
              <div class="thumbnail-container" :style="{backgroundImage:`url(' ${post.featuredImageURL} ')` }  " style="background-size: cover; background-position: center top; background-repeat:no-repeat"></div>
              <h4 v-html="post.post_title"></h4>
            </div>
            <section class='info__popup' :class="{'info--show-popup':modalOpen[postIndex]}" :ref="'popup-'+postIndex"><div v-html="post.post_content"></div></section>
          </li>
        </ul>

      </div>
        <span class="info__right-arrow" v-on:click="nextPrevPost(goToNext)"></span>
    </div>

      <div class="modal-background" :class="{'modal-background--open': modalBackground }" v-on:click="closeModal"></div>
  </section>
</template>



<script>
const puppy = require('../assets/IMG_3861.jpg');
export default {
  name: 'Content',
  data: function () {
    return {
      // staticImages: {
      //     puppy: require('../assets/IMG_3861.jpg')
      // },
      content: [
        {
          contentTitle: 'Howdy',
          contentMain: 'I\'m Matt. I\'m a web developer living in Austin, TX. I often work on WordPress sites like these, building custom themes and plugins. (You can click on the images btw.)',
          repeaterContent:
            [
                {
                  featuredImageURL: "//i.imgur.com/FtugXAk.png",
                  post_content: " <img class='info__popup--img' src='//i.imgur.com/FtugXAk.png' alt='behindthechair'/><p>This is <a href='https://behindthechair.com' target='_blank'>where I work</a>. They provide online education and plan events for people in the hair and beauty industry.</p>"
                }
              ,
                {
                  featuredImageURL: "//i.imgur.com/3DFKEf5.png",
                  post_content: "<img class='info__popup--img' src='//i.imgur.com/3DFKEf5.png' alt='behindthechair'/><p>They have a <a href='https://oneshot.behindthechair.com' target='_blank'>separate site</a> for an annual awards ceremony</p>"
                }
            ]

        },
        {
          contentTitle: 'Also',
          contentMain: 'Sometimes I work on sites that are on other platforms, like Shopify.',
          repeaterContent:
            [
              {
                featuredImageURL: 'https://i.imgur.com/IEvNWA9.png',
                post_content: "<img class='info__popup--img' src='https://i.imgur.com/IEvNWA9.png' alt='Victory Barber'/><p>This is a site for <a href='https://victorybarber.com/' target='_blank'>barbering products</a></p>"
              },
              {
                featuredImageURL: 'https://i.imgur.com/VR7wLfS.png',
                post_content: "<img class='info__popup--img' src='https://i.imgur.com/VR7wLfS.png' alt='Arc Scissors'/><p>This is a site for <a href='https://arcscissors.com/' target='_blank'>hairdressing scissors</a></p>"
              }
            ]

        },
        {
          contentTitle: 'The 3rd Thing',
          contentMain: "In my spare time, I dabble in Laravel, a separate PHP framework. I also tend to a dog with questionable manners.",
          repeaterContent:
            [
                {
                  featuredImageURL: require('../assets/IMG_3861.jpg'),
                  post_content: "<img class='info__popup--img' src="+require('../assets/IMG_3861.jpg')+"/><p>This is the longest he's ever sat still</p>"
                }
            ]
        },
        {
          contentTitle: 'And Lastly',
          contentMain: 'Thanks for stopping by. View this project on <a href="https://github.com/git-e-up/vue-static" target="_blank">github</a>.'
        }

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
      slidingUp: false,
      goToNext: 'Right',
      goToPrev: 'Left'
    }
  },
  methods: {
    dontBounce: function () {
      let i = 0
      // reset all itemActive properties back to false
      while (i < this.content.length) {
        this.itemActive[i] = false
        i++
      }
    },
    bounce: function (item) {
      let itemInd = this.content.indexOf(item)
      this.dontBounce()
      this.itemActive[itemInd] = true
    },
    thisPost: function (item) {
      this.slidingUp = true
      let i = item.contentTitle
      let s = this.content.indexOf(item)

      let x = this
      setTimeout(function () {
        x.introMessage = i
        x.selectedIndex = s
      }, 1500)
      setTimeout(function () {
        x.slidingUp = false
      }, 2500)
    },

    nextPrevPost: function (rightOrLeft) {
      let nextPrev = this
      let count = nextPrev.content.length
      let beginningIndex = nextPrev.selectedIndex

      if (rightOrLeft === 'Right'){
        nextPrev.slidingRight = true
      }
      else {
        nextPrev.slidingLeft = true
      }
      setTimeout(function () {
        if (rightOrLeft === 'Right'){
          nextPrev.selectedIndex++
          if (nextPrev.selectedIndex > (count - 1)) {
            //if already on last li in main-nav, go to the first li
            nextPrev.selectedIndex = 0
          }
        }
        else {
          nextPrev.selectedIndex--
          if (nextPrev.selectedIndex < 0) {
            //if already on first li in main-nav, go to the last li
            nextPrev.selectedIndex = count - 1
          }
        }
        /*
        remove .main-nav__item--bouncing from old li
        -- could also utilize nextPrev.dontBounce()
        */
        nextPrev.itemActive[beginningIndex] = false
        //add to new
        nextPrev.itemActive[nextPrev.selectedIndex] = true
      }, 1500)
      setTimeout(function () {
        nextPrev.slidingLeft = false
        nextPrev.slidingRight = false
      }, 3000)
    },


    openModal: function (postIndex) {
      if (this.modalBackground){
        this.modalOpen = []
        this.modalBackground = false
      } else{
        this.modalBackground = true
        this.modalOpen[postIndex] = true
      }
    },
    closeModal: function () {
      this.modalOpen = []
      this.modalBackground = false
      console.log(this.modalOpen)
      console.log('fdsafd')
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
