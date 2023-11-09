const { execSync } = require("child_process");
const output1 = execSync(`ps -A -o %cpu | awk '{s+=$1} END {print s " % "}'`, { encoding: 'utf-8' });
const output2 = execSync(`networkQuality | grep Uplink | awk '{print $3}'`, { encoding: 'utf-8' });

const seed = parseInt(output1) | parseInt(output2);

console.log(seed);