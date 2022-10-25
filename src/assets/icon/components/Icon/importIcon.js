const fs = require('fs');
const path = require('path');
const lodash = require('lodash');
const baseDir = '../../images/svg_base';
const targetFolder = path.resolve(__dirname, baseDir);

const types = ['button', 'feature', 'function', 'colour'];

//例：return {fooBar  dir:/images/svg_base/button/add.svg}
// 文件转json 此函数为getIconByType服务
function transformFileToJson(fileName, type) {
  const baseName = fileName.split('.svg')[0];
  const name = lodash.camelCase(baseName); //string转为 小驼峰
  const dir = path.join('@/images/svg_base', type, fileName);

  return {
    name,
    dir: dir.replace(/\\/g, '/') // 兼容windows \upload这种会被转义
  };
}

// [add,alert,...]
function getIconByType(type) {
  // images/svg_base/type
  const dir = path.join(targetFolder, type);
  // icon数组
  const files = fs.readdirSync(dir).filter(dir => dir && dir !== '.DS_Store');

  // icon数组  只保留name去掉svg
  const filesJson = files
    .map(file => transformFileToJson(file, type))
    .filter(file => file.name);

  return filesJson;
}

function getIconsStr() {
  const importArr = [];
  const iconMapArr = [];

  types.forEach(type => {
    const filesJson = getIconByType(type);

    filesJson.forEach(file => {
      const icon = 'icon' + lodash.upperFirst(file.name);
      importArr.push(`import ${icon} from '${file.dir}';`);
      iconMapArr.push(`  ${file.name}: ${icon},`);
    });
  });

  const importStr = importArr.join('\n');
  const iconMapStr = `export const iconMap = {
${iconMapArr.join('\n')}
}`;
  return [importStr, iconMapStr].join('\n');
}

const strokeIcon = [
  'add',
  'arrowDown',
  'arrowRight',
  'arrow',
  'export',
  'right',
  'wrong',
  'search'
];

function getIconsExampleStr() {
  const importArr = [];
  const iconMapArr = [];
  const typeMap = {
    feature: '导航图标',
    function: '功能图标',
    button: '按钮和辅助',
    colour: '彩色图标'
  };

  types.forEach(type => {
    const filesJson = getIconByType(type);

    iconMapArr.push(`
    <div className="clear"></div>
    <div className="icon-type">${typeMap[type]}</div>
    `);
    filesJson.forEach(file => {
      const icon = 'icon' + lodash.upperFirst(file.name);
      importArr.push(`import ${icon} from '${file.dir}';`);
      if (strokeIcon.includes(file.name)) {
        iconMapArr.push(`
        <div className="icon-wrap">
          <Icon stroke="#9fa3ac" className="example-icons" link={${icon}}/>
          <p className="icon-name">${file.name}</p>
        </div>
      `);
      } else {
        iconMapArr.push(`
      <div className="icon-wrap">
        <Icon fill="#9fa3ac" className="example-icons" link={${icon}}/>
        <p className="icon-name">${file.name}</p>
      </div>
    `);
      }
    });
  });

  const importStr = importArr.join('\n');

  return `
  ${importStr}
  import React, { Component } from 'react'
  import Icon from './index'
  export default class IconList extends Component {
    render () {
      return (
        <div>
          ${iconMapArr.join('\n')}
          <div className="clear"></div>
        </div>
      )
    }
  }
  `;
}

const str = getIconsStr();

fs.writeFileSync(path.join(__dirname, './iconMap.js'), str, 'utf8');

const iconExample = getIconsExampleStr();

fs.writeFileSync(path.join(__dirname, './IconList.js'), iconExample, 'utf8');
