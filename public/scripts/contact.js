const container = document.querySelector('.container');

container.innerHTML = `<div id="top">
                        <header class="header">
                          <div class="logo">
                            <h3 class="company">Sollyverse</h3>
                          </div>
                          <ul class="nav">
                            <li class="nav-item">Home</li>
                            <li class="nav-item">About</li>
                            <li class="nav-item">Services</li>
                            <li class="nav-item">Discover</li>
                            <li class="nav-item">Contact</li>
                          </ul>
                          <div class="head-buttons">
                            <button class="login">Login</button>
                            <button class="register">Register</button>
                          </div>
                         </header>
                      </div>
                      <div id="middle">
                        <div class="form">
                          <input type="text" class="fullName" placeholder="Enter your Full Name"/>
                          <input type="text" class="comment" placeholder="Give your Comments"/>
                          <button type="submit" class="subBtn">Submit</button>
                        </div>
                       </div>
                       <div id="bottom">
                          <p class="copyright">&copy; 2022 Sollyverse. All Rights Reserved</p>
                       </div>`
