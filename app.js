//  This is a sanity check aimed to make sure the API we're going to call is up and running, if not - it will call a backup one
const primaryApiUrl = `https://fakestoreapi.com/products`;
const backupApiUrl = `https://deepblue.camosun.bc.ca/~c0180354/ics128/final/fakestoreapi.json`;
let response;
// This function is being called when validation was sucessfull,  it changes the appearance of validated element to green and adds "Validated" text
function validatedCorrectly(htmlElement) {
  htmlElement.style.color = "green";
}
// This function is the opposite for the previous one
function validatedIncorrectly(htmlElement, tagName) {
  tagName.style.color = "red";
  htmlElement.style.color = "black";
  if (
    htmlElement.id === "first-name" ||
    htmlElement.id === "first-name-shipping"
  ) {
    tagName.innerHTML =
      "Incorrect input, First name cannot be blank or have a space in it";
  } else if (
    htmlElement.id === "last-name" ||
    htmlElement.id === "last-name-shipping"
  ) {
    tagName.innerHTML =
      "Incorrect input, Last name cannot be blank or have a space in it";
  } else if (htmlElement.id === "email") {
    tagName.innerHTML =
      "Incorrect type of email, must contain @ and a host name with point sign";
  } else if (
    htmlElement.id === "home-address" ||
    htmlElement.id === "home-address-shipping"
  ) {
    tagName.innerHTML = "Cannot be blank or otherwise incorrect input";
  } else if (htmlElement.id === "city" || htmlElement.id === "city-shipping") {
    tagName.innerHTML = "Cannot be blank or otherwise incorrect input";
  } else if (
    htmlElement.id === "province" ||
    htmlElement.id === "province-shipping"
  ) {
    tagName.innerHTML =
      "This field cannot be blank, input should be 2 letters format";
  } else if (
    htmlElement.id === "postal-code" ||
    htmlElement.id === "postal-code-shipping"
  ) {
    tagName.innerHTML = "Cannot be blank or otherwise incorrect input";
  } else if (htmlElement.id === "phone") {
    tagName.innerHTML = "Cannot be blank, input should be 10 digits straight";
  }
}
// This is a twisted function that creates a new div with respective to the element it was created to ID (but with additional -message word because therer cannot be 2 identical IDs) and with the same class for all created elements so that later on they all could be gathered and manipulated accordingly. This newly created div is responsible for displaying error message during validation.
function addTag(element) {
  let mainDiv = element.parentElement.parentElement;
  let newDiv = document.createElement("div");
  newDiv.setAttribute("id", `${element.id}-message`);
  newDiv.setAttribute("class", "error-message");
  mainDiv.parentNode.insertBefore(newDiv, mainDiv.nextSibling);
  let tag = document.getElementById(`${element.id}-message`);
  return tag;
}
// This function validates all entries on Billing page
function validateEntries(
  firstName,
  lastName,
  streetAddress,
  city,
  province,
  postal,
  email,
  phone,
  currencyValue,
  orderArray,
  itemsArray
) {
  // This block of code lines 76-81 will check for any error messages showing on the page and delete them if any. 
  // If we don't do this check then after validation fails, error messages will stay visible even if validation passes. 
  let checkForAllErrors = document.querySelectorAll(`.error-message`);
  if (checkForAllErrors) {
    for (let i = 0; i < checkForAllErrors.length; i++) {
      checkForAllErrors[i].innerHTML = null;
    }
  } else null;
  let allValidated = [];
  let regExpFirstName = /^[A-Za-z]{2,}$/;
  let firstNameIsCorrect = regExpFirstName.test(firstName.value);
  let regExpLastName = /^[a-zA-Z]+$/;
  let lastNameIsCorrect = regExpLastName.test(lastName.value);
  let regExpPhoneNumber = /^[0-9]{10}$/;
  let phoneNumberIsCorrect = regExpPhoneNumber.test(phone.value);
  let regExpEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  let emailIsCorrect = regExpEmail.test(email.value);
  let regExpProvince = /^[a-zA-Z]{2}$/;
  let provinceIsCorrect = regExpProvince.test(province.value);
  let regExpCity = /^[a-zA-Z]+$/;
  let cityIsCorrect = regExpCity.test(city.value);
  let regExpStreet = /^[a-zA-Z0-9 ]+$/;
  let streetIsCorrect = regExpStreet.test(streetAddress.value);
  let regExpPostal = /^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/;
  let postalIsCorrect = regExpPostal.test(postal.value);
  if (!firstNameIsCorrect) {
    validatedIncorrectly(firstName, addTag(firstName));
  } else {
    validatedCorrectly(firstName);
    allValidated.push("validated");
  }
  if (!lastNameIsCorrect) {
    validatedIncorrectly(lastName, addTag(lastName));
  } else {
    validatedCorrectly(lastName);
    allValidated.push("validated");
  }
  if (!phoneNumberIsCorrect) {
    validatedIncorrectly(phone, addTag(phone));
  } else {
    validatedCorrectly(phone);
    allValidated.push("validated");
  }
  if (!emailIsCorrect) {
    validatedIncorrectly(email, addTag(email));
  } else {
    validatedCorrectly(email);
    allValidated.push("validated");
  }
  if (!provinceIsCorrect) {
    validatedIncorrectly(province, addTag(province));
  } else {
    validatedCorrectly(province);
    allValidated.push("validated");
  }
  if (!cityIsCorrect) {
    validatedIncorrectly(city, addTag(city));
  } else {
    validatedCorrectly(city);
    allValidated.push("validated");
  }
  if (!streetIsCorrect) {
    validatedIncorrectly(streetAddress, addTag(streetAddress));
  } else {
    validatedCorrectly(streetAddress);
    allValidated.push("validated");
  }
  if (!postalIsCorrect) {
    validatedIncorrectly(postal, addTag(postal));
  } else {
    validatedCorrectly(postal);
    allValidated.push("validated");
  }
  let continueButton = document.getElementById("proceed-to-shipping");
  continueButton.addEventListener("click", () => {
    if (allValidated.length === 8) {
      orderArray.push(
        firstName.value,
        lastName.value,
        streetAddress.value,
        city.value,
        province.value,
        postal.value,
        phone.value,
        email.value
      );
      shippingProcedure(
        firstName,
        lastName,
        streetAddress,
        city,
        province,
        postal,
        currencyValue,
        orderArray,
        itemsArray
      );
    } else null;
  });
}
// We need this function to be able to show error messages during validation of shipping entries. 
function addShippingTag(element) {
  let mainDiv = element.parentElement.parentElement;
  let newDiv = document.createElement("div");
  newDiv.setAttribute("id", `${element.id}-message`);
  newDiv.setAttribute("class", "error-shipping-message");
  mainDiv.parentNode.insertBefore(newDiv, mainDiv.nextSibling);
  let tag = document.getElementById(`${element.id}-message`);
  return tag;
}
function validateShippingEntries(
  shippingFirstName,
  shippingLastName,
  shippingStreetAddress,
  shippingCity,
  shippingProvince,
  shippingPostal,
  currencyValue,
  orderArray,
  itemsArray
) {
  // 196-201 again checking for previous shipping validation errors and deleting them if any
  let checkForAllErrors = document.querySelectorAll(`.error-shipping-message`);
  if (checkForAllErrors) {
    for (let i = 0; i < checkForAllErrors.length; i++) {
      checkForAllErrors[i].innerHTML = null;
    }
  } else null;
  let shippingAllValidated = [];
  let regExpFirstName = /^[A-Za-z]{2,}$/;
  let shippingFirstNameIsCorrect = regExpFirstName.test(
    shippingFirstName.value
  );
  let regExpLastName = /^[a-zA-Z]+$/;
  let shippingLastNameIsCorrect = regExpLastName.test(shippingLastName.value);
  let regExpProvince = /^[a-zA-Z]{2}$/;
  let shippingProvinceIsCorrect = regExpProvince.test(shippingProvince.value);
  let regExpCity = /^[a-zA-Z]+$/;
  let shippingCityIsCorrect = regExpCity.test(shippingCity.value);
  let regExpStreet = /^[a-zA-Z0-9 ]+$/;
  let shippingStreetAddressIsCorrect = regExpStreet.test(
    shippingStreetAddress.value
  );
  let regExpPostal = /^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/;
  let shippingPostalIsCorrect = regExpPostal.test(shippingPostal.value);
  if (!shippingFirstNameIsCorrect) {
    validatedIncorrectly(shippingFirstName, addShippingTag(shippingFirstName));
  } else {
    validatedCorrectly(shippingFirstName);
    shippingAllValidated.push("validated");
  }
  if (!shippingLastNameIsCorrect) {
    validatedIncorrectly(shippingLastName, addShippingTag(shippingLastName));
  } else {
    validatedCorrectly(shippingLastName);
    shippingAllValidated.push("validated");
  }
  if (!shippingProvinceIsCorrect) {
    validatedIncorrectly(shippingProvince, addShippingTag(shippingProvince));
  } else {
    validatedCorrectly(shippingProvince);
    shippingAllValidated.push("validated");
  }
  if (!shippingCityIsCorrect) {
    validatedIncorrectly(shippingCity, addShippingTag(shippingCity));
  } else {
    validatedCorrectly(shippingCity);
    shippingAllValidated.push("validated");
  }
  if (!shippingStreetAddressIsCorrect) {
    validatedIncorrectly(
      shippingStreetAddress,
      addShippingTag(shippingStreetAddress)
    );
  } else {
    validatedCorrectly(shippingStreetAddress);
    shippingAllValidated.push("validated");
  }
  if (!shippingPostalIsCorrect) {
    validatedIncorrectly(shippingPostal, addShippingTag(shippingPostal));
  } else {
    validatedCorrectly(shippingPostal);
    shippingAllValidated.push("validated");
  }
  let continueToCheckoutButton = document.getElementById("proceed-to-checkout");
  continueToCheckoutButton.addEventListener("click", () => {
    if (shippingAllValidated.length === 6) {
      orderArray.push(
        shippingFirstName.value,
        shippingLastName.value,
        shippingProvince.value,
        shippingCity.value,
        shippingStreetAddress.value,
        shippingPostal.value
      );
      shippingAllValidated.length = 0;
      finalCheckout(currencyValue, orderArray, itemsArray);
    } else null;
  });
}

// Sanity check function that checks open API address and returns it if it is available otherwise redirects to a backup address.
async function testApi() {
  try {
    response = await fetch(primaryApiUrl);
  } catch (error) {}
  if (response?.ok) {
    fetchURL(primaryApiUrl);
  } else {
    fetchURL(backupApiUrl);
  }
}
testApi();
//This function takes care of fetching items from API, rendering them and calling up an Add To Cart button
function fetchURL(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let mainDiv = document.getElementById("main");
      for (let i = 0; i < data.length; i++) {
        // This is an HTML fragment that's getting generated and rendered when API is fetched and data is available. 
        // It creates main page product cards. 
        // Each button will be assigned its unique ID (line 304) identical to ID of respectice product. 
        // We will use later on while ordering the exact product.
        let fragment = `<div class="card" style="width: 18rem;">
          <img src="${data[i].image}" id="image" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${data[i].title}</h5>
            <p class="card-text">${data[i].description}</p>
            <p class="card-text">${data[i].price}$</p>
            <div class="col-auto d-flex justify-content-end">
            <button type="button" id="add-to-cart-${data[i].id}" class="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Add to card</button>
            </div>
          </div>
        </div>
        </div>
        `;
        let newDiv = document.createElement("div");
        newDiv.setAttribute("class", "col-xl-3 col-lg-4 col-md-6 p-2");
        newDiv.innerHTML = fragment;
        mainDiv.appendChild(newDiv);
        let product = data[i];
        let buttons = document.querySelectorAll(`#add-to-cart-${data[i].id}`);
        for (let j = 0; j < buttons.length; j++) {
          buttons[j].addEventListener("click", () => getRate(product, data));
        }
      }
    });
}
// This function takes modal window Header and modal window Message as arguments and render them 
// thus it can be used anywhere in the code without repeating same lines.
function modalWarning(headerText, messageText) {
  let header = document.getElementById("exampleModalLabel");
  header.innerHTML = headerText;
  let message = document.getElementById("message-body");
  message.innerHTML = messageText;
}

// This function deletes item from the cart based on Delete button's ID respective with item's ID.
function deleteItem(e, cartItems, product, data) {
  Object.keys(cartItems).length > 0
    ? delete cartItems[e.target.id]
    : window.localStorage.clear();
  set_cookie("shopping_cart_items", cartItems);
  let dummyValue = true;
  putToCart(product, data, dummyValue);
}
// This function takes care of creating a basket, filling it with products, figuring out the number of items and if they are same or different, calculation the subtotal and it let's you choose if you'd like to proceed with your order or to empty your cart.
async function getRate(product, data, exchangeRatio = 1) {
  let currencyURL = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/cad.json`;
  let response = await fetch(currencyURL);
  let rates = await response.json();
  let changeTheAmount = true;
  let dummyValue = false;
  putToCart(
    product,
    data,
    exchangeRatio,
    changeTheAmount,
    dummyValue,
    (currencyValue = "cad")
  );
  
  // Block of code responsible for currency change. Adding 'change' event listener on a downfalling menu
  // which allows to react on its changes in real time
  let currency = document.getElementById("currency");
  currency.addEventListener("change", () => {
    let currencyValue = currency.value;
    if (currencyValue === "cad") {
      exchangeRatio = 1;
      // We need changeTheAmount boolean variable in order to change or not to change the amount of products in a cart.  
      // Without this variable each change of currency will lead to increase of product numbers as it calls putToCart function.
      // So we need to distinguish if that's just a currency change or a product has indeed been added.
      changeTheAmount = false;
      putToCart(
        product,
        data,
        exchangeRatio,
        changeTheAmount,
        dummyValue,
        currencyValue
      );
    } else if (currencyValue === "usd") {
      exchangeRatio = rates.cad.usd;
      changeTheAmount = false;
      putToCart(
        product,
        data,
        exchangeRatio,
        changeTheAmount,
        dummyValue,
        currencyValue
      );
    } else {
      exchangeRatio = rates.cad.gbp;
      changeTheAmount = false;
      putToCart(
        product,
        data,
        exchangeRatio,
        changeTheAmount,
        dummyValue,
        currencyValue
      );
    }
  });
}
// This simple function will return the symbol of a chosen currency 
function currencySymbol(currencyValue) {
  if (currencyValue === "cad") {
    return "C$";
  } else if (currencyValue === "usd") {
    return "$";
  } else {
    return "£";
  }
}
function putToCart(
  product,
  data,
  exchangeRatio,
  changeTheAmount,
  dummyValue,
  currencyValue
) {
  // This array will collect items we put in a cart so that later on we could retrieve them to JSON file
  let itemsArray = []; 
  // This array will collect all other neccesary information so that later on we could retrieve it to JSON file
  let orderArray = [];
  orderArray.push(currencyValue);
  let cartItems = get_cookie("shopping_cart_items");
  if (cartItems === null) {
    cartItems = {};
  }
  if (dummyValue === false) {
    if (cartItems[product.id] === undefined) {
      cartItems[product.id] = 0;
    }
  } else null;
  // If changeTheAmount === true then product will increase, otherwise - no, it was just a currency change
  changeTheAmount ? cartItems[product.id]++ : null;
  set_cookie("shopping_cart_items", cartItems);
  if (Object.keys(cartItems).length === 0) {
    let subtotalAmountText = document.getElementById("subtotalAmount");
    subtotalAmountText.innerHTML = "0";
  }
  let mainDiv = document.getElementById("table");
  let tableHead = document.getElementById("table-head");
  if (mainDiv.childElementCount > 0) {
    while (mainDiv.firstChild) {
      mainDiv.removeChild(mainDiv.firstChild);
    }
  }
  let preSubtotalAmount = 0;
  mainDiv.appendChild(tableHead);
  // Next block of code is responsible for creating and appending an HTML fragment that makes a cart visual part.
  // It also collects and displays subtotal amount, currency and buttons.
  for (const [key, value] of Object.entries(cartItems)) {
    let productNumber = parseInt(key);
    let productTitle = data[productNumber - 1].title;
    itemsArray.push(productTitle);
    let productPrice = parseFloat(
      data[productNumber - 1].price * exchangeRatio
    ).toFixed(2);
    let finalPrice = parseFloat(value * productPrice).toFixed(2);
    preSubtotalAmount = preSubtotalAmount + parseFloat(finalPrice);
    let subtotalAmount = preSubtotalAmount.toFixed(2);
    let subtotalAmountText = document.getElementById("subtotalAmount");
    subtotalAmountText.innerHTML = subtotalAmount;
    let subtotalAmountCurrency = document.getElementById(
      "subtotal-symbol-order"
    );
    subtotalAmountCurrency.innerHTML = currencySymbol(currencyValue);
    let newDiv = document.createElement("tr");
    newDiv.setAttribute("class", "table-row");
    let fragment = `
        <td><button id=${key} class="item-delete">❌</button></td>
        <td id="td-title">${productTitle}</td>
        <td id="td-value">${value}</td>
        <td id="td-price"><span>${currencySymbol(
          currencyValue
        )}</span>${productPrice}</td>
        <td id="td-subtotal"><span>${currencySymbol(
          currencyValue
        )}</span>${finalPrice}</td>
      `;
    newDiv.innerHTML = fragment;
    mainDiv.appendChild(newDiv);
  }
  let itemDelete = document.querySelectorAll(".item-delete");
  for (let i = 0; i < itemDelete.length; i++) {
    itemDelete[i].addEventListener("click", (e) =>
      deleteItem(e, cartItems, product, data)
    );
  }
  let emptyCartButton = document.getElementById("emptyCard");
  emptyCartButton.addEventListener("click", () => emptyTheCart());
  
  // Proceeding with order
  let orderItems = document.getElementById("orderItems");
  if (Object.keys(cartItems).length != 0) {
    orderItems.disabled = false;
    orderItems.addEventListener("click", () =>
      orderProcedure(currencyValue, orderArray, itemsArray)
    );
  } else {
    orderItems.disabled = true;
    emptyCartButton.disabled = true;
  }
}
// Function to empty the cart
function emptyTheCart() {
  modalWarning(
    "Emptying your cart",
    "Are you sure you wish to empty your cart? All items will be lost."
  );
  let okButton = document.getElementById("buttonOk");
  okButton.addEventListener("click", () => {
    window.localStorage.clear();
    window.location.reload();
  });
}
function orderProcedure(currencyValue, orderArray, itemsArray) {
  let okPaymentButton = document.getElementById("payment-ok-button");
  okPaymentButton.addEventListener("click", () => {
    // Validations of inputs for payment page
    let isCvvValidated = false;
    let isCardNumberValidated = false;
    let isExpiryValidated = false;
    let month = document.getElementById("month");
    let monthValue = month.value;
    let year = document.getElementById("year");
    let yearValue = parseInt(year.value);
    let regexCvv = /^[0-9]{3,4}$/;
    let regexCard = /^[0-9]{16}$/;
    let cvv = document.getElementById("cvv-code");
    let cvvValue = parseInt(cvv.value);
    let checkCvv = regexCvv.test(cvvValue);
    let cardNumber = document.getElementById("card-number");
    let cardNumberValue = parseInt(cardNumber.value);
    let checkCardNumber = regexCard.test(cardNumberValue);
    let currentMonth = new Date().getMonth() + 1;
    let currentYear = new Date().getFullYear();
    let expirationMessage = document.getElementById(
      "expiration-validation-message"
    );
    let cvvMessage = document.getElementById("cvv-validation-message");
    let cardMessage = document.getElementById("card-validation-message");
    if (
      (parseInt(monthValue) >= currentMonth && yearValue >= currentYear) ||
      (parseInt(monthValue) <= currentMonth && yearValue > currentYear)
    ) {
      expirationMessage.innerHTML = "Expiry date is OK";
      expirationMessage.style.color = "green";
      isExpiryValidated = true;
    } else {
      expirationMessage.innerHTML = "Expiry date is wrong, please check again";
      expirationMessage.style.color = "red";
    }
    if (checkCvv) {
      cvvMessage.innerHTML = "CVV is OK";
      cvvMessage.style.color = "green";
      isCvvValidated = true;
    } else {
      cvvMessage.innerHTML = "CVV should be 3 digits only, please check again";
      cvvMessage.style.color = "red";
    }
    if (checkCardNumber) {
      cardMessage.innerHTML = "Card is OK";
      cardMessage.style.color = "green";
      isCardNumberValidated = true;
    } else {
      cardMessage.innerHTML = "Please check your card number";
      cardMessage.style.color = "red";
    }
    // Collecting data for further JSON file
    orderArray.push(cardNumberValue, monthValue, yearValue, cvvValue);
    if (isCardNumberValidated && isCvvValidated && isExpiryValidated) {
      setTimeout(() => {
        residenceInformation(currencyValue, orderArray, itemsArray);
      }, 1000);
    } else null;
  });
  // This function takes care of collecting address
  let addressPromise;
  function residenceInformation(currencyValue, orderArray, itemsArray) {
    $(document).ready(() => $("#example-modal").modal("show"));
    let proceedToShippingButton = document.getElementById(
      "proceed-to-shipping"
    );
    proceedToShippingButton.addEventListener("click", () =>
      validateEntries(
        firstName,
        lastName,
        streetAddress,
        city,
        province,
        postal,
        email,
        phone,
        currencyValue,
        orderArray,
        itemsArray
      )
    );
    let firstName = document.getElementById("first-name");
    let lastName = document.getElementById("last-name");
    let streetAddress = document.getElementById("home-address");
    let city = document.getElementById("city");
    let province = document.getElementById("province");
    let postal = document.getElementById("postal-code");
    let email = document.getElementById("email");
    let phone = document.getElementById("phone");
    let address = document.getElementById("home-address");
    address.addEventListener("input", async (e) => {
      addressPromise = await fetch(
        `https://geocoder.ca/?autocomplete=1&geoit=xml&auth=test&json=1&locate=${e.target.value}`
      );
        let addressResponse = await addressPromise.json();
        let addressFinal = addressResponse.streets.street;
      
      // We need to make an array out of a string in order to be able to decompose it later on and take the data we need.
      let addressSplit = addressFinal.split(", ");
      let addressOutput = document.getElementById("address-response");
      addressOutput.innerHTML = addressFinal;
      addressOutput.addEventListener("click", () =>
        populateAddress(addressSplit)
      );
    });
  }
  // This function autopopulates address in respective fields
  function populateAddress(addressSplit) {
    let addressOutput = document.getElementById("address-response");
    let streetAuto = addressSplit[0];
    let cityAuto = addressSplit[1];
    let provinceAuto = addressSplit[2];
    let postalAuto = addressSplit[3];
    let streetInput = document.getElementById("home-address");
    let cityInput = document.getElementById("city");
    let provinceInput = document.getElementById("province");
   let postalInput = document.getElementById("postal-code");
    streetInput.value = streetAuto;
    cityInput.value = cityAuto;
    provinceInput.value = provinceAuto;
    postalInput.value = postalAuto;
    addressOutput.innerHTML = null;
  }
}
// This function globally takes care of shiping procedure
let shippingAddressPromise;
function shippingProcedure(
  firstName,
  lastName,
  streetAddress,
  city,
  province,
  postal,
  currencyValue,
  orderArray,
  itemsArray
) {
  $(document).ready(() => $("#example-modal").modal("hide"));
  $(document).ready(() => $("#example-modal-shipping").modal("show"));
  let shippingFirstName = document.getElementById("first-name-shipping");
  let shippingLastName = document.getElementById("last-name-shipping");
  let shippingStreetAddress = document.getElementById("home-address-shipping");
  let shippingCity = document.getElementById("city-shipping");
  let shippingProvince = document.getElementById("province-shipping");
  let shippingPostal = document.getElementById("postal-code-shipping");
  function populateShippingAddress(shippingAddressSplit) {
    let shippingAddressOutput = document.getElementById(
      "shipping-address-response"
    );
    let shippingStreetAuto = shippingAddressSplit[0];
    let shippingCityAuto = shippingAddressSplit[1];
    let shippingProvinceAuto = shippingAddressSplit[2];
    let shippingPostalAuto = shippingAddressSplit[3];
    let shippingStreetInput = document.getElementById("home-address-shipping");
    let shippingCityInput = document.getElementById("city-shipping");
    let shippingProvinceInput = document.getElementById("province-shipping");
    let shippingPostalInput = document.getElementById("postal-code-shipping");
    shippingStreetInput.value = shippingStreetAuto;
    shippingCityInput.value = shippingCityAuto;
    shippingProvinceInput.value = shippingProvinceAuto;
    shippingPostalInput.value = shippingPostalAuto;
    shippingAddressOutput.innerHTML = null;
  }
  shippingStreetAddress.addEventListener("input", async (e) => {
    shippingAddressPromise = await fetch(
      `https://geocoder.ca/?autocomplete=1&geoit=xml&auth=test&json=1&locate=${e.target.value}`
    );
    let shippingAddressResponse = await shippingAddressPromise.json();
    let shippingAddressFinal = shippingAddressResponse.streets.street;
    let shippingAddressSplit = shippingAddressFinal.split(", ");
    let shippingAddressOutput = document.getElementById(
      "shipping-address-response"
    );
    shippingAddressOutput.innerHTML = shippingAddressFinal;
    shippingAddressOutput.addEventListener("click", () =>
      populateShippingAddress(shippingAddressSplit)
    );
  });
  // This function takes care of populating the data if shipping information is the same as billing
  function autoPopulate(
    firstName,
    lastName,
    streetAddress,
    city,
    province,
    postal,
    currencyValue,
    orderArray,
    itemsArray
  ) {
    shippingFirstName.value = firstName.value;
    shippingLastName.value = lastName.value;
    shippingStreetAddress.value = streetAddress.value;
    shippingCity.value = city.value;
    shippingProvince.value = province.value;
    shippingPostal.value = postal.value;
    validateShippingEntries(
      shippingFirstName,
      shippingLastName,
      shippingStreetAddress,
      shippingCity,
      shippingProvince,
      shippingPostal,
      currencyValue,
      orderArray,
      itemsArray
    );
  }
  let checkbox = document.getElementById("same-as-billing");
  checkbox.addEventListener("click", () => {
    if (checkbox.checked === true) {
      autoPopulate(
        firstName,
        lastName,
        streetAddress,
        city,
        province,
        postal,
        currencyValue,
        orderArray,
        itemsArray
      );
    } else {
      let shippingFirstName = document.getElementById("first-name-shipping");
      let shippingLastName = document.getElementById("last-name-shipping");
      let shippingStreetAddress = document.getElementById(
        "home-address-shipping"
      );
      let shippingCity = document.getElementById("city-shipping");
      let shippingProvince = document.getElementById("province-shipping");
      let shippingPostal = document.getElementById("postal-code-shipping");
      shippingFirstName.value = null;
      shippingLastName.value = null;
      shippingStreetAddress.value = null;
      shippingCity.value = null;
      shippingProvince.value = null;
      shippingPostal.value = null;
      validateShippingEntries(
       shippingFirstName,
        shippingLastName,
        shippingStreetAddress,
        shippingCity,
        shippingProvince,
        shippingPostal,
        currencyValue,
        orderArray,
        itemsArray
      );
    }
  });
  let proceedToCheckoutButton = document.getElementById("proceed-to-checkout");
  proceedToCheckoutButton.addEventListener("click", () => {
    validateShippingEntries(
      shippingFirstName,
      shippingLastName,
      shippingStreetAddress,
      shippingCity,
      shippingProvince,
      shippingPostal,
      currencyValue,
      orderArray,
      itemsArray
    );
  });
}
// Final checkout function
function finalCheckout(currencyValue, orderArray, itemsArray) {
  $(document).ready(() => $("#example-modal-shipping").modal("hide"));
  $(document).ready(() => $("#checkoutModal").modal("hide"));
  $(document).ready(() => $("#checkout-procedure").modal("show"));
  let itemsTitle = document.querySelectorAll("#td-title");
  let itemsQty = document.querySelectorAll("#td-value");
  let itemsPrice = document.querySelectorAll("#td-price");
  let itemsSubtotal = document.querySelectorAll("#td-subtotal");
  let mainDiv = document.getElementById("checkout-table");
  if (mainDiv.children.length > 1) {
    while (mainDiv.firstChild) {
      mainDiv.removeChild(mainDiv.firstChild);
    }
  } else null;
  // Dynamically creates new fragment and appends it to HTML file 
  for (let i = 0; i < itemsTitle.length; i++) {
    let newDiv = document.createElement("tr");
    newDiv.setAttribute("class", "checkout-table-row");
    // Line 819 reduces the name of product to 4 words which will fit into a table
    let checkoutFragment = `
      <td>${itemsTitle[i].innerHTML.split(" ").slice(0, 4).join(" ")}</td>
      <td>${itemsQty[i].innerHTML}</td>
      <td>${itemsPrice[i].innerHTML}</td>
      <td>${itemsSubtotal[i].innerHTML}</td>
    `;
    newDiv.innerHTML = checkoutFragment;
    mainDiv.appendChild(newDiv);
  }
  let table = document.getElementById("table-body");
  let checkElement = document.getElementById("new-tbody");
  if (checkElement) {
    checkElement.remove();
  } else null;
  let newTbody = document.createElement("tbody");
  newTbody.setAttribute("id", "new-tbody");
  let subtotalAmountForCheckout = document.getElementById("subtotalAmount");
  let subtotalValue = parseFloat(subtotalAmountForCheckout.innerHTML).toFixed(
    2
  );
  let shippingValue = parseFloat(
    subtotalAmountForCheckout.innerHTML * 0.1
  ).toFixed(2);
  let taxValue = taxCalculation().toFixed(2);
  let grandTotal = (
    parseFloat(subtotalValue) +
    parseFloat(shippingValue) +
    parseFloat(taxValue)
  ).toFixed(2);
  let newFragment = `
      <tr>
        <td style="font-weight: bold">Subtotal</td>
        <td></td>
        <td></td>
        <td>${currencySymbol(currencyValue)}${subtotalValue}</td>
      </tr>
      <tr>
        <td style="font-weight: bold">Shipping</td>
        <td></td>
        <td></td>
        <td>${currencySymbol(currencyValue)}${shippingValue}</td>
      </tr>
      <tr>
        <td style="font-weight: bold">Tax</td>
        <td></td>
        <td></td>
       <td id="tax-value">${currencySymbol(currencyValue)}${taxValue}</td>
      </tr>
      <tr>
        <td style="font-weight: bold">Order total</td>
        <td></td>
        <td></td>
        <td><span>${currencySymbol(currencyValue)}</span>${grandTotal}</td>
      </tr>
    `;
  newTbody.innerHTML = newFragment;
  table.appendChild(newTbody);
  orderArray.push(shippingValue, taxValue, grandTotal);
  let sendOrder = document.getElementById("send-order-button");
  sendOrder.addEventListener("click", () =>
    submitOrder(orderArray, itemsArray)
  );
  // This function calculates tax according to shipping province
  function taxCalculation() {
    let subtotalAmountForCheckoutTax = parseFloat(
      document.getElementById("subtotalAmount").innerHTML
    );
    let shipping = parseFloat(subtotalAmountForCheckoutTax * 0.1);
    let sum = (subtotalAmountForCheckoutTax + shipping).toFixed(2);
    let provinceTag = document.getElementById("province-shipping");
    let province = provinceTag.value;
    switch (province) {
      case "AB" || "YT" || "NT" || "NU":
        return sum * 0.05;
      case "BC" || "MN":
        return sum * 0.12;
      case "NB" || "NL" || "NS" || "PE" || "QC":
        return sum * 0.15;
      case "ON":
        return sum * 0.13;
      case "SK":
        return sum * 0.11;
    }
  }
}
// Function sends order to a specified URL
async function submitOrder(orderArray, itemsArray) {
  let finalUrl = `https://deepblue.camosun.bc.ca/~c0180354/ics128/final/`;
  // Declaring an object and filling it with data
  let order = {};
  order.billing = {};
  order.shipping = {};
  order.items = {};
  order.card_number = orderArray[1];
  order.expiry_month = orderArray[2];
  order.expiry_year = orderArray[3];
  order.security_code = orderArray[4];
  order.amount = orderArray[21];
  order.taxes = orderArray[20];
  order.shipping_amount = orderArray[19];
  order.currency = orderArray[0];
  for (i = 0; i < itemsArray.length; i++) {
    order.items[i] = itemsArray[i];
  }
  order.billing.first_name = orderArray[5];
  order.billing.last_name = orderArray[6];
  order.billing.address_1 = orderArray[7];
  order.billing.city = orderArray[8];
  order.billing.province = orderArray[9];
  order.billing.postal = orderArray[10];
  order.billing.phone = orderArray[11];
  order.billing.email = orderArray[12];
  order.shipping.first_name = orderArray[13];
  order.shipping.last_name = orderArray[14];
  order.shipping.address_1 = orderArray[17];
  order.shipping.city = orderArray[16];
  order.shipping.province = orderArray[15];
  order.shipping.postal = orderArray[18];
  // Creating JSON out of an object
  const orderJSON = JSON.stringify(order);
  const file = new Blob([orderJSON], { type: "application/json" });
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch(finalUrl, {
    method: "POST",
    cache: "no-cache",
    body: formData,
  });
  if (response.ok) {
    $(document).ready(() => $("#checkout-procedure").modal("hide"));
    modalWarning(
      "Success",
      "Congratulations! Your order has been succesfully submitted."
    );
    let okButton2 = document.getElementById("buttonOk");
    okButton2.addEventListener("click", () => {
      window.localStorage.clear();
      window.location.reload();
    });
  } else {
    modalWarning(
      "Error",
      "There was an error sending your order, please try again."
    );
    let okButton3 = document.getElementById("buttonOk");
    okButton3.addEventListener("click", () => {
      window.location.reload();
    });
  }
}