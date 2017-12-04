const processInput = str => {
    return str.trim().split(/\n/);
};

const arePalidromes = (a, b) => {
    a = a.split("");
    b = b.split("");

    return a.every(v => b.indexOf(v) > -1) && b.every(v => a.indexOf(v) > -1);
};

const containsPalindrome = (word, index, passphrase) => {
    let words = passphrase.slice(0).filter((v, i, a) => i !== index); //.splice(index, 1);

    for (let i = 0; i < words.length; i++) {
        if (arePalidromes(word, words[i])) {
            return true;
        }
    }
    return false;
};

const level1 = str => {
    let words = str.split(" ");
    return words.length === new Set(words).size;
};

const level2 = str => {
    let words = str.split(" ").map(v => v.trim());

    return !words.filter(containsPalindrome).length;
};

const f = (str, part = 1) => {
    let securityLevel = part === 1 ? level1 : level2;
    let passphrases = processInput(str);

    return passphrases.map(securityLevel).reduce((s, v) => (s = s + v));
};

module.exports = f;
