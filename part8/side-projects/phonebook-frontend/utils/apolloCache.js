import { ALL_PERSONS } from "../src/queries";

export const addPersonToCache = (cache, personToAdd) => {
  cache.updateQuery({ query: ALL_PERSONS }, ({ allPersons }) => {
    const personExists = allPersons.some((p) => p.id === personToAdd.id);

    if (personExists) {
      return { allPersons };
    }

    return {
      allPersons: allPersons.concat(personToAdd),
    };
  });
};
