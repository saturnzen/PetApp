"use strict";

// Các biến
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const submitBtn = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");

// tạo mảng breedArr
const breedArr =
  getFromStorage("breedArrLocalStorage") === undefined
    ? []
    : JSON.parse(getFromStorage("breedArrLocalStorage"));
const breedID = [];
breedArr.forEach((breed) => breedID.push(breed.id));

//các function
//validate dữ liệu
// Kiểm tra tên đã được nhập chưa
const checkName = (valueCheck) => {
  if (valueCheck === "") {
    alert(`Please input name`);
  } else {
    return true;
  }
};

//Kiểm tra đã chọn type hay chưa
function checkSelected(valueCheck, text) {
  // Kiểm tra giá trị, nếu giá trị trả về là Select thì cảnh báo
  if (valueCheck === `Select ${text}`) {
    alert(`Please select ${text}! `);
    return false;
  } else {
    return true;
  }
}

// Xóa các dữ liệu vừa nhập trên Form sau khi ấn Submit thành công
function clearInput() {
  typeInput.value = "Select Type";
  breedInput.value = "";
}

// hiển thị danh sách Breed
function showDanhSachBreed(breedArr) {
  // Ass2.2 lưu dữ liệu vào dạng JSON và lưu vào localStorage
  // petArrStringify = JSON.stringify(petArr);
  saveToStorage("breedArrLocalStorage", JSON.stringify(breedArr));
  //reset cấu trúc của breedID
  breedID.splice(0, breedID.length + 1);
  breedArr.forEach((breed) => breedID.push(breed.id));
  //khởi tạo lại bảng để tránh lặp dữ liệu hiển thị
  tableBodyEl.innerHTML = "";
  const row = document.createElement("tr");
  // iterate qua dữ liệu và hiển thị
  for (let i = 0; i < breedArr.length; i++) {
    renderTableData(breedArr[i], i);
  }
}

// ghi một breed vào bảng
function renderTableData(breedArr, i) {
  const row = document.createElement("tr");

  row.innerHTML = `<tr>
      <th scope="row">${i + 1}</th>
      <td>${breedArr.name} </td>
      <td>${breedArr.type}</td>
      <td><button type="button" class="btn btn-danger" onclick="deleteBreed(${
        breedArr.id
      })">Delete</button>
      </td>
    </tr>`;
  tableBodyEl.appendChild(row);
}

//7. Xóa một breed
function deleteBreed(id) {
  // Confirm before deleteBreed

  if (confirm("Are you sure?")) {
    // lấy vị trí của ID từ breedID, dùng nó để xóa object tương ứng trong breedArr
    const indexOfBreedId = breedID.indexOf(id);
    console.log(indexOfBreedId, breedID, breedArr);
    breedID.splice(indexOfBreedId, 1);
    breedArr.splice(indexOfBreedId, 1);
    saveToStorage("breedArrLocalStorage", JSON.stringify(breedArr));
    // show lại danh sach thu cung sau khi xóa
    showDanhSachBreed(breedArr);
  }
}

//Các sự kiện

showDanhSachBreed(breedArr);
//Thêm Breed
submitBtn.addEventListener("click", function () {
  // Lấy dữ liệu
  const data = {
    name: breedInput.value,
    type: typeInput.value,
  };

  //Validate dữ liệu{
  if (checkName(data.name) && checkSelected(data.type, "Type")) {
    // 4. thêm thú cưng vào danh sách
    breedArr.push(data);
    breedArr[breedArr.indexOf(data)].id = breedArr.indexOf(data) + 1;
    clearInput();
  }
  // 5. hiển thị  danh sách thú cưng
  showDanhSachBreed(breedArr);
});
