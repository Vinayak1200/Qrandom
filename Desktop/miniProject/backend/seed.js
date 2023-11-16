const { execSync } = require("child_process");


console.log("generating seed...\n");
//getting device network upload data
let dataNet = parseInt(execSync(`networkQuality | grep Uplink | awk '{print $3}'`, { encoding: 'utf-8' }));


//fetching and manipulating total cpu utilisation data
const output1 = execSync(`top -l 2 | grep -E "^CPU"`, { encoding: 'utf-8' });
let dataCPU = parseFloat(output1.split(" ")[2]);
dataCPU = parseInt((dataCPU - parseInt(dataCPU)) * 100);


//using system entropy pool to obtain a random datapoint
let dataTotalSample = execSync(`sysctl kern.entropy.filter.total_sample_count | awk '{print $2}'`, { encoding: 'utf-8' }).split('');

let dataTS = 0;
for (i = 0; i < dataTotalSample.length - 1; i++) {
    dataTS += parseInt(dataTotalSample[i]);
}


//fetching total page count 
let dataPages = execSync(`vm_stat | grep "Pages active"| awk '{print $3}'`, { encoding: 'utf-8' }).split('');

let dataPS = 0;
for (i = 0; i < dataPages.length - 1; i++) {
    if (dataPages[i] == '.') break;
    dataPS += parseInt(dataPages[i]);
}


//generating the seed value using bitwise xor operation
let seed = dataPS ^ dataTS ^ dataNet ^ dataCPU;
console.log(seed);