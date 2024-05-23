/* global saveDataToFile */

function saveJsonFile(data, fileName) {
  // Convert data to JSON string
  const jsonString = JSON.stringify(data, null, 2);
  saveDataToFile(jsonString, 'application/json', `${fileName}-lss.json`);
  // // Create a Blob from the JSON string
  // const blob = new Blob([jsonString], { type: "application/json" });
  //
  // // Use the saveAs function from FileSaver.js
  // saveAs(blob, fileName);
}

export default saveJsonFile;
