export const weaponOptions = [
  { label: 'Любое',  value: '' },
  { label: 'Шпага',  value: 'E' },
  { label: 'Сабля',  value: 'S' },
  { label: 'Рапира', value: 'F' },
]
 
export const genderOptions = [
  { label: 'Любой', value: '' },
  { label: 'М',     value: 'M' },
  { label: 'Ж',     value: 'F' },
]
 
export const ageOptions = [
  { label: 'Любой',   value: '' },
  { label: '2010 и моложе',  value: 'K' },
  { label: '2010-2012',  value: 'J' },
  { label: 'До 23',   value: 'U23' },
  { label: 'Взрослые', value: 'A' },
  { label: 'Ветераны', value: 'V' },
]
 
export const categoryOptions = [
  { label: 'Любое',      value: null },
  { label: 'Бесплатно',  value: false },
  { label: 'Платно',     value: true },
]

export const regionsOptions = [
  { label: 'Все', value: '' },
  { label: 'СПБ',  value: 'СПБ' },
  { label: 'МОО',   value: 'МОО' },
]

export const WEAPON_LABELS: Record<string, string> = { E: 'Шпага', S: 'Сабля', F: 'Рапира' }
export const GENDER_LABELS: Record<string, string> = { M: 'М', F: 'Ж' }
export const AGE_LABELS: Record<string, string> = {
  K: '2010 и моложе', J: '2010-2012', U23: 'До 23', A: 'Взрослые', V: 'Ветераны',
}