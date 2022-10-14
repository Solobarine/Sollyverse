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
  })
}

const popupContent = (arg,u, ind) => {
  u.innerHTML = ''
  u.innerHTML += `<div class="pop-div">
                                    <div class="showcase"></div>
                                    <p class="close">&#10006</p>
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
  //console.log(ind)
  u.className = 'popup';
  console.log(arg)
  console.log(u)
  // overlay.className = 'overlay';

}

const removePopup = (u, v) => {
  //u.innerHTML = `<h2 className="hry">Hey</h2>`
  //u.classList.remove('popup')
  //v.classList.remove('overlay')
}

const showImage = (arg) => {
  const image = document.querySelectorAll('.vacation');
  const imgArr = Array.from(image)
  imgArr.forEach(item => {
    const index = imgArr.indexOf(item)
    item.style.backgroundImage = arg[index].img0;
    item.style.backgroundSize = 'cover';
  })
}

const getDestinations = async() => {
  const data = await fetch('/places');
  const json = await data.json()
  showVacations(json)
  showImage(json)
  popup(json)
  //const overlay = document.querySelector('#lay');
}

getDestinations()

// ---------- POP_UP
const popup = async(js) => {
  const image = document.querySelectorAll('.vacation');
  const cover = document.querySelectorAll('.cover');
  const imgArr = Array.from(image);
  const h = document.querySelector('#poppin');
  console.log(h)
  imgArr.forEach(item => {
    const index = imgArr.indexOf(item);
    item.addEventListener('click', (e) => {
      console.log(index);
      popupContent(js, h, index)
      const close = document.querySelector('.close')
        close.addEventListener('click', () => {
        h.innerHTML = '';
        h.classList.remove('popup');
        console.log('click')
      })
    })
  })
}

const closeButton = (i) => {
  document.querySelector(selectors)
}

const getClose = () => {
  const close = document.querySelector('.close')
  console.log(close)
}
