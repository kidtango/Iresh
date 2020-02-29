export const escapeRawText = str => str
                                        // escaping new lines
                                        .replace(/\n/mg, `\\n`)
                                        // double quotes
                                        .replace(/"/gm, '\'')
                                        // non printable chars
                                        .replace(/[^\x20-\x7E]+/g, '');