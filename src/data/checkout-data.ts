export interface CustomerInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export const VALID_CUSTOMER: CustomerInfo = {
  firstName: 'Yaquelin',
  lastName: 'Rugel',
  postalCode: '8320000',
};

/** Casos negativos del formulario de checkout (partición de equivalencia: cada campo vacío). */
export const MISSING_FIELD_CASES: Array<{ id: string; field: string; data: CustomerInfo; error: string }> = [
  {
    id: 'CHK-04',
    field: 'nombre',
    data: { ...VALID_CUSTOMER, firstName: '' },
    error: 'Error: First Name is required',
  },
  {
    id: 'CHK-05',
    field: 'apellido',
    data: { ...VALID_CUSTOMER, lastName: '' },
    error: 'Error: Last Name is required',
  },
  {
    id: 'CHK-06',
    field: 'código postal',
    data: { ...VALID_CUSTOMER, postalCode: '' },
    error: 'Error: Postal Code is required',
  },
];

/** Tasa de impuesto que aplica SauceDemo sobre el subtotal. */
export const TAX_RATE = 0.08;
