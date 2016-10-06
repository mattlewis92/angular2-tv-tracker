import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
import uglify from 'rollup-plugin-uglify';
import ts from 'typescript';

export default {
  entry: 'src/entry.aot.ts',
  sourceMap: true,
  moduleName: 'main',
  plugins: [
    typescript({
      typescript: ts
    }),
    nodeResolve({
      extensions: [ '.js', '.ts' ]
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    uglify()
  ]
}