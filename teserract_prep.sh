#!/bin/bash

# File paths
pdf_file="input/test2.pdf"
coordinates_file="input/coordinates.csv"
output="intermediate/"

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
