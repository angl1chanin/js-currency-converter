const currencyLists = document.querySelectorAll('.dropdown__list');

let suggestions = [];
for (const currency in currencies.currencies) {
    suggestions.push(currency);
}

window.onload = init();

function init() {
    for (const prop in currencies.currencies) {
        currencyLists.forEach((list) => {
            list.insertAdjacentHTML(
                'beforeEnd',
                `<li class="dropdown__list-item" data-currency="${prop}">${prop}</li>`
            );
            dropdownItemsSetEvent(list);
        });
    }
}

const btns = document.querySelectorAll('.dropdown__btn');
const searchBoxes = document.querySelectorAll('.dropdown__searchbox');

btns.forEach((btn) => {
    btn.addEventListener('click', () => {
        btn.parentNode.classList.toggle('active');
    });
});

function dropdownItemsSetEvent(dropdownList) {
    let items = dropdownList.querySelectorAll('.dropdown__list-item');

    items.forEach((item) => {
        item.onclick = () => {
            let btn = item.parentElement.previousElementSibling;
            let dropdown = btn.parentNode;
            const itemCurrency = item.getAttribute('data-currency');

            btn.querySelector('#dropdown__current-currency').innerHTML =
                item.innerHTML;
            btn.querySelector('#dropdown__current-currency').setAttribute(
                'data-currency',
                itemCurrency
            );
            dropdown.classList.toggle('active');
        };
    });
}

searchBoxes.forEach((searchBox) => {
    searchBox.addEventListener('input', (event) => {
        const dropdownList = searchBox.parentNode;
        let userInput = event.target.value;
        let filtered = suggestions.filter((data) =>
            data.startsWith(userInput.toLocaleLowerCase())
        );
        filtered = filtered.map((data) => {
            return (data = `<li class="dropdown__list-item" data-currency="${data}">${data}</li>`);
        });
        showSuggestions(dropdownList, filtered);
    });
});

function showSuggestions(dropdownList, suggestions) {
    dropdownList.querySelectorAll('li').forEach((el) => el.remove());

    suggestions.forEach((item) => {
        dropdownList.insertAdjacentHTML('beforeEnd', item);
    });

    dropdownItemsSetEvent(dropdownList);
}
