module.exports = {
    rules: [
        {
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react'],
                    plugins: [
                        '@babel/plugin-proposal-optional-chaining',
                        '@babel/plugin-proposal-nullish-coalescing-operator'
                    ],
                },
            },
        },
    ],
};