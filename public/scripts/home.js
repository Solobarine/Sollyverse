const userName = document.querySelector('.username');
const fullName = document.querySelector('#name');
const destinations = Array.from(document.querySelectorAll('.destination'));
const dDests = Array.from(document.querySelectorAll('.dest'));
const vacations = Array.from(document.querySelectorAll('.vacation'));
const viewAll = document.querySelectorAll('.view-all');

const getUserName = async() => {
  const data = await fetch('/single')
  const json = await data.json();
  userName.textContent = `Hello ${json.First_Name}`;
  fullName.textContent = json.First_Name + ' ' + json.Last_Name;
}
getUserName();

// GET DESTINATIONS FROM API
const places = await fetch('/places');
const json = await places.json();

function getMultipleRandom(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}

const data1 = getMultipleRandom(json, 4);
const data2 = getMultipleRandom(json, 4);
const data3 = getMultipleRandom(json, 2)

destinations.forEach(destination => {
  const index = destinations.indexOf(destination)
  destination.innerHTML = `<div class="d-heading">
                            <h3 class="vac-name">${data1[index].place}</h3>
                            <div class="loc-section">
                              <p class="location">${data1[index].country}</p>
                              <i class="fa-regular fa-heart"></i>
                            </div>
                            <p class="cost">$${data1[index].cost}/wk</p>
                          </div>`
  destination.style.backgroundImage = data1[index].img[1];
  destination.style.backgroundSize = 'cover';
});

dDests.forEach(item => {
  const index = dDests.indexOf(item)
  item.innerHTML = `<div class="dd-head">
                      <div class="tou-image"></div>
                      <div class="cover">
                        <h3 class="dd-1">${data2[index].place}</h3>
                        <div class="dd-2">
                          <p class="loc">${data2[index].country}</p>
                          <i class="fa-regular fa-heart"></i>
                        </div>
                        <p class="price">$${data2[index].cost}/wk</p>
                      </div>
                    </div>`
  const touImg = document.querySelectorAll('.tou-image')
  touImg[index].style.backgroundImage = data2[index].img[1];
  touImg[index].style.backgroundSize = '100%';

});

vacations.forEach(vac => {
  const index = vacations.indexOf(vac);
  vac.innerHTML = `<div class="vac-head">
                    <div class="vac-image"></div>
                    <div class="vac-cover">
                      <h3 class="vac-1">${data3[index].place}</h3>
                      <p class="vac-2">${data3[index].country}</p>
                      <p class="people">6 People like this</p>
                    </div>
                  </div>`
  const vacImage = document.querySelectorAll('.vac-image');
  vacImage[index].style.backgroundImage = data3[index].img[0];
  vacImage[index].style.backgroundSize = 'cover'; 
});

viewAll.forEach(btn => {
  btn.addEventListener('click', () => {
    window.open('/home/destinations', '_top')
  })
})
