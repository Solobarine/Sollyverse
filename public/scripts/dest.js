const allDestinations = document.querySelector('#all-destinations')

const showVacations = (arg) => {
  arg.forEach(item => {
    const index = arg.indexOf(item)
    allDestinations.innerHTML += `<div class="vacation">
                                    <div class="cover">
                                    <p class="vac-location">${arg[index].place}</p>
                                    <div class="sec-1">
                                     <p class="vac-country">${arg[index].country}</p>
                                     <button class="like">Like</button>
                                    </div>
                                    <p class="cost">$${arg[index].cost}/week</p>
                                    </div>
                                  </div>`
    const likeBtn = document.querySelector('.like');
    likeBtn.addEventListener('click', () => {
      postLikes(index)
    })
  })
}

const popupContent = (arg,u, v, ind) => {
  u.innerHTML = ''
  u.innerHTML += `<div class="pop-div">
                    <div class="cov">
                    <div class="showcase"></div>
                    <p class="close">&#10006</p>
                    </div>
                    <div class="pop-cover">
                      <p class="pop-location">${arg[ind].place}</p>
                      <div class="pop-sec">
                        <p class="pop-country">${arg[ind].country}</p>
                        <button class="pop-like">Like</button>
                      </div>
                      <p class="desc">${arg[ind].overview}</p>
                      <p class="pop-cost">$${arg[ind].cost}/week</p>
                    </div>
                  </div>`
  u.className = 'popup';
  v.className = 'overlay';
  const likeBtn = document.querySelector('.pop-like');
  likeBtn.addEventListener('click', () => {
    postLikes(ind)
  })
}

const showImage = (arg) => {
  const image = document.querySelectorAll('.vacation');
  const imgArr = Array.from(image)
  imgArr.forEach(item => {
    const index = imgArr.indexOf(item)
    item.style.backgroundImage = arg[index].img[0];
    item.style.backgroundSize = 'cover';
  })
}

const getDestinations = async() => {
  const data = await fetch('/places');
  const json = await data.json()
  showVacations(json)
  showImage(json)
  popup(json)
}

getDestinations()

const popupImage = (arg1, arg2) => {
  let n = 0
  const i = document.querySelector('.showcase');
  const style = document.createElement('style');
  const image = arg1[arg2].img
  console.log(image.length)
  const change = (y) => { i.style.backgroundImage = image[y] }
  for (let j = 0; j < image.length; j++) {
    setTimeout(change(j), 3000)
    console.log(j)
  }
}

// ---------------- Post Likes
const postLikes = async(num) => {
  const url = '/destinations/like'
  const key = "item" + num
  console.log(key)
  const data = { "Like": key}
  const options = {
    "method": "POST",
    "body": JSON.stringify(data),
    "headers": {
      "Content-Type": "application/json"
    }
  }
  const sent = await fetch(url, options)
  const res = await sent.text()
  console.log(res)
}

// ---------- POP_UP
const popup = async(js) => {
  const image = document.querySelectorAll('.vacation');
  const cover = document.querySelectorAll('.cover');
  const imgArr = Array.from(image);
  const pop = document.querySelector('#poppin');
  const overlay = document.querySelector('#lay');
  imgArr.forEach(item => {
    const index = imgArr.indexOf(item);
    item.addEventListener('click', (e) => {
      console.log(index);
      popupContent(js, pop, overlay, index)
      const close = document.querySelector('.close')
        close.addEventListener('click', () => {
        pop.innerHTML = '';
        pop.classList.remove('popup');
        overlay.classList.remove('overlay');
        })
      popupImage(js, index)
    })
  })
}
const style = document.styleSheets[0]
console.log(style)
