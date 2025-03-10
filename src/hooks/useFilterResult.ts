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

      const formName = formEntries.name.toLowerCase();
      const queryName = user['NOME DO DEVEDOR'].toLowerCase();
      const formIdentifier = formEntries.cpf.toLowerCase();
      const queryIdentifier = user['CPF/CNPJ DEVEDOR'].toLowerCase();

      const isNameMatching = formName === queryName;
      const isIdentifierMatching = formIdentifier === queryIdentifier;

      if (!formEntries.cpf) return isNameMatching;
      if (!formEntries.name) return isIdentifierMatching;
      return isNameMatching && isIdentifierMatching;
    }) ?? null;

  return { userQueryResult, filteredDebtData };
}

export { useFilterQueryResult };
