import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';

type DebtData = {
  'DATA DE GERAÇÃO': string;
  'CPF/CNPJ DEVEDOR': string;
  'TIPO DE PESSOA': string;
  'TIPO DO DEVEDOR': string;
  'NOME DO DEVEDOR': string;
  'NÚMERO DO TERMO DE INSCRIÇÃO': string;
  'DATA DA INSCRIÇÃO': string;
  'SEQUENCIAL DO CRÉDITO': string;
  'SITUAÇÃO DO CRÉDITO': string;
  'MOTIVO DA SUSPENSÇÃO': string;
  ORIGEM: string;
  CREDOR: string;
  'SALDO DEVEDOR SEM HONORÁRIOS': string;
  OBSERVAÇÃO: string;
};

const columns: ColumnDef<DebtData>[] = [
  {
    accessorKey: 'NOME DO DEVEDOR',
    cell: ({ row }) => <div>{row.getValue('NOME DO DEVEDOR')}</div>,
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='cursor-pointer'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nome do Devedor
          <ArrowUpDown />
        </Button>
      );
    },
  },
  {
    accessorKey: 'DATA DA INSCRIÇÃO',
    sortingFn: (a, b) => {
      const [rawDateA] = a.original['DATA DA INSCRIÇÃO'].split(' ');
      const [dayA, monthA, yearA] = rawDateA.split('/');
      const dateA = new Date(Number(yearA), Number(monthA) - 1, Number(dayA));

      const [rawDateB] = b.original['DATA DA INSCRIÇÃO'].split(' ');
      const [dayB, monthB, yearB] = rawDateB.split('/');
      const dateB = new Date(Number(yearB), Number(monthB) - 1, Number(dayB));

      const dateAInMilliseconds = dateA.getTime();
      const dateBInMilliseconds = dateB.getTime();

      return dateAInMilliseconds > dateBInMilliseconds ? -1 : 1;
    },
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='cursor-pointer'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Data da Inscrição
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className='px-2'>{String(row.getValue('DATA DA INSCRIÇÃO')).split(' ')[0]}</div>,
  },
  {
    accessorKey: 'CPF/CNPJ DEVEDOR',
    header: 'CPF',
  },

  {
    accessorKey: 'CREDOR',
    header: 'Credor',
  },
  {
    accessorKey: 'ORIGEM',
    header: () => {
      return <div className='text-right font-medium'>Origem</div>;
    },
    cell: ({ row }) => {
      return <div className='text-right font-medium'>{row.getValue('ORIGEM')}</div>;
    },
  },
  {
    accessorKey: 'SALDO DEVEDOR SEM HONORÁRIOS',
    cell: ({ row }) => {
      return <div className='text-right font-medium'>{row.getValue('SALDO DEVEDOR SEM HONORÁRIOS')}</div>;
    },
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='w-full cursor-pointer justify-end'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Saldo Devedor
          <ArrowUpDown />
        </Button>
      );
    },
  },
];

function useDebtData() {
  const [debtData, setDebtData] = useState<DebtData[]>([]);

  useEffect(() => {
    if (debtData.length) return;

    (async () => {
      try {
        const response = await fetch('/dataset.json');
        setDebtData(await response.json());
      } catch (error) {
        console.error(`Failed to fetch dataset json. Error: ${error}`);
      }
    })();
  }, [debtData.length]);

  return { columns, debtData };
}

export type { DebtData };
export { useDebtData };
