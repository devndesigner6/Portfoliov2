import * as si from 'react-icons/si';

const icons = [
  'SiReact', 'SiNextdotjs', 'SiExpo', 'SiDjango', 'SiExpress', 'SiNodedotjs', 'SiBun',
  'SiPostgresql', 'SiMongodb', 'SiRedis', 'SiPrisma', 'SiReactquery', 'SiPostman',
  'SiTailwindcss', 'SiShadcnui', 'SiFramer', 'SiGsap', 'SiJavascript', 'SiTypescript',
  'SiOpenjdk', 'SiPython', 'SiCplusplus', 'SiGit', 'SiGithub', 'SiFigma', 'SiDocker', 'SiLinux'
];

for (const name of icons) {
  if (si[name] === undefined) {
    console.log(`Icon not found: ${name}`);
  } else {
    console.log(`Icon found: ${name}`);
  }
}
