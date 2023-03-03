// func to read a csv file and return a json object
//
// @param {string} filename - the name of the file to read
// @return {object} - the json object

// const field=require('./field.js');
// filename = "./testcsv.csv";
// //array of fields
// var my_fields = [];


// function readCSV(filename) {
//     var fs = require('fs');
//     var csv = require('fast-csv');
//     var json = {};
//     let i = 0;
//     var csvStream = csv
//         .parseFile(filename)
//         .on("data", function(data) {

//             // console.log(data);
//             new_field= new field(data[5],data[7]);
//             my_fields.push(new_field);
//             console.log(my_fields.length);

//             // json[data[0]] = data[1];
//         })
//         .on("end", function () {
//             return my_fields;
//         });
        
// }
// //call the function

// fields=new readCSV(filename)
//  console.log(fields.length);

// for (let i = 0; i < fields.length; i++) {
//     console.log(fields[i].name);
//     console.log(fields[i].type);
// }

const field = require('./field.js');
const filename = "./testcsv.csv";

function readCSV(filename) {
    return new Promise((resolve, reject) => {
        const csv = require('fast-csv');
        const my_fields = [];

        csv.parseFile(filename)
            .on("data", (data) => {
                const new_field = new field(data[5], data[7]);
                my_fields.push(new_field);
            })
            .on("end", () => {
                resolve(my_fields);
            })
            .on("error", (error) => {
                reject(error);
            });
    });
}

var final_fields =[];

readCSV(filename)
    .then((fields) => {
        console.log(fields.length);
        prev_name=""
        for (let i = 0; i < fields.length; i++) {
            //find fields with unique names

            

            if(fields[i].name == prev_name ){
                console.log("same");
                continue;
            }
            final_fields.push(fields[i]);
            //console.log(fields[i].name);
            prev_name=fields[i].name;
            // console.log(fields[i].type);
        }
    })
    .catch((error) => {
        console.error(error);
    });

    for (let i = 0; i < final_fields.length; i++) {
        console.log(final_fields[i].name);
        console.log(final_fields[i].type);
    }

