//create an enumeration
const fieldTypes = Object.freeze({"wholetext":1, "letterbyletter":2, "checkbox":3});

class field {
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.image = null;      // imagepath for wholetext and checkbox
        this.images = [];       // imagepaths for letter by letter
        this.text = null;
        this.checkboxValue = false;
        this.OCRoutput = null;
        this.correctedText = null;
        this.fieldDBtableName = name;

        this.editDistanceRan = false;
    }

    addImage(image) {
        this.image = image;
    }

    //! interface
    print() {
        console.log(this.name);
        console.log(this.type);
        console.log(this.text);
        console.log(this.OCRoutput);
        console.log(this.correctedText);
        console.log(this.fieldDBtableName);
        if(this.type == fieldTypes.wholetext || this.type == fieldTypes.checkbox) {
            console.log(this.image);
        } else if(this.type == fieldTypes.letterbyletter) {
            console.log(this.images);
        }
    }

    //! interface
    process() {
        processField(this);
    }

    runEditDistanceOnDB() {
        // run the edit distance algorithm on the database
        // set the estimated corrected text
        // set the estimated suggestions 
    }

    getCorrectedTextFromDB() {
        // check if edit distance algorithm has been run
        // if not run it
        // return the corrected text
    }

    getSuggestionsFromDB() {
        // check if edit distance algorithm has been run
        // if not run it
        // return the suggestions
    }

    toJSON() {
        return JSON.stringify(this);
    }

    putMetadataIntoFolder(foldername) {
        
    }
}


function processField(field) {
    if(field.type == fieldTypes.wholetext) {
        console.log("Sending the image to the OCR");
    } else if(field.type == fieldTypes.letterbyletter) {
        console.log("Sending the images to the OCR");
    } else if(field.type == fieldTypes.checkbox) {
        console.log("Sending the image to open cv");
    }
}
module.exports = field;