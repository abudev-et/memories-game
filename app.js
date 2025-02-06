const cardArray = [
    {
      name: 'fries',
      image: 'image/fries.png'
    },
    {
      name: 'cheeseburger',
      image: 'image/cheeseburger.png'
    },
    {
      name: 'hotdog',
      image: 'image/hotdog.png'
    },{
      name: 'ice-cream',
      image: 'image/ice-cream.png'
    },{
      name: 'milkshake',
      image: 'image/milkshake.png'
    },{
      name: 'pizza',
      image: 'image/pizza.png'
    },{
      name: 'fries',
      image: 'image/fries.png'
    },
    {
      name: 'cheeseburger',
      image: 'image/cheeseburger.png'
    },
    {
      name: 'hotdog',
      image: 'image/hotdog.png'
    },{
      name: 'ice-cream',
      image: 'image/ice-cream.png'
    },{
      name: 'milkshake',
      image: 'image/milkshake.png'
    },{
      name: 'pizza',
      image: 'image/pizza.png'
    }
  ];
  let gridHTML = '';
  cardArray.sort(() => 0.5 - Math.random());
  let t = 2000;
  const gridDisplay = document.querySelector('#grid');
  const gridDisplayFirst = document.querySelector('#grid-first');
  const resultDisplay = document.querySelector('#score');
  cardArray.forEach((cardObj)=>{
  gridHTML += `<img src="${cardObj.image}"\>`
  })
  
  gridDisplayFirst.innerHTML = gridHTML;
  
  let firstDis = setTimeout(()=>{
    creatBoard();
    gridDisplayFirst.innerHTML = '';
    gridHTML = '';
  }, t)
  
  //firstDis()
  function creatBoard(){
    for(i = 0; i < cardArray.length; i ++){
      const card = document.createElement('img');
      card.setAttribute('src', 'image/blank.png');
      card.setAttribute('data-game-id', i);
      card.addEventListener("click", flipCard /* or you can use()=>{
        flipCard()
        const gameId = card.dataset.gameId;*/
        //console.log(gameId) }
      );
      
      gridDisplay.appendChild(card);
      //console.log(gameId)
      
    }
  };
  
  let cardsChoose = [];
  let cardsChooseId = [];
  let cardsWon = [];
  let heart = 0;
  function flipCard(){
    const cardId = this.getAttribute('data-game-id');
    cardsChoose.push(cardArray[cardId].name);
    cardsChooseId.push(cardId);
    this.setAttribute('src', cardArray[cardId].image)
    
    if(cardsChoose.length === 2){
      setTimeout(checkMatch, 70);
    }
  }
  //console.log(gameId)
  
  function checkMatch(){
    const card = document.querySelectorAll('img')
    if(cardsChooseId[0] === cardsChooseId[1]){
      card[cardsChooseId[0]].setAttribute('src', 'image/blank.png')
      card[cardsChooseId[1]].setAttribute('src', 'image/blank.png')
      alert('You choice the same image!')
    } else if(cardsChoose[0] === cardsChoose[1]){
      card[cardsChooseId[0]].setAttribute('src', 'image/white.png');
      card[cardsChooseId[1]].setAttribute('src', 'image/white.png');
      card[cardsChooseId[0]].removeEventListener('click', flipCard);
     card[cardsChooseId[1]].removeEventListener('click', flipCard) 
     cardsWon.push(cardsChoose)
     
    } else{
      card[cardsChooseId[0]].setAttribute('src', 'image/blank.png')
      card[cardsChooseId[1]].setAttribute('src', 'image/blank.png')
      heartDis()
    }
    resultDisplay.textContent = cardsWon.length;
    cardsChooseId = [];
    cardsChoose = [];
    if(cardsWon.length === cardArray.length/2){
      resultDisplay.textContent = 'Congratulation you win!'
      reStart()
    }
  }
  const h1Dis = document.querySelector('#h1')
  const h2Dis = document.querySelector('#h2')
  const h3Dis = document.querySelector('#h3')
  function heartDis(){
    heart += 1;
    if(heart === 1){
      h3Dis.classList.add('heart-non-dis')}
    if(heart === 2){
      h2Dis.classList.add('heart-non-dis')}
      if(heart === 3){
        h1Dis.classList.add('heart-non-dis')
        alert('You Lose Try Again!')
        reStart()
      }
  }
  
  function reStart(){
    cardArray.sort(() => 0.5 - Math.random())
    cardArray.forEach((cardObj)=>{
    gridHTML += `<img src="${cardObj.image}"\>`
    })
    gridDisplay.classList.add('heart-non-dis')
    gridDisplayFirst.innerHTML = gridHTML;
    heartRestart()
    setTimeout(()=>{afterRestart()}, 2000)
  }
  
function afterRestart(){
    const cards = document.querySelectorAll('img');
    cards.forEach((card)=>{
      card.setAttribute('src', 'image/blank.png')
      card.addEventListener('click', flipCard)
    })
    cardsChoose = [];
    cardsChooseId = [];
    cardsWon = [];
    resultDisplay.textContent = '0'
    gridDisplay.classList.remove('heart-non-dis')
    
    //heartDis()
    gridDisplayFirst.innerHTML = '';
    gridHTML = '';
}

function heartRestart(){
  h1Dis.classList.remove('heart-non-dis')
  h2Dis.classList.remove('heart-non-dis')
  h3Dis.classList.remove('heart-non-dis')
  heart = 0
}