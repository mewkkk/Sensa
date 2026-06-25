const typographyShortWords = [
  "а",
  "в",
  "во",
  "и",
  "к",
  "ко",
  "о",
  "об",
  "обо",
  "от",
  "по",
  "с",
  "со",
  "у",
  "за",
  "из",
  "на",
  "над",
  "под",
  "при",
  "про",
  "до",
  "для",
  "без",
  "или",
  "но",
  "как",
];

const typographyPattern = new RegExp(
  `(^|[\\s(«„])(${typographyShortWords.join("|")})\\s+`,
  "giu",
);

function fixHangingPrepositions(root) {
  const ignoredTags = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA"]);
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];

  while (walker.nextNode()) {
    const node = walker.currentNode;
    const parent = node.parentElement;

    if (!parent || ignoredTags.has(parent.tagName)) {
      continue;
    }

    nodes.push(node);
  }

  nodes.forEach(function (node) {
    node.nodeValue = node.nodeValue.replace(
      typographyPattern,
      function (_, before, word) {
        return `${before}${word}\u00a0`;
      },
    );
  });
}

fixHangingPrepositions(document.body);
