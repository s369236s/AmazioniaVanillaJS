function save() {
    var id = [];
    var amount = [];
    var url = [];
    if (gameState.current == gameState.game) {
        localStorage.setItem("thirsty", JSON.stringify(bodyStatus.value.thirsty));
        localStorage.setItem("hunger", JSON.stringify(bodyStatus.value.hunger));
        localStorage.setItem("mentality", JSON.stringify(bodyStatus.value.mentality));
        localStorage.setItem("health", JSON.stringify(bodyStatus.value.health));

        localStorage.setItem("hour", JSON.stringify(timer.hour));
        localStorage.setItem("min", JSON.stringify(timer.min));
        localStorage.setItem("day", JSON.stringify(timer.day));

        localStorage.setItem("sence", JSON.stringify(sence.current));
        localStorage.setItem("map_Pos", JSON.stringify(map.pos.current));
        localStorage.setItem("map_Des", JSON.stringify(map.des.current));
        localStorage.setItem("item", JSON.stringify(Inventory.items));
        if (guide.has_Sos == true) {
            localStorage.setItem("sos", JSON.stringify("yes"));
        } else {
            localStorage.setItem("sos", JSON.stringify("no"));
        }
        for (var i = 0; i < Inventory.items.length; i++) {
            id.push(Inventory.items[i].id);
            amount.push(Inventory.items[i].amount);
            url.push(Inventory.items[i].imageUrl);

        }
        localStorage.setItem("item_Id", JSON.stringify(id));
        localStorage.setItem("item_Amount", JSON.stringify(amount));
        localStorage.setItem("item_Url", JSON.stringify(url));

    }

}

function load() {
    var id = [];
    var amount = [];
    var url = [];
    save = JSON.parse(localStorage.getItem("item"));
    bodyStatus.value.thirsty = parseInt(localStorage.getItem("thirsty"));
    bodyStatus.value.hunger = parseInt(localStorage.getItem("hunger"));
    bodyStatus.value.mentality = parseInt(localStorage.getItem("mentality"));
    bodyStatus.value.health = parseInt(localStorage.getItem("health"));

    timer.hour = parseInt(localStorage.getItem("hour"));
    timer.min = parseInt(localStorage.getItem("min"));
    timer.day = parseInt(localStorage.getItem("day"));

    sence.current = parseInt(localStorage.getItem("sence"));
    map.pos.current = parseInt(localStorage.getItem("map_Pos"));
    map.des.current = parseInt(localStorage.getItem("map_Des"));

    id = JSON.parse(localStorage.getItem("item_Id"));
    amount = JSON.parse(localStorage.getItem("item_Amount"));
    url = JSON.parse(localStorage.getItem("item_Url"));

    for (var i = 0; i < save.length; i++) {
        Inventory.addItem(id[i], amount[i], url[i]);
        Inventory.calculate_Pos();
    }
    if (JSON.parse(localStorage.getItem("sos")) == "yes") {
        guide.has_Sos = true;
    } else {
        guide.has_Sos = false;
    }
    home.draw();
    ui.draw();
}