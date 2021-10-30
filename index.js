const colors = require("colors");
const {validateArgs} = require("./hendleError");

const [, , one, two] = [...process.argv];

try {
    let [start, end] = validateArgs(one, two);
    const colorList = [colors.green, colors.yellow, colors.red];

    const result = [];

    next: for (start; start <= end; start++) {
        if (!(start % 2)) continue;
        for (let i = 3; i < start; i++) {
            if (!(start % i)) continue next;
        }
        result.push(start);
    }

    if (result.length) {
        result.forEach((item, index) => {
            const color = index % 3;
            console.log(colorList[color](item));
        })
    } else {
        console.log('Простые числа не найдены'.red)
    }
} catch (e) {
    console.log(e.message.red);
}
