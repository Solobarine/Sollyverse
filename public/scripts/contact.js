const container = document.querySelector('.container');

container.innerHTML = `<div id="top"></div>
                       <div id="middle">
                        <div class="form">
                          <input type="text" class="fullName" placeholder="Enter your Full Name"/>
                          <input type="text" class="comment" placeholder="Give your Comments"/>
                          <button type="submit" class="subBtn">Submit</button>
                        </div>
                       </div>
                       <div id="bottom"></div>`
