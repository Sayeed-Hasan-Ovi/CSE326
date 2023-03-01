#!/bin/bash

# if the passed argument in not 2, print the usage
if [ $# -ne 1 ]; then
    echo "Usage: $0 <pdf_file>"
    exit 1
fi
# File paths pdf/<pdf_file> input/coordinates.csv intermediate/
pdf_file="pdf/$1"
coordinates_file="input/coordinates.csv"
output="intermediate/"

# if the output directory does not exist, create it
if [ ! -d "$output" ]; then
    mkdir -p "$output"
fi
flag=0
# Read the coordinates from the text file
while IFS= read -r line; do
    # Split the line into coordinates
    IFS=',' read -ra coord <<< "$line"
    # if the line does not have 7 elements, skip it
    if [ ${#coord[@]} -ne 8 ]; then
        echo "Skipping line: $line"
        flag=1
        continue
    fi
    # if the flag is set then do processing
    if [ $flag -eq 1 ]; then
        # echo "Processing line: $line"
        x1=${coord[0]}
        y1=${coord[1]}
        x2=${coord[2]}
        y2=${coord[3]}
        page_num=${coord[4]}
        field_name=${coord[5]}
        index=${coord[6]}
        field_type=${coord[7]}
        echo "Processing field: $field_name"

        #concat field name with index
        if [[ $field_type == "OCR_WORD" ]]; then
            image_name="$field_name"
        else 
            image_name="$field_name$index"
        fi
        
        # Call the Python script to crop the image
        python3 pdf_to_img.py "$pdf_file" "$output" "$x1" "$y1" "$x2" "$y2" "$page_num" "$image_name"
    fi
done < "$coordinates_file"
