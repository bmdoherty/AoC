const addParent = (nodes, child) => {
    let parent = nodes
        .filter(v => v.children !== undefined)
        .find(v => v.children.includes(child));

    if (parent) {
        return parent.name;
    }
};

const processInput = str => {
    return str
        .trim()
        .split(/\n/)
        .map((v, i, a) => {
            let name = v.split(" ")[0];
            let weight = v.split(" ")[1].replace(/[{()}]/g, "");
            let children = v.split("->")[1];

            if (children) {
                children = children.trim().split(", ");
            } else {
                children = [];
            }

            return {
                name: name,
                weight: parseInt(weight, 10),
                children: children
            };
        });
};

const fix = (nodeMap, name) => {
    let out = [];

    const child_weights = (nodeMap, name) => {
        let node = nodeMap.find(v => v.name === name);
        let supports = [];

        for (let childName of node.children) {
            let weight = 0;
            let child = nodeMap.find(v => v.name === childName);
            let childSupports = child_weights(nodeMap, child.name).reduce(
                (weight, v) => weight + v,
                0
            );

            weight = weight + childSupports + child.weight;

            supports.push(weight);
        }

        if (new Set(supports).size > 1) {
            let max = supports.reduce((a, b) => Math.max(a, b));
            let min = supports.reduce((a, b) => Math.min(a, b));
            let outlierName = node.children[supports.indexOf(max)];
            let outlier = nodeMap.find(v => v.name === outlierName);
            let fix = outlier.weight - (max - min);

            out.push(fix);
        }

        return supports;
    };

    return [child_weights(nodeMap, name), out[0]];
};

const f = (str, part = 1) => {
    let nodeMap = processInput(str);
    nodeMap.map((v, i, a) => (v["parent"] = addParent(a, v.name)));

    let root = nodeMap.find(v => v.parent === undefined).name;

    return part === 1 ? root : fix(nodeMap, root)[1];
};

module.exports = f;
