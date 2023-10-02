# vue-app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### переменные и база данных
```
использую сервис jsonplaceholder: photos вместо товаров (ради фото) и users.
в users по "назначению" используются только name и email.
company - избранное: их id в массиве, есть стандартные значения, но изначально есть другие значения.
website - корзина: объект с объектами внутри (тоже перезаписывается); название вложенного строится 'id'+ id продукта, внутри этого объекта находится значение количества в корзине.
username - служит в качестве пароля.
примеры аккаунтов: login 'Leanne Graham' password 'Bret'; login 'Ervin Howell' password 'Antonette';
```

### да, многое не успел, но я пытался
