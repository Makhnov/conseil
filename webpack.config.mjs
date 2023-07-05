import { resolve } from "path";
import { fileURLToPath } from "url";
import TerserWebpackPlugin from "terser-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import RemoveEmptyScriptsPlugin from 'webpack-remove-empty-scripts';
const __dirname = fileURLToPath(new URL(".", import.meta.url));
const mode = "development";

let config = {
    mode: mode,
    devtool: "eval-source-map",
    entry: {
        style: "./css/main.scss",
        main: ["./js/main.js", "./js/classes.js"],
        accueil: "./js/accueil.js",
        conseil: ["./js/conseil.js", "./js/persos.css.js"],
        annexe: "./js/annexe.js",
    },
    output: {
        filename: '[name].bundle.js',
        path: resolve(__dirname, "./assets")
    },
    watch: mode === "development",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
                //path: resolve(__dirname, "./assets"),
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset/resource",
                generator: {
                    filename: "images/[hash][ext][query]"
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
                generator: {
                    filename: "fonts/[hash][ext][query]"
                }
            },
        ],
    },
    optimization: {
        minimize: mode === "production",
        minimizer: [
            new TerserWebpackPlugin({
                parallel: true,
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                },
            }),
            new CssMinimizerPlugin(),
        ],
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: "styles",
                    test: /\.scss$/,
                    chunks: "all",
                    enforce: true,
                },
            },
        },
    },
    stats: {
        errorDetails: true,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "main.css",
        }),
        new RemoveEmptyScriptsPlugin(),
    ],
    resolve: {
        alias: {
            "sib-api-v3-sdk": resolve(__dirname, "./node_modules/sib-api-v3-sdk"),
        },
    },
};

export default config;
