function fuzzySearch(searchString: string, targetString: string): boolean {
    if (searchString === targetString) {
        return true;
    }

    if (searchString.length === targetString.length + 1) {
        for (let i = 0; i < searchString.length; i++) {
            const newString =
                searchString.slice(0, i) + searchString.slice(i + 1);
            if (newString === targetString) {
                return true;
            }
        }
    }

    if (searchString.length + 1 === targetString.length) {
        for (let i = 0; i < targetString.length; i++) {
            const newString =
                targetString.slice(0, i) + targetString.slice(i + 1);
            if (newString === searchString) {
                return true;
            }
        }
    }

    if (searchString.length === targetString.length) {
        let count = 0;
        for (let i = 0; i < searchString.length; i++) {
            if (searchString[i] !== targetString[i]) {
                count++;
            }
            if (count > 1) {
                return false;
            }
        }
        return true;
    }

    return false;
}

export default fuzzySearch;
