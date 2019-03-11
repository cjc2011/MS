function quickSort(elements, value){
  if(elements.length<=1){
      return elements;
  }
  debugger
  var pivotIndex = Math.floor(elements.length/2);
  var pivot = elements.splice(pivotIndex,1)[0];
  var left = [];
  var right = [];
  for(var i=0;i<elements.length;i++){
      if(elements[i]<pivot){
          left.push(elements[i]);
      }else{
          right.push(elements[i]);
      }
  }
  
  return quickSort(left,'left').concat([pivot],quickSort(right,'right'));
}
var elementss = [5,6,2,1,3,8,7,1.2,5.5,4.5]
console.log(quickSort(elementss, 'noe'))