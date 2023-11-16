let dataNet = parseInt(execSync(`networkQuality | grep Uplink | awk '{print $3}'`, { encoding: 'utf-8' }));
// console.log(dataNet);