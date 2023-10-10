"use strict";

// const { saveAs } = require("./FileSaver.js");

const sidebarEl = document.getElementById("sidebar");
const importBtn = document.getElementById("import-btn");
const exportBtn = document.getElementById("export-btn");
const inputFile = document.getElementById("input-file");
let textToImport;

// Các function

//định dạng lại ngày
const formatter = new Intl.DateTimeFormat("vi-VN", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

// export: lưu breed và pet data từ local
function saveData(arLocalStorage) {
  //nguồn: https://websparrow.org/web/how-to-create-and-save-text-file-in-javascript
  //lấy dữ liệu từ local
  const fileExport =
    getFromStorage(arLocalStorage) === undefined
      ? ""
      : getFromStorage(arLocalStorage);
  //lưu lại
  let blob = new Blob([fileExport], { type: "text/plain;charset=utf-8" });
  saveAs(blob, `${arLocalStorage}-${formatter.format(new Date())}.JSON`);
}

//import:

//nguồn: https://stackoverflow.com/questions/750032/reading-file-contents-on-the-client-side-in-javascript-in-various-browsers
// khi upload thành công nhận được file text sẵn sàng cho import vào local
async function readText(event) {
  const file = event.target.files.item(0);
  const text = await file.text();
  textToImport = text;
  //dựa trên tên để chọn là đang breed hay pet,
  //nút import chuyển đổi để dễ nhận biết
  if (inputFile.value.includes("breed")) {
    importBtn.innerText = "Import Breed Data";
  }
  if (inputFile.value.includes("pet")) {
    importBtn.innerText = "Import Pet Data";
  }
}

//lưu dữ liệu vào localStorage
function importData() {
  // console.log(inputFile.value.includes("breed"));
  //upload dựa trên breed hoặc pet
  if (inputFile.value.includes("breed")) {
    saveToStorage("breedArrLocalStorage", textToImport);
    importBtn.innerText = "Imported Breed Data";
    console.log("Imported Breed Data");
  }
  if (inputFile.value.includes("pet")) {
    //xử lý để ghi vào dữ liệu có sẵn hơn là ghi thêm, ghi đè hoàn toàn
    const petArr =
      getFromStorage("petArrLocalStorage") === undefined
        ? []
        : JSON.parse(getFromStorage("petArrLocalStorage"));
    const importArr = JSON.parse(textToImport);
    console.log(importArr);
    const listID = [];
    petArr.forEach((pet) => listID.push(pet.id));

    importArr.forEach(function (pet) {
      //không hoạt động nếu pet rỗng
      // for (let i = 0; i < petArr.length; i++) {
      //   if (petArr[i].id === pet.id) {
      //     petArr[i] = pet;
      //   }
      if (listID.includes(pet.id)) {
        petArr[listID.indexOf(pet.id)] = pet;
      } else petArr.push(pet);
    });
    saveToStorage("petArrLocalStorage", JSON.stringify(petArr));
    importBtn.innerText = "Imported Pet Data";
    console.log("Imported Pet Data");
  }
}

//Assignment 2

// 1. Bắt sự kiện click vào sidebar, toggle class active
// const sidebarEl = document.getElementById("sidebar");
sidebarEl.addEventListener("click", function (e) {
  //dùng preventDefault sẽ ngăn việc chuyển trang bằng button trên sidebar
  // e.preventDefault();
  sidebarEl.classList.toggle("active");
});

// Các sự kiện
//Export file: lưu breed và pet data từ local
exportBtn.addEventListener("click", function () {
  saveData("petArrLocalStorage");
  saveData("breedArrLocalStorage");
});

//Import file
importBtn.addEventListener("click", importData);
