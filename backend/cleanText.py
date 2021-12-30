import re
import string

# Cleans the text by removing all unneccasery characters

def cleanText(text):
    text = re.sub('\[.*?\]', ' ', text)
    text = re.sub('https?://\S+|www\.\S+', ' ', text)
    text = re.sub('<.*?>+', ' ', text)
    text = re.sub('\n', ' ', text)
    text = re.sub('\t', ' ', text)
    # 
    text = re.sub('\s+', ' ', text).strip()

    return str(text)

