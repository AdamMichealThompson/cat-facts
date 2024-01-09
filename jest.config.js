module.exports = {
    roots: ['.'],

    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                tsconfig: './tsconfig.json'
            }
        ]
    },

    moduleNameMapper: {
        ".(css|less)$": "identity-obj-proxy"
      },

}