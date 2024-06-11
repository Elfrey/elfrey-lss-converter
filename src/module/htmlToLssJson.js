export default (htmlString) => {
  // Create a new DOM parser
  const parser = new DOMParser();
  // Parse the HTML string
  const doc = parser.parseFromString(`<p>${htmlString}</p>`, 'text/html');

  // Helper function to process text nodes with inline styles
  function processTextNodes(node) {
    const result = [];
    node.childNodes.forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        if (child.textContent.trim().length > 0) {
          result.push({
            type: 'text',
            text: child.textContent.trim()
          });
        }
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        let marks = [];
        if (child.tagName === 'STRONG') {
          marks.push({ type: 'bold' });
        }
        if (child.tagName === 'EM') {
          marks.push({ type: 'italic' });
        }
        if (child.tagName === 'SPAN' && child.style.textDecoration === 'underline') {
          marks.push({ type: 'underline' });
        }
        if (marks.length > 0) {
          result.push({
            type: 'text',
            marks: marks,
            text: `${child.textContent.trim()} `
          });
        } else {
          // Handle other inline styles if needed
          result.push({
            type: 'text',
            text: `${child.textContent.trim()} `
          });
        }
      }
    });
    return result;
  }

  // Function to convert a <p> tag to the specified object format
  function convertParagraph(p) {
    return {
      type: 'paragraph',
      content: processTextNodes(p)
    };
  }

  // Extract all paragraph elements from the HTML
  const paragraphs = doc.querySelectorAll('p');
  const result = [];

  paragraphs.forEach(p => {
    if (p.textContent.trim().length > 0) {
      result.push(convertParagraph(p));
    }
  });

  return result;
}
