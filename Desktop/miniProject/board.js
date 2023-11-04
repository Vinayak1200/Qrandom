var selectedChip;

function chipSelector(chip) {
    selectedChip = {
        'chip': chip.id,
        'value': chip.value
    };
    console.log(selectedChip);
}
imgPath = "assets/chip_${selectedChip.chip}.png";