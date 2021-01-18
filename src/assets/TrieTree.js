import { TrieTreeNode } from "./TrieTreeNode";

export function TrieTree() {
  this.root = new TrieTreeNode();

  this.add = function (word) {
    let previousNode = this.root;
    for (let i = 0; i < word.length; i++) {
      if (!previousNode.keys.has(word[i])) {
        previousNode.keys.set(word[i], new TrieTreeNode());
        previousNode = previousNode.keys.get(word[i]);
      } else {
        previousNode = previousNode.keys.get(word[i]);
      }
      if (i + 1 === word.length) {
        previousNode.setEnd();
      }
    }
  };

  this.getWords = function (letters) {
    let words = [];
    let current = this.root;
    letters = letters.charAt(0).toUpperCase() + letters.slice(1).toLowerCase();

    if (letters.length === 0) {
      return [];
    }

    for (let i = 0; i < letters.length; i++) {
      if (!current.keys.get(letters[i])) {
        letters = letters.substring(0, i);
        current = current.keys.get(letters[i]);
        break;
      }
      current = current.keys.get(letters[i]);
    }

    let findWords = function (node, newWord) {
      if (!node) {
        return [];
      }
      if (node.keys.size !== 0) {
        for (let letter of node.keys.keys()) {
          findWords(node.keys.get(letter), newWord.concat(letter));
        }
        if (node.isEnd()) {
          words.push(newWord);
        }
      } else {
        words.push(newWord);
        return;
      }
    };
    findWords(current, letters);
    return words;
  };
}
