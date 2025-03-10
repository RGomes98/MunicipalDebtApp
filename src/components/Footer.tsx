export function Footer() {
  const currentYear = new Date().getFullYear();
  return <p className='text-sm'>© {currentYear} Municipal Debt App. Protótipo.</p>;
}
