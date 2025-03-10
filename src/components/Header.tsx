export function Header() {
  return (
    <div className='flex items-center justify-between px-8 max-sm:px-4'>
      <div>
        <h1 className='text-3xl font-bold max-sm:text-xl'>Consulta de Dívidas Ativas</h1>
        <p className='mt-2 text-sm'>
          Verifique se uma dívida ativa está registrada no banco de dados municipal e se há pendências
          financeiras associadas ao CPF.
        </p>
      </div>
    </div>
  );
}
