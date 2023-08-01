import json
import os
import re
from pathlib import Path

image_dir = Path('site/images')

# Get list of image files, sorted by modification time (newest first)
image_files = sorted(image_dir.glob('*'), key=os.path.getmtime, reverse=True)

js = []
for file in image_files:
    # Skip junk files that might be in the directory (should not be).
    if 'json' in str(file):
        continue

    # There's no reason to create a tag with 'ferdy' in the name.
    clean_name = file.stem.lower().replace('ferdy', '')

    # Split the files by underscore.
    tags = re.split(f'[ |_]', clean_name)

    # Remove junk like double underscores.
    tags = list(filter(None, tags))

    # Remove junk parts of speech that aren't valueable as tags.
    tags = list(filter(lambda x: x not in ['and', 'or', 'in', 'of', 'to'], tags))

    # Create the record.
    js.append({
        'name': str(file.name),
        'url': f'images/{file.name}',
        'tag': tags,
    })

# Write out the JSON.
with open('site/images.json', 'w') as f:
    json.dump(js, f, indent=2, sort_keys=True)
