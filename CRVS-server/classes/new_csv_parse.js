const field = require('./field.js');
const readline = require('readline');
const fs = require('fs');
const filename = './testcsv.csv';



function tokenizeByComma(data) {
    return data.split(',');
}
const data = fs.readFileSync(filename);
const lines = data.toString().split('\n');

for (let line of lines) {
    console.log(tokenizeByComma(line));
}


// squish the same field names together
var previous_name = "";
var final_fields = [];
var final_field_i = -1;

// rl.on('line', (line) => {
//     const tokens = tokenizeByComma(line);
//     var name = tokens[5];
//     var index = tokens[6];
//     var type = tokens[7];

//     var new_name_found = (name != previous_name);
//     if (new_name_found) {
//         var new_field = new field(name, type);
//         final_fields.push(new_field);
//         final_field_i++;
//         previous_name = name;
//     }
//     var imagefilename;

//     if(type == 'OCR_CHAR' || type == 'CHECKBOX')
//         imagefilename = name + index;
//     else 
//         imagefilename = name;
    
    
//     var imagePath = './' + name + '/' + imagefilename + '.png';
//     if (type == 'OCR_CHAR' || type == 'CHECKBOX') {
//         final_fields[final_field_i].images[index-1] = imagePath;
//     } else {
//         final_fields[final_field_i].image = imagePath;
//     }
    
//     if(new_name_found){
//         var jsonString = final_fields[final_field_i];
//         fs.writeFile( './'+name+'.json', jsonString, err => {
//             if (err) {
//                 console.error(err);
//                 return;
//             }
//             console.log('JSON file has been saved.');
//         });
//     }
// });

// rl.on('close', () => {
//     console.log('End of input');
// });

// console.log(final_field_i);
// for (let i = 0; i < final_fields.length; i++) {
//     console.log(final_fields[i].name);
//     console.log(final_fields[i].type);
// }

