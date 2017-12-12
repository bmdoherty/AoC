const processInput = str => {
    return str
        .trim()
        .split(/\n/)
        .map(v => v.split(" <-> "))
        .map(v => {
            return {
                id: parseInt(v[0], 10),
                children: v[1].split(", ").map(Number)
            };
        });
};

const nodeInGroup = (node, group) => {
    return group.find(v => v.id === node.id) || group.some(v => node.children.indexOf(v) > -1);
};

const findGroup = (nodes, root) => {
    let group = [root];

    const fn = (nodesArr, id) => {
        let node = nodes.find(v => v.id === id);
        nodes = nodes.filter(v => v.id !== id);

        if (!node) {
            return;
        }

        if (nodeInGroup(node, group)) {
            group.push(node.id);
        }

        if (node.children.length === 0) {
            return;
        } else {
            for (let child of node.children) {
                fn(nodes, child);
            }
        }

        return group;
    };

    return new Set(fn(nodes, root));
};

const f = (str, part = 1) => {
    let nodes = processInput(str);
    let groups = [];

    groups[0] = findGroup(nodes, 0);
    nodes = nodes.filter(v => groups[0].has(v.id) === false);

    while (nodes.length) {
        let node = nodes[0];
        let group = findGroup(nodes, node.id);

        groups.push(group);
        nodes = nodes.filter(v => group.has(v.id) === false);
    }

    return part === 1 ? groups[0].size : groups.length;
};

module.exports = f;
