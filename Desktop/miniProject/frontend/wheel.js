const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
const black = document.getElementById("black");
const blue = document.getElementById("blue");
const orange = document.getElementById("orange");
const purple = document.getElementById("black");

var angle_diff = 10;
var angle = 0;
var i = 0
const rotationValues = []
while (angle <= 360) {
    rotationValues.push({ minDegree: angle, maxDegree: angle + angle_diff, value: i });
    angle += angle_diff;
    i++;
}

const data = []
const dataLabels = []
const pieColors = []
for (let i = 0; i < 36; i++) {
    data.push(16);
    dataLabels.push(i);
    if (i % 2) pieColors.push("#FF0000");
    else pieColors.push("#000000")
}

let myChart = new Chart(wheel, {
    type: "pie",
    data: {
        datasets: [{
            backgroundColor: pieColors,
            borderWidth: 2,
            borderColor: "golden",
            borderRadius: 1,
            borderCapStyle: 'round',
            data: data,
        }],
    },
    options: {
        responsive: true,
        animation: { duration: 0 },
        plugins: {
            datalabels: {
                display: true,
                formatter: (value, context) => {
                    return dataLabels[context.dataIndex];
                },
                color: 'white',
            }
        }
    }
});

const valueGenerator = (angleValue) => {
    for (let i of rotationValues) {
        if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
            spinBtn.innerHTML = i.value;
            finalValue.innerHTML = i.value;
            var event = new CustomEvent('spinCompleted', { detail: i.value });
            document.dispatchEvent(event);
            spinBtn.disabled = false;
            break;
        }
    }
};



spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true;
    finalValue.innerHTML = '<p>spinning...</p>';
    let randomIndex = Math.floor(Math.random() * rotationValues.length);
    let randomStartDegree = rotationValues[randomIndex].minDegree;
    let selectedValue = rotationValues.find(value => value.minDegree === randomStartDegree).value;
    let rotationInterval = window.setInterval(() => {
        myChart.options.rotation = myChart.options.rotation + 5;
        myChart.update();

        if (myChart.options.rotation >= 360) {
            myChart.options.rotation = 0;
        } else if (myChart.options.rotation == randomStartDegree) {
            myChart.options.rotation -= 1;
            valueGenerator(randomStartDegree);
            clearInterval(rotationInterval);
        }
    }, 10);
});