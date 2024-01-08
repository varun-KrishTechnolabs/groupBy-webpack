// this file must be in the common js format
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production", // mode can also be development depending on the type of the build you want
  entry: {
    index: path.resolve(__dirname, "src/index.js"), // this is the entry point of the main js file and the build will be created by the name bundle , if we do not specify the file name that we want then by default webpack will take the name main.js , and the purpose of assigning the object to the entry key is for chunk spliting , so we can create diffrent chunks by diffrent file names
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js", // the [name].js takes the name specified in the entry object's key , the [contenthash] is included to give the bundle file a unique hash name an and it will generate a unique hash every time a change is made in the referenced file
    clean: true, // clears the old files whenever you run a new build command
    assetModuleFilename: "assets/[name][ext]",
  },
  // optimization: {
  //   runtimeChunk: "single",
  // },
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"), // this path specifies the folder from which the final output will be served
    },
    port: 3000, // this is the port on which the output will run
    open: true, // this option will open the browser when we run the script
    hot: true, // this option is for hot reload
    compress: true, // dont know the use of this option *yet to explore*
    historyApiFallback: true, // dont know the use of this option *yet to explore*
  },
  module: {
    // here the modules are included the tutorial said it can be used to import loader for the images, css, scss etc
    rules: [
      {
        test: /\.css$/, // this is a regex
        use: ["style-loader", "css-loader"], // and this are the loader for the file extension specified in the above regex and we need to install them first in order to use them
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg)/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // this is need to be included if you want to create a index.html file in the build
      title: "My webpack demo",
      filename: "index.html", // the name by which the final html will be saved in the dist folder
      template: "src/index.html", // if we do no provide this option then a index.html will be created in the dist folder that will refer to the bundle.js file and that it no other changes will be reflected upon the build , so we include this option in order to pass a reference index.html file and then this is builded and added to the dist folder so due to this when we make changes in the our template file those change are considered at the build time and the final index.html in the dist folder is created on the basis of the template
    }),
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
