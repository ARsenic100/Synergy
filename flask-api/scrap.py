from flask import Flask, request, jsonify
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from PIL import Image
from io import BytesIO
import easyocr
import time
import requests
from bs4 import BeautifulSoup

# Initialize Flask app
app = Flask(__name__)

def scrape_school_data(html_content):
    """Extract school data from the HTML content."""
    soup = BeautifulSoup(html_content, 'html.parser')
    school_name_span = soup.find('span', class_='pFont14')
    school_name = school_name_span.text.strip() if school_name_span else "Unknown"
    return school_name

@app.route('/fetch-school-data', methods=['POST'])
def fetch_school_data():
    """Endpoint to fetch school data based on school ID."""
    data = request.json
    school_id = data.get('school_id')

    if not school_id:
        return jsonify({"error": "School ID is required."}), 400

    # Set up WebDriver
    driver = webdriver.Chrome()
    try:
        # Open the website
        driver.get("https://src.udiseplus.gov.in/home")
        time.sleep(2)

        # Fetch CAPTCHA using Selenium and Requests
        session = requests.Session()
        cookies = driver.get_cookies()
        for cookie in cookies:
            session.cookies.set(cookie['name'], cookie['value'])

        captcha_url = "https://src.udiseplus.gov.in/searchCaptcha"
        response = session.get(captcha_url, stream=True)

        if response.status_code != 200:
            return jsonify({"error": "Failed to fetch CAPTCHA image."}), 500

        captcha_image = Image.open(BytesIO(response.content))
        captcha_image.save("captcha.jpg")

        # Use EasyOCR to extract text from CAPTCHA
        reader = easyocr.Reader(['en'])
        result = reader.readtext('captcha.jpg', detail=0)
        captcha_text = ''.join(result)

        # Fill in the form and submit
        wait = WebDriverWait(driver, 10)
        school_id_field = wait.until(EC.presence_of_element_located((By.NAME, "udiseCode")))
        captcha_field = wait.until(EC.presence_of_element_located((By.NAME, "captcha")))
        school_id_field.send_keys(school_id)
        captcha_field.send_keys(captcha_text)

        submit_button = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "btn-info")))
        submit_button.click()
        time.sleep(3)

        # Navigate to the report card
        school_name_link = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "clickLink")))
        school_name_link.click()
        driver.switch_to.window(driver.window_handles[-1])

        report_card_button = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), '2022-23')]")))
        report_card_button.click()
        time.sleep(5)

        # Extract the report card HTML
        report_card_html = driver.page_source
        school_name = scrape_school_data(report_card_html)

        return jsonify({"school_name": school_name})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        driver.quit()

if __name__ == '_main_':
    app.run(debug=True)