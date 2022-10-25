/*
 * @LastEditTime: 2022-04-22 16:25:04
 * @LastEditors: laoshengchuan
 */
import { iconMap } from './iconMap';

export const typeMapArr = {
  event: [
    { label: '已处理', value: '3', icon: iconMap.light, color: '#62B929' },
    { label: '未处理', value: '2', icon: iconMap.undispose, color: '#EA3A3A' },
    { label: '处理中', value: '1', icon: iconMap.dispose, color: '#FFB210' },
    { label: '已忽略', value: '0', icon: iconMap.ignore, color: '#9FA3AC' }
  ],
  threat: [
    { label: '严重', value: '4', icon: iconMap.tri, color: '#C51212' },
    { label: '高危', value: '3', icon: iconMap.tri, color: '#F53B3B' },
    { label: '中危', value: '2', icon: iconMap.tri, color: '#FC9E23' },
    { label: '低危', value: '1', icon: iconMap.tri, color: '#6DB3D2' },
    { label: '信息', value: '0', icon: iconMap.tri, color: '#A0A4AE' }
  ],
  host: [
    { label: '严重', value: '4', icon: iconMap.hex, color: '#C51212' },
    { label: '高危', value: '3', icon: iconMap.hex, color: '#F53B3B' },
    { label: '中危', value: '2', icon: iconMap.hex, color: '#FC9E23' },
    { label: '低危', value: '1', icon: iconMap.hex, color: '#6DB3D2' },
    { label: '信息', value: '0', icon: iconMap.hexInfo, color: '#A0A4AE' }
  ]
};
