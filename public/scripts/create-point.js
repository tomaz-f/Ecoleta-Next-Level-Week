// Formulario
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {

            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }

        })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInpute = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInpute.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
        .then(res => res.json())
        .then(cities => {


            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
        })
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// Itens de coleta
// Pegar todos os li`s

const itemsToCollet = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollet) {
    item.addEventListener("click", handleSelectedItem)
}

// Itens selecionados

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    // adicionar ou remover uma classe com o js
    const itemLi = event.target
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id

    console.log('ITEM ID: ', itemId)

    // Verificar se existem item selecionados se sim
    // pegar os items selecionados
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId //Verdadeiro ou falso.
        return itemFound
    })

    // Se tiver selecionado,o
    if (alreadySelected >= 0) {
        //  tirar a seleçã
        const filteredItems = selectedItems.filter(item => {
            const itemsIsDifferent = item != itemId
            return itemsIsDifferent
        })

        selectedItems = filteredItems

    } else {
        // Se não estiver, 
        // adicionar a seleção
        selectedItems.push(itemId)
    }

    console.log('selectedItems: ', selectedItems)

    // Atualizar o campo escondido com os items selecionados
    collectedItems.value = selectedItems
}