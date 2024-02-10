// Этап 1. В HTML файле создайте верстку элементов, которые будут статичны(неизменны).

// Этап 2. Создайте массив объектов студентов.Добавьте в него объекты студентов, например 5 студентов.

const studentsList = [
  {
    name: 'Олег',
    surname: 'Олегович',
    lastname: 'Суслин',
    birthday: new Date(1995, 11, 17),
    yearStartStudy: 2019,
    faculty: 'Психология'
  },
  {
    name: 'Василиса',
    surname: 'Алексеевна',
    lastname: 'Кубрина',
    birthday: new Date(1997, 12, 13),
    yearStartStudy: 2020,
    faculty: 'Иностранные языки'
  },
  {
    name: 'Тимофей',
    surname: 'Захарович',
    lastname: 'Мамонтов',
    birthday: new Date(1993, 08, 02),
    yearStartStudy: 2016,
    faculty: 'Хирургия'
  },
  {
    name: 'Матвей',
    surname: 'Сергеевич',
    lastname: 'Булкин',
    birthday: new Date(1995, 03, 23),
    yearStartStudy: 2021,
    faculty: 'Программирование'
  },
  {
    name: 'Алиса',
    surname: 'Васильевна',
    lastname: 'Ахтубина',
    birthday: new Date(1996, 01, 29),
    yearStartStudy: 2020,
    faculty: 'Менеджмент'
  }
  // Добавьте сюда объекты студентов
]

//создание таблицы
const $app = document.getElementById('app'),
  $form = document.getElementById('add-form'),
  $formLastname = document.getElementById('add-lastname-inp'),
  $formName = document.getElementById('add-name-inp'),
  $formSurname = document.getElementById('add-surname-inp'),
  $formBirthday = document.getElementById('add-birthday-inp'),
  $formYearStudy = document.getElementById('add-yearStudy-inp'),
  $formFaculty = document.getElementById('add-faculty-inp'),

  $filterForm = document.getElementById('filter'),
  $filterFIO = document.getElementById('filterFIO'),
  $filterFaculty = document.getElementById('filterFaculty'),
  $filterStartYear = document.getElementById('filterStartYear'),
  $filterEndYear = document.getElementById('filterEndYear'),

  $table = document.createElement('table'),
  $tableHead = document.createElement('thead'),
  $tableBody = document.createElement('tbody'),
  //создание шапки
  $tableHeadTr = document.createElement('tr'),
  $tableHeadThFIO = document.createElement('th'),
  $tableHeadThBirthday = document.createElement('th'),
  $tableHeadThYearStudy = document.createElement('th'),
  $tableHeadThFaculty = document.createElement('th');
//Добавление стилей таблице
$table.classList.add('table', 'table-striped', 'text-center');
$tableHead.classList.add('thead-dark');

$tableHeadThFIO.setAttribute('id', 'lastname');
$tableHeadThBirthday.setAttribute('id', 'birthday');
$tableHeadThYearStudy.setAttribute('id', 'yearStartStudy');
$tableHeadThFaculty.setAttribute('id', 'faculty');

$tableHeadThFIO.textContent = 'ФИО';
$tableHeadThBirthday.textContent = 'Дата рождения';
$tableHeadThYearStudy.textContent = 'Годы обучения';
$tableHeadThFaculty.textContent = 'Факультет';

$tableHeadTr.append($tableHeadThFIO, $tableHeadThBirthday, $tableHeadThYearStudy, $tableHeadThFaculty)
$tableHead.append($tableHeadTr);

$table.append($tableHead, $tableBody);
$app.append($table);


const $sortBtn = document.querySelectorAll('thead th');
let sortСolumn,
  sortDir = true;
const dateNow = new Date()


// Этап 3. Создайте функцию вывода одного студента в таблицу, по аналогии с тем, как вы делали вывод одного дела в модуле 8. Функция должна вернуть html элемент с информацией и пользователе.У функции должен быть один аргумент - объект студента.

function createStudent(oneStudent) {
  const $studentTr = document.createElement('tr'),
    $studentFIO = document.createElement('th'),
    $studentBirthday = document.createElement('th'),
    $studentYearStudy = document.createElement('th'),
    $studentFaculty = document.createElement('th');

  let date = oneStudent.birthday.getDate(),
    month = oneStudent.birthday.getMonth() + 1,
    year = oneStudent.birthday.getFullYear();


  if (month < 10) month = "0" + month;
  if (date < 10) date = "0" + date;

  let birthday = date + '.' + month + '.' + year;

  oneStudent.age = (dateNow - oneStudent.birthday) / 31536000000;
  let age = Math.floor(oneStudent.age)
  //проверка возраста
  if ((oneStudent.age > 0 && oneStudent.age <= 4) || (oneStudent.age > 22 && oneStudent.age <= 24) || (oneStudent.age > 31 && oneStudent.age <= 34) || (oneStudent.age > 41 && oneStudent.age <= 44) || (oneStudent.age > 51 && oneStudent.age <= 54)) {
    age = age + ' года'
  } else if ((oneStudent.age > 4 && oneStudent.age < 21) || (oneStudent.age > 24 && oneStudent.age <= 30) || (oneStudent.age > 34 && oneStudent.age <= 40) || (oneStudent.age > 44 && oneStudent.age <= 50)) {
    age = age + ' лет'
  } else {
    age = age + ' год'
  }
  //

  let course = new Date(oneStudent.yearStartStudy, 08, 01).getFullYear(),
    yearEndStudy = course + 4;

  if (course <= (dateNow.getFullYear() - 4) || ((dateNow.getFullYear() - course == 4) && dateNow.getMonth() >= 8)) {
    course = course + '-' + yearEndStudy + ' (закончил)';
  }
  else {
    course = course + '-' + yearEndStudy + ' (' + (dateNow.getFullYear() - course + 1) + ' курс)';
  }

  oneStudent.yearEndStudy = yearEndStudy;

  $studentFIO.textContent = oneStudent.fio;
  $studentBirthday.textContent = birthday + ` (${age})`;
  $studentYearStudy.textContent = course;
  $studentFaculty.textContent = oneStudent.faculty;

  $studentTr.append($studentFIO, $studentBirthday, $studentYearStudy, $studentFaculty)

  return $studentTr
}


// Этап 4. Создайте функцию отрисовки всех студентов. Аргументом функции будет массив студентов.Функция должна использовать ранее созданную функцию создания одной записи для студента.Цикл поможет вам создать список студентов.Каждый раз при изменении списка студента вы будете вызывать эту функцию для отрисовки таблицы.

//Рендер
function render(arrData) {
  $tableBody.innerHTML = '';
  let copyStudentList = [...arrData]

  //подготовка
  for (const oneStudent of copyStudentList) {
    oneStudent.fio = oneStudent.lastname + ' ' + oneStudent.name + ' ' + oneStudent.surname;
  }

  //Сортировка
  copyStudentList = copyStudentList.sort(function (a, b) {
    let sort = a[sortСolumn] > b[sortСolumn];
    if (!sortDir) sort = a[sortСolumn] < b[sortСolumn]
    if (sort) return -1;
  })

  //Фильтрация
  if ($filterFIO.value.trim()) {
    copyStudentList = copyStudentList.filter(function (oneStudent) {
      if (oneStudent.fio.includes($filterFIO.value)) return true
    })
  }

  if ($filterFaculty.value.trim()) {
    copyStudentList = copyStudentList.filter(function (oneStudent) {
      if (oneStudent.faculty.includes($filterFaculty.value)) return true
    })
  }

  if ($filterStartYear.value) {
    copyStudentList = copyStudentList.filter(function (oneStudent) {
      if (oneStudent.yearStartStudy == $filterStartYear.value) return true
    })
  }

  if ($filterEndYear.value) {
    copyStudentList = copyStudentList.filter(function (oneStudent) {
      if (oneStudent.yearEndStudy == $filterEndYear.value) return true
    })
  }

  //отрисовка
  for (const oneStudent of copyStudentList) {
    const newStudent = createStudent(oneStudent);
    $tableBody.append(newStudent)
  }
}
render(studentsList)


// Этап 5. К форме добавления студента добавьте слушатель события отправки формы, в котором будет проверка введенных данных.Если проверка пройдет успешно, добавляйте объект с данными студентов в массив студентов и запустите функцию отрисовки таблицы студентов, созданную на этапе 4.
let $errorText = document.createElement('span');
$errorText.style.color = 'red'
$form.append($errorText);
const validateBirthday = new Date(1900, 00, 01);

// Добавление
$form.addEventListener('submit', function (event) {
  event.preventDefault();


  $errorText.textContent = '';
  //Валидация
  if (!$formLastname.value.trim()) {
    $formLastname.style.borderColor = 'red';
    $errorText.textContent = 'Введите фамилию';
    return
  } else {
    $formLastname.style.borderColor = '#ced4da';
  }
  if (!$formName.value.trim()) {
    $formName.style.borderColor = 'red'
    $errorText.textContent = 'Введите имя';
    return
  } else {
    $formName.style.borderColor = '#ced4da';
  }
  if (!$formSurname.value.trim()) {
    $formSurname.style.borderColor = 'red'
    $errorText.textContent = 'Введите отчество';
    return
  } else {
    $formSurname.style.borderColor = '#ced4da';
  }
  if (!$formBirthday.value) {
    $formBirthday.style.borderColor = 'red'
    $errorText.textContent = 'Введите дату рождения';
    return
  } else if ($formBirthday.valueAsDate < validateBirthday || $formBirthday.valueAsDate > dateNow) {
    $formBirthday.style.borderColor = 'red'
    $errorText.textContent = 'Дата рождения должна быть в диапазоне от 01.01.1900 до текущей даты';
    return
  }
  else {
    $formBirthday.style.borderColor = '#ced4da';
  }
  if (!$formYearStudy.value.trim()) {
    $formYearStudy.style.borderColor = 'red'
    $errorText.textContent = 'Введите год начала обучения';
    return
  } else if (($formYearStudy.value < 2000) || ($formYearStudy.value > dateNow.getFullYear())) {
    $formYearStudy.style.borderColor = 'red'
    $errorText.textContent = 'Год начала обучения должнен быть в диапазоне от 2000 года до текущего года';
    return
  }
  else {
    $formYearStudy.style.borderColor = '#ced4da';
  }
  if (!$formFaculty.value.trim()) {
    $formFaculty.style.borderColor = 'red';
    $errorText.textContent = 'Введите название факультета';
    return
  } else {
    $formFaculty.style.borderColor = '#ced4da';
  }
  //
  studentsList.push({
    name: $formName.value,
    surname: $formSurname.value,
    lastname: $formLastname.value,
    birthday: $formBirthday.valueAsDate,
    yearStartStudy: $formYearStudy.value,
    faculty: $formFaculty.value
  })

  render(studentsList)

})

// Этап 5. Создайте функцию сортировки массива студентов и добавьте события кликов на соответствующие колонки.
const sortFIO = document.getElementById('lastname'),
  sortAge = document.getElementById('birthday'),
  sortYearStudy = document.getElementById('yearStartStudy'),
  sortFaculty = document.getElementById('faculty');

sortFIO.addEventListener('click', function () {
  sortСolumn = 'lastname';
  sortDir = !sortDir;
  render(studentsList)
})

sortAge.addEventListener('click', function () {
  sortСolumn = 'age';
  sortDir = !sortDir;
  render(studentsList)
})
sortYearStudy.addEventListener('click', function () {
  sortСolumn = 'yearStartStudy';
  sortDir = !sortDir;
  render(studentsList)
})
sortFaculty.addEventListener('click', function () {
  sortСolumn = 'faculty';
  sortDir = !sortDir;
  render(studentsList)
})

// Этап 6. Создайте функцию фильтрации массива студентов и добавьте события для элементов формы.



$filterForm.addEventListener('submit', (e) => {
  e.preventDefault()
})

$filterFIO.addEventListener('input', () => {
  render(studentsList)
})

$filterFaculty.addEventListener('input', () => {
  render(studentsList)
})

$filterStartYear.addEventListener('input', () => {
  render(studentsList)
})

$filterEndYear.addEventListener('input', () => {
  render(studentsList)
})
