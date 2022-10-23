const allDestinations = document.querySelector('#all-destinations')

const showVacations = (arg) => {
  arg.forEach(item => {
    const index = arg.indexOf(item)
    allDestinations.innerHTML += `<div class="vacation">
                                    <p class="see-more">See More</p>
                                    <div class="cover">
                                    <p class="vac-location">${arg[index].place}</p>
                                    <div class="sec-1">
                                     <p class="vac-country">${arg[index].country}</p>
                                     <div class="like-div0">
                                     <p id="${index}" class="likeCount"></p>
                                     <button id="${index}" class="like">Like</button>
                                     </div>
                                    </div>
                                    <p class="cost">$${arg[index].cost}/week</p>
                                    </div>
                                  </div>`
    })
  const likeCount = document.querySelectorAll('.likeCount')
  const likeArr = Array.from(likeCount);
  likeArr.forEach(num => {
    const index = likeArr.indexOf(num);
    likeNumber(num, index);
  })
  const likeBtns = document.querySelectorAll('.like');
  const likeBtnArr = Array.from(likeBtns);
  likeBtnArr.forEach(likeBtn => {
    const index = likeBtnArr.indexOf(likeBtn);
    likeBtn.addEventListener('click', () => {
      postLikes(index);
      likeNumber(likeArr[index], index)
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
                        <div class="like-div">
                        <p class="like-num"></p>
                        <button class="pop-like">Like</button>
                        </div>
                      </div>
                      <p class="desc">${arg[ind].overview}</p>
                      <p class="pop-cost">$${arg[ind].cost}/week</p>
                    </div>
                  </div>`
  u.className = 'popup';
  v.className = 'overlay';
  const likeBtn = document.querySelector('.pop-like');
  const likeNum = document.querySelector('.like-num')
  likeNumber(likeNum, ind) 
  likeBtn.addEventListener('click', () => {
    postLikes(ind)
    likeNumber(likeNum, ind)
  })
}

export const likeNumber = async(ele, number) => {
  const likeData = await fetch('/getLikes/' + number);
  const json = await likeData.json();
  ele.textContent = json.status
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
  const change = (y) => { i.style.backgroundImage = image[y] }
  for (let j = 0; j < image.length; j++) {
    setTimeout(change(j), 3000)
  }
}

// ---------------- Post Likes
 export const postLikes = async(num) => {
  const url = '/destinations/like'
  const key = "item" + num
  const data = { "id": num, "Like": key }
  const options = {
    "method": "POST",
    "body": JSON.stringify(data),
    "headers": {
      "Content-Type": "application/json"
    }
  }
  const sent = await fetch(url, options)
  const res = await sent.text();
}

// ---------- POP_UP
const popup = async(js) => {
  const image = document.querySelectorAll('.see-more');
  const cover = document.querySelectorAll('.likeCount');
  const imgArr = Array.from(image);
  const pop = document.querySelector('#poppin');
  const overlay = document.querySelector('#lay');
  imgArr.forEach(item => {
    const index = imgArr.indexOf(item);
    item.addEventListener('click', (e) => {
      popupContent(js, pop, overlay, index)
      const close = document.querySelector('.close')
        close.addEventListener('click', () => {
        pop.innerHTML = '';
        pop.classList.remove('popup');
          overlay.classList.remove('overlay');
          likeNumber(cover[index], index);
        })
      popupImage(js, index)
    })
  })
}
