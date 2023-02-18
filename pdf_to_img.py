#this file is called from the script file for each coordinate present in the input/coordinate.txt file
#it produces the output (images) according to the coordinate present in the coordinate file
#the file is called in the following way:
#$ python pdf_to_img.py path/to/input.pdf path/to/output x1 y1 x2 y2 page_number(1 based index)
import argparse
from PIL import Image
from pdf2image import convert_from_path
import os

def pdf_to_jpg(pdf_path, jpg_path, top_right, bottom_left, page_number, field_name):
    try:
        # 300 dpi is used here
        img_list = convert_from_path(pdf_path, 200) # This returns a list even for a 1 page pdf
        pil_image = img_list[page_number-1]
        # print(pil_image.size)
        pil_image = pil_image.convert("RGB")
        pil_image = pil_image.crop((top_right[0], top_right[1], bottom_left[0], bottom_left[1]))
        # jpg_page_path = os.path.join(jpg_path, f"page_{page_number}_{top_right[0]}_{top_right[1]}_{bottom_left[0]}_{bottom_left[1]}.jpg")
        jpg_page_path = os.path.join(jpg_path, f"{field_name}.jpg")
        pil_image.save(jpg_page_path, "JPEG")
    except Exception as e:
        print(f"Error: {e}")
        return False
    else:
        return True

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Convert PDF to JPG")
    parser.add_argument("pdf_path", help="Path to the input PDF file")
    parser.add_argument("jpg_path", help="Path to the output JPG file")
    parser.add_argument("x1", help="x coordinate of top-right corner", type=int)
    parser.add_argument("y1", help="y coordinate of top-right corner", type=int)
    parser.add_argument("x2", help="x coordinate of bottom-left corner", type=int)
    parser.add_argument("y2", help="y coordinate of bottom-left corner", type=int)
    parser.add_argument("page_number", help="page number", type=int)
    parser.add_argument("field_name", help="field name")

    args = parser.parse_args()

    top_right = (args.x1, args.y1)
    bottom_left = (args.x2, args.y2)
    result = pdf_to_jpg(args.pdf_path, args.jpg_path, top_right, bottom_left, args.page_number, args.field_name)

    # if result:
    #     # print(f"Successfully converted page {args.page_number} of {args.pdf_path} to {args.jpg_path}")
    # else:
    #     # print(f"Error converting page {args.page_number} of {args.pdf_path} to {args.jpg_path}")