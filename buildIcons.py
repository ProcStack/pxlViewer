from PIL import Image
# I really hate that Windows uses \ to denote folders instead of /
# Fudge buckery.....
file=r"data\pxlViewer_icon_full.png"
icoSizes=[(16,16), (24,24), (32,32), (48,48), (64,64), (128,128), (256,256)]
for x in range(len(icoSizes)):
	img=Image.open(file)
	img.thumbnail(icoSizes[x], Image.BILINEAR)
	imgName="_".join(file.split("_")[:-1])+str(icoSizes[x][0])+"."+file.split(".")[-1]
	img.save(imgName, "PNG")
img=Image.open(file)
img.save("data\pxlViewerIcon.ico", sizes=icoSizes)