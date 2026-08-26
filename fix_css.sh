#!/bin/bash
CSS_FILE="src/app/(panel)/layout.module.css"

# Create a backup
cp "$CSS_FILE" "${CSS_FILE}.bak"

# Extract the parts
# 1 to 56: before media query
# 57 to 90: media query
# 91 to end: after media query
head -n 56 "$CSS_FILE" > temp1.css
sed -n '57,90p' "$CSS_FILE" > temp_media.css
tail -n +91 "$CSS_FILE" > temp2.css

# Combine them: before media query + after media query + media query
cat temp1.css temp2.css temp_media.css > "$CSS_FILE"

rm temp1.css temp2.css temp_media.css
