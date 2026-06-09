
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.utils import ImageReader
from PIL import Image as PILImage

paths = ["/home/user/minecraft_playbook/lego-manual/output/step_01.png","/home/user/minecraft_playbook/lego-manual/output/step_02.png","/home/user/minecraft_playbook/lego-manual/output/step_03.png"]
out   = "/home/user/minecraft_playbook/lego-manual/output/vol01_himitsukichi.pdf"

page_w, page_h = landscape(A4)
margin = 12

c = canvas.Canvas(out, pagesize=landscape(A4))
for i, p in enumerate(paths):
    img = PILImage.open(p)
    iw, ih = img.size
    # fit inside page with margin
    scale = min((page_w - 2*margin) / iw, (page_h - 2*margin) / ih)
    draw_w = iw * scale
    draw_h = ih * scale
    x = (page_w - draw_w) / 2
    y = (page_h - draw_h) / 2
    c.drawImage(ImageReader(p), x, y, width=draw_w, height=draw_h)
    if i < len(paths) - 1:
        c.showPage()

c.save()
print(f"PDF saved: {out}")
