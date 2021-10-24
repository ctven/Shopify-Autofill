var saveButton = document.getElementById("save");
var deleteButton = document.getElementById("delete");
var nodes = document.querySelectorAll('*[id^="checkout"], *[id^="number"], *[id^="name"], *[id^="expiry"], *[id^="verification_value"]');
var empty = true;

saveButton.addEventListener("click", () => {
    let info = {};
    nodes.forEach((node) => {
        if (node.value != "") {
            empty = false;
        }
        info[node.id] = node.value;
    });
    if (!empty) {
        chrome.storage.sync.set({"info": info}, () => {
            console.log("info saved");
        });

        chrome.storage.sync.set({"hasInfo": true}, () => {
            console.log("hasinfo set to true");
        });
    }
});

deleteButton.addEventListener("click", () => {
    // Checks if form is empty
    nodes.forEach((node) => {
        if (node.value != "") {
            empty = false;
        }
    });
    if (!empty) {
        // Deleting Process
        nodes.forEach((node) => {
            node.value = "";
        });
        empty = true;
        // After Deletion
        chrome.storage.sync.set({"hasInfo": false}, () => {
            console.log("hasinfo set to false");
        });
    }
});

document.body.onload = () => {
    chrome.storage.sync.get("hasInfo", (value) => {
        console.log(value["hasInfo"] ? "info is saved" : "info is not saved");
        if (value["hasInfo"]) {
            chrome.storage.sync.get("info", (result) => {
                let info = result["info"];
                for (let id in info) {
                    document.getElementById(id).value = info[id];
                    console.log(id + " value set to " + info[id]);
                }
            });
        }
    });
}