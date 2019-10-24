# Takes the Glycompare CSV output and converts it to hierarchial JSON

import json
import pandas as pd

# Create a Node class for construction of tree
class Node:
    def __init__(self, name, size):
        self.name = name
        self.size = size
        self.parent = None
        self.children = []

    def getName(self):
        return self.name

    def getSize(self):
        return self.size
    
    def getParent(self):
        return self.parent
    
    def getChildren(self):
        return self.children

# Error_bad_lines just filters our unreadables
df = pd.read_csv('benData.csv', error_bad_lines=False)

# Filter out any nodes that do not exist within the CSV and are dead children (make them nodes)
def create_children(children, parent):
    tuned_children = []
    for child in children:
        # Clear out any children acting as parents
        if child in nodeDict:
            nodeDict[child].parent = parent
            tuned_children.append(nodeDict[child])
        # Treat the rest as new nodes to be made
        else: 
            for key, grp in df.groupby(['uid','score']):
                if key[0] == child:
                    child_node = Node(key[0], key[1])
                    child_node.parent = parent
                    nodeDict[key[0]] = child_node
                    tuned_children.append(child_node)
    return tuned_children

# Find the ROOT(S) of the tree
def findRoots(node):
    if node.getParent() == None:
        return node
    else:
        findRoots(node.getParent())

# Format the children nodes for use in the JSON
def format_children(children):
    path = []
    for childNode in children:
        curr_child = {}
        curr_child['name'] = childNode.getName()
        curr_child['size'] = float(childNode.getSize())
        path.append(curr_child)
        if (childNode.getChildren() != []):
            print(childNode.getName())
            curr_child['children'] = format_children(childNode.getChildren())
    return path

# Format the data to fit the schema of each JSON element and return it
def get_nested_rec(nodePrime):
    rec = {}
    rec['name'] = nodePrime.getName()
    rec['size'] = float(nodePrime.getSize())
    child_final = format_children(nodePrime.getChildren())
    if (child_final):
        rec['children'] = child_final
    return rec

# Collect all the data from the CSV that will copmrise the JSON
records = []
nodeDict = {}
roots = set()
# Create all the nodes that will be present in the tree
for key, grp in df.groupby(['uid','score','descendent']):
    # Process nodes that have already been read
    if (key[0] in nodeDict):
        curr_node = nodeDict[key[0]]
        child_input = (key[2].split(', '))
        child_output = create_children(child_input, curr_node)
        curr_node.children = child_output
    # Process 'new' nodes
    else:
        curr_node = Node(key[0], key[1])
        nodeDict[key[0]] = curr_node   
        child_input = (key[2].split(', '))
        child_output = create_children(child_input, curr_node)
        curr_node.children = child_output

# Find all the roots that are in the tree
for nodeName in nodeDict:
    roots.add(findRoots(nodeDict[nodeName]))


# Create valid JSON records to represent the tree by building from the roots
for rootNode in roots:
    if rootNode == None:
        pass
    else:  
        rec = get_nested_rec(rootNode)
        records.append(rec)
print(records)

# Create the header ROOT for the JSON file
header = {}
header['name'] = "ROOT"
header['size'] = 1
header['children'] = records

f = open("hierarchy.json", "w")
f.write(json.dumps(header, indent=4))
f.close()


