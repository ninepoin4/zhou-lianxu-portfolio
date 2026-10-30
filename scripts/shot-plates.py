from playwright.sync_api import sync_playwright
import os
out=r'D:\DSH WORK 2\ninepoints\public\media\cases'
os.makedirs(out, exist_ok=True)
with sync_playwright() as p:
    b=p.chromium.launch(executable_path=r"C:\Program Files\Google\Chrome\Application\chrome.exe", headless=True)
    page=b.new_page(viewport={"width":2100,"height":1350}, device_scale_factor=1)
    page.goto('http://127.0.0.1:5291/plates.html', wait_until='networkidle', timeout=60000)
    page.wait_for_timeout(800)
    for id,name in [('plate-studio','plate-studio.png'),('plate-matrix','plate-matrix.png'),('plate-factory','plate-factory.png')]:
        el=page.locator('#'+id)
        print(id, el.bounding_box())
        el.screenshot(path=os.path.join(out,name))
    b.close()
print('done')
