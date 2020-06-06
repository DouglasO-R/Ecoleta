
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => {return res.json()} )/** ou res => res.json() funçao anonima simplificada */
    .then( states => {

        for( const state of states ){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
        
    })
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    

    const ufValue = event.target.value

    const indexOfSelectState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectState].text
    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<options>Selecione uma cidade</options>";
    citySelect.innerHTML.disabled = true;

    fetch(url)
    .then( (res) => {return res.json()} )/** ou res => res.json() funçao anonima simplificada */
    .then( cities => {

        for( const city of cities ){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}


document.querySelector("select[name=uf]")
    .addEventListener("change", getCities);

const itemsToCollect = document.querySelectorAll(".items-grid");

for( const item of itemsToCollect ){
    item.addEventListener("click",handleSelectedItem);
}

const collectedItems = document.querySelector("input[name=items]");

let selectedItems = [];

function handleSelectedItem(event){
    const itemLi = event.target;

    itemLi.classList.toggle("selected");

    const itemId = itemLi.dataset.id;

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item ===itemId;
        return itemFound;
    });

    if( alreadySelected >= 0) {
        const filteredItems = selectedItems.filter( item => {
            const itemIsDiferent = item != itemId;
            return itemIsDiferent;
        });

        selectedItems = filteredItems;
    } else {

        selectedItems.push(itemId);

    }

    collectedItems.value = selectedItems;
}

