// 플러그인들 import
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

// 현재 디렉토리를 __dirname에 할당하기 위한 import 및 변수 선언
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const tsLoader = {
  test: /\.tsx?$/,
  use: 'ts-loader',
  exclude: /node_modules/,
};

// 웹팩 설정 function
const config = {
  entry: './src/main.tsx', // entry는 진입점이다.
  // 현재 디렉토리가 __dirname에 저장되니까, dist 디렉토리에 bundle.js로 저장
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
  },
  // css 파일에 대한 loader 설정
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.[jt]sx?$/,
        loader: 'esbuild-loader',
        options: {
          target: 'es2015',
        },
      },
    ],
  },
  // 플러그인 설정
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html', filename: 'index.html' }),
    new MiniCssExtractPlugin({ filename: 'style.css', chunkFilename: '[id].css' }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'], // extension는 import를 할 때 확장자를 생략할 수 있도록하는 옵션
  },
  devServer: {
    static: {
      directory: __dirname + '/public',
    },
    compress: true,
    port: 3001,
  },
};

export default config;
