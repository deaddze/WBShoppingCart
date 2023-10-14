const removeBags = document.querySelectorAll('.bag');
const countersElem = document.querySelectorAll('.section-1__counter')
const inStock = document.querySelector('.section-1__stock')
const arrows = document.querySelectorAll('.arrow');
const firstListCard = document.querySelector('.list-card')
const checkboxes = firstListCard.querySelectorAll('input');
const allCheck = document.querySelectorAll('input[type="checkbox"]');
const check = document.querySelector('.section-1__check');
const checkboxPay = document.getElementById('checkboxPay');
const orderBtn = document.getElementById('orderBtn');
const sumOfPrice = document.getElementById('sum');
const itemCount = document.getElementById('itemCount');
const sumOfOldPrice = document.getElementById('oldPriceSum');
const discountCount = document.getElementById('discountCount');
const bagCount = document.getElementById('bagCount');
const blockImg = document.getElementById('blockImg');
const closeBtns = document.querySelectorAll('.closeBtn');
const popupPay = document.querySelector('.popup-pay');
const backdrop = document.querySelector('.backdrop');
const popupPayBtns = document.querySelectorAll('.openPopupPay');
const popupDeliveryBtns = document.querySelectorAll('.openPopupDelivery');
const popupDelivery = document.querySelector('.popupDelivery');
const formInfo = document.getElementById('form-info');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const innInput = document.getElementById('inn');
const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
const selectCardBtn = document.getElementById('selectCardBtn');
const selectAddressBtn = document.getElementById('selectAddressBtn');
const cards = document.querySelectorAll('.section-2__card');
const textItems = document.querySelectorAll('.product-info h3');
const deliveryBtns = document.querySelector('.popupDelivery__btns')
const listCardPay = document.querySelector('.list__card-pay')
const deliveryAddress = document.querySelectorAll('.address');
const list = document.querySelector('.block-info__list');

const counter = () => {
  countersElem.forEach(counter => {
    const decrement = counter.querySelector('.minus');
    const increment = counter.querySelector('.plus');
    const countSpan = counter.querySelector('.countSpan');
    const priceList = counter.closest('.section-1__price-list');
    const perPrice = parseFloat(priceList.dataset.price);
    const oldPricePer = priceList.querySelector('.oldPrice')
    const oldPrice = parseFloat(priceList.dataset.oldPrice);
    const price = priceList.querySelector('.price');
    const card = counter.closest('.section-1__card');
    const howStillCount = card.querySelector('.countStill');
    const itemData = card.dataset.item;
    const itemBuyData = blockImg.querySelector(`[data-item="${itemData}"]`);
    const buyCount = itemBuyData.querySelector('.count p');
    const buyCircle = itemBuyData.querySelector('.count');
    const pathMinus = decrement.querySelector('path');
    const pathPlus = increment.querySelector('path');
    let count = 1;
    let isCounting = true;
    let isCreated = true;
    decrement.addEventListener('click', () =>{
      if(count > 1){
        isCounting = true;
        count--;
        countSpan.textContent = count;
        buyCount.textContent = count;
        pathPlus.style.fillOpacity = '1';
        updatePrice(count)
        if(count === 1){
          buyCircle.classList.add('hidden');
          pathMinus.style.fillOpacity = '0.2';
        }else{
          pathMinus.style.fillOpacity = '1';
        }
      }
      if(isCreated && count > 184){
        let newCount = count - 184
        const blockInfoCount = document.querySelector('.block-info__count');
        blockInfoCount.textContent = newCount;
      }else if(count <= 184 && isCreated){
        isCreated = false;
        const list = document.querySelector('.block-info__list');
        const deletedInfo = list.querySelector('#block-info2');
        if(deletedInfo){
          list.removeChild(deletedInfo)
        }
      }
    });
    increment.addEventListener('click', () =>{
      if(isCounting){
        isCounting = true;
        count++;
        countSpan.textContent = count;
        buyCount.textContent = count;
        updatePrice(count);
        pathMinus.style.fillOpacity = '1';
        buyCircle.classList.remove('hidden');
      }
      if(count === Number(howStillCount?.textContent)){
        isCounting = false;
        pathPlus.style.fillOpacity = '0.2'
      }
      if(count > 184 && !isCreated){
        createBlockInfo()
        isCreated = true;
      }
      if(isCreated && count <= 184){
        isCreated = false;
        const list = document.querySelector('.block-info__list');
        const deletedInfo = list.querySelector('#block-info2');
        list.removeChild(deletedInfo)
      }
      if(isCreated && count > 184){
        let newCount = count - 184
        const blockInfoCount = document.querySelector('.block-info__count');
        blockInfoCount.textContent = newCount;
      }
    })
      function updatePrice(count){
      const sum = count * perPrice;
      const oldSum = count * oldPrice;
      if(String(sum).length > 6){
        price.classList.add('fs-16');
      }
      const formattedSum = formatNumber(sum);
      const formattedOldSum = formatNumber(oldSum);
      price.innerHTML = formatNumberWithSpaces(formattedSum);
      oldPricePer.innerHTML = `${formatNumberWithSpaces(formattedOldSum)} <span>сом</span>`;
      getFullPrice();
    }
  }) 
}
function ifIsCraeted(){
  if(isCreated && count <= 184){
    isCreated = false;
    const list = document.querySelector('.block-info__list');
    const deletedInfo = list.querySelector('#block-info2');
    list.removeChild(deletedInfo)
  }
  if(isCreated && count > 184){
    let newCount = count - 184
    const blockInfoCount = document.querySelector('.block-info__count');
    blockInfoCount.textContent = newCount;
  }
}
function createBlockInfo(){
  const blockInfo = document.createElement('li');
  blockInfo.classList.add('section-1__block-info', 'mb-19');
  blockInfo.id = 'block-info2'
  const dateOfDelivery = document.createElement('h4');
  dateOfDelivery.classList.add('dateOfDelivery');
  dateOfDelivery.textContent = '7—8 февраля';

  const blockImg = document.createElement('ul');
  blockImg.classList.add('section-1__block-img');

  const listItem = document.createElement('li');
  listItem.classList.add('delivery-item')
  listItem.dataset.item = '1';

  const img = document.createElement('img');
  img.classList.add('delivery-img')
  img.src = 'img/img-2.jpg';

  const count = document.createElement('div');
  count.classList.add('section-1__count', 'count');

  const countParagraph = document.createElement('p');
  countParagraph.textContent = 1;
  countParagraph.classList.add('block-info__count'); 
  blockInfo.appendChild(dateOfDelivery);
  blockInfo.appendChild(blockImg);

  blockImg.appendChild(listItem);
  listItem.appendChild(img);
  listItem.appendChild(count);

  count.appendChild(countParagraph);

  list.appendChild(blockInfo);
}
function formatNumber(number) {
  const numberString = number.toString();
  const [integerPart, decimalPart] = numberString.split('.');

  if (decimalPart && decimalPart.length > 1) {
    return parseFloat(Math.round(number));
  }
  return parseFloat(number);
}

function formatNumberWithSpaces(number) {
  const numberString = number.toString();

  if (numberString.length < 4) {
    return numberString;
  }
  const formattedNumber = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return formattedNumber;
}

const removeItem = () => {
  for(let bag of removeBags){
    bag.addEventListener('click', () => {
      const card = bag.closest('.section-1__card');
      const ul = bag.closest('ul');
      ul.removeChild(card);
      getFullPrice();
      const cards = firstListCard.querySelectorAll('.section-1__card');
      bagCount.textContent = cards.length;
    })
  }
}
const checkedAll = () => {
  const selectAll = document.getElementById('selectAll');
  selectAll.addEventListener('click', function(){
    if(selectAll.checked){
      checkboxes.forEach((checkbox) => {
        checkbox.checked = true;
        getFullPrice();
      });
    }else{
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
    }
  });
}

const elemHidden = () => {
  arrows.forEach(arrow => {
    arrow.addEventListener('click', () => {
      let sum = 0;
      let sumItems = 0;
      const stock = arrow.closest('.section-1__stock');
      const bagDiv = stock.closest('.section-1__bag');
      const listCard = stock.querySelector('.section-1__list-card');
      const list = stock.querySelector('.list-card')
      const countSpans = listCard.querySelectorAll('.countSpan');
      const sumOfItems = listCard.querySelectorAll('.price');
      sumOfItems.forEach(item => sumItems += parseFloat(item.textContent.replace(/\s/g, '')));
      countSpans.forEach(item => sum += parseFloat(item.textContent));
      listCard.classList.toggle('hidden');
      if(listCard.classList.contains('hidden')){
        arrow.src = 'icons/arrow-bottom.svg';
      }else{
        arrow.src = 'icons/icon-20.svg';
      }
      if(list.classList.contains('hidden')){
        check.innerHTML = `${sum} товаров · ${formatNumberWithSpaces(sumItems)} сом`;
        check.classList.add('listTitle');
        bagDiv.classList.remove('mb-36')
      }else{
        const checked = Array.from(checkboxes).filter(check => check.checked === true);
        checked.length === checkboxes.length ? check.innerHTML = `<label for="selectAll" class="checkbox-label">
        <input type="checkbox" class="checkbox checkbox-input" id="selectAll" checked>Выбрать все
        <span class="checkbox-span"></span>
        </label>` : check.innerHTML = `<label for="selectAll" class="checkbox-label">
        <input type="checkbox" class="checkbox checkbox-input" id="selectAll">Выбрать все
        <span class="checkbox-span"></span>
        </label>`;
        bagDiv.classList.add('mb-36');
      }
  });
  });
};
const getFullPrice = () => {
  const checkboxes = firstListCard.querySelectorAll('input');
  let sumPrice = 0
  let sumOldPrice = 0;
  let sumItem = 0;
  const isChecked = firstListCard.querySelectorAll('input[type="checkbox"]:checked');
  if(isChecked.length === checkboxes.length){
    selectAll.checked = true;
  }else{
    selectAll.checked = false;
  }
  isChecked.forEach(item => {
    const card = item.closest('.section-1__card');
    const countSpan = card.querySelector('.countSpan');
    const price = card.querySelector('.price');
    const oldPrice = card.querySelector('.oldPrice');
    sumItem += parseFloat(countSpan.textContent.replace(/\s/g, ''));
    sumPrice += parseFloat(price.textContent.replace(/\s/g, ''));
    sumOldPrice +=parseFloat(oldPrice.textContent.replace(/\s/g, ''));
  })
  discount(sumPrice, sumOldPrice);
  if(checkboxPay.checked && sumPrice > 0){
    orderBtn.innerHTML = `Оплатить ${formatNumberWithSpaces(sumPrice)} сом`;
  }else{
    orderBtn.innerHTML = 'Заказать'
  }
  sumOfPrice.innerHTML = `${formatNumberWithSpaces(sumPrice)} <span>сом<span>`;
  sumOfOldPrice.innerHTML = `${formatNumberWithSpaces(sumOldPrice)} сом`;
  itemCount.innerHTML = `${formatNumberWithSpaces(sumItem)} товаров`;
}

allCheck.forEach(checkbox => {
  checkbox.addEventListener('change', getFullPrice);
});

const discount = (sumPrice, sumOldPrice) => {
  const discountSum = sumPrice - sumOldPrice;
  discountCount.innerHTML = `${formatNumberWithSpaces(discountSum)} сом`
}

function closePopups(){
  closeBtns.forEach(close => {
    close.addEventListener('click', () => {
      popupPay.classList.add('hidden');
      backdrop.classList.add('hidden');
      popupDelivery.classList.add('hidden');
    })
  })
}
function openPopups(){
  popupPayBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      popupPay.classList.remove('hidden');
      backdrop.classList.remove('hidden');
    })
  })
  popupDeliveryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      popupDelivery.classList.remove('hidden');
      backdrop.classList.remove('hidden');
    })
  })
}

emailInput.addEventListener('change', function(e){
  const error = e.target.nextElementSibling;
  if(e.target.value.trim() !== '' && !e.target.value.includes('@') || /[-+;:]/.test(e.target.value)){
    error.textContent = 'Проверьте адрес электронной почты';
    error.classList.remove('hiddenError')
    e.target.classList.add('error')
  }else if(e.target.value.trim() === ''){
    error.textContent = 'Укажите электронную почту';
    error.classList.remove('hiddenError');
    e.target.classList.add('error')
  }else{
    error.classList.add('hiddenError')
    e.target.classList.remove('error')
  }
})

phoneInput.addEventListener("change", function (e) {
  const cleanPhoneNumber = e.target.value.replace(/\s/g, '');
  const error = e.target.nextElementSibling;
  const formattedPhoneNumber = cleanPhoneNumber.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
  e.target.value = formattedPhoneNumber;
  if(/^\+\d{11}$/.test(cleanPhoneNumber)){
    error.classList.add('hiddenError');
  }else if (cleanPhoneNumber.length >= 30) {
    error.textContent = 'Максимум 30 символов';
    error.classList.remove('hiddenError');
    e.target.classList.add('error')
  }else if(cleanPhoneNumber === ''){
    error.textContent = 'Укажите номер телефона';
    error.classList.remove('hiddenError');
    e.target.classList.add('error')
  }else{
    error.textContent = 'Формат: +9 999 999 99 99';
    error.classList.remove('hiddenError');
    e.target.classList.add('error')
  }
});
phoneInput.addEventListener('input', function () {
  this.value = this.value.replace(/[^0-9+]/g, '');
});

innInput.addEventListener('change', function(e){
  const error = e.target.nextElementSibling;
  if(e.target.value.length !== 14){
    error.textContent = 'Проверьте ИНН';
    error.classList.add('error-message')
    e.target.classList.add('error')
  }else if(e.target.value.trim() === ''){
    error.textContent = 'Укажите ИНН'
    error.classList.add('error-message')
    e.target.classList.add('error')
  }else{
    error.textContent = 'Для таможенного оформления'
    error.classList.remove('error-message')
    e.target.classList.remove('error')
  }
})

function errorInput(input){
  input.addEventListener('change', function(e){
    const error = e.target.nextElementSibling;
    if(e.target.value.trim() === ''){
      error.classList.remove('hiddenError');
      e.target.classList.add('error')
    }else if(e.target.value.trim() !== '' && /[-+;:@]/.test(e.target.value)){
      error.classList.remove('hiddenError');
      e.target.classList.add('error')
    }else{
      error.classList.add('hiddenError');
      e.target.classList.remove('error')
    }
  })
};

selectCardBtn.addEventListener('click', function(){
  const checkedRadio = popupPay.querySelector('input[type="radio"]:checked');
  if(!checkedRadio) return;
  const labelRadio = checkedRadio.closest('.label-radio');
  const imgCard = labelRadio.querySelector('.imgCard');
  const textCard = labelRadio.querySelector('.textCard');
  cards.forEach(card => {
    const text = card.querySelector('.payCardText');
    const img = card.querySelector('.payCardImg');
    text.textContent = textCard.textContent;
    img.src = imgCard.src;
    popupPay.classList.add('hidden');
    backdrop.classList.add('hidden')
  })
});

deliveryBtns.addEventListener('click', function(e){
  if(e.target.tagName !== 'BUTTON') return;
  const selectedBtn = this.querySelector('.selectedBtn');
  selectedBtn.classList.remove('selectedBtn');
  e.target.classList.add('selectedBtn')
})

selectAddressBtn.addEventListener('click', function(){
  const checkedRadio = listCardPay.querySelector('input[type="radio"]:checked');
  if(!checkedRadio) return;
  const labelRadio = checkedRadio.closest('.label-radio');
  const text = labelRadio.querySelector('.address-text');
  deliveryAddress.forEach(address => {
    address.textContent = text.textContent;
  })
  popupDelivery.classList.add('hidden');
  backdrop.classList.add('hidden')
})

popupDelivery.addEventListener('click', function(e){
  if(e.target.className !== 'popupBag') return;
  const cardPay = e.target.closest('.card-pay');
  const listCardPay = e.target.closest('.list__card-pay');
  listCardPay.removeChild(cardPay);
})

formInfo.addEventListener('input', function(e){
  if(e.target.tagName !== 'INPUT') return;
  const formInfoDiv = e.target.closest('.form-info__input');
  const label = formInfoDiv.querySelector('label');
  label.classList.remove('opacity')
})

const isMobile = window.matchMedia('(max-width: 320px)').matches;
if(isMobile){
  emailInput.setAttribute('placeholder', 'Электронная почта')
}

removeItem();
counter();
checkedAll();
elemHidden();
closePopups();
openPopups();
errorInput(firstNameInput);
errorInput(lastNameInput);
// getDeliveryCount()