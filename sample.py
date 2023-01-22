from pdf2image import convert_from_path

pages = convert_from_path('sample.pdf', 500)

for i in range (len(pages)):
    pages[i].save('page'+str(i)+'.jpg', 'JPEG')
print("Successful!")

