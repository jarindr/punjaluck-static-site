let navigateBySide = false
let currentSection = null

$(document).ready( () => {
  initNavbarHandler()
  modalHideInit()
  backgroundChanger()
  if($(window).width() > 768 ) {
    initSideBarNav()
  }
  triggerDotNav()
  bindScrollEvent()
  $('#slider1').unslider({
    arrows: {
      prev: '<i class="flaticon-back slide-arrows left"></i>',
      next: '<i class="flaticon-next slide-arrows right"></i>',
      dots: false
    }
  })
  handleClickEvents()
  window.scrollTo(window.scrollX, window.scrollY + 1)
})
function backgroundChanger () {
  $("#vision-page").bgswitcher({
    images: [
      "../images/bg1vision.jpg",
      "../images/bg2vision.jpg"
    ]
  })
}
function initSideBarNav () {
  let dots = ''
  $('.section').each((index, el) => {
    const id = $(el).prop('id')
    const name = $(el).find('.nav-hidden-name').html()
    dots += `<div class='dot-nav-container'><span class='dot-nav-name' style='${id === 'vision-page' ? 'color: white' : 'color: #888888'}'><b>${name}</b></span> <div class='dot-nav'} data-attribute=${id}></div></div>`
  })
  const htmlDots = $.parseHTML(dots)
  $(htmlDots).appendTo($('.side-navigation'))
}

function bindScrollEvent () {
  const $window = $(window)
  let playedGif = false
  if($(window).width() > 768 ) {
    window.addEventListener('scroll', ()=>{
      const scrollPosition = $window.scrollTop()
      // $('.parallax').each((index,el) => {
      //   parallax($(el), scrollPosition)
      // })
      triggerDotNav()
      if(!playedGif) {
        playGifImage(scrollPosition, () => playedGif = true)
      }
    })
  }
}
function triggerDotNav () {
  const scrollPosition = $(window).scrollTop()
  $('.dot-nav-name').each((index, el) => {
      if (checkRectIntersection($(el)[0].getBoundingClientRect(),$('#vision-page')[0].getBoundingClientRect())) {
        $(el).css({color: 'white'})
      } else {
        $(el).css({color: '#888888'})
      }
  })
  $('.dot-nav').each((index,el) => {
    const id = $(el).attr('data-attribute')
    const $section = $(`#${id}`)
    const top = $section.offset().top - 81 - 50
    const bottom = top + $section.outerHeight(true)
    if(bottom > scrollPosition && top < scrollPosition) {
      $(el).addClass('active')
    } else {
      $(el).removeClass('active')
    }
  })
}

function initNavbarHandler () {
  $(document).on('click','#hamberger-menu', (e) => {
    $(e.currentTarget).toggleClass('open')
    $('.nav-bar__navigation-container').toggleClass('active')
  })
  $(document).on('click','.dot-nav', (e) => {
    navigateBySide = true
    currentSection = $(e.currentTarget).attr('data-attribute')
    const top = $(`#${$(e.currentTarget).attr('data-attribute')}`).offset().top - 80
    $('html, body').animate({
      scrollTop: top
    }, 1500, 'easeInOutExpo')
    setTimeout(() => {
      navigateBySide = false
    }, 1600)
  })
  $(document).on('mouseover','.dot-nav', (e) => {
    $(e.currentTarget).siblings('.dot-nav-name').addClass('active')
  })
  $(document).on('mouseout','.dot-nav', (e) => {
    $(e.currentTarget).siblings('.dot-nav-name').removeClass('active')
  })
}

function modalHideInit () {
  $('.modal-trigger').click((e)=>{
    e.preventDefault()
    const $this = $(e.currentTarget)
    const id = $this.attr('href')
    $('body').addClass('modal-open')
    $(id).fadeIn('fast')
  })
  $('.x-modal').click(e=>{
    const $this = $(e.currentTarget)
    $('body').removeClass('modal-open')
    $('.modal-hide-container').fadeOut('fast')
  })

}
function checkRectIntersection (rectA, rectB) {
  return !(rectA.top > rectB.bottom ||
    rectA.bottom < rectB.top ||
    rectA.left > rectB.right ||
    rectA.right < rectB.left)
}

function handleClickEvents () {
  $('.collapse--faq').click((e) => {
    const $target = $(e.currentTarget)
    $target.toggleClass('active')
    $target.siblings().removeClass('active')
    $target.find('.collapse-content').slideToggle(400)
    $target.siblings().find('.collapse-content').slideUp(400)
  })
  $('.readmore').click((e)=>{
    $('.hidden-readmore').show()
    $(e.currentTarget).hide()
  })
}

function parallax (target,scrollPosition) {
  const parent = target.parent()
  const bottom = parent.offset().top + parent.outerHeight(true) - 80
  const top = parent.position().top
  if (bottom > scrollPosition && top  < scrollPosition) {
    const move = parseInt((scrollPosition -  top)/4)
    target.css({
      transform: `translate3d(0,${move}px,0)`
    })
  }
}

function playGifImage (scrollPosition, callback) {
  const position = $('#corporate-page').position()
  if (position.top < scrollPosition + $(window).height()){
    callback()
    $('.logo-fade-1').attr('src', `./images/LOGO-Panjaluk.gif?${Date.now()}`)
    setTimeout(() => {
      $('.logo-fade-1').animate({opacity: 0}, 1000, () => {
        $('.logo-fade-2').css({opacity: 1}).attr('src', `./images/WEB_CHARM.gif?${Date.now()}`)
      })
    }, 4000)
  }
}
