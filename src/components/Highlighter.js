// https://stackoverflow.com/questions/43932788/wrap-multiple-strings-in-html-the-react-way
import React from 'react';

export default class Highlighter extends React.PureComponent {
    highlight(input, regexes) {
        if (!regexes.length) {
            return input;
        }
        let split = input.split(regexes[0]);
        // Only needed if matches are case insensitive and we need to preserve the
        // case of the original match
        let replacements = input.match(regexes[0]);
        let result = [];
        for (let i = 0; i < split.length - 1; i++) {
            result.push(this.highlight(split[i], regexes.slice(1)));
            result.push(<em key={i}>{replacements[i]}</em>);
        }
        result.push(this.highlight(split[split.length - 1], regexes.slice(1)));
        return result;
    }
    render() {
        let {input, keywords} = this.props;
        let regexes = keywords.map(word => new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'ig'));
        return (
            <div>
                { this.highlight(input, regexes) }
            </div>);
    }
};