class EslintDisablePlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('FileListPlugin', (compilation, callback) => {

      for (let filename in compilation.assets) {
        if(filename === /\.js$/.test()) {
          compilation.assets[filename] = {
            source: function() {
              let source = compilation.assets[filename].source();
              source = '/* eslint-disable */\n' + source;
              return source;
            },
            size: function() {
              return source.length;
            }
          };
        }
      }

      callback();
    });
  }
}

module.exports = EslintDisablePlugin;