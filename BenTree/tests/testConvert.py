import json
import pandas as pd

df = pd.read_csv('data.csv')

def get_nested_rec(key, grp):
    rec = {}
    rec['PrimaryId'] = int(key[0])
    rec['FirstName'] = key[1]
    rec['LastName'] = key[2]
    rec['City'] = key[3]

    for field in ['CarName','DogName']:
        rec[field] = list(grp[field].unique())

    return rec

records = []
for key, grp in df.groupby(['PrimaryId','FirstName','LastName','City']):
    rec = get_nested_rec(key, grp)
    records.append(rec)

records = dict(data = records)

print(json.dumps(records, indent=4))