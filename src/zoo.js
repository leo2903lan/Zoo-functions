const { prices, hours } = require('./data');
const data = require('./data');

function getSpeciesByIds(ids, id2) {
  return data.species.filter((animal) => animal.id === ids || animal.id === id2);
}

function getAnimalsOlderThan(animal, age) {
  const bixo = data.species.find((item) => item.name === animal);
  return bixo.residents.every((idade) => idade.age > age);
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find((c) => c.firstName === employeeName || c.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  return data.employees.some((gerente) => gerente.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  if (managers === undefined || responsibleFor === undefined) {
    data.employees.push({
      id,
      firstName,
      lastName,
      managers: [],
      responsibleFor: [],
    });
  } else {
    data.employees.push({
      id,
      firstName,
      lastName,
      managers,
      responsibleFor,
    });
  }
}

function countAnimals(species) {
  if (species === undefined) {
    return data.species.reduce((acc, animal) => {
      acc[animal.name] = animal.residents.length; // uso de brackts notation [] por ser dinamico, com uso de varíavel a chave que vai ser utilizada. por isso não usar dot notation .
      return acc; // retorna o acumulador para continuar recebendo os outros valores.
    }, {});
  }
  return data.species.find((animal) => animal.name === species).residents.length;
}

function calculateEntry(entrants) {
  if (entrants === undefined || entrants === {}) return 0;// a ordem interfere total na função, se fizer destruction antes de verificar se os parametro estão undefined, ele recebe valor 0 e não passa no teste unitário para ele.
  const { Adult = 0, Child = 0, Senior = 0 } = entrants; // iniciar as varíaveis com números pq senão retonra como NaN nos testes.
  const price = data.prices;
  const totalPrice = Adult * price.Adult + Child * price.Child + Senior * price.Senior;
  return totalPrice;
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  if (dayName === undefined) {
    const agenda = Object.keys(hours).reduce((acc, currentDay) => {
      acc[currentDay] = `Open from ${data.hours[currentDay].open}am until ${data
        .hours[currentDay].close - 12}pm`;
      if (currentDay === 'Monday') { acc[currentDay] = 'CLOSED'; }
      return acc;
    }, {});
    return agenda;
  }
  if (dayName === 'Monday') {
    return ({
      [dayName]: 'CLOSED',
    });
  }
  return ({
    [dayName]: `Open from ${data.hours[dayName]
      .open}am until ${data.hours[dayName].close - 12}pm`,
  });
}

function getOldestFromFirstSpecies(id) {
  const funcionario = data.employees.find((i) => i.id === id);
  const animalInfo = data.species.find((ani) => ani.id === funcionario.responsibleFor[0]);
  const animalVelho = animalInfo.residents.sort((a, b) => b.age - a.age);
  const { name, sex, age } = animalVelho[0];
  const res = [name, sex, age];
  return res;
}

function increasePrices(percentage) {
  const newa = data.prices.Adult + data.prices.Adult * (percentage / 100);
  const news = data.prices.Senior + data.prices.Senior * (percentage / 100);
  const newc = data.prices.Child + data.prices.Child * (percentage / 100);
  prices.Adult = Math.round(newa * 100) / 100;
  prices.Senior = Math.round(news * 100) / 100;
  prices.Child = Math.round(newc * 100) / 100;
}

function getEmployeeCoverage(idOrName) {
  if (idOrName === undefined) {
    return {};
  }
  const colab = data.employees.find((col) => col.firstName === idOrName
  || col.id === idOrName
  || col.lastName === idOrName);
  const fullName = `${colab.firstName} ${colab.lastName}`;
  const objt = {};
  const animalName = data.species.filter((animal) => colab.responsibleFor.includes(animal.id));
  const animalArray = animalName.map((ani) => ani.name);
  console.log(animalArray);
  objt[fullName] = animalArray;
  return objt;
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
