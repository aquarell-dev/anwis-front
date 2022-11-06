export type Individual = {
  individual_entrepreneur: string,
  id: number
};

export type IndividualInitialState = {
  currentSelectedIndividual: Individual,
  individuals: Individual[]
}