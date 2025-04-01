export function generateAgency(): string {
    return '0001';
  }
  
  export function generateAccount(): string {
    const random = Math.floor(100000 + Math.random() * 900000);
    return String(random);
  }
  