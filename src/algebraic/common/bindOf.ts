/**
 * TODO: Add Comment
 */
type BindOfReturn<Property extends string, Value> = {
  [K in Property]: Value
};

const bindOf = <Property extends string, Value>(
  property: Property,
  value: Value
): BindOfReturn<Property, Value> => ({[property]: value}) as any;

export { bindOf }