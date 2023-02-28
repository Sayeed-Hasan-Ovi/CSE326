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

# Read the coordinates from the text file
while IFS= read -r line; do
    # Split the line into coordinates
    IFS=',' read -ra coord <<< "$line"
    # if the line does not have 7 elements, skip it
    if [ ${#coord[@]} -ne 7 ]; then
        echo "Skipping line: $line"
        continue
    fi
    # echo "Processing line: $line"
    x1=${coord[0]}
    y1=${coord[1]}
    x2=${coord[2]}
    y2=${coord[3]}
    page_num=${coord[4]}
    field_name=${coord[5]}
    field_type=${coord[6]}
    echo "Processing field: $field_name"
    
    # echo "output: $output"

    # Call the Python script to crop the image
    python3 pdf_to_img.py "$pdf_file" "$output" "$x1" "$y1" "$x2" "$y2" "$page_num" "$field_name"
done < "$coordinates_file"
