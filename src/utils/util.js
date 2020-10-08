export function truncateWords(sentence, amount, tail) {
    let truncated = sentence.substr(0, amount);
    return `${truncated} ${tail}`;
}

export function mergeData(comments, images) {
    let data = comments.map((data, i) => {
        let thumbnailUrl = images[i].thumbnailUrl;
        let url = images[i].url;
        return {
            ...data,
            thumbnailUrl,
            url
        };
    });

    return data;
}

export function searchString(array, keyword) {
    return array.filter(value => {
        return value.name.match(new RegExp(keyword, 'g'))
    });
}

export function sorting(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}