/**
 * @fileoverview Enforce custom ID prefix in JSX elements.
 */
'use strict';

module.exports = function (results, context) {
  console.log({ context: JSON.stringify(context) })
  console.log({results})
  const prefix = context.options[0] || ''; // Lấy giá trị prefix từ cấu hình

  return {
    JSXOpeningElement(node) {
      const idAttribute = node.attributes.find(attr => attr.name && attr.name.name === 'id');

      if (idAttribute && idAttribute.value && idAttribute.value.type === 'Literal') {
        const currentId = idAttribute.value.value;
        const expectedId = `${prefix}${currentId}`;

        if (currentId !== expectedId) {
          context.report({
            node: idAttribute,
            message: `ID must have the prefix "${prefix}".`,
          });
        }
      }
    },
  };
};