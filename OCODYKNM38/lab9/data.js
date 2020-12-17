let busStop = {
    name: "Общежитие",
    buses: "17,33,261"
}

let bus17 = {
    name: 17,
    start: "Южная магистраль",
    end: "пос. Октябрьский",
    frequency: "15",
    quality: "2",
    size: "Full",
    note: "Too slow"
}

let bus33 = {
    name: 33,
    start: "пос. Октябрьский ",
    end: "пос. им. Куленова",
    frequency: "15",
    quality: "4",
    size: "Full",
    note: "The most spacious, but not the fastest bus. And I prefer convenience over speed"
}

let bus261 = {
    name: 261,
    start: "АДК",
    end: "Комсомольская",
    frequency: "10",
    quality: "3",
    size: "Mini",
    note: "Probably the fastest, but usually very small and uncomfortable"
}

function getBus(i) {
    switch (i) {
        case "17":
            return JSON.stringify(bus17);

        case "33":
            return JSON.stringify(bus33);

        case "261":
            return JSON.stringify(bus261);
    }
}

function getBusStopInfo() {
    return JSON.stringify(busStop);
}