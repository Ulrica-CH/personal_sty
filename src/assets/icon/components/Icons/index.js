import React from 'react';
import Icon from '../Icon';

import iconAttack from '@/images/svg/attack.svg';
import iconAttackIn from '@/images/svg/attack_in.svg';
import iconAttackOut from '@/images/svg/attack_out.svg';
import iconAttackLateral from '@/images/svg/attack_lateral.svg';
import iconScreen from '@/images/svg/screen.svg';
import iconDashboard from '@/images/svg/dashboard.svg';
import iconSystem from '@/images/svg/system.svg';
import iconCascade from '@/images/svg/cascade.svg';
import iconHost from '@/images/svg/host.svg';
import iconWeakPwd from '@/images/svg/weak_pwd.svg';
import iconLoginApi from '@/images/svg/login_api.svg';
import iconSensitive from '@/images/svg/sensitive_info.svg';
import iconDocument from '@/images/svg/document.svg';
import iconAssets from '@/images/svg/assets.svg';
import iconAPI from '@/images/svg/api.svg';
import iconInvestigation from '@/images/svg/investigation.svg';
import iconAttacker from '@/images/svg/attacker.svg';
import iconAgent from '@/images/svg/agent.svg';
import iconTIList from '@/images/svg/ti_list.svg';
import iconSetting from '@/images/svg/setting.svg';
import iconConfig from '@/images/svg/config.svg';
import iconReport from '@/images/svg/report.svg';
import iconDevice from '@/images/svg/device.svg';
import iconIp from '@/images/svg/ip.svg';
import iconBasicInfo from '@/images/svg/basic_info.svg';
import iconUser from '@/images/svg/user.svg';
import iconStorage from '@/images/svg/storage.svg';
import iconAssetsConfig from '@/images/svg/assets_config.svg';
import iconNotice from '@/images/svg/notice.svg';
import iconAudit from '@/images/svg/audit.svg';

const getIcon = link => props => {
  return <Icon link={link} {...props} />;
};

/**
 *  常用icon的封装
 */
export default {
  IconScreen: getIcon(iconScreen),
  IconDashboard: getIcon(iconDashboard),
  IconSystem: getIcon(iconSystem),
  IconCascade: getIcon(iconCascade),
  IconAttackIn: getIcon(iconAttackIn),
  IconAttackOut: getIcon(iconAttackOut),
  IconAttackLateral: getIcon(iconAttackLateral),
  IconAttack: getIcon(iconAttack),
  IconHost: getIcon(iconHost),
  IconWeakPwd: getIcon(iconWeakPwd),
  IconLoginApi: getIcon(iconLoginApi),
  IconSensitive: getIcon(iconSensitive),
  IconApi: getIcon(iconAPI),
  IconDocument: getIcon(iconDocument),
  IconAssets: getIcon(iconAssets),
  IconAgent: getIcon(iconAgent),
  IconInvestigation: getIcon(iconInvestigation),
  IconAttacker: getIcon(iconAttacker),
  IconTIList: getIcon(iconTIList),
  IconReport: getIcon(iconReport),
  IconSetting: getIcon(iconSetting),
  IconConfig: getIcon(iconConfig),
  IconDevice: getIcon(iconDevice),
  IconIp: getIcon(iconIp),
  IconBasicInfo: getIcon(iconBasicInfo),
  IconUser: getIcon(iconUser),
  IconStorage: getIcon(iconStorage),
  IconAssetsConfig: getIcon(iconAssetsConfig),
  IconNotice: getIcon(iconNotice),
  IconAudit: getIcon(iconAudit)
};
