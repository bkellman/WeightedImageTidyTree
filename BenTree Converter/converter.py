# Takes the Glycompare CSV output and converts it to hierarchial JSON

import json
import pandas as pd

# Error_bad_lines just filters our unreadables
df = pd.read_csv('benData.csv', error_bad_lines=False)

# Create the schema of each JSON element and return it
def get_nested_rec(key, grp):
    rec = {}
    rec['name'] = key[0]
    rec['size'] = float(key[1])
    child_input = (key[2].split(', '))
    child_output = order_children(child_input)
    if (child_output):
        rec['children'] = [child_output]
    return rec

# Filter out any nodes that do not exist within the CSV and are dead children
def order_children(children):
    tuned_children = {}
    for key, grp in df.groupby(['uid','score']):
        if key[0] in children:
            tuned_children['name'] = key[0]
            tuned_children['size'] = key[1]
    return tuned_children

# Create the actual "meat" of the JSON file
records = []
for key, grp in df.groupby(['uid','score','descendent']):
    rec = get_nested_rec(key, grp)
    records.append(rec)

# Create the header ROOT for the JSON file
header = {}
header['name'] = "ROOT"
header['size'] = 1
header['children'] = records

f = open("hierarchy.json", "w")
f.write(json.dumps(header, indent=4))
f.close()


