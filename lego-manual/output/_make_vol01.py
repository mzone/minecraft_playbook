
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.utils import ImageReader
from PIL import Image as PILImage

paths = ["/Users/imamuu/Documents/project/minecraft_playbook/data/lego-manual/output/vol01_step_01.png","/Users/imamuu/Documents/project/minecraft_playbook/data/lego-manual/output/vol01_step_02.png","/Users/imamuu/Documents/project/minecraft_playbook/data/lego-manual/output/vol01_step_03.png","/Users/imamuu/Documents/project/minecraft_playbook/data/lego-manual/output/vol01_step_04.png","/Users/imamuu/Documents/project/minecraft_playbook/data/lego-manual/output/vol01_step_05.png","/Users/imamuu/Documents/project/minecraft_playbook/data/lego-manual/output/vol01_step_06.png","/Users/imamuu/Documents/project/minecraft_playbook/data/lego-manual/output/vol01_step_07.png","/Users/imamuu/Documents/project/minecraft_playbook/data/lego-manual/output/vol01_step_08.png","/Users/imamuu/Documents/project/minecraft_playbook/data/lego-manual/output/vol01_step_09.png","/Users/imamuu/Documents/project/minecraft_playbook/data/lego-manual/output/vol01_step_10.png","/Users/imamuu/Documents/project/minecraft_playbook/data/lego-manual/output/vol01_step_11.png","/Users/imamuu/Documents/project/minecraft_playbook/data/lego-manual/output/vol01_step_12.png"]
out   = "/Users/imamuu/Documents/project/minecraft_playbook/data/lego-manual/output/vol01_きのいえ.pdf"

page_w, page_h = landscape(A4)
margin = 12

c = canvas.Canvas(out, pagesize=landscape(A4))
for i, p in enumerate(paths):
    img = PILImage.open(p)
    iw, ih = img.size
    scale = min((page_w - 2*margin) / iw, (page_h - 2*margin) / ih)
    draw_w = iw * scale
    draw_h = ih * scale
    x = (page_w - draw_w) / 2
    y = (page_h - draw_h) / 2
    c.drawImage(ImageReader(p), x, y, width=draw_w, height=draw_h)
    if i < len(paths) - 1:
        c.showPage()

c.save()
print(f"  ✅ PDF → {out}")
