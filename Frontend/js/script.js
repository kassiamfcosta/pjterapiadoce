doceJson.map((item, index ) => {
    let doceItem = document.querySelector('.models .doce-item').cloneNode(true)
    document.querySelector('.doce-area').append(doceItem)

    doceItem.querySelector('.doce-item--img img').src = item.img
    doceItem.querySelector('.doce-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    doceItem.querySelector('.doce-item--name').innerHTML = item.name
    doceItem.querySelector('.doce-item--desc').innerHTML = item.description

})