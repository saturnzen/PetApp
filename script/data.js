"use strict";

// const { saveAs } = require("./FileSaver.js");

const importBtn = document.getElementById("import-btn");
const exportBtn = document.getElementById("export-btn");
const inputFile = document.getElementById("input-file");
let textToImport;

// Các sự kiện
//Export file
exportBtn.addEventListener("click", function () {
  saveData("petArrLocalStorage");
  saveData("breedArrLocalStorage");
});

//Import file
importBtn.addEventListener("click", importData);

// Các function
const formatter = new Intl.DateTimeFormat("vi-VN", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

// export
function saveData(arLocalStorage) {
  //https://websparrow.org/web/how-to-create-and-save-text-file-in-javascript
  const fileExport =
    getFromStorage(arLocalStorage) === undefined
      ? ""
      : getFromStorage(arLocalStorage);
  console.log(fileExport);
  let blob = new Blob([fileExport], { type: "text/plain;charset=utf-8" });
  saveAs(blob, `${arLocalStorage}-${formatter.format(new Date())}`);
}

//import
function importData() {
  // console.log(inputFile.value.includes("breed"));
  saveToStorage("breedArrLocalStorage", textToImport);
  console.log("done");
  if (inputFile.value.includes("breed")) {
    saveToStorage("breedArrLocalStorage", textToImport);
    importBtn.innerText = "Imported Breed Data";
    console.log("Imported Breed Data");
  }
  if (inputFile.value.includes("pet")) {
    //xử lý để ghi vào dữ liệu có sẵn hơn là ghi đè
    const petArr =
      getFromStorage("petArrLocalStorage") === undefined
        ? []
        : JSON.parse(getFromStorage("petArrLocalStorage"));
    const importArr = JSON.parse(textToImport);
    importArr.forEach(function (pet) {
      for (let i = 0; i < petArr.length; i++) {
        if (petArr[i].id === pet.id) {
          petArr[i] = pet;
        }
      }
    });
    saveToStorage("petArrLocalStorage", JSON.stringify(petArr));
    importBtn.innerText = "Imported Pet Data";
    console.log("Imported Pet Data");
  }
}

//https://stackoverflow.com/questions/750032/reading-file-contents-on-the-client-side-in-javascript-in-various-browsers
// lấy text từ file upload
async function readText(event) {
  const file = event.target.files.item(0);
  const text = await file.text();
  textToImport = text;
  if (inputFile.value.includes("breed")) {
    importBtn.innerText = "Import Breed Data";
  }
  if (inputFile.value.includes("pet")) {
    importBtn.innerText = "Import Pet Data";
  }

  // document.getElementById("import-btn").innerText = text;
}
