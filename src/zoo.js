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
  // seu código aqui
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
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
