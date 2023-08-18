
const hero = {
  name: "Greenbelt Gary",
  damage: 5,
  health: 100,
  money: 0,
  image: 'assets/gary.gif'
}

const boss = {
  name: 'Evil Goose',
  health: 100,
  maxHealth: 100,
  damage: 10,
  level: 1,
  image: 'assets/goose.gif'
}

// DRAW FUNCTIONS

function drawHero() {
  let heroTemplate = ''
  heroTemplate += `
    <h4>${hero.name}</h4>
    <img class="gary" src="${hero.image}" alt="">
  `
  // @ts-ignore
  document.getElementById('hero').innerHTML = heroTemplate
}
drawHero()

function drawHeroStats() {
  let heroStatsTemplate = ''
  heroStatsTemplate += `
    <h4>${hero.name}</h4>
    <img src="${hero.image}" alt="">
    <p>Health: <span>${hero.health}</span></p>
    <p> Money: <span>${hero.money}</span></p>
    <p> Damage: <span>${hero.damage}</span></p>

  `
  // @ts-ignore
  document.getElementById('heroStats').innerHTML = heroStatsTemplate
}
drawHeroStats()

function drawBoss() {
  let bossTemplate = ''
  bossTemplate += `
    <h4>${boss.name}</h4>
    <img class="goose" src="${boss.image}" alt="" onclick="attackBoss()">
  `
  // @ts-ignore
  document.getElementById('boss').innerHTML = bossTemplate
}
drawBoss()

function drawBossStats() {
  let bossStatsTemplate = ''
  bossStatsTemplate += `
    <h4>${boss.name}</h4>
    <p>Level: <span>${boss.level}</span></p>
    <p>Damage: <span>${boss.damage}</span></p>
    <p>Health: <span>${boss.health}</span></p>
  `
  // @ts-ignore
  document.getElementById('bossStats').innerHTML = bossStatsTemplate
}
drawBossStats()

// GAME LOGIC: ATTACK BOSS, BOSS ATTACKS

function attackBoss() {
  // console check that our onclick is doing something
  // console.log('attacking the boss');

  // hero gets gold when you click to attack the boss
  hero.money = hero.money + 5
  // console.log('getting hero money', hero.money);

  // boss health decreases every click
  boss.health = boss.health - hero.damage
  // console.log('boss health going down', boss.health);

  // if the boss health gets to 0 reward the hero
  if (boss.health < 0) {
    // hero gets more money
    hero.money = hero.money + 150
    // hero ability to do damage increases
    // console.log('hero gets money', hero.money);
    hero.damage = hero.damage + 5
    // hero health goes back to 100
    // console.log('hero damage increase', hero.damage);
    hero.health = 100
    // console.log('hero health', hero.health);

    // Let the player know they defeated the boss
    window.alert('You defeated that evil goose, keep walking the greenbelt!')
    // when boss health gets to 0 update the boss stats
    // increase the bosses level
    boss.level++
    // console.log('boss level increase', boss.level);
    // increase the bosses damage
    boss.damage = boss.level * 10
    // console.log('boss damage increase', boss.damage);
    // increase the bosses health
    boss.health = boss.level * 100
    // console.log('boss health increase', boss.health);
  }
  // redraw the hero stats and the boss stats 
  drawHeroStats()
  drawBossStats()
}


function bossDoesDamage() {
  // decrease hero health when boss attacks
  hero.health = hero.health - boss.damage

  // if hero health gets to 0
  if (hero.health <= 0) {
    // set hero health = 0
    hero.health = 0
    // take away hero gold
    hero.money = 0
    // alert the user that the hero is dead
    window.alert('Greenbelt Gary has been defeated by the goose, he took your money too!')
    // clearInterval(interval)
    // TODO set up reset game
  }

  // draw the hero stats to reflect damage being done
  drawHeroStats()
}

// The boss will do damage every 2 seconds
// let interval = setInterval(bossDoesDamage, 2000)






// NOTE START OF FIRESIDE
const companions = [
  {
    name: 'friendly neighborhood dog',
    type: 'damage',
    value: 5,
    health: 100,
    cost: 150,
    power: 0,
    isPurchased: false,
    img: '/assets/dog.gif'
  },
  {
    name: 'greenbelt skateboarder',
    type: 'damage',
    value: 10,
    health: 100,
    cost: 250,
    power: 0,
    isPurchased: false,
    img: '/assets/skateboarder.gif'
  },
  {
    name: 'guy with snacks',
    type: 'healing',
    value: 10,
    health: 100,
    cost: 50,
    power: 0,
    isPurchased: false,
    img: '/assets/foodguy.gif'
  }
]

// NOTE start with writing functions for ONE OBJECT

function buyDog() {
  // console.log('buying da dog');
  // NOTE grab the dog out of my array of companions (you could also do a find here and find the companion by its name)
  let dog = companions[0]
  // console.log('this da dog', dog);

  // NOTE if we're buying something we want to make sure the hero has money to do so and that we haven't already purchased this item
  if (hero.money >= 150 && dog.isPurchased != true) {
    // subtract the money
    hero.money = hero.money - 150
    // flip the bool on the object
    dog.isPurchased = true
    // console.log('buying dog', hero.money);
    // console.log('purchase bool', dog);
    // draw the dog to the fighting area
    drawDog()

    // Additional logic - what happens if the hero doesn't have money? what happens if you have already purchased the item?
  } else if (hero.money < 150) {
    window.alert("You don't have the money!")
  } else if (dog.isPurchased = true) {
    window.alert("You've already purchased the dog!")
  }

  // update your hero stats since you updated a bunch of stuff above
  drawHeroStats()
}

function drawDog() {
  let dogTemplate = ''
  dogTemplate += `
    <p>Friendly Neighborhood Dog</p>
    <img src="assets/dog.gif" alt="">
  `
  // @ts-ignore
  document.getElementById('friendlyNeighborhoodDog').innerHTML = dogTemplate
}

function dogAttack() {
  let dog = companions[0]

  // we want the dog to attack so we probably need to check if we even have a dog first

  // FIRST don't even run this function if I haven't purchased the dog
  if (!dog.isPurchased) {
    return
  }

  // If the dog has been purchased and the boss's health is not zero, then lets allow our dog to do damage
  if (dog.isPurchased && boss.health > 0) {
    boss.health = boss.health - dog.value
    // This is the clamp!! if the bosses health is 0 update all the stats and get out of the function thats letting our dog attack
  } else if (boss.health == 0) {
    hero.money = hero.money + 100
    hero.damage = hero.damage + 5
    hero.health = 100

    window.alert("You defeated the boss!")


    boss.level++
    boss.damage = boss.level * 10
    boss.health = boss.level * 100

  }

  drawHeroStats()
  drawBossStats()
}

// setInterval(dogAttack, 1000)



// NOTE REFACTORING YAAAY!!!
// NOTE THESE ARE IMPORTANT!! FOR FRIDAY!! 

function buyCompanion(companionName) {
  // console.log('buying companion', companionName);
  // Find the companion that we are looking for - we passed in the companion name from the button, so we need to use that name to look at our array and find the companion
  let purchasedCompanion = companions.find(companion => companion.name == companionName)
  // console.log('bought companion', purchasedCompanion);
  // @ts-ignore

  // logic same a dog attack logic, does the hero have more money than the companion costs? has the companion already been purchased or not?
  if (hero.money >= purchasedCompanion.cost && !purchasedCompanion.isPurchased) {
    // @ts-ignore
    hero.money -= purchasedCompanion.cost
    // @ts-ignore
    purchasedCompanion.isPurchased = true
    drawCompanion()
    // @ts-ignore
  } else if (hero.money < purchasedCompanion.cost) {
    window.alert("You don't have enough money good sir")
    // @ts-ignore
  } else if (purchasedCompanion.isPurchased = true) {
    window.alert("Sir...you've already purchased this companion.")
  }
  drawHeroStats()
}

function drawCompanion() {
  let companionTemplate = ''
  // companions.forEach(companion => companionTemplate += `
  //   <p>${companion.name}</p>
  //   <img src="${companion.img}" alt="">
  // ` )
  companions.forEach(companion => {
    // IMPORTANT - only draw my companion if my companion has been purchased - if you leave this out then it will draw ALL of the companions even if they haven't been purchased
    if (companion.isPurchased) {
      companionTemplate += `
        <div class="col-md-3">
          <p>${companion.name}</p>
          <img src="${companion.img}" alt="">
        </div>
      `
    }
  })
  // @ts-ignore
  document.getElementById('companion').innerHTML = companionTemplate
}

function applyCompanion() {
  // look at my companions array
  companions.forEach(companion => {
    // check what 'type' companion is and do stuff accordingly

    // If the companion is of type damage and the boss still has health let the companion attack
    if (companion.type == 'damage' && boss.health > 0) {
      // if companion is damage hurt the boss
      boss.health -= companion.value

      // if the companion is instead of type healing - let the companion do some healing
    } else if (companion.type == 'healing') {
      hero.health += companion.value
    }

    // THE CLAMP - if the boss's health is 0, get out of the loop thats doing damage and instead reward the hero and level up the boss (update all the stats)
    if (boss.health == 0) {
      hero.money = hero.money + 100
      hero.damage = hero.damage + 5
      hero.health = 100

      window.alert("You defeated the boss!")


      boss.level++
      boss.damage = boss.level * 10
      boss.health = boss.level * 100
    }
    drawBossStats()
    drawHeroStats()
  })
}

// let time = 1000

// set our interval so that we apply our companion when we bought them 
setInterval(applyCompanion, 3000)