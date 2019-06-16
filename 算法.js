function quickSort(elements, value) {
  if (elements.length <= 1) {
    return elements;
  }
  var pivotIndex = Math.floor(elements.length / 2);
  var pivot = elements.splice(pivotIndex, 1)[0];
  var left = [];
  var right = [];
  for (var i = 0; i < elements.length; i++) {
    if (elements[i] < pivot) {
      left.push(elements[i]);
    } else {
      right.push(elements[i]);
    }
  }
  
  return quickSort(left, "left").concat([pivot], quickSort(right, "right"));
}

setTimeout(function() {
  console.log(4);
}, 0);
new Promise(function(resolve) {
  console.log(1);
  for (var i = 0; i < 10000; i++) {
    i == 9999 && resolve();
  }
  console.log(2);
}).then(function() {
  console.log(5);
});
console.log(3);
