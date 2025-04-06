export const createActiveResearch = () => {
  let value = $state<string | null>(null)

  return {
    get value() { return value },
    update: (_value: string | null) => value = _value
  }
}

export const createResearchList = () => {
  let list = $state<any>([])

  return {
    get list() { return list },
    add: (_value: any) => list.push(_value),
    remove: (_value: any) => list.filter((item: any) => item !== _value),
    init: (_values: any) => list = _values
  }
}