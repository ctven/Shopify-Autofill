if (document.getElementById("shopify-regional-checkout-config")) {
    console.log("heeyah");
    clear();
    fill();
}

function clear() {
    chrome.storage.sync.get("info", (result) => {
        let info = result["info"];
        for (let id in info) {
            if (document.getElementById(id)) {
                if (document.getElementById(id).value != "") {
                    document.getElementById(id).value = ""; 
                }
            }
        }
    });
}

function fill() {
    function typeText(item, text, i) {
        $(item)[0].value+=(text.charAt(i))
        setTimeout(function() {
            if(i<text.length) {
                i++;
                typeText(item, text,i);  
            }
        }, 25);
    }
    if (document.getElementsByClassName("breadcrumb__text")[0].innerHTML == "Information") {
        chrome.storage.sync.get("info", (result) => {
            console.log(result["info"]);
            let info = result["info"];
            ["checkout_email",
            "checkout_shipping_address_first_name",
            "checkout_shipping_address_last_name",
            "checkout_shipping_address_address1",
            "checkout_shipping_address_address2",
            "checkout_shipping_address_city",
            "checkout_shipping_address_zip",
            "checkout_shipping_address_country",
            "checkout_shipping_address_province",
            "checkout_shipping_address_phone"
            ].forEach((id) => {
                item = document.getElementById(id);
                text = info[id];
                if (id == "checkout_shipping_address_country" || id == "checkout_shipping_address_province") {
                    item.value = text;
                }
                else {
                    typeText(item, text, 0);
                }
                
            });
        });
        setTimeout(function() {
            document.getElementById("continue_button").click();
        }, 900);
        
    }

    setTimeout(() => {
        if (document.getElementsByClassName("breadcrumb__text")[0].innerHTML == "Shipping") {
            document.getElementById("continue_button").click();
        }
    }, 900);

    $(document).ready(function() {
        if (document.getElementsByClassName("breadcrumb__text")[0].innerHTML == "Payment") {
            chrome.storage.sync.get("info", (result) => {
                let info = result["info"];
                console.log(result["info"]);
                let inputIndex = 1;
                ["number",
                "name",
                "expiry",
                "verification_value",
                ].forEach((id) => {
                    // let xPath = "/html/body/form/input[" + inputIndex + "]";
                    // (document.evaluate(xPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue).value = info[id];
                    // inputIndex+=1;
                    console.log($("card-fields-iframe").contents().find("#number"));
                });
            });
        };
    });
    
    // setTimeout(() => {
    //     if (document.getElementsByClassName("breadcrumb__text")[0].innerHTML == "Payment") {
    //         document.getElementById("continue_button").click();
    //     }
    // });
    
}