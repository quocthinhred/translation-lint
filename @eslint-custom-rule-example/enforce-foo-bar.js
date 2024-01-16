/** 
 * @fileoverview Rule to enforce that `const foo` is assigned "bar".
 * @author Ben Perlmutter
*/

"use strict";

const path = require('path')

// The enforce-foo-bar rule definition
module.exports = {
    meta: {
        type: "fix",
        docs: {
            description: '"id" must be follow folder tree',
        },
        fixable: "code"
    },
    create: function (context) {
        return {
            "JSXIdentifier": function (node) {
                const fileName = context.getFilename();
                const shortName = fileName?.split('lint-demo\\');
                const layerName = shortName?.[1]?.split('\\');
                if (layerName?.[layerName?.length - 1] === 'index.js') {
                    layerName.pop();
                }

                const keyName = layerName.join('.');

                if (node.name === 'FormattedMessage') {
                    const openingNode = node.parent;

                    if (openingNode?.type === 'JSXOpeningElement') {
                        const idAttribute = openingNode.attributes?.find(attr => attr.name && attr.name.name === 'id');
                        let idValue = idAttribute?.value?.value || "";
                        if (!idValue.startsWith(keyName) || !idValue.startsWith('common')) {
                            const idLength = idValue?.split('.')?.length || 0;
                            if (idLength > 1) {
                                idValue = idValue?.split('.')[idLength - 1];
                            }
                            if (idValue == "") {
                                idValue = (new Date()).getTime()
                            }
                            context.report({
                                node,
                                message: '"id" must be follow folder tree',
                                data: {
                                    notBar: idValue
                                },
                                fix(fixer) {
                                    return fixer.replaceText(idAttribute, `id="${keyName}.${idValue}"`)
                                }
                            });
                        }
                    }
                }
            },
            "VariableDeclarator": function (node) {
                const fileName = context.getFilename();
                const shortName = fileName?.split('lint-demo\\');
                const layerName = shortName?.[1]?.split('\\');
                if (layerName?.[layerName?.length - 1] === 'index.js') {
                    layerName.pop();
                }

                const keyName = layerName.join('.');
                const callee = node?.init?.callee;

                if (callee?.name === 'defineMessages') {
                    const listArguments = callee?.parent?.arguments;
                    listArguments.forEach(argument => {
                        argument?.properties?.forEach(property => {
                            const idAttribute = property.value.properties.find(newProperty => newProperty?.key?.name === 'id')
                            let idValue = idAttribute?.value?.value || "";
                            if (!idValue.startsWith(keyName) || !idValue.startsWith('common')) {
                                const idLength = idValue?.split('.')?.length || 0;
                                if (idLength > 1) {
                                    idValue = idValue?.split('.')[idLength - 1];
                                }
                                context.report({
                                    node,
                                    message: '"id" must be follow folder tree',
                                    data: {
                                        notBar: idValue
                                    },
                                    fix(fixer) {
                                        return fixer.replaceText(idAttribute, `id: "${keyName}.${idValue}"`)
                                    }
                                });
                            }
                        });
                    })
                } else if (callee?.name === 'defineMessage') {
                    const listArguments = callee?.parent?.arguments;
                    listArguments.forEach(argument => {
                        const idAttribute = argument?.properties?.find(property => property?.key?.name === 'id')
                        let idValue = idAttribute?.value?.value || "";

                        if (!idValue.startsWith(keyName) || !idValue.startsWith('common')) {
                            const idLength = idValue?.split('.')?.length || 0;
                            if (idLength > 1) {
                                idValue = idValue?.split('.')[idLength - 1];
                            }
                            context.report({
                                node,
                                message: '"id" must be follow folder tree',
                                data: {
                                    notBar: idValue
                                },
                                fix(fixer) {
                                    return fixer.replaceText(idAttribute, `id: "${keyName}.${idValue}"`)
                                }
                            });
                        }
                    });
                }
            }
        }
    }
}