import type { DebtData } from '@/hooks/useDebtData';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, CircleAlert, Loader2 } from 'lucide-react';
import type { FormEntries } from '@/hooks/useFormSubmit';
import { ComponentProps, Fragment } from 'react';
import { NotifyDialog } from './NotifyDialog';
import { toast } from 'sonner';

type QueryResult = {
  isLoading: boolean;
  formEntries: FormEntries;
  queryResult: DebtData | null;
  dialogState: ComponentProps<typeof NotifyDialog>['dialogState'];
};

function generateCSV(result: DebtData) {
  const headers = Object.keys(result) as (keyof DebtData)[];
  const CSVHeaders = headers.join(';') + '\n';
  const CSVRows = headers.map((row) => result[row] ?? '').join(';');

  return {
    fileName: result['NOME DO DEVEDOR'].split(' ').join('-'),
    fileBlob: new Blob([CSVHeaders + CSVRows], { type: 'text/csv;charset=utf-8;' }),
  };
}

function downloadCSV({ fileName, fileBlob }: { fileName: string; fileBlob: Blob }) {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(fileBlob);
  link.setAttribute('download', `RELATÓRIO-${fileName.toUpperCase()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
  toast.success(<p className='text-xs'>Relatório gerado com êxito.</p>);
}

export function QueryResult({ isLoading, formEntries, queryResult, dialogState }: QueryResult) {
  if (isLoading) {
    return (
      <p className='-mt-2 flex items-center text-sm text-stone-600'>
        <Loader2 className='mr-1.5 size-4 animate-spin stroke-stone-600' />
        Buscando resultados, por favor, aguarde.
      </p>
    );
  }

  if (!formEntries) {
    return (
      <p className='-mt-2 flex items-center text-sm text-stone-600'>
        <CircleAlert className='mr-1.5 size-4 stroke-stone-600' />
        Realize uma consulta para visualizar os resultados aqui.
      </p>
    );
  }

  if (!queryResult) {
    return (
      <p className='-mt-2 flex items-center text-sm text-green-600'>
        <CheckCircle className='mr-1.5 size-4' />
        Nenhuma dívida pendente encontrada.
      </p>
    );
  }

  return (
    <Fragment>
      <h3 className='text-xl font-semibold'>{queryResult?.['NOME DO DEVEDOR']}</h3>
      <p>Data da Inscrição: {queryResult['DATA DA INSCRIÇÃO']}</p>
      <div className='mt-4'>
        <h4 className='text-lg font-semibold'>Dívidas Pendentes</h4>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>CPF</TableHead>
              <TableHead>Número do Termo de Inscrição</TableHead>
              <TableHead>Tipo de Pessoa</TableHead>
              <TableHead>Tipo do Devedor</TableHead>
              <TableHead>Origem</TableHead>
              <TableHead>Credor</TableHead>
              <TableHead>Sequencial do Crédito</TableHead>
              <TableHead>Situação do Crédito</TableHead>
              <TableHead>Saldo Devedor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{queryResult['CPF/CNPJ DEVEDOR']}</TableCell>
              <TableCell>{queryResult['NÚMERO DO TERMO DE INSCRIÇÃO']}</TableCell>
              <TableCell>{queryResult['TIPO DE PESSOA']}</TableCell>
              <TableCell>{queryResult['TIPO DO DEVEDOR']}</TableCell>
              <TableCell>{queryResult['ORIGEM']}</TableCell>
              <TableCell>{queryResult['CREDOR']}</TableCell>
              <TableCell>{queryResult['SEQUENCIAL DO CRÉDITO']}</TableCell>
              <TableCell>{queryResult['SITUAÇÃO DO CRÉDITO']}</TableCell>
              <TableCell>{queryResult['SALDO DEVEDOR SEM HONORÁRIOS']}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className='mt-4 space-x-4 max-sm:space-y-4'>
          <Button onClick={() => dialogState.set(true)} className='cursor-pointer'>
            Notificar Setor de Cobrança
          </Button>
          <Button
            onClick={() => downloadCSV(generateCSV(queryResult))}
            className='cursor-pointer'
            variant='outline'
          >
            Gerar Relatório
          </Button>
        </div>
      </div>
    </Fragment>
  );
}
