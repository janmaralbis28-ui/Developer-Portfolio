PROFILE PHOTO WORKFLOW
=======================

Active portrait images (used across the site):
  - assets/images/hero_home_transparent_final.png   (home page hero)
  - assets/images/janmar_image.webp                  (about page, slide 1)
  - assets/images/Seated_image1.webp                 (about page, slide 2)
  - assets/images/Seated_image2.webp                 (about page, slide 3)

To replace a photo:
1. Drop your new source image (PNG/JPG) into this folder.
2. Run `python optimize_images.py` from the project root — it resizes,
   compresses, converts to WebP where appropriate, and backs up the
   original into assets/images/originals/.
3. Confirm the output filenames above still match what's referenced in
   index.html and pages/about.html (they should, if you kept the same
   source filenames the script expects — see IMAGES_CONFIG in
   optimize_images.py to add/rename entries).
