start()
function start() {
    $('<form action="" method="get" class="form" id="form"></form>').appendTo($('#searchDiv'))
    populateFormWithInput('name', 'cardNameBtn', 'Search for cards by name')
    randomizer()
}

function populateFormWithInput(searchClass, id, labelText) {
    let div = $('<div class="formDiv"></div>').appendTo($('#form'))
    let label = $(`<label for="${searchClass}">${labelText}:</label>`).appendTo($(div))
    let input = $(`<input type="text" name="${searchClass}"/>`).appendTo($(label))
    let btn = $(`<button class="btn" id="${id}">Search</button>`).appendTo($(div))
}   

function randomizer() {
    $('<div class="formDiv" id="formDiv"></div>').appendTo($('#form'))
    $(`<label for="randomizer">Search for a random card!</label>`).appendTo($('#formDiv'))
    $(`<button class="btn" id="randomBtn">Search</button>`).appendTo($('#formDiv'))
}



$('#cardNameBtn').on('click', (e) => {
    e.preventDefault()
    $.get(`https://api.scryfall.com/cards/search?q=${$('input[name=name]').val()}`, (data) => {
        console.log(data.data)
        $('#cardDiv').empty()
        if (data.data.length === 1) {
            let dataObj = data.data[0]

            let imageContainer = $(`<div id="imageContainer"></div>`).appendTo($('#cardDiv'))
            dataObj.image_uris ? $(`<img src="${dataObj.image_uris.normal}">`).appendTo(imageContainer) : $('<h1><em>Sorry, no image available.<em><h1>').appendTo(imageContainer)

            let rarity = $(`<div id="rarity"></div>`).appendTo($('#cardDiv'))
            $(`<h3>Rarity: ${dataObj.rarity}</h3>`).appendTo(rarity)

            let set = $('<div id="set"></div>').appendTo($('#cardDiv'))
            $(`<h3>Set: ${dataObj.set_name}, Release Date: ${dataObj.released_at}</h3>`).appendTo(set)

            let name = $('<div id ="name"></div>').appendTo($('#cardDiv'))
            $(`<h1>${dataObj.name}<h1>`).appendTo(name)
            let price = $('<div id="price"></div>').appendTo($('#cardDiv'))
            dataObj.prices.usd !== null ? $(`<h3>Price: $${dataObj.prices.usd}</h3>`).appendTo(price) : $('<h3>Sorry, no price available.</h3>').appendTo($(price))
        } else {
        
            let dataObj = data.data
            let imageContainer = $(`<div id="imageContainer"></div>`).appendTo($('#cardDiv'))
            for (let i = 0; i < dataObj.length; i++) {
                if (dataObj[i].image_uris) {
                    let img = $(`<img src="${dataObj[i].image_uris.normal}">`).appendTo(imageContainer)
                    $(img).on('click', (e) => {
                        $('#cardDiv').empty()
                        dataObj = data.data[i]

                        let imageContainer = $(`<div id="imageContainer"></div>`).appendTo($('#cardDiv'))
                        dataObj.image_uris ? $(`<img src="${dataObj.image_uris.normal}">`).appendTo(imageContainer) : $('<h1><em>Sorry, no image available.<em><h1>').appendTo(imageContainer)

                        let rarity = $(`<div id="rarity"></div>`).appendTo($('#cardDiv'))
                        $(`<h3>Rarity: ${dataObj.rarity}</h3>`).appendTo(rarity)

                        let set = $('<div id="set"></div>').appendTo($('#cardDiv'))
                        $(`<h3>Set: ${dataObj.set_name}, ${dataObj.released_at}</h3>`).appendTo(set)

                        let name = $('<div id ="name"></div>').appendTo($('#cardDiv'))
                        $(`<h2>${dataObj.name}<h2>`).appendTo(name)
                        let price = $('<div id="price"></div>').appendTo($('#cardDiv'))
                        dataObj.prices.usd !== null ? $(`<h3>Price: $${dataObj.prices.usd}</h3>`).appendTo(price) : $('<h3>Sorry, no price available.</h3>').appendTo($(price))
                    })
                } else {
                    $(`<h2><em>Sorry, no image available for ${dataObj[i].name}.<em><h2>`).appendTo(imageContainer)
                }
            }
        }
    })
})


$('#randomBtn').on('click', (e) => {
    e.preventDefault()
    $('#cardDiv').empty()
    $.get(`https://api.scryfall.com/cards/random`, (data) => {
        let imageContainer = $(`<div id="imageContainer"></div>`).appendTo($('#cardDiv'))
        data.image_uris ? $(`<img src="${data.image_uris.normal}">`).appendTo(imageContainer) : $('<h1><em>Sorry, no image available.<em><h1>').appendTo(imageContainer)

        let rarity = $(`<div id="rarity"></div>`).appendTo($('#cardDiv'))
        $(`<h3>Rarity: ${data.rarity}</h3>`).appendTo(rarity)

        let set = $('<div id="set"></div>').appendTo($('#cardDiv'))
        $(`<h3>Set: ${data.set_name}, Release Date: ${data.released_at}</h3>`).appendTo(set)

        let name = $('<div id ="name"></div>').appendTo($('#cardDiv'))
        $(`<h1>${data.name}<h1>`).appendTo(name)
        let price = $('<div id="price"></div>').appendTo($('#cardDiv'))
        data.prices.usd !== null ? $(`<h3>Price: $${data.prices.usd}</h3>`).appendTo(price) : $('<h3>Sorry, no price available.</h3>').appendTo($(price))
     })
})








