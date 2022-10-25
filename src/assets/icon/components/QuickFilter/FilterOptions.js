export const OptionLabel = {
  machine_type: '设备类型',
  severity: '严重级别',
  attack_skill_level: '黑客等级',
  direction: '威胁类型',
  phase: '攻击阶段',
  result: '攻击结果',
  status: '处置状态'
};
export default {
  attack_skill_level: [
    {
      label: '弱鸡',
      value: 1
    },
    {
      label: '一般',
      value: 2
    },
    {
      label: '高手',
      value: 3
    },
    {
      label: '骨灰',
      value: 4
    }
  ],
  machine_type: [
    {
      label: '服务器',
      value: 1
    },
    {
      label: '终端',
      value: 0
    }
  ],
  severity: [
    {
      label: '严重',
      value: 4
    },
    {
      label: '高',
      value: 3
    },
    {
      label: '中',
      value: 2
    },
    {
      label: '低',
      value: 1
    },
    {
      label: '信息',
      value: 0
    }
  ],
  time_range: [
    {
      label: '1小时',
      value: 'one_hour'
    },
    {
      label: '24小时',
      value: 'twenty_four_hours'
    },
    {
      label: '7天',
      value: 'seven_days'
    },
    {
      label: '30天',
      value: 'thirty_days'
    }
  ],
  status: [
    {
      label: '已处理',
      value: 1
    },
    {
      label: '未处理',
      value: 0
    }
  ],
  duration: [],
  direction: [
    {
      label: '外部攻击',
      value: 'in'
    },
    {
      label: '仅看攻击成功',
      value: 'only_success',
      parent: 'in'
    },
    {
      label: '内网渗透',
      value: 'lateral'
    },
    {
      label: '失陷破坏',
      value: 'out'
    }
  ],
  phase: [
    {
      label: '侦查',
      value: 'recon'
    },
    {
      label: '漏洞利用',
      value: 'exploit'
    },
    {
      label: '控制',
      value: 'control'
    },
    {
      label: '对外攻击',
      value: 'attack_out'
    },
    {
      label: '内网渗透',
      value: 'post_exploit'
    }
  ],
  result: [
    {
      label: '成功',
      value: 'success'
    },
    {
      label: '失败',
      value: 'failed'
    },
    {
      label: '尝试',
      value: 'unknown'
    }
  ],
  is_target_attack: [
    {
      label: '仅看针对性攻击',
      value: true
    }
  ],
  is_success: [
    {
      label: '仅看攻击成功',
      value: 'success'
    }
  ]
};
