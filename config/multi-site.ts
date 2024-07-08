interface HostConfig {
  [key: string]: {
    local: string;
    dev: string;
    prod: string;
  };
}

interface HostMap {
  [key: string]: string;
}


const hosts: HostConfig = {
  "tr1p.io": {
    local: 'tr1p.local',
    dev: 'tr1p.local',
    prod: 'tr1p.io'
  },
  "gameraven.gg": {
    local: 'gameraven.local',
    dev: 'gameraven.local',
    prod: 'gameraven.gg'
  }
};

export const MultiSiteConfig = {
  "tr1p.io": {
    template: "tr1p"
  }

}

export const hostMap: HostMap = Object.keys(hosts).reduce((acc: HostMap, key: string) => {
  const envs = hosts[key];
  Object.values(envs).forEach((envValue: string) => {
    acc[envValue] = key;
  });
  return acc;
}, {});
