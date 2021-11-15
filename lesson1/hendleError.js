module.exports = {
    validateArgs: (one, two) => {
        const numOne = Number(one);
        const numTwo = Number(two);

        if (!numOne || !numTwo) {
            throw new Error("Программе передан(ы) некорректный(ые) аргумент(ы)");
        }

        return numOne > numTwo ? [numTwo, numOne] : [numOne, numTwo];
    }
}
