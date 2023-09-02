"use strict";
//bắt sự kiện CLick vào nút submit
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

//danh sách thú cưng
const petArr = [];

// danh sách ID dùng cho xóa dữ liệu
const listID = [];

//8. Hiển thị các thú cưng khỏe mạnh

// false: hiển thị toàn bộ thú cưng
// true: chỉ hiển thị thú cưng khỏe mạnh
let healthyCheck = false;

// mảng lưu danh sách thú cưng là Healthy Pet
const healthyCheckBtn = document.getElementById("healthy-btn");

// các function
function uppercaseFirstLetter(text) {
  return text[0].toUpperCase() + text.slice(1);
}

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

// Format date
// https://www.freecodecamp.org/news/how-to-format-a-date-with-javascript-date-formatting-in-js/
const formatter = new Intl.DateTimeFormat("vi-VN", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

// 5. Hiển thị danh sách thú cưng
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
  <td>${petArr.bmi}</td>
  <td>${formatter.format(petArr.date)}</td>
  <td><button type="button" class="btn btn-danger" onclick="deletePet('${
    petArr.id
  }')">Delete</button>
  </td>
</tr>`;
  tableBodyEl.appendChild(row);
}

// 5.2 hiển thị nó
// 5. hiển thị danh sách thú cưng
function showDanhSachThuCung(petArr) {
  tableBodyEl.innerHTML = "";
  const row = document.createElement("tr");
  for (let i = 0; i < petArr.length; i++) {
    renderTableData(petArr[i]);
  }
}

// 6. Xóa các dữ liệu vừa nhập trên Form
const clearInput = () => {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select type";
  weightInput.value = "";
  lengthInput.value = "";
  breedInput.value = "Select breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

//7. Xóa một thú cưng
const deletePet = (petId) => {
  // Confirm before deletePet
  if (confirm("Are you sure?")) {
    // lấy vị trí của ID từ listID, dùng nó để xóa object tương ứng trong petArr
    const indexOfPetId = listID.indexOf(petId);
    listID.splice(indexOfPetId, 1);
    petArr.splice(indexOfPetId, 1);
    // show lại danh sach thu cung sau khi xoa
    showDanhSachThuCung();
  }
};

// 8. Hiển thị các thú cưng khỏe mạnh

healthyCheckBtn.addEventListener("click", function () {
  if (healthyCheck === false) {
    document.querySelector("#healthy-btn").textContent = "Show All Pet";
    healthyCheck = true;
    const healthyPetArr = petArr.filter((el) => {
      return el.vaccinated && el.dewormed && el.sterilized;
    });
    showDanhSachThuCung(healthyPetArr);
    console.log(healthyPetArr);
    console.log(petArr);
  } else {
    document.querySelector("#healthy-btn").textContent = "Show Healthy Pet";
    healthyCheck = false;
    showDanhSachThuCung(petArr);
  }
});
// 9. (Nâng cao) Tính toán chỉ số BMI
const calcBMI = function (petArr) {
  const animalJustified = {
    Dog: 703,
    Cat: 886,
  };
  return (
    (petArr.weight * animalJustified[petArr.type]) /
    (petArr.length * petArr.length)
  );
};
//2. Lấy được dữ liệu từ các Input Form
//3. Validate dữ liệu hợp lệ
submitBtn.addEventListener("click", function () {
  // lấy dữ liệu
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
    checkSelected(data.breed, "Breed") &&
    checkID(data.id)
  ) {
    // 4. thêm thú cưng vào danh sách
    petArr.push(data);
    clearInput();
  }
  // 5. hiển thị  danh sách thú cưng
  showDanhSachThuCung(petArr);
});

//9. (Nâng cao) Tính toán chỉ số BMI
bmiBtn.addEventListener("click", function () {
  for (let i = 0; i < petArr.length; i++) {
    petArr[i].bmi = calcBMI(petArr[i]).toFixed(2);
  }
  showDanhSachThuCung(petArr);
});
