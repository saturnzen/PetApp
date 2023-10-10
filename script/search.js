"use strict";

//Các id được sử dụng

const sidebarEl = document.getElementById("sidebar");
const breedInput = document.getElementById("input-breed");
const idInput = document.getElementById("input-id");
const findBtn = document.getElementById("find-btn");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");
//danh sách thú cưng
let petArrStringify;

const petArr =
  getFromStorage("petArrLocalStorage") === undefined
    ? []
    : JSON.parse(getFromStorage("petArrLocalStorage"));
// danh sách ID dùng cho xóa dữ liệu
const listID = [];
petArr.forEach((pet) => listID.push(pet.id));

const formatter = new Intl.DateTimeFormat("vi-VN", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});
// cập nhập lại format của date do chuyển đổi qua lại
petArr.forEach((pet) => (pet.date = new Date(pet.date)));

// các function

function uppercaseFirstLetter(text) {
  return text[0].toUpperCase() + text.slice(1);
}
//Validate dữ liệu
// Kiểm tra tên đã được nhập chưa,
// nếu chưa thì trả về giá trị true (lấy hết danh sách)
//nếu rồi thì kiểm tra theo ký tự tên
function checkFieldName(pet, field, valueCheck) {
  if (valueCheck === "") {
    return true;
  } else {
    return pet[filed].includes(valueCheck);
  }
}

function checkFieldType(pet, field, valueCheck) {
  // Kiểm tra giá trị, nếu giá trị trả về là Select thì cảnh báo
  if (valueCheck === `Select ${uppercaseFirstLetter(field)}`) {
    return true;
  } else {
    return pet[field] === valueCheck;
  }
}

function checkFieldVaccin(pet, data, valueCheck) {
  // Kiểm tra giá trị, nếu giá trị trả về là Select thì cảnh báo
  if (data[valueCheck] === false) {
    return true;
  } else {
    return pet[valueCheck] === data[valueCheck];
  }
}

//renderBreed vào Breed
//renderBreed: thêm Breed vào option

function renderBreed() {
  //xóa Breed đã tạo trước đó
  for (let i = 0; i <= breedInput.options.length + 2; i++) {
    breedInput.options.remove(1);
  }
  // tiến hành thêm vào
  const breedArr =
    getFromStorage("breedArrLocalStorage") === undefined
      ? []
      : JSON.parse(getFromStorage("breedArrLocalStorage"));
  // lấy tất cả breed, không phân biệt dog hay cat
  const breedOnly = [];
  breedArr.forEach((br) => breedOnly.push(br.name));
  breedOnly.sort();
  breedOnly.forEach((breed) => {
    const option = document.createElement("option");
    option.textContent = breed;
    // optionDog.innerHTML = `${dog.name}`;
    breedInput.appendChild(option);
  });
}

//renderTableData
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
  <td>${formatter.format(petArr.date)}</td>`;
  tableBodyEl.appendChild(row);
}

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

// Các sự kiện
//Assignment 2

// 1. Bắt sự kiện click vào sidebar, toggle class active
// const sidebarEl = document.getElementById("sidebar");
sidebarEl.addEventListener("click", function (e) {
  //dùng preventDefault sẽ ngăn việc chuyển trang bằng button trên sidebar
  // e.preventDefault();
  sidebarEl.classList.toggle("active");
});

// khi chọn Breed
breedInput.addEventListener("click", renderBreed);
//khi ấn nút find
findBtn.addEventListener("click", function () {
  // lấy dữ liệu và kiểm tra trước khi nhập lại vào bảng
  const data = {
    id: idInput.value,
    name: nameInput.value,
    type: typeInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
  };
  console.log(data);
  //Validate dữ liệu{
  let truePetArr = [];
  truePetArr = petArr.filter(
    (pet) =>
      checkFieldName(pet, "id", data.id) &&
      checkFieldName(pet, "name", data.name) &&
      checkFieldType(pet, "type", data.type) &&
      checkFieldType(pet, "breed", data.breed) &&
      checkFieldVaccin(pet, data, "vaccinated") &&
      checkFieldVaccin(pet, data, "dewormed") &&
      checkFieldVaccin(pet, data, "sterilized")
  );
  console.log(truePetArr);
  // 5. hiển thị  danh sách thú cưng
  showDanhSachThuCung(truePetArr);
});
