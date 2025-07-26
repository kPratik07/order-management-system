export const isEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isPositiveNumber = (value) => !isNaN(value) && Number(value) > 0;
