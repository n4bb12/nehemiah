import { Options as FastGlobOptions } from "fast-glob"

export type ExpandDirectoriesOption = boolean | string[] | { files: string[]; extensions: string[] }

/**
 * https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/globby/index.d.ts
 */
export interface GlobbyOptions extends FastGlobOptions {
  /**
   * If set to `true`, `globby` will automatically glob directories for you.
   * If you define an `Array` it will only glob files that matches the patterns inside the Array.
   * You can also define an `Object` with `files` and `extensions` like below:
   *
   * ```js
   * (async () => {
   *   const paths = await globby('images', {
   *     expandDirectories: {
   *       files: ['cat', 'unicorn', '*.jpg'],
   *       extensions: ['png']
   *     }
   *   });
   *   console.log(paths);
   *   //=> ['cat.png', 'unicorn.png', 'cow.jpg', 'rainbow.jpg']
   * })();
   * ```
   *
   * Note that if you set this option to `false`, you won't get back matched directories unless
   * you set `onlyFiles: false`.
   */
  expandDirectories?: ExpandDirectoriesOption

  /**
   * Respect ignore patterns in `.gitignore` files that apply to the globbed files.
   */
  gitignore?: boolean
}
