$(document).ready( () => {
  initNavbarHandler()
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
  modalHideInit()
})

function initSideBarNav () {
  let dots = ''
  $('.section').each((index, el) => {
    const id = $(el).prop('id')
    const name = $(el).find('.nav-hidden-name').html()
    dots += `<div class='dot-nav-container'><span class='dot-nav-name'><b>${name}</b></span> <div class='dot-nav' data-attribute=${id}></div></div>`
  })
  const htmlDots = $.parseHTML(dots)
  $(htmlDots).appendTo($('.side-navigation'))
}

function bindScrollEvent () {
  const $window = $(window)
  const $video = $('#punjaluck-animate')
  $video[0].onended = () => {
    $video.remove()
    $('.corporate-quote').css({ opacity: 1 })
  }
  if($(window).width() > 768 ) {
    window.addEventListener('scroll', ()=>{
      const scrollPosition = $window.scrollTop()
      playVideo($video, scrollPosition)
      $('.parallax').each((index,el) => {
        parallax($(el), scrollPosition)
      })
      triggerDotNav()
    })
  }
}
function triggerDotNav () {
  const scrollPosition = $(window).scrollTop()
  $('.dot-nav').each((index,el) => {
    const id = $(el).attr('data-attribute')
    const $section = $(`#${id}`)
    const top = $section.offset().top - 81 - 50
    const bottom = top + $section.outerHeight(true)
    if(bottom > scrollPosition && top < scrollPosition) {
      $(el).addClass('active')
      $(el).siblings('.dot-nav-name').addClass('acitve')
    } else {
      $(el).removeClass('active')
      $(el).siblings('.dot-nav-name').removeClass('acitve')
    }
  })
}

function initNavbarHandler () {
  $(document).on('click','#hamberger-menu', (e) => {
    $(e.currentTarget).toggleClass('open')
    $('.nav-bar__navigation-container').toggleClass('active')
  })
  $(document).on('click','.dot-nav', (e) => {
    const top = $(`#${$(e.currentTarget).attr('data-attribute')}`).offset().top - 80
    $('html, body').animate({
      scrollTop: top
    }, 1500, 'easeInOutExpo')
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

function playVideo (video, scrollPosition) {
  const position = video.position()
  if (position.top < scrollPosition + $(window).height()){
    video[0].play()
  }
}
