/**
{
  "api":1,
  "name":"Convert Bullet Points to File Structure",
  "description":"Converts bullet point list to a file structure representation.",
  "author":"funclosure",
  "icon":"term",
  "tags":"bullet,filestructure,convert"
}
**/

function main(input) {
    input.text = convertBulletToFileStructure(input.text);
}

function convertBulletToFileStructure(input) {
    const lines = input.trim().split('\n');
    const result = [''];
    const structure = [];
    const lastIndices = {};

    // First pass: determine the structure and last indices
    lines.forEach((line, index) => {
        const indent = line.search(/\S|$/);
        while (structure.length > 0 && indent <= structure[structure.length - 1]) {
            structure.pop();
        }
        structure.push(indent);
        lastIndices[indent] = index;
    });

    // Second pass: generate the file structure
    structure.length = 0; // Reset structure for second pass
    lines.forEach((line, index) => {
        const trimmedLine = line.trim();
        const indent = line.search(/\S|$/);
        const name = trimmedLine.replace(/^[-•*]\s*/, '');

        while (structure.length > 0 && indent <= structure[structure.length - 1]) {
            structure.pop();
        }

        if (index === 0) {
            result.push(`${name}/`);
        } else {
            const level = structure.length;
            let prefix = '';
            for (let i = 0; i < level; i++) {
                if (index > lastIndices[structure[i]]) {
                    prefix += `    `;
                } else {
                    prefix += '│   ';
                }
            }
            const isLast = index === lastIndices[indent];
            const connector = isLast ? '└── ' : '├── ';
            const suffix = name.includes('.') ? '' : '/';
            result.push(`${prefix}${connector}${name}${suffix}`);
        }

        structure.push(indent);
    });

    return result.join('\n');
}