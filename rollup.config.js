import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
import uglify from 'rollup-plugin-uglify';
import scss from 'rollup-plugin-scss';
import replace from 'rollup-plugin-replace';
import ts from 'typescript';

export default {
  entry: 'src/entry.aot.ts',
  sourceMap: true,
  moduleName: 'main',
  plugins: [
    scss(),
    typescript({
      typescript: ts
    }),
    nodeResolve({
      extensions: ['.js', '.ts']
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    replace({
      ENV: JSON.stringify('production')
    }),
    uglify()
  ]
}