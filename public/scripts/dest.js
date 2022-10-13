const allDestinations = document.querySelector('#all-destinations')

const showVacations = (arg) => {
  arg.forEach(item => {
    const index = arg.indexOf(item)
    console.log(index)
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

const showImage = (arg) => {
  const image = document.querySelectorAll('.vacation');
  const imgArr = Array.from(image)
  imgArr.forEach(item => {
    const index = imgArr.indexOf(item)
    console.log(index)
    item.style.backgroundImage = arg[index].img0;
    item.style.backgroundSize = 'cover';
  })
  console.log(image)
}

const getDestinations = async() => {
  const data = await fetch('/places');
  const json = await data.json()
  console.log(json)
  showVacations(json)
  showImage(json)
}
getDestinations()
