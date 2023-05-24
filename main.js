start()
function start() {
    $('<form action="" method="get" class="form" id="form"></form>').appendTo($('#searchDiv'))
    populateFormWithInput('name', 'cardNameBtn')
    // populateFormWithInput('set', 'setNameBtn')
    // $('<h4 id="cardNameText">Search by card name</h4>').appendTo('#searchDiv')
    // $('<input name="input" id="searchBox">').attr('type', 'text').appendTo('#searchDiv')
    // $('<button class="btn" id="searchBtn">Submit</button>').appendTo('#searchDiv')
    
}

function populateFormWithInput(searchClass, id) {
    let div = $('<div class="formDiv"></div>').appendTo($('#form'))
    let label = $(`<label for="${searchClass}">Search cards by ${searchClass}:</label>`).appendTo($(div))
    let input = $(`<input type="text" name="${searchClass}"/>`).appendTo($(label))
    let btn = $(`<button class="btn" id="${id}">Search</button>`).appendTo($(div))
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
        let rarityText = $(`<h3>Rarity: ${dataObj.rarity}</h3>`).appendTo(rarity)

        let set = $('<div id="set"></div>').appendTo($('#cardDiv'))
        let setText = $(`<h3>Set: ${dataObj.set_name}, ${dataObj.released_at}</h3>`).appendTo(set)

        // let rulings = $('<div id="rulings"></div>').appendTo($('#cardDiv'))
        // let rulingsText

        let name = $('<div id ="name"></div>').appendTo($('#cardDiv'))
        let nameText = $(`<h2>${dataObj.name}<h2>`).appendTo(name)
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
                    let rarityText = $(`<h3>Rarity: ${dataObj.rarity}</h3>`).appendTo(rarity)

                    let set = $('<div id="set"></div>').appendTo($('#cardDiv'))
                    let setText = $(`<h3>Set: ${dataObj.set_name}, ${dataObj.released_at}</h3>`).appendTo(set)

                    // let rulings = $('<div id="rulings"></div>').appendTo($('#cardDiv'))
                    // let rulingsText

                    let name = $('<div id ="name"></div>').appendTo($('#cardDiv'))
                    let nameText = $(`<h2>${dataObj.name}<h2>`).appendTo(name)
                })
            } else {
                $(`<h2><em>Sorry, no image available for ${dataObj[i].name}.<em><h2>`).appendTo(imageContainer)
        }
    }


    }
    })
})







