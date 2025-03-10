import type { FormEntries } from './useFormSubmit';
import type { DebtData } from './useDebtData';

function useFilterQueryResult({
  queryResult,
  formEntries,
}: {
  queryResult: DebtData[];
  formEntries: FormEntries;
}) {
  const filteredDebtData = queryResult.filter((result) => result['CPF/CNPJ DEVEDOR'].includes('X'));

  const userQueryResult =
    filteredDebtData.find((user) => {
      if (!formEntries) return null;
      if (!formEntries.name) return formEntries.cpf === user['CPF/CNPJ DEVEDOR'];
      return formEntries.name === user['NOME DO DEVEDOR'] && formEntries.cpf === user['CPF/CNPJ DEVEDOR'];
    }) ?? null;

  return { userQueryResult, filteredDebtData };
}

export { useFilterQueryResult };
