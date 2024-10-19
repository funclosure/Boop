/**
{
  "api":1,
  "name":"Convert File Structure to Bullet Points",
  "description":"Converts a file structure representation to a bullet point list.",
  "author":"funclosure",
  "icon":"term",
  "tags":"filestructure,bullet,convert"
}
**/

function main(input) {
  input.text = convertFileStructureToBullet(input.text);
}

function convertFileStructureToBullet(input) {
  const lines = input.trim().split('\n');
  const result = [];
  let prevDepth = 0;

  lines.forEach((line, index) => {
    if (index === 0) {
      // Handle root directory
      result.push(line.replace('/', ''));
      return;
    }

    const depth = (line.match(/(?:│   |\s{4})/g) || []).length;
    const name = line.replace(/^(?:│   |\s{4})*[└├]── /, '').replace('/', '');
    const indent = '  '.repeat(depth);
    
    // Add empty lines for missing levels
    while (depth > prevDepth + 1) {
      result.push(`${'  '.repeat(prevDepth + 1)}- `);
      prevDepth++;
    }

    result.push(`${indent}- ${name}`);
    prevDepth = depth;
  });

  return result.join('\n');
}