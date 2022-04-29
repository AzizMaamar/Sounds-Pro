import cv2
import os
import numpy as np
import sys
url = sys.argv[1]
image = cv2.imread(url, cv2.IMREAD_UNCHANGED)
trans_mask = image[:, :, 3] == 0
image[trans_mask] = [255, 255, 255, 255]
new_img = cv2.cvtColor(image, cv2.COLOR_BGRA2BGR)
colors = []
for x in range(0, 150):
    colors.append((x, x, x))
    new_img[np.where((new_img == [x, x, x]).all(axis=2))] = [
        (sys.argv[4], sys.argv[5], sys.argv[6])]
path = "C:/Users/azizm/OneDrive/Documents/mern-eCommerce-app-main/uploads"
pathToExport = "../../../uploads/generatedImages/"
cv2.imwrite(os.path.join(path, sys.argv[2]+"-"+sys.argv[3]+'.jpg'), new_img)
print(pathToExport + sys.argv[2]+"-"+sys.argv[3]+'.jpg')
