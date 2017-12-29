const parts = {
    loadCSS: ({include, exclude} = {}) => ({
        module: {
            rules: [
                {
                    test: /\.css$/,
                    include,
                    exclude,
                    use: ['style-loader', 'css-loader']
                }
            ]
        }
    }),

    loadSCSS: ({include, exclude} = {}) => ({
        module: {
            rules: [
                {
                    test: /\.(scss|sass)$/,
                    include,
                    exclude,
                    use: ['style-loader', 'css-loader', 'sass-loader']
                }
            ]
        }
    }),

    loadLESS: ({include, exclude} = {}) => ({
        module: {
            rules: [
                {
                    test: /\.less$/,
                    include,
                    exclude,
                    use: ['style-loader', 'css-loader', 'less-loader']
                }
            ]
        }
    }),

    loadJS: ({include, exclude} = {}) => ({
        module: {
            rules: [
                {
                    test: /\.js$/,
                    include,
                    exclude,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env'],
                            plugins: ['transform-object-rest-spread']
                        }
                    }
                }
            ]
        }
    }),

    loadJSX: ({include, exclude, hmr} = {}) => {
        var presets = ['env', 'react'];
        if (hmr) presets.push('react-hmre');
        return {
            module: {
                rules: [
                    {
                        test: /\.jsx$/,
                        include,
                        exclude,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: presets,
                                plugins: ['transform-object-rest-spread']
                            }
                        }
                    }
                ]
            }
        }
    },

    loadJSON: ({include, exclude} = {}) => ({
        module: {
            rules: [
                {
                    test: /\.json$/,
                    include,
                    exclude,
                    use: {
                        loader: 'json-loader',
                    }
                }
            ]
        }
    })
}

module.exports = parts;
