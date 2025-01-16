import cv2
from pytesseract import image_to_string
from PIL import Image

# Load the image
captcha_image_path = '/mnt/data/captcha.jpg'
image = cv2.imread(captcha_image_path)

# Convert to grayscale
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Apply thresholding
_, thresh = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY)

# Save preprocessed image for debugging
cv2.imwrite('processed_captcha.jpg', thresh)

# Use pytesseract on the preprocessed image
captcha_text = image_to_string(Image.fromarray(thresh), config='--psm 7')
print("Extracted CAPTCHA Text:", captcha_text.strip())
