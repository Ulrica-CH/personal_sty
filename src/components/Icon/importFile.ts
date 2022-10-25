const fs = require('fs');
const path = require('path');
const {camelCase, forEach, upperFirst} = require('lodash');

interface IIconJson<T> {
  iconName: T;
  dir: T;
}

const baseDir = 'images'; //icon 路径
const resPath = <T>(rootPath: T, ...rest: T[]):T =>
  fs.resolve(rootPath, ...rest);

const readDir = <T>(path: T, type?: T) => fs.readdirSync(path, type);


// 对应icon下文件夹
const types: string[] = readDir(resPath(__dirname, baseDir));
// 根据不同type获取icon对象
const getIconByType = <T extends string>(type: T) =>
  readDir(resPath(__dirname, baseDir, type))
    .filter((dir: T) => dir !== '.DS_Store')
    .map((file: T) => ({
      iconName: camelCase(file.split('.svg')[0]),
      dir: path.join(baseDir, type, file),
    }))
    .filter((file: IIconJson<string>) => file.iconName);

//  生成导出语句
const getIconStr = () => {
  const importArr: string[] = [];
  const iconMapArr: typeof importArr = [];
  forEach(types, (type: string) => {
    const filesJson: IIconJson<string>[] = getIconByType(type);
    filesJson.forEach((file) => {
      const icon = 'icon' + upperFirst(file.iconName);
      importArr.push(`import ${icon} from '${file.dir}';`);
      iconMapArr.push(`${file.iconName}: ${icon},`);

    });
  });
  const importStr = importArr.join('\n');
  const iconMapStr = `export const iconMap = { ${iconMapArr.join('\n')} }`;
  return [importStr, iconMapStr].join('\n');
};
const str = getIconStr();
fs.writeFileSync(resPath(__dirname, './iconMap.js'), str, 'utf8');
// fileName转为json对象
// const FileToJson = (fileName: string, type: string) => ({
//   iconName: camelCase(fileName.split('.svg')[0]),
//   dir: path.join(baseDir, type, fileName),
// });

