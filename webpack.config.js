var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var webpack = require('webpack');
var React = require('react');
var ReactDOMServer = require('react-dom/server');

var ExercisesDir = path.join(__dirname, 'exercises');
var ExerciseDirs = fs.readdirSync(ExercisesDir).filter(function(dir){
  return isDirectory(path.join(ExercisesDir, dir));
});

module.exports = {
  devtool: 'source-map',

  entry: ExerciseDirs.reduce(function(entries, dir){
    if(fs.existsSync(path.join(ExercisesDir, dir, 'index.js')))
      entries[dir+'-index'] = path.join(ExercisesDir, dir, 'index.js')
    return entries;
  }, {}),

  output: {
    path: '__build__',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '__build__'
  },

  resolve: {
    extensions: [ '', '.js', '.css' ]
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel', query: {presets: ['es2015', 'react']} },
      { test: /\.woff(2)?$/,   loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf$/, loader: 'file' },
      { test: /\.eot$/, loader: 'file' },
      { test: /\.svg$/, loader: 'file' },
      { test: require.resolve('jquery'), loader: 'expose?jQuery' }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('shared.js')
  ],
  devServer: {
    quite: false,
    noInfo: false,
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    }
  }
};

makeIndex();

function makeIndex(){
  var list = ExerciseDirs.map(function(dir){
    return React.DOM.li({key: dir},
      React.DOM.a({href:'/'+dir}, dir.replace(/-/g, ' '))
    )
  });

  var markup = ReactDOMServer.renderToStaticMarkup(
    React.DOM.html({},
      React.DOM.head({},
        React.DOM.link({rel:'stylesheet', href: '/shared.css'})
      ),
      React.DOM.body({id: 'index'},
        React.DOM.ul({}, list)
      )
    )
  );

  fs.writeFileSync('./exercises/index.html', markup);

  ExerciseDirs.forEach(function(dir){
    fs.writeFileSync('./exercises/' + dir + '/index.html', makeMarkup(dir + '-index'))
  });
}

function makeMarkup(mainFile){
  return ReactDOMServer.renderToStaticMarkup(
    React.DOM.html({},
      React.DOM.head({},
        React.DOM.link({ rel: 'stylesheet', href: '/shared.css' })
      ),
      React.DOM.body({},
        React.DOM.div({ id: 'app' }),
        React.DOM.script({ src: '/__build__/shared.js' }),
        React.DOM.script({ src: '/__build__/' + mainFile + '.js' })
      )
    )
  )
}

function isDirectory(dir){
  return fs.lstatSync(dir).isDirectory();
}

