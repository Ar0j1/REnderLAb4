const express = require('express');
const fs = require('fs');
const hbs = require("hbs");
const app = express();
const PORT = 3000;

hbs.registerPartials("./views/partials");


app.use(express.json());
app.use(express.static("./public"));

app.set('view engine', 'hbs');
app.set('views', './views');
hbs.registerHelper('cancelButton', function () {
  return new hbs.SafeString('<input type="button" class="butadd" value="Отказаться" onclick="back()"/>');
});


app.get('/', (req, res) => {
  const rawData = fs.readFileSync('phonebook.json');
const users = JSON.parse(rawData);
  res.render('index', { users: users, blocked: false });
});
app.get('/add', (req, res) => {
  const rawData = fs.readFileSync('phonebook.json');
const users = JSON.parse(rawData);
    res.render('index1', { users: users, blocked: true });
});
app.get("/update", (req, res) => {
  let name = req.query.name;
  const rawData = fs.readFileSync('phonebook.json');
const users = JSON.parse(rawData);
  let element = users.find(i => i.name === name);

  res.render('index2', { users: users, blocked: false, updateElement: element });
});



app.post('/add', (req, res) => {
  // Получаем данные из тела запроса
  const name = req.body.name;
  const phone = req.body.phone;

  // Делаем что-то с полученными данными, например, сохраняем их в базе данных или файле
  fs.readFile('phonebook.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Ошибка чтения файла:', err);
        return res.status(500).send('Ошибка чтения файла');
    }

    // Преобразуем JSON строку в объект
    let contacts = JSON.parse(data);

    // Добавляем новый контакт в массив контактов
    contacts.push({ name: name, phone: phone });

    // Записываем обновленные данные обратно в JSON файл
    fs.writeFile('phonebook.json', JSON.stringify(contacts,null,4), 'utf8', err => {
        if (err) {
            console.error('Ошибка записи файла:', err);
            return res.status(500).send('Ошибка записи файла');
        }

        console.log('Контакт успешно добавлен');
        //res.send('Контакт успешно добавлен');
        res.redirect('/');
    });
  });
});

app.post('/update', (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const originalName = req.body.originalname;
  fs.readFile('phonebook.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Ошибка чтения файла:', err);
        return res.status(500).send('Ошибка чтения файла');
    }

    // Преобразуем JSON строку в объект
    let contacts = JSON.parse(data);

    // Добавляем новый контакт в массив контактов
    contacts.forEach(i => {
      if (i.name === originalName){
          i.name =name;
          i.phone = phone;

          return;
      }})
    // Записываем обновленные данные обратно в JSON файл
    fs.writeFile('phonebook.json', JSON.stringify(contacts,null,4), 'utf8', err => {
        if (err) {
            console.error('Ошибка записи файла:', err);
            return res.status(500).send('Ошибка записи файла');
        }

        console.log('Контакт успешно изменён');
        //res.send('Контакт успешно добавлен');
        res.redirect('/');
    });
  });
});

app.post('/delete', (req, res) => {
  const originalName = req.body.originalname;
  fs.readFile('phonebook.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Ошибка чтения файла:', err);
        return res.status(500).send('Ошибка чтения файла');
    }

    // Преобразуем JSON строку в объект
    let contacts = JSON.parse(data);

    // Добавляем новый контакт в массив контактов
    contacts = contacts.filter(contact => contact.name !== originalName);
    // Записываем обновленные данные обратно в JSON файл
    fs.writeFile('phonebook.json', JSON.stringify(contacts,null,4), 'utf8', err => {
        if (err) {
            console.error('Ошибка записи файла:', err);
            return res.status(500).send('Ошибка записи файла');
        }

        console.log('Контакт успешно удалён');
        //res.send('Контакт успешно добавлен');
        res.redirect('/');
    });
  });
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
