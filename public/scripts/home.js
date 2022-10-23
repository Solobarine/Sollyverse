const userName = document.querySelector('.username');
const fullName = document.querySelector('#name');
const destinations = document.querySelectorAll('.destination');
const dDests = document.querySelectorAll('.dest');
const vacations = document.querySelectorAll('.vacation');
const viewAll = document.querySelectorAll('.view-all');
console.log(fullName);

const getUserName = async() => {
  const data = await fetch('/single')
  console.log(data);
  const json = await data.json();
  console.log(json);
  userName.textContent = `Hello ${json.First_Name}`;
  fullName.textContent = json.First_Name + ' ' + json.Last_Name;
}
getUserName();



destinations.forEach(destination => destination.innerHTML = `<div class="d-heading">
                                                              <h3 class="vac-name">Head</h3>
                                                              <div class="loc-section">
                                                              <p class="location">UAE</p>
                                                              <button class="like">Like</button>
                                                              </div>
                                                              <p class="cost">$1200/wk</p>
                                                             </div>`);

dDests.forEach(item => item.innerHTML = `<div class="dd-head">
                                          <div class="tou-image"></div>
                                           <div class="cover">
                                            <h3 class="dd-1">Head</h3>
                                            <div class="dd-2">
                                              <p class="loc">Brazil</p>
                                              <button class="lik">Like</button>
                                            </div>
                                            <p class="price">$1200/wk</p>
                                          </div>
                                         </div>`);

vacations.forEach(vac => vac.innerHTML = `<div class="vac-head">
                                          <div class="vac-image"></div>
                                           <div class="vac-cover">
                                            <h3 class="vac-1">Head</h3>
                                            <p class="vac-2">Brazil</p>
                                            <p class="people">6 People like this</p>
                                          </div>
                                         </div>`);

viewAll.forEach(btn => {
  btn.addEventListener('click', () => {
    window.open('/destinations', '_top')
  })
})
