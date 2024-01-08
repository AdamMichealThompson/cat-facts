module.exports = {
    roots: ['.'],

    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                tsconfig: './tsconfig.json'
            }
        ]
    }
}