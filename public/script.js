function loadAddForm() {
    fetch('/add')
        .then(response => response.text())
        .then(html => {
            document.getElementById('addFormContainer').innerHTML = html;
        });
}
function add() {
    // Сбор данных из полей ввода
    let name = document.getElementById('name_field').value;
    let phone = document.getElementById('number_field').value;

    // Создание объекта с данными
    let data = {
        name: name,
        phone: phone
    };

    // Выполнение POST-запроса через AJAX
    fetch('/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text()).then(()=>window.location.href="/")
    .catch(error => {
        console.error('Ошибка:', error);
        alert('Ошибка при отправке запроса');
    });
}
function update (originalName) {
    let name = document.getElementById('name_field').value;
    let phone = document.getElementById('number_field').value;

    // Создание объекта с данными
    let data = {
        originalname: originalName,
        name: name,
        phone: phone
    };
    fetch('/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text()).then(()=>window.location.href="/")
    .catch(err => {
        console.log(err);
    });
}

function deletee (originalName) {
    
    // Создание объекта с данными
    let data = {
        originalname: originalName
    };
    fetch('/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text()).then(()=>window.location.href="/")
    .catch(err => {
        console.log(err);
    });
}
function back(){
    window.location.assign(`/`);
}