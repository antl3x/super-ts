/**
 * TODO: Add Comment
 */
type BindToReturn<Previous, Property extends string, Value> = {
  [K in keyof Previous | Property]: K extends keyof Previous
    ? Previous[K]
    : Value;
};

const bindTo = <Previous, Property extends string, Value>(
  previous: Previous,
  property: Exclude<Property, keyof Previous>,
  value: Value
): BindToReturn<Previous, Property, Value> => Object.assign ({}, previous, { [property]: value }) as any;

export { bindTo }