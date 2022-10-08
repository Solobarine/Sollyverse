const userName = document.querySelector('.username');
const fullName = document.querySelector('#name');
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
