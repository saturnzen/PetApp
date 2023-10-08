"use strict";

//khai báo dữ liệu
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const bmiBtn = document.getElementById("bmi-btn");
const tableBodyEl = document.getElementById("tbody");
const containerForm = document.getElementById("container-form");

//danh sách thú cưng
let petArrStringify;

const petArr =
  getFromStorage("petArrLocalStorage") === undefined
    ? []
    : JSON.parse(getFromStorage("petArrLocalStorage"));
// danh sách ID dùng cho xóa dữ liệu
const listID = [];
petArr.forEach((pet) => listID.push(pet.id));

//Hiển thị
//dùng showdanhsachthucung
//Validate dữ liệu
// Kiểm tra tên đã được nhập chưa
const checkName = (valueCheck) => {
  if (valueCheck === "") {
    alert(`Please input name`);
  } else {
    return true;
  }
};
// Kiểm tra tính hợp lệ của ID

const checkID = (valueCheck) => {
  // nếu chưa nhập thì cảnh báo
  if (valueCheck === "") {
    alert(`Please input ID`);
  } else if (listID.includes(valueCheck)) {
    alert(`ID must be unique!`);
    listID.pop();
  } else {
    listID.push(valueCheck);
    return true;
  }
};
// kiểm tra giá trị của age, weight và length
function checkValueLength(valueCheck, limit, text) {
  // Kiểm tra giá trị, nếu giá trị trả về dài hơn lengLimit, thông báo và không nhận giá trị
  if (isNaN(valueCheck) || valueCheck === undefined) {
    alert(`Please input ${text}`);
    console.log(`Please input ${text}`);
  } else if (valueCheck > limit || valueCheck < 1) {
    alert(`${text} must be between 1 and ${limit}!`);
  } else {
    return true;
  }
}
// kiểm tra đã chọn trong Type và Breed
function checkSelected(valueCheck, text) {
  // Kiểm tra giá trị, nếu giá trị trả về là Select thì cảnh báo
  if (valueCheck === `Select ${text}`) {
    alert(`Please select ${text}! `);
    return false;
  } else {
    return true;
  }
}

//bấm vào nút edit
function startEditPet(petId) {
  // hiển thị form
  containerForm.classList.remove("hide");
  //bắt dữ liệu vào form
  const indexOfPetId = listID.indexOf(petId);
  inputToForm(petArr[indexOfPetId]);
}

// bắt dữ liệu vào

function inputToForm(pet) {
  idInput.value = pet.id;
  nameInput.value = pet.name;
  ageInput.value = pet.age;
  typeInput.value = pet.type;
  renderBreed();
  weightInput.value = pet.weight;
  lengthInput.value = pet.length;
  breedInput.value = pet.breed;
  vaccinatedInput.checked = pet.vaccinated;
  dewormedInput.checked = pet.dewormed;
  sterilizedInput.checked = pet.sterilized;
}

// Format date
// https://www.freecodecamp.org/news/how-to-format-a-date-with-javascript-date-formatting-in-js/
const formatter = new Intl.DateTimeFormat("vi-VN", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});
// cập nhập lại format của date do chuyển đổi qua lại
petArr.forEach((pet) => (pet.date = new Date(pet.date)));

// 5. Hiển thị danh sách thú cưng

//renderBreed: thêm Breed vào option

function renderBreed() {
  for (let i = 0; i <= breedInput.options.length + 2; i++) {
    console.log(breedInput.options.length);
    breedInput.options.remove(1);
    console.log(breedInput.options[1], i, breedInput.options.length);
  }
  const breedArr =
    getFromStorage("breedArrLocalStorage") === undefined
      ? []
      : JSON.parse(getFromStorage("breedArrLocalStorage"));
  const dogArr = breedArr.filter((breed) => breed.type === "Dog");
  const catArr = breedArr.filter((breed) => breed.type === "Cat");

  if (typeInput.value === "Dog") {
    dogArr.forEach((dog) => {
      const optionDog = document.createElement("option");
      optionDog.textContent = dog.name;
      // optionDog.innerHTML = `${dog.name}`;
      breedInput.appendChild(optionDog);
    });
  }
  if (typeInput.value === "Cat") {
    catArr.forEach((cat) => {
      const optionCat = document.createElement("option");
      optionCat.textContent = cat.name;
      breedInput.appendChild(optionCat);
    });
  }
}

// 5.1 tạo danh sách thú cưng
function renderTableData(petArr) {
  const row = document.createElement("tr");
  row.innerHTML = `<tr>
  <th scope="row">${petArr.id}</th>
  <td>${petArr.name} </td>
  <td>${petArr.age}</td>
  <td>${petArr.type}</td>
  <td>${petArr.weight} kg</td>
  <td>${petArr.length} cm</td>
  <td>${petArr.breed}</td>
  <td>
    <i class="bi bi-square-fill" style="color: ${petArr.color}"></i>
  </td>
  <td>${
    petArr.vaccinated
      ? `<i class="bi bi-check-circle-fill"></i>`
      : `<i class="bi bi-x-circle-fill"></i>`
  }</td>
  <td>${
    petArr.dewormed
      ? `<i class="bi bi-check-circle-fill"></i>`
      : `<i class="bi bi-x-circle-fill"></i>`
  }</td>
  <td>${
    petArr.sterilized
      ? `<i class="bi bi-check-circle-fill"></i>`
      : `<i class="bi bi-x-circle-fill"></i>`
  }</td>
  <td>${formatter.format(petArr.date)}</td>
  <td><button type="button" class="btn btn-danger" onclick="startEditPet('${
    petArr.id
  }')">Edit</button>
  </td>
</tr>`;
  tableBodyEl.appendChild(row);
}

// 5.2 hiển thị nó
// 5. hiển thị danh sách thú cưng
function showDanhSachThuCung(petArr) {
  //khởi tạo lại bảng để tránh lặp dữ liệu hiển thị
  tableBodyEl.innerHTML = "";
  const row = document.createElement("tr");
  // iterate qua dữ liệu và hiển thị
  for (let i = 0; i < petArr.length; i++) {
    renderTableData(petArr[i]);
  }
}

// Clearinput khi chạy trang hoặc trước khi nhập liệu mới
function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

// khóa trường mặc định bằng getAttribute
//validate dữ liệu trước khi submit vào thay đổi

//2. Lấy được dữ liệu từ các Input Form
//3. Validate dữ liệu hợp lệ
submitBtn.addEventListener("click", function () {
  // lấy dữ liệu và kiểm tra trước khi nhập lại vào bảng
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
    bmi: "?",
  };
  //Validate dữ liệu{
  if (
    checkName(data.name) &&
    checkValueLength(data.age, 15, "Age") &&
    checkValueLength(data.weight, 15, "Weight") &&
    checkValueLength(data.length, 100, "Length") &&
    checkSelected(data.type, "Type") &&
    checkSelected(data.breed, "Breed")
  ) {
    // cập nhập dữ liệu vào object dữ liệu theo data.id
    console.log(data);
    const indexOfPetId = listID.indexOf(data.id);
    console.log(indexOfPetId);
    petArr[indexOfPetId].name = data.name;
    petArr[indexOfPetId].age = data.age;
    petArr[indexOfPetId].type = data.type;
    petArr[indexOfPetId].weight = data.weight;
    petArr[indexOfPetId].length = data.length;
    petArr[indexOfPetId].breed = data.breed;
    petArr[indexOfPetId].vaccinated = data.vaccinated;
    petArr[indexOfPetId].dewormed = data.dewormed;
    petArr[indexOfPetId].sterilized = data.sterilized;

    // Ass2.2 lưu dữ liệu vào dạng JSON và lưu vào localStorage
    // petArrStringify = JSON.stringify(petArr);
    saveToStorage("petArrLocalStorage", JSON.stringify(petArr));
  }
  // 5. hiển thị  danh sách thú cưng
  showDanhSachThuCung(petArr);

  // ẩn form đi
  containerForm.classList.add("hide");
});
// show danh sách thú cưng lấy từ localStorage khi khởi chạy web

typeInput.addEventListener("change", renderBreed);
showDanhSachThuCung(petArr);
