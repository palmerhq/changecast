function template({ template }, opts, { componentName, jsx }) {
  componentName.name = componentName.name.replace('Svg', '')

  return template.ast`
    import React from 'react';
    export const ${componentName} = (props) => ${jsx};
  `
}

module.exports = template
