export const keyOptions = [
  {
    value: 'data',
    label: '访问URL地址(IP/域名/URL',
    type: 'C'
  },
  {
    value: 'direction',
    label: '流量方向',
    type: 'A',
    options: [
      { label: '外→内(in) ', value: 'in' },
      { label: '内→内(lateral) ', value: 'lateral' },
      { label: '内→外(out) ', value: 'out' }
    ]
  },
  {
    value: 'attacker',
    label: '攻击者IP',
    type: 'C'
  },
  {
    value: 'victim',
    label: '受害者IP',
    type: 'C'
  },
  {
    value: 'machine',
    label: '告警主机IP',
    type: 'C'
  },
  {
    value: 'assets.name',
    label: '资产名称',
    type: 'C'
  },
  {
    value: 'assets.section',
    label: '资产类型',
    type: 'A',
    options: [
      { label: '终端', value: '终端' },
      { label: '服务器', value: '服务器' },
      { label: '服务器-DNS', value: '服务器-DNS' },
      { label: '服务器-负载均衡', value: '服务器-负载均衡' }
    ]
  },
  {
    value: 'net.real_src_ip',
    label: '真实源IP(XFF)',
    type: 'C'
  },
  {
    value: 'net.src_ip',
    label: '源IP',
    type: 'C'
  },
  {
    value: 'net.src_port',
    label: '源端口',
    type: 'C'
  },
  {
    value: 'net.dest_ip',
    label: '目的IP',
    type: 'C'
  },
  {
    value: 'net.dest_port',
    label: '目的端口',
    type: 'C'
  },
  {
    value: 'net.proto',
    label: '传输层协议',
    type: 'A',
    options: [
      { label: 'TCP', value: 'tcp' },
      { label: 'UDP', value: 'udp' }
    ]
  },
  {
    value: 'net.is_ipv6',
    label: '是否为IPv6',
    type: 'A',
    options: [
      { label: '是', value: '1' },
      { label: '否', value: '0' }
    ]
  },
  {
    value: 'net.type',
    label: '应用层协议',
    type: 'A',
    options: [{ label: 'HTTP', value: 'http' }]
  },
  {
    value: 'net.bytes_toserver',
    label: '发送流量',
    type: '\n'
  },
  {
    value: 'net.bytes_toclient',
    label: '接收流量',
    type: '\n'
  },
  {
    value: 'net.http.method',
    label: 'HTTP方法',
    type: 'A',
    options: [
      { label: 'GET', value: 'GET' },
      { label: 'POST', value: 'POST' },
      { label: 'HEAD', value: 'HEAD' },
      { label: 'PUT', value: 'PUT' },
      { label: 'DELETE', value: 'DELETE' }
    ]
  },
  {
    value: 'net.http.status',
    label: 'HTTP返回码',
    type: 'C'
  },
  {
    value: 'net.http.reqs_header',
    label: 'HTTP请求头',
    type: 'C'
  },
  {
    value: 'net.http.reqs_host',
    label: 'HTTP主机',
    type: 'C'
  },
  {
    value: 'net.http.xff',
    label: 'HTTP XFF ',
    type: 'C'
  },
  {
    value: 'net.http.url',
    label: 'HTTP URL',
    type: 'C'
  },
  {
    value: 'net.http.reqs_user_agent',
    label: 'HTTP UA',
    type: 'C'
  },
  {
    value: 'net.http.resp_header',
    label: 'HTTP响应头',
    type: 'C'
  },
  {
    value: 'net.http.resp_line',
    label: 'HTTP响应行',
    type: 'C'
  },
  {
    value: 'net.http.resp_body',
    label: 'HTTP响应体',
    type: 'C'
  },
  {
    value: 'net.http.resp_content_length',
    label: 'HTTP返回长度'
  },
  {
    value: 'net.dns.type',
    label: 'DNS方向',
    type: 'A',
    options: [
      { label: '请求(query)', value: 'query' },
      { label: '应答(answer)', value: 'answer' }
    ]
  },
  {
    value: 'net.dns.rrname',
    label: 'DNS请求域名',
    type: 'C'
  },
  {
    value: 'net.dns.rrtype',
    label: 'DNS请求类型',
    type: 'A',
    options: [
      { label: 'A', value: 'A' },
      { label: 'AAAA', value: 'AAAA' },
      { label: 'TXT', value: 'TXT' },
      { label: 'CNAME', value: 'CNAME' },
      { label: 'SRV', value: 'SRV' },
      { label: 'MX', value: 'MX' },
      { label: 'NS', value: 'NS' },
      { label: 'SOA', value: 'SOA' }
    ]
  },
  {
    value: 'net.dns.rdata',
    label: 'DNS返回结果',
    type: 'C'
  },
  {
    value: 'is_black_ip',
    label: '是否为黑IP访问',
    type: 'A',
    options: [
      { label: '是', value: '1' },
      { label: '否', value: '0' }
    ]
  },
  {
    value: 'threat.name',
    label: '威胁名称',
    type: 'C'
  },
  {
    value: 'threat.level',
    label: '行为类型',
    type: 'A',
    options: [
      { label: '攻击(attack)', value: 'attack' },
      { label: '敏感行为(action)', value: 'action' }
    ]
  },
  {
    value: 'threat.type',
    label: '威胁类型',
    type: 'A',
    options: [
      { label: '侦查(recon)', value: 'recon' },
      { label: '漏洞利用(exploit)', value: 'exploit' },
      { label: '病毒攻击(virus)', value: 'virus' },
      { label: '... 剩余参考 NewTDP公共逻辑 ' }
    ]
  },
  {
    value: 'threat.phase',
    label: '攻击阶段',
    type: 'A',
    options: [{ label: '参考 NewTDP公共逻辑 ' }]
  },
  {
    value: 'threat.result',
    label: '攻击结果',
    type: 'A',
    options: [
      { label: '成功(success)', value: 'success' },
      { label: '失败(fail)', value: 'fail' },
      { label: '尝试(unknown)', value: 'unknown' }
    ]
  },
  {
    value: 'threat.severity',
    label: '严重级别',
    type: 'A',
    options: [
      { label: '信息(0)', value: '0' },
      { label: '低(1)', value: '1' },
      { label: '中(2)', value: '2' },
      { label: '高(3)', value: '3' },
      { label: '严重(4)', value: '4' }
    ]
  },
  {
    value: 'threat.is_connected',
    label: '与IOC地址建立连接',
    type: 'A',
    options: [
      { label: '是', value: '1 ' },
      { label: '否', value: '0' }
    ]
  },
  {
    value: 'threat.suuid',
    label: '情报/规则/模型ID',
    type: 'C'
  },
  {
    value: 'threat.module',
    label: '检测模块'
  },
  {
    value: 'threat.msg',
    label: '威胁信息',
    type: 'C'
  },
  {
    value: 'threat.is_apt',
    label: '是否APT',
    type: 'A',
    options: [
      { label: '是', value: '1' },
      { label: '否', value: '0' }
    ]
  },
  {
    value: 'incident_id',
    label: '威胁事件ID',
    type: 'C'
  },
  {
    value: 'geo_data.Country',
    label: '国家'
  },
  {
    value: 'geo_data.Provice',
    label: '省'
  },
  {
    value: 'geo_data.City',
    label: '市'
  }
];

/**
 * 根据操作符返回补全
 * @param {String} operator
 */
export const getOperatorContent = operator => {
  if (['=', '>', '>=', '<', '<=', '<>'].includes(operator))
    return {
      value: " ''",
      index: -1
    };

  if (['LIKE', 'NOT LIKE'].includes(operator))
    return {
      value: " '%%'",
      index: -2
    };

  if (['IN', 'NOT IN'].includes(operator))
    return {
      value: " ('')",
      index: -2
    };
  if (operator === 'BETWEEN')
    return {
      value: " '' AND ''",
      index: -8
    };

  return {
    value: ' ',
    index: 0
  };
};

export const opeartionOptions = [
  {
    label: '=',
    value: '='
  },
  {
    label: '>',
    value: '>'
  },
  {
    label: '>=',
    value: '>='
  },
  {
    label: '<',
    value: '<'
  },
  {
    label: '<=',
    value: '<='
  },
  {
    label: '<>',
    value: '<>'
  },
  {
    label: 'is',
    value: 'is'
  },
  {
    label: 'is not',
    value: 'is not'
  },
  {
    label: 'LIKE',
    value: 'LIKE'
  },
  {
    label: 'IN',
    value: 'IN'
  },
  {
    label: 'NOT IN',
    value: 'NOT IN'
  }

  // {
  //   label: "BETWEEN",
  //   value: "BETWEEN"
  // }
];

export const getCaret = (val, index) => val.length + index;

export const connectOptions = [
  {
    label: 'AND',
    value: 'AND'
  },
  {
    label: 'OR',
    value: 'OR'
  }
];

export const nullOptions = [
  {
    label: 'null',
    value: 'null'
  }
];
