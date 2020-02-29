export default {
    'matrix3x3': {
        // matMapColors[bucket.severity][bucket.likelihood]
        matMapColors: [
            ['green', 'green', 'yellow'],
            ['green', 'yellow', 'red'],
            ['yellow', 'red', 'red']
        ],
        flatMapColors: ['green', 'green', 'yellow', 'green', 'yellow', 'red', 'yellow', 'red', 'red'],
        severityEquivalence: ['L','M','H'],
        totalBuckets: 9
    }
};