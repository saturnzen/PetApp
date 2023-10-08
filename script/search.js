"use strict";

//Các id được sử dụng
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

// Các sự kiện

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
      pet.id.includes(data.id) &&
      data.name.includes(data.name) &&
      pet.type === data.type &&
      pet.breed === data.breed &&
      pet.vaccinated === data.vaccinated &&
      pet.dewormed === data.dewormed &&
      pet.sterilized === data.sterilized
  );
  console.log(truePetArr);
  // 5. hiển thị  danh sách thú cưng
  showDanhSachThuCung(truePetArr);

  // ẩn form đi
  // containerForm.classList.add("hide");
});

// các function

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
